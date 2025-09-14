import { FiActivity, FiCheckCircle, FiMapPin, FiDatabase } from 'react-icons/fi'

export default function StatBar() {
  const stats = [
    { label: 'Avg. mask IoU', value: '0.82', icon: FiActivity },
    { label: 'Dice score', value: '0.88', icon: FiCheckCircle },
    { label: 'Scenes analyzed', value: '1,240+', icon: FiDatabase },
    { label: 'UAE focus regions', value: 'Gulf Coast', icon: FiMapPin },
  ]
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="rounded-xl bg-white/70 dark:bg-black/40 backdrop-blur-md p-4 shadow-md flex flex-col items-center">
          <s.icon className="text-[var(--accent)] mb-2" size={22} />
          <div className="text-xl font-bold">{s.value}</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
