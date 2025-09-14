'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const SECTIONS = ['problem','objective','about','approaches','results','future']

export default function Navbar() {
  const [active, setActive] = useState<string>('problem')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const els = SECTIONS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }, { threshold: 0.6 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur-lg border-b border-zinc-200 shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-lg">Oil Spill AI</Link>
        
        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          {SECTIONS.map(id => (
            <NavItem key={id} href={`/${id}`} label={label(id)} active={active === id} />
          ))}
          <Link href="/detect" className="ml-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium shadow hover:shadow-lg transition">
            Live Demo
          </Link>
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <button onClick={() => setOpen(true)} className="p-2 rounded-md hover:bg-zinc-100 transition">
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} z-50`}>
        <div className="flex justify-between items-center p-4 border-b border-zinc-200">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-zinc-100 rounded-md">
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {SECTIONS.map(id => (
            <NavItem key={id} href={`/${id}`} label={label(id)} active={active === id} onClick={() => setOpen(false)} />
          ))}
          <Link href="/detect" onClick={() => setOpen(false)} className="mt-4 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-center font-medium shadow hover:shadow-lg transition">
            Live Demo
          </Link>
        </nav>
      </div>
    </header>
  )
}

function label(id: string) {
  switch (id) {
    case 'problem': return 'Problem'
    case 'objective': return 'Objective'
    case 'about': return 'About'
    case 'approaches': return 'Approaches'
    case 'results': return 'Results'
    case 'future': return 'Future Work'
    default: return id
  }
}
function NavItem({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative group px-3 py-2 rounded-md text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
    >
      {label}
      <span
        className="absolute left-2 right-2 -bottom-[4px] h-[2px] rounded bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
      />
    </Link>
  )
}
