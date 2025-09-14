# /server/main.py
import os, base64, io
import numpy as np
from PIL import Image
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tensorflow as tf
import cv2

load_dotenv()

# ---------- Your custom objects (unchanged logic) ----------
def dense_r2(y_true, y_pred):
    residual = tf.keras.backend.sum(tf.keras.backend.square(y_true - y_pred))
    total = tf.keras.backend.sum(tf.keras.backend.square(y_true - tf.keras.backend.mean(y_true)))
    r2 = 1 - residual / (total + tf.keras.backend.epsilon())
    return tf.convert_to_tensor(r2)

def mse(y_true, y_pred):
    return tf.keras.backend.mean(tf.keras.backend.square(y_pred - y_true))

def rmse(y_true, y_pred):
    return tf.keras.backend.sqrt(tf.keras.backend.mean(tf.keras.backend.square(y_pred - y_true)))

def dice_loss(y_true, y_pred):
    smooth = 1.0
    y_true_f = tf.keras.backend.flatten(y_true)
    y_pred_f = tf.keras.backend.flatten(y_pred)
    intersection = tf.keras.backend.sum(y_true_f * y_pred_f)
    return 1 - (2. * intersection + smooth) / (tf.keras.backend.sum(y_true_f) + tf.keras.backend.sum(y_pred_f) + smooth)

def bce_dice_loss(y_true, y_pred):
    bce = tf.keras.losses.BinaryCrossentropy()(y_true, y_pred)
    dice = dice_loss(y_true, y_pred)
    return bce + dice

from tensorflow.keras.layers import Layer, Conv2D, Multiply, Concatenate

# NOTE: your Django snippet had __init__ misspelled as _init_.
class SpatialAttention(Layer):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.conv = Conv2D(1, kernel_size=7, padding='same', activation='sigmoid')
    def build(self, input_shape):
        self.conv.build((input_shape[0], input_shape[1], input_shape[2], 2))
        super().build(input_shape)
    def call(self, inputs):
        avg_pool = tf.reduce_mean(inputs, axis=-1, keepdims=True)
        max_pool = tf.reduce_max(inputs, axis=-1, keepdims=True)
        concat = Concatenate()([avg_pool, max_pool])
        spatial = self.conv(concat)
        return Multiply()([inputs, spatial])
    def get_config(self):
        return super().get_config()

custom_objects = {
    "dense_r2": dense_r2,
    "mse": mse,
    "rmse": rmse,
    "dice_loss": dice_loss,
    "bce_dice_loss": bce_dice_loss,
    "SpatialAttention": SpatialAttention,
    # channel_attention in your snippet is a function used inside the model graph at train-time.
    # If it’s part of the saved model, add it here as well:
    # "channel_attention": channel_attention,
}

MODEL_PATH = os.getenv("MODEL_PATH")
if not MODEL_PATH:
    raise RuntimeError("MODEL_PATH env var not set")

# Load ONCE at startup
model = tf.keras.models.load_model(MODEL_PATH, custom_objects=custom_objects)

# ---------- FastAPI app ----------
app = FastAPI()

# Allow Next.js to call directly from the browser OR via Next API proxy
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

def preprocess(image_bytes: bytes) -> np.ndarray:
    """Match your Django preprocessing."""
    arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError("Failed to decode image")
    img = cv2.resize(img, (256, 256))
    img = img / 255.0
    img = np.expand_dims(img, axis=(0, -1))  # (1, H, W, 1)
    img = np.repeat(img, 3, axis=-1)         # (1, H, W, 3) to match model input
    return img

def mask_to_base64(binary_pred: np.ndarray) -> str:
    """binary_pred bool/0-1 array -> base64 PNG (no data: prefix)."""
    if binary_pred.ndim == 4:
        m = (binary_pred[0, :, :, 0] * 255).astype(np.uint8)
    else:
        m = (binary_pred * 255).astype(np.uint8)
    pil = Image.fromarray(m)
    buf = io.BytesIO()
    pil.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")

@app.post("/predict")
async def predict(images: list[UploadFile] = File(...)):
    results = []
    spatial_resolution = 10 * 10  # exactly like your code (100 sq units per pixel)
    threshold = 0.5

    for up in images:
        try:
            data = await up.read()
            x = preprocess(data)
            y_pred = model.predict(x)
            binary = (y_pred > threshold).astype(np.uint8)

            oil_spill_detected = np.sum(binary) > 0
            oil_spill_pixels = int(np.sum(binary) * spatial_resolution)
            total_pixels = int(binary.size * spatial_resolution)
            percentage = (oil_spill_pixels / total_pixels) * 100 if total_pixels else 0.0

            results.append({
                "filename": up.filename,
                "result": "Oil Spill Detected" if oil_spill_detected else "No Oil Spill Detected",
                "percentage": percentage,
                "oil_spill_pixels": oil_spill_pixels,
                "prediction_mask": mask_to_base64(binary),
            })
        except Exception as e:
            results.append({"error": f"{up.filename}: {str(e)}"})

    # EXACT shape your frontend expects
    return JSONResponse({"results": results})
