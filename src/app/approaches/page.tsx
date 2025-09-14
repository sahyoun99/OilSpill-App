// app/approaches/page.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const sections = [
  {
    title: 'Single-Stage: Semantic Segmentation',
    desc: (
      <ul className="list-disc list-inside space-y-1">
        <li>Direct pixel-wise segmentation from SAR input.</li>
        <li>Architectures: <strong>DAENet</strong>, DeepLabV3+, U-Net, FCN.</li>
        <li>Backbones: 16 each (except FCN has 1) → <strong>49 models</strong>.</li>
      </ul>
    ),
    src: '/single-stage.png',
    alt: 'Single-stage pipeline',
    tag: 'Pipeline',
  },
  {
    title: 'Double-Stage: Classification → Segmentation',
    desc: (
      <ul className="list-disc list-inside space-y-1">
        <li>Phase 1: classify tile as oil / no-oil.</li>
        <li>Phase 2: run segmentation only on predicted oil tiles.</li>
        <li>Reduces false positives, improves efficiency.</li>
      </ul>
    ),
    src: '/double-stage.png',
    alt: 'Double-stage pipeline',
    tag: 'Pipeline',
  },
  {
    title: 'Segmentation Metrics',
    desc: (
      <p>
        Accuracy, F1 score, IoU (oil / no-oil), and mean IoU (mIoU). These measure how well pixel predictions align
        with ground truth.
      </p>
    ),
    src: '/segmentation-metrics-defs.png',
    alt: 'Segmentation metrics',
    tag: 'Evaluation',
  },
  {
    title: 'Classification Metrics',
    desc: (
      <p>
        Accuracy, Specificity, and Sensitivity define the classification stage reliability before segmentation.
      </p>
    ),
    src: '/classification-metrics-defs.png',
    alt: 'Classification metrics',
    tag: 'Evaluation',
  },
]

export default function ApproachesPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-[var(--accent)]/10 to-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold heading-gradient">Approaches</h1>
          <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto">
            Exploring single-stage segmentation vs. double-stage classification + segmentation, with rigorous metrics.
          </p>
        </motion.div>
      </section>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-24">
        {sections.map((s, i) => (
          <motion.section
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className={`grid md:grid-cols-2 gap-10 items-center ${
              i % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <div className="relative w-full">
              <Image
                src={s.src}
                alt={s.alt}
                width={1000}
                height={700}
                className="rounded-xl shadow-lg w-full h-auto object-contain"
              />
              <span className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs px-2 py-1 rounded-full shadow">
                {s.tag}
              </span>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">{s.title}</h2>
              <div className="text-zinc-600 leading-relaxed space-y-2">{s.desc}</div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}
