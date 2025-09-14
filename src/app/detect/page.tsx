// components/detect/DetectClient.tsx
'use client'

import { useMemo, useRef, useState } from 'react'

type Result = {
  filename?: string
  prediction_mask: string   // base64 (no prefix)
  percentage: number
  oil_spill_pixels: number
  result: 'Oil Spill Detected' | 'No Oil Spill Detected'
  error?: string
}

export default function DetectClient() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [results, setResults] = useState<Result[] | null>(null)
  const [busy, setBusy] = useState(false)

  const choose = () => inputRef.current?.click()

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...newFiles])
    const urls = await Promise.all(newFiles.map(fileToDataURL))
    setPreviews(prev => [...prev, ...urls])
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const newFiles = Array.from(e.dataTransfer.files || [])
    setFiles(prev => [...prev, ...newFiles])
    Promise.all(newFiles.map(fileToDataURL)).then(urls => setPreviews(prev => [...prev, ...urls]))
  }

  function clearAll() {
    setFiles([])
    setPreviews([])
    setResults(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function detect() {
    if (files.length === 0) return
    setBusy(true)
    setResults(null)
    const fd = new FormData()
    files.forEach(f => fd.append('images', f)) // IMPORTANT: name = 'images'
    const res = await fetch('/api/detect', { method: 'POST', body: fd })
    const data = await res.json()
    setResults(data.results || [])
    setBusy(false)
  }

  async function downloadAll() {
    const JSZip = (await import('jszip')).default
    const { saveAs } = await import('file-saver')
    const zip = new JSZip()

    results?.forEach((r, i) => {
      const base = files[i]?.name?.replace(/\.[^.]+$/, '') || `image-${i + 1}`
      const folder = zip.folder(base)!
      // original
      const originalBase64 = previews[i]?.split(',')[1] || ''
      folder.file(`${base}.png`, originalBase64, { base64: true })
      // mask
      folder.file(`${base}-mask.png`, r.prediction_mask, { base64: true })
      // summary
      folder.file('summary.json', JSON.stringify({
        filename: files[i]?.name ?? `${base}.png`,
        verdict: r.result,
        oil_spill_pixels: r.oil_spill_pixels,
        percentage: r.percentage,
        
      }, null, 2))
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, 'oil-spill-detections.zip')
  }

  const hasResults = Array.isArray(results) && results.length > 0

  return (
    <div>
      {/* Uploader */}
      {!hasResults && (
        <div
          className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <p className="text-sm text-zinc-600">Drag & drop SAR images here, or</p>
          <div className="mt-3">
            <button className="btn" onClick={choose}>Choose files</button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onPick}
            />
          </div>
          {files.length > 0 && (
            <p className="mt-3 text-xs text-zinc-500">{files.length} image(s) ready</p>
          )}
        </div>
      )}

      {/* Controls */}
      {!hasResults ? (
        files.length > 0 && (
          <div className="mt-4 flex gap-2 justify-end">
            <button className="btn-outline" onClick={clearAll}>Clear</button>
            <button className="btn" onClick={detect} disabled={busy}>
              {busy ? 'Detecting…' : 'Detect'}
            </button>
          </div>
        )
      ) : (
        <div className="mt-4 flex flex-wrap gap-2 justify-end">
          <button className="btn" onClick={downloadAll}>Download all</button>
          <button className="btn-outline" onClick={clearAll}>Start over</button>
        </div>
      )}

      {/* Queue thumbnails (only before detection) */}
      {!hasResults && previews.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {previews.map((src, i) => (
              <div key={i} className="card p-2">
                <img src={src} alt="" className="aspect-square object-cover rounded" />
                <div className="mt-2 text-xs text-zinc-500 truncate">{files[i]?.name ?? `image-${i+1}`}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results (side-by-side: original | mask) */}
      {hasResults && (
        <div className="mt-6 grid grid-cols-1 gap-6">
          {results!.map((r, i) => (
            <div key={i} className="card p-0 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Original */}
                <figure className="p-3">
                  <div className="relative w-full">
                    <img src={previews[i]} alt="original" className="w-full h-auto rounded-lg border border-zinc-200" />
                  </div>
                  <figcaption className="mt-2 text-xs text-zinc-500">
                    {files[i]?.name ?? `image-${i+1}.png`} — Original
                  </figcaption>
                </figure>

                {/* Mask */}
                <figure className="p-3">
                  <div className="relative w-full">
                    <img
                      src={`data:image/png;base64,${r.prediction_mask}`}
                      alt="mask"
                      className="w-full h-auto rounded-lg border border-zinc-200"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-zinc-500">
                    Segmentation mask
                  </figcaption>
                </figure>
              </div>

              {/* Stats + Download */}
              <div className="p-3 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm">
                  <span className="font-medium">{r.result}</span>{' '}
                  <span className="text-zinc-500">
                    · Oil pixels: {r.oil_spill_pixels.toLocaleString()} · Coverage: {r.percentage.toFixed(2)}%
                  </span>
                </div>
                <a
                  className="btn-outline"
                  href={`data:image/png;base64,${r.prediction_mask}`}
                  download={`${(files[i]?.name || `image-${i+1}.png`).replace(/\.[^.]+$/, '')}-mask.png`}
                >
                  Download mask
                </a>
              </div>

              {r.error && (
                <div className="p-3 text-sm text-red-600 border-t border-zinc-200">
                  {r.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => resolve(String(fr.result))
    fr.onerror = reject
    fr.readAsDataURL(file)
  })
}
