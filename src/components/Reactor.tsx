import { useEffect, useState } from 'react'
import { playMechanicalStartupSound } from '@/lib/mechanicalSound'

export function Reactor() {
  const [booting, setBooting] = useState(false)

  useEffect(() => {
    if (!booting) return

    const timer = window.setTimeout(() => setBooting(false), 3200)
    return () => window.clearTimeout(timer)
  }, [booting])

  const activate = () => {
    setBooting(true)
    void playMechanicalStartupSound()
  }

  return (
    <button
      type="button"
      onPointerDown={activate}
      className="reactor-shell-button"
      aria-label="Start JARVIS reactor"
    >
      <div className={`reactor-shell ${booting ? 'booting' : ''}`} aria-hidden="true">
        <div className="reactor-bloom" />
        <div className="reactor-shockwave" />
        <div className="reactor-ring" />
        <div className="reactor-ring r2" />
        <div className="reactor-ring r3" />
        <div className="reactor-petals">
          {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
        </div>
        <div className="reactor-ring r4" />
        <div className="reactor-core" />
        <div className="reactor-core-hot" />
      </div>
    </button>
  )
}
