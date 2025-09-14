export default function FutureWorkPage() {
return (
<div className="max-w-6xl mx-auto px-4 py-20">
<h1 className="text-4xl md:text-5xl font-bold mb-8">Future Work</h1>
<div className="prose prose-zinc dark:prose-invert max-w-none">
<p>
Our roadmap for advancing oil spill detection includes:
</p>
<ul>
<li>Integration of multi-sensor data (SAR + optical imagery).</li>
<li>Deployment-ready lightweight models for edge devices.</li>
<li>Uncertainty estimation to improve trust in predictions.</li>
<li>Collaboration with UAE agencies for real-world deployment.</li>
</ul>
</div>
<div className="mt-10 grid md:grid-cols-3 gap-6">
<div className="card">Satellite fusion mockup</div>
<div className="card">On-device inference mockup</div>
<div className="card">Collaboration with UAE mockup</div>
</div>
</div>
)
}