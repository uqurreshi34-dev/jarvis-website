export function Reactor() {
  return (
    <div className="reactor-shell" aria-label="Glowing JARVIS arc reactor display" role="img">
      <div className="reactor-ring" />
      <div className="reactor-ring r2" />
      <div className="reactor-ring r3" />
      <div className="reactor-petals" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
      </div>
      <div className="reactor-ring r4" />
      <div className="reactor-core" />
    </div>
  )
}
