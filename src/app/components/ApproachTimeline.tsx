export default function ApproachTimeline() {
const steps = [
{ title: 'Baseline U-Net', desc: 'Binary cross-entropy + Dice, 256×256 inputs.' },
{ title: 'Attention Blocks', desc: 'Channel & spatial attention added to decoder.' },
{ title: 'Post-processing', desc: 'Threshold sweep (0.3–0.7), hole filling, small blob removal.' },
{ title: 'Metrics', desc: 'IoU, Dice, Precision/Recall, ROC/AUC on holdout scenes.' },
]
return (
<ol className="relative border-s border-zinc-200 dark:border-zinc-800">
{steps.map((s, i) => (
<li key={i} className="mb-10 ms-6">
<span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white text-xs dark:bg-white dark:text-zinc-900">{i+1}</span>
<h4 className="font-semibold">{s.title}</h4>
<p className="text-sm text-zinc-500">{s.desc}</p>
</li>
))}
</ol>
)
}