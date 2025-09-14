import Image from 'next/image'
import Link from 'next/link'

const FACTS = [
  'Increased reliance on oil',
  '1 gallon of oil contaminates 210M gallons of water',
  'Oil leaks kill over 500,000 sea animals yearly',
  'Oil spills are expensive to clean',
]

const GALLERY: { src: string; alt: string; caption: string }[] = [
  { src: '/media/bp-horizon.jpg', alt: 'BP Deepwater Horizon oil spill', caption: 'BP Deepwater Horizon (example)' },
  { src: '/media/uae-spill-1.jpg', alt: 'Recent oil spill along the UAE coast', caption: 'Recent spill — UAE coast' },
  { src: '/media/uae-spill-2.jpg', alt: 'Cleanup operations after UAE oil spill', caption: 'Cleanup operations — UAE' },
]

export default function ProblemPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">The Problem</h1>
      <p className="text-zinc-600 dark:text-zinc-300 max-w-3xl">
        Oil spills pose a critical environmental and economic challenge, especially for the UAE and surrounding Gulf
        regions. Spills damage fragile marine ecosystems, harm wildlife, and disrupt coastal economies.
      </p>

      {/* Facts + hero media */}
      <div className="grid md:grid-cols-2 gap-6 mt-8 items-start">
        {/* Facts */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-3">Key facts</h2>
          <ul className="space-y-3">
            {FACTS.map((f, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[9px] h-2 w-2 rounded-full bg-[var(--accent)] shrink-0" />
                <span className="text-sm md:text-base">{f}</span>
              </li>
            ))}
            <li className="flex gap-3">
              <span className="mt-[9px] h-2 w-2 rounded-full bg-[var(--accent)] shrink-0" />
              <span className="text-sm md:text-base">
                Example:{' '}
                <Link
                  href="https://en.wikipedia.org/wiki/Deepwater_Horizon_oil_spill"
                  className="underline text-[var(--accent)]"
                >
                  BP Deepwater Horizon oil spill
                </Link>
              </span>
            </li>
          </ul>
        </div>

        {/* Hero video */}
        <div className="card p-0 overflow-hidden">
          <video className="w-full h-auto" autoPlay loop muted playsInline poster="/media/oilspill-poster.jpg">
            <source src="/media/oilspill.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Gallery */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Notable incidents</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GALLERY.map((g, i) => (
          <figure key={i} className="card p-0 overflow-hidden">
            <div className="relative w-full aspect-[16/10]">
              <Image src={g.src} alt={g.alt} fill className="object-cover" />
            </div>
            <figcaption className="p-3 text-sm text-zinc-500">{g.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/detect" className="btn">Try the live demo</Link>
      </div>
    </div>
  )
}
