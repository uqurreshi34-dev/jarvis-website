import { useEffect, useState } from 'react'

export function Reactor() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 3200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className={`reactor-shell ${booting ? 'booting' : ''}`} aria-label="Glowing JARVIS arc reactor display" role="img">
      <div className="reactor-bloom" aria-hidden="true" />
      <div className="reactor-shockwave" aria-hidden="true" />
      <div className="reactor-ring" />
      <div className="reactor-ring r2" />
      <div className="reactor-ring r3" />
      <div className="reactor-petals" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
      </div>
      <div className="reactor-ring r4" />
      <div className="reactor-core" />
      <div className="reactor-core-hot" aria-hidden="true" />
    </div>
  )
}
