import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export type Tab = 'home' | 'features' | 'other' | 'about' | 'status'

type Props = { active: Tab; onSelect: (tab: Tab) => void }

const links: Array<{ id: Tab; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'other', label: 'Other Features' },
  { id: 'about', label: 'About' },
  { id: 'status', label: 'Status' },
]

export function Nav({ active, onSelect }: Props) {
  const [open, setOpen] = useState(false)

  const select = (tab: Tab) => {
    onSelect(tab)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sky-400/10 bg-[#020812]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => select('home')} className="flex items-center gap-3 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-300/30 bg-sky-400/10 text-sky-300 shadow-[0_0_28px_rgba(0,174,255,.18)]">J</span>
          <span>
            <span className="block text-sm font-bold tracking-[.18em] text-white">JARVIS</span>
            <span className="block text-[9px] font-semibold tracking-[.26em] text-sky-400">AI • HOME • LIFE</span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <button key={link.id} onClick={() => select(link.id)} className={`text-sm transition ${active === link.id ? 'text-sky-300' : 'text-slate-400 hover:text-white'}`}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button onClick={() => select('about')} className="rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-400/20">Get Started</button>
        </div>

        <button aria-label="Toggle menu" className="rounded-lg p-2 text-slate-200 md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-sky-400/10 bg-[#03101c] px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <button key={link.id} onClick={() => select(link.id)} className={`rounded-lg px-3 py-3 text-left text-sm ${active === link.id ? 'bg-sky-400/10 text-sky-300' : 'text-slate-300'}`}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
