let hasPlayed = false
let playing = false

type BrowserWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext
}

export async function playMechanicalStartupSound() {
  if (hasPlayed || playing) return

  const AudioContextCtor = window.AudioContext || (window as BrowserWindow).webkitAudioContext
  if (!AudioContextCtor) return

  playing = true
  let ctx: AudioContext | null = null

  try {
    ctx = new AudioContextCtor()
    await ctx.resume()

    const now = ctx.currentTime
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, now)
    master.gain.exponentialRampToValueAtTime(0.22, now + 0.035)
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.78)
    master.connect(ctx.destination)

    const motor = ctx.createOscillator()
    motor.type = 'sawtooth'
    motor.frequency.setValueAtTime(165, now)
    motor.frequency.exponentialRampToValueAtTime(58, now + 0.33)
    motor.connect(master)
    motor.start(now)
    motor.stop(now + 0.38)

    const click = ctx.createOscillator()
    const clickGain = ctx.createGain()
    click.type = 'square'
    click.frequency.setValueAtTime(900, now + 0.09)
    click.frequency.exponentialRampToValueAtTime(380, now + 0.2)
    clickGain.gain.setValueAtTime(0.0001, now + 0.09)
    clickGain.gain.exponentialRampToValueAtTime(0.11, now + 0.095)
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.23)
    click.connect(clickGain)
    clickGain.connect(ctx.destination)
    click.start(now + 0.09)
    click.stop(now + 0.25)

    const hum = ctx.createOscillator()
    const humGain = ctx.createGain()
    hum.type = 'sine'
    hum.frequency.setValueAtTime(78, now + 0.2)
    hum.frequency.linearRampToValueAtTime(122, now + 0.46)
    humGain.gain.setValueAtTime(0.0001, now + 0.2)
    humGain.gain.exponentialRampToValueAtTime(0.075, now + 0.3)
    humGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.76)
    hum.connect(humGain)
    humGain.connect(ctx.destination)
    hum.start(now + 0.2)
    hum.stop(now + 0.77)

    hasPlayed = true
    window.setTimeout(() => void ctx?.close(), 1100)
  } catch {
    await ctx?.close().catch(() => undefined)
  } finally {
    playing = false
  }
}
