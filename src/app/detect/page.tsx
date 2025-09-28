'use client'
import React, { useState, useRef } from 'react';
import { Upload, Download, Trash2, Play, Loader, Image, Cpu, FileImage, BarChart3, AlertCircle, CheckCircle2, X } from 'lucide-react';

type Result = {
  filename?: string
  prediction_mask: string   // base64 (no prefix)
  percentage: number
  oil_spill_pixels: number
  result: 'Oil Spill Detected' | 'No Oil Spill Detected'
  error?: string
}

const ModernDetectPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [results, setResults] = useState<Result[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const choose = () => inputRef.current?.click();

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    const urls = await Promise.all(newFiles.map(fileToDataURL));
    setPreviews(prev => [...prev, ...urls]);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const newFiles = Array.from(e.dataTransfer.files || []);
    setFiles(prev => [...prev, ...newFiles]);
    Promise.all(newFiles.map(fileToDataURL)).then(urls => setPreviews(prev => [...prev, ...urls]));
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
  }

  function clearAll() {
    setFiles([]);
    setPreviews([]);
    setResults(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  function removeFile(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  }

  async function detect() {
    if (files.length === 0) return;
    setBusy(true);
    setResults(null);
    const fd = new FormData();
    files.forEach(f => fd.append('images', f));
    try {
      const res = await fetch('/api/detect', { method: 'POST', body: fd });
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Detection failed:', error);
    }
    setBusy(false);
  }

  async function downloadAll() {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    results?.forEach((r, i) => {
      const base = files[i]?.name?.replace(/\.[^.]+$/, '') || `image-${i + 1}`;
      const folder = zip.folder(base)!;
      const originalBase64 = previews[i]?.split(',')[1] || '';
      folder.file(`${base}.png`, originalBase64, { base64: true });
      folder.file(`${base}-mask.png`, r.prediction_mask, { base64: true });
      folder.file('summary.json', JSON.stringify({
        filename: files[i]?.name ?? `${base}.png`,
        verdict: r.result,
        oil_spill_pixels: r.oil_spill_pixels,
        percentage: r.percentage,
      }, null, 2));
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'oil-spill-detections.zip');
  }

  async function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }

  const hasResults = Array.isArray(results) && results.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white pt-24">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30 mb-8">
            <span className="text-emerald-300 text-sm font-medium tracking-wide">LIVE DETECTION SYSTEM</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-emerald-200 to-blue-300 bg-clip-text text-transparent leading-tight">
            Oil Spill Detection
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Upload SAR imagery to detect and segment oil spills using our advanced DAENet architecture. 
            Get instant results with detailed analysis and downloadable masks.
          </p>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-emerald-400/20">
              <Cpu className="w-8 h-8 text-emerald-400 mb-3 mx-auto" />
              <h3 className="font-bold mb-2">AI-Powered Detection</h3>
              <p className="text-slate-400 text-sm">Advanced DAENet architecture for precise oil spill identification</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-blue-400/20">
              <BarChart3 className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
              <h3 className="font-bold mb-2">Detailed Analysis</h3>
              <p className="text-slate-400 text-sm">Pixel-level segmentation with coverage percentage and statistics</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-400/20">
              <Download className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
              <h3 className="font-bold mb-2">Export Results</h3>
              <p className="text-slate-400 text-sm">Download original images, masks, and detailed JSON reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Detection Interface */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Upload Area */}
          {!hasResults && (
            <div className="mb-8">
              <div
                className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 ${
                  dragOver 
                    ? 'border-emerald-400 bg-emerald-500/10' 
                    : 'border-white/30 bg-white/5'
                } backdrop-blur-md p-12 text-center hover:bg-white/10`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className="relative z-10">
                  <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">Upload SAR Images</h3>
                  <p className="text-slate-300 mb-8 max-w-md mx-auto">
                    Drag and drop your SAR imagery here, or click to browse files. 
                    Supports multiple images for batch processing.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={choose}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Choose Files
                    </button>
                  </div>
                  
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={onPick}
                  />
                  
                  {files.length > 0 && (
                    <div className="mt-6 inline-block px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30">
                      <span className="text-emerald-300 text-sm font-medium">
                        {files.length} image{files.length > 1 ? 's' : ''} ready for processing
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Image Queue */}
          {!hasResults && previews.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Queued Images</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={clearAll}
                    className="px-4 py-2 border-2 border-white/20 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    Clear All
                  </button>
                  <button 
                    onClick={detect}
                    disabled={busy}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {busy ? (
                      <>
                        <Loader className="w-4 h-4 inline mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 inline mr-2" />
                        Detect Oil Spills
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {previews.map((src, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                    <div className="relative">
                      <img src={src} alt="" className="w-full aspect-square object-cover" />
                      <button 
                        onClick={() => removeFile(i)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">{files[i]?.name ?? `image-${i+1}`}</p>
                      <p className="text-xs text-slate-400 mt-1">Ready for analysis</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Section */}
          {hasResults && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Detection Results</h3>
                  <p className="text-slate-300">Analysis complete - view segmentation masks and download results</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={downloadAll}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg"
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Download All
                  </button>
                  <button 
                    onClick={clearAll}
                    className="px-6 py-3 border-2 border-white/20 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    Start Over
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {results!.map((result, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
                    {/* Result Header */}
                    <div className={`p-6 ${
                      result.result === 'Oil Spill Detected' 
                        ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-b border-red-400/20' 
                        : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-b border-green-400/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {result.result === 'Oil Spill Detected' ? (
                            <AlertCircle className="w-8 h-8 text-red-400" />
                          ) : (
                            <CheckCircle2 className="w-8 h-8 text-green-400" />
                          )}
                          <div>
                            <h4 className="text-xl font-bold">{result.result}</h4>
                            <p className="text-slate-300">{files[i]?.name ?? `image-${i+1}.png`}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black mb-1">
                            {result.percentage.toFixed(2)}%
                          </div>
                          <p className="text-slate-400 text-sm">Coverage</p>
                        </div>
                      </div>
                    </div>

                    {/* Image Comparison */}
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Original Image */}
                      <div className="p-6">
                        <div className="relative">
                          <img 
                            src={previews[i]} 
                            alt="Original SAR image" 
                            className="w-full rounded-2xl border border-white/20"
                          />
                          <div className="absolute top-3 left-3 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30">
                            <span className="text-blue-300 text-xs font-medium">Original</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <FileImage className="w-5 h-5 text-slate-400" />
                          <span className="text-slate-300 text-sm">SAR Input Image</span>
                        </div>
                      </div>

                      {/* Segmentation Mask */}
                      <div className="p-6">
                        <div className="relative">
                          <img
                            src={`data:image/png;base64,${result.prediction_mask}`}
                            alt="Oil spill segmentation mask"
                            className="w-full rounded-2xl border border-white/20"
                          />
                          <div className="absolute top-3 left-3 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30">
                            <span className="text-purple-300 text-xs font-medium">Segmentation</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <Image className="w-5 h-5 text-slate-400" />
                          <span className="text-slate-300 text-sm">AI-Generated Mask</span>
                        </div>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="p-6 border-t border-white/10">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 rounded-2xl p-4">
                          <div className="text-2xl font-bold text-orange-400 mb-1">
                            {result.oil_spill_pixels.toLocaleString()}
                          </div>
                          <p className="text-slate-400 text-sm">Oil Spill Pixels</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4">
                          <div className="text-2xl font-bold text-blue-400 mb-1">
                            {result.percentage.toFixed(2)}%
                          </div>
                          <p className="text-slate-400 text-sm">Area Coverage</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-center">
                          <a
                            href={`data:image/png;base64,${result.prediction_mask}`}
                            download={`${(files[i]?.name || `image-${i+1}.png`).replace(/\.[^.]+$/, '')}-mask.png`}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 text-sm"
                          >
                            <Download className="w-4 h-4 inline mr-2" />
                            Download Mask
                          </a>
                        </div>
                      </div>
                    </div>

                    {result.error && (
                      <div className="p-4 bg-red-500/20 border-t border-red-400/20">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <span className="text-red-300 font-medium">Error:</span>
                          <span className="text-red-200">{result.error}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ModernDetectPage;