// app/layout.tsx (or app/_layout.tsx depending on your structure)
import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Navbar from './components/Navbar'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Oil Spill AI — SAR Segmentation',
  description: 'Detect and segment oil spills in SAR imagery. Research site and live demo.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="min-h-screen">
        <Navbar /> {/* ✅ Now this uses your updated Navbar.tsx */}
        <main className="pt-16">{children}</main>
        <footer className="border-t border-zinc-200/60 dark:border-zinc-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-zinc-500">
            © {new Date().getFullYear()} Oil Spill AI. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
