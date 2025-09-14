'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

export default function Section({
  id, title, kicker, children, cta, media, bgVideo, bgPoster
}: {
  id: string
  title: string
  kicker?: string
  children?: React.ReactNode
  cta?: { href: string; label: string }
  media?: React.ReactNode
  bgVideo?: string   // 👈 simplified: just pass the src
  bgPoster?: string  // 👈 poster for that video
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.15, 1, 1, 0.15])
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id={id} className="relative h-[100dvh] snap-start flex items-center justify-center overflow-hidden">
      
      {/* Background Video */}
      {bgVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10"
          autoPlay
          loop
          muted
          playsInline
          poster={bgPoster}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      )}
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent -z-10" />

      <motion.div
        ref={ref}
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-md bg-white/70 dark:bg-black/40 rounded-2xl p-6 shadow-xl"
        >
          {kicker && <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-2">{kicker}</p>}
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">{title}</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>
          {cta && (
            <div className="mt-6">
              <Link href={cta.href} className="btn">{cta.label}</Link>
            </div>
          )}
        </motion.div>

        {media && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ y }}
            className="hidden md:block"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-zinc-800">
              {media}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
