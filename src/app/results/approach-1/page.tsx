import Image from 'next/image'


export default function Page() {
return (
<div className="max-w-7xl mx-auto px-4 py-12 md:py-14">
<h1 className="text-4xl font-bold mb-2 heading-gradient">Results — Approach 1 (Single-stage)</h1>
<p className="text-zinc-600 dark:text-zinc-300 mb-8">Four architectures × backbones (49 total). We report Accuracy, F1, IoU-Oil, IoU-No-Oil, and IoU-Avg.</p>


<div className="card">
<Image src="/media/single-stage-results.png" width={1600} height={950} alt="Single-stage results bar chart across metrics" className="w-full h-auto rounded-lg" priority />
</div>


<div className="grid md:grid-cols-3 gap-6 mt-8">
<div className="md:col-span-2 card">
<Image src="/media/iou-avg-leaderboard.png" width={1800} height={900} alt="IoU-Avg leaderboard across all models" className="w-full h-auto rounded-lg" />
</div>
<div className="card">
<h3 className="font-semibold">Quick notes</h3>
<ul className="text-sm text-zinc-600 dark:text-zinc-300">
<li>Leaderboard is sorted by IoU-Avg.</li>
<li>Full per-backbone table will be added from CSV for sorting/search.</li>
<li>Download CSV button will appear once tabular data is provided.</li>
</ul>
</div>
</div>
</div>
)
}