import Section from './components/Section'
import StatBar from './components/StatBar'
import VideoEmbed from './components/VideoEmbded'

export default function Home() {
  // shared background video
  const bgVideo = "/4911815-uhd_4096_2160_24fps.mp4"
  const bgPoster = "/media/oilspill-poster.jpg"

  return (
    <div className="snap-y">
      {/* Problem */}
      <Section
        id="problem"
        title="Oil spills endanger coasts, wildlife, and economies"
        kicker="Problem"
        cta={{ href: '/problem', label: 'Explore the Problem' }}
        media={<VideoEmbed src="/media/oilspill.mp4" title="Illustrative SAR scene with overlay" />}
        bgVideo={bgVideo}
        bgPoster={bgPoster}
      >
        <p>
          Oil spills pose a critical environmental and economic challenge, especially for the UAE and Gulf region.
          They damage fragile marine ecosystems, harm wildlife, and disrupt coastal economies.
        </p>
        <ul className="mt-4 space-y-3">
          <li className="flex gap-3">
            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>Increased reliance on oil</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>1 gallon of oil contaminates <strong>210M gallons</strong> of water</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>Oil leaks kill over <strong>500,000 sea animals</strong> yearly</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>Oil spills are <strong>expensive to clean</strong></span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>
              Example:{' '}
              <a
                href="https://en.wikipedia.org/wiki/Deepwater_Horizon_oil_spill"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--accent)]"
              >
                BP Deepwater Horizon oil spill
              </a>
            </span>
          </li>
        </ul>
        <StatBar />
      </Section>

      {/* Objective */}
      <Section
        id="objective"
        title="Objectives"
        kicker="Objective"
        cta={{ href: '/objective', label: 'Read the Objectives' }}
        bgVideo={bgVideo}
        bgPoster={bgPoster}
      >
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="mt-[6px] h-2.5 w-2.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>Investigate two oil detection approaches: <strong>single-stage</strong> and <strong>double-stage</strong>.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-[6px] h-2.5 w-2.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>Present a <strong>custom DAENet</strong> approach that improves oil-spill detection.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-[6px] h-2.5 w-2.5 rounded-full bg-[var(--accent)] shrink-0" />
            <span>Develop a <strong>web-based deep learning platform</strong> to accurately detect & segment oil spills in SAR images.</span>
          </li>
        </ul>
      </Section>

      {/* About */}
      <Section
        id="about"
        title="Research team & collaborators"
        kicker="About"
        cta={{ href: '/about', label: 'Meet the Team' }}
        bgVideo={bgVideo}
        bgPoster={bgPoster}
      >
        <p>Short bios, affiliations, and contact info for the researchers behind the project.</p>
      </Section>

      {/* Approaches */}
      <Section
        id="approaches"
        title="Approaches: Single-Stage vs Double-Stage"
        kicker="Methods"
        cta={{ href: '/approaches', label: 'See Approaches' }}
        bgVideo={bgVideo}
        bgPoster={bgPoster}
      >
        <p>
          We compare two pipelines: a one-step segmentation approach and a two-step pipeline with classification
          followed by segmentation. We evaluate multiple architectures (DAENet, DeepLabV3+, U-Net, FCN) and backbones.
        </p>
      </Section>

      {/* Results */}
      <Section
        id="results"
        title="Results & evaluation"
        kicker="Experiments"
        cta={{ href: '/results/approach-1', label: 'View Results' }}
        bgVideo={bgVideo}
        bgPoster={bgPoster}
      >
        <p>
          Detailed performance across architectures: Dice, IoU, precision/recall, and confusion matrices. Includes
          leaderboards and bar charts for both single-stage and double-stage experiments.
        </p>
      </Section>

      {/* Future */}
      <Section
        id="future"
        title="Future work: multisensor fusion & on-device inference"
        kicker="Roadmap"
        cta={{ href: '/future-work', label: 'Future Work' }}
        bgVideo={bgVideo}
        bgPoster={bgPoster}
      >
        <p>
          Planned improvements: SAR + optical fusion, uncertainty estimation, model compression for edge deployment,
          and robust geopositioned outputs.
        </p>
      </Section>
    </div>
  )
}
