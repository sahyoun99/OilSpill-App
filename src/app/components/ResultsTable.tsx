export default function ResultsTable({ title }: { title: string }) {
const rows = [
{ model: 'Baseline U-Net', dice: 0.86, iou: 0.78, prec: 0.88, rec: 0.84 },
{ model: 'U-Net + Attention', dice: 0.89, iou: 0.81, prec: 0.90, rec: 0.87 },
]
return (
<div className="card">
<h3 className="text-lg font-semibold mb-4">{title}</h3>
<div className="overflow-x-auto">
<table className="w-full text-sm">
<thead>
<tr className="text-left text-zinc-500">
<th className="py-2">Model</th>
<th className="py-2">Dice</th>
<th className="py-2">IoU</th>
<th className="py-2">Precision</th>
<th className="py-2">Recall</th>
</tr>
</thead>
<tbody>
{rows.map((r) => (
<tr key={r.model} className="border-t border-zinc-200/60 dark:border-zinc-800">
<td className="py-2 font-medium">{r.model}</td>
<td className="py-2">{r.dice.toFixed(2)}</td>
<td className="py-2">{r.iou.toFixed(2)}</td>
<td className="py-2">{r.prec.toFixed(2)}</td>
<td className="py-2">{r.rec.toFixed(2)}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)
}