export default function ObjectivePage() {
  const items = [
    {
      title: 'Compare Two Approaches',
      desc: 'Investigate single-stage (direct segmentation) vs. double-stage (classification → segmentation) pipelines.'
    },
    {
      title: 'Custom DAENet',
      desc: 'Design and evaluate a custom-made DAENet variant aimed at improving oil-spill detection quality.'
    },
    {
      title: 'Web-based Platform',
      desc: 'Deliver a production-ready, web-based DL system to detect & segment oil spills in SAR imagery.'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">Objectives</h1>
      <p className="text-zinc-600 max-w-3xl">
        Our work targets rigorously evaluated modeling and a usable platform for real-world response.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {items.map((it) => (
          <div key={it.title} className="card">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              <div>
                <h3 className="font-semibold">{it.title}</h3>
                <p className="text-sm text-zinc-500">{it.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-3">
        <a href="/approaches" className="btn">See Approaches</a>
        <a href="/results/approach-1" className="btn-outline">View Results</a>
      </div>
    </div>
  )
}