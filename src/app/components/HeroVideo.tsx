'use client'
export default function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        className="w-full h-full object-cover scale-105"
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white/20 dark:from-black/70 dark:to-black/40" />
    </div>
  )
}
