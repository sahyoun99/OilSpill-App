import Image from 'next/image'


const CM = { tp: 60, tn: 72, fp: 5, fn: 2 } // EffNet-B4 confusion matrix


const CLASS_MODELS: { family: string; total: number }[] = [
{ family: 'ConvNeXt', total: 1 },
{ family: 'DenseNet (121, 201)', total: 2 },
{ family: 'EfficientNet (B0, B1, B2, B3, B4, B5, V2L)', total: 7 },
{ family: 'Long Short-Term Memory', total: 1 },
{ family: 'MLP-Mixer', total: 1 },
{ family: 'ResNet (50, 101)', total: 2 },
{ family: 'VGG (16, 19)', total: 2 },
{ family: 'MobileNet (V2, V4)', total: 2 },
{ family: 'ResNeXt (101)', total: 1 },
]

function pct(x: number) { return (x * 100).toFixed(2) + '%' }

export default function Page() {

    const total = CM.tp + CM.tn + CM.fp + CM.fn
    const accuracy = (CM.tp + CM.tn) / total
    const specificity = CM.tn / (CM.tn + CM.fp)
    const sensitivity = CM.tp / (CM.tp + CM.fn)
    const precision = CM.tp / (CM.tp + CM.fp)
    const f1 = (2 * precision * sensitivity) / (precision + sensitivity)
    const modelTotal = CLASS_MODELS.reduce((s, r) => s + r.total, 0)
return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-14">
      <h1 className="text-4xl font-bold mb-2">Results — Approach 2 (Double Stage)</h1>
      <p className="text-zinc-500 mb-6">Stage‑1 classification → Stage‑2 segmentation.</p>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* LEFT: Real data table */}
        <div className="card">
          <h3 className="font-semibold mb-3">Classification Models (by family)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-300">
                  <th className="text-left p-2">Classification Models</th>
                  <th className="text-right p-2 w-24">Total</th>
                </tr>
              </thead>
              <tbody>
                {CLASS_MODELS.map((r) => (
                  <tr key={r.family} className="border-t border-zinc-200/70 dark:border-zinc-800">
                    <td className="p-2">{r.family}</td>
                    <td className="p-2 text-right font-medium">{r.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-zinc-300/70 dark:border-zinc-700 font-semibold">
                  <td className="p-2 text-right">Total</td>
                  <td className="p-2 text-right">{modelTotal}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* RIGHT: Metrics from confusion matrix */}
        <div className="card">
          <h3 className="font-semibold mb-3">Classification Metrics (computed from CM)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Metric label="Accuracy" value={pct(accuracy)} />
            <Metric label="Precision" value={pct(precision)} />
            <Metric label="F1‑score" value={pct(f1)} />
            <Metric label="Sensitivity (TPR)" value={pct(sensitivity)} />
            <Metric label="Specificity (TNR)" value={pct(specificity)} />
            <Metric label="Samples" value={String(total)} />
          </div>
        </div>
      </div>

      {/* Optional visual: the actual confusion matrix image below */}
      <div className="mt-8 card">
        <h3 className="font-semibold mb-3">Best Classifier Confusion Matrix (EfficientNet‑B4)</h3>
        <div className="relative w-full aspect-[16/10]">
          <Image src="/media/ds-classification-models-table.png" alt="Classification models list and confusion matrix" fill className="object-contain rounded-md" />
        </div>
        <p className="text-xs text-zinc-500 mt-2">TP={CM.tp} · TN={CM.tn} · FP={CM.fp} · FN={CM.fn}</p>
      </div>

      <div className="mt-8 card">
        <h3 className="font-semibold mb-3">Double‑Stage Segmentation Scores</h3>
        <div className="relative w-full aspect-[16/9]">
          <Image src="/double-stage-results-bars.png" alt="Double-stage bar chart scores" fill className="object-contain rounded-md" />
        </div>
      </div>
    </div>
  )
}
    


function Metric({ label, value }: { label: string; value: string }) {
return (
<div className="rounded-lg border border-zinc-200/70 dark:border-zinc-800 p-3">
<div className="text-xs text-zinc-500">{label}</div>
<div className="text-lg font-semibold">{value}</div>
</div>
)
}