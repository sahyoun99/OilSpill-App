'use client'
import { motion } from 'framer-motion'

export default function VideoEmbed({ src, title }: { src: string; title?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl overflow-hidden shadow-xl border border-white/10 dark:border-zinc-800 bg-white/70 dark:bg-black/40 backdrop-blur-md"
    >
      {/* Video */}
      <div className="aspect-video relative">
        <video
          className="w-full h-full object-cover"
          src={src}
          muted
          loop
          autoPlay
          playsInline
        />
        {/* Overlay for readability & cinematic effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
      </div>

      {/* Title */}
      {title && (
        <div className="px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {title}
        </div>
      )}
    </motion.div>
  )
}
