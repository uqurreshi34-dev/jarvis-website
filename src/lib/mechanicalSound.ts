let hasPlayed = false
let playing = false
let gestureArmed = false

type BrowserWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext
}

function noiseBurst(
  ctx: AudioContext,
  destination: AudioNode,
  start: number,
  duration: number,
  frequency: number,
  q: number,
  gainValue: number,
) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration))
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let index = 0; index < length; index += 1) {
    const decay = 1 - index / length
    data[index] = (Math.random() * 2 - 1) * decay
  }

  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()

  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(frequency, start)
  filter.Q.setValueAtTime(q, start)

  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(gainValue, start + Math.min(0.01, duration * 0.1))
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  source.buffer = buffer
  source.connect(filter)
  filter.connect(gain)
  gain.connect(destination)
  source.start(start)
  source.stop(start + duration)
}

function metallicClang(
  ctx: AudioContext,
  destination: AudioNode,
  start: number,
  frequency: number,
  strength = 0.12,
) {
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(strength, start + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.48)
  gain.connect(destination)

  const frequencies = [1, 1.51, 2.01, 2.73]
  frequencies.forEach((ratio, index) => {
    const oscillator = ctx.createOscillator()
    oscillator.type = index === 0 ? 'triangle' : 'sine'
    oscillator.frequency.setValueAtTime(frequency * ratio, start)
    oscillator.frequency.exponentialRampToValueAtTime(frequency * ratio * 0.92, start + 0.08)
    oscillator.connect(gain)
    oscillator.start(start)
    oscillator.stop(start + 0.5)
  })

  noiseBurst(ctx, destination, start, 0.18, frequency * 3.2, 5.5, strength * 0.7)
}

function gearEngagement(
  ctx: AudioContext,
  destination: AudioNode,
  start: number,
  frequency: number,
) {
  const click = ctx.createOscillator()
  const clickGain = ctx.createGain()

  click.type = 'square'
  click.frequency.setValueAtTime(frequency, start)
  click.frequency.exponentialRampToValueAtTime(frequency * 0.46, start + 0.06)
  clickGain.gain.setValueAtTime(0.0001, start)
  clickGain.gain.exponentialRampToValueAtTime(0.11, start + 0.003)
  clickGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.09)

  click.connect(clickGain)
  clickGain.connect(destination)
  click.start(start)
  click.stop(start + 0.105)

  noiseBurst(ctx, destination, start, 0.11, frequency * 2.4, 8, 0.09)
}

function armForGesture() {
  if (gestureArmed || hasPlayed) return

  gestureArmed = true

  const retry = () => {
    void playMechanicalStartupSound().then((started) => {
      if (started) {
        window.removeEventListener('pointerdown', retry)
        window.removeEventListener('keydown', retry)
        gestureArmed = false
      }
    })
  }

  window.addEventListener('pointerdown', retry)
  window.addEventListener('keydown', retry)
}

export async function playMechanicalStartupSound(): Promise<boolean> {
  if (hasPlayed || playing) return hasPlayed

  const AudioContextCtor = window.AudioContext || (window as BrowserWindow).webkitAudioContext
  if (!AudioContextCtor) return false

  playing = true
  let ctx: AudioContext | null = null

  try {
    ctx = new AudioContextCtor()
    await ctx.resume()

    if (ctx.state !== 'running') {
      armForGesture()
      return false
    }

    const now = ctx.currentTime
    const master = ctx.createGain()
    const compressor = ctx.createDynamicsCompressor()

    master.gain.setValueAtTime(0.0001, now)
    master.gain.exponentialRampToValueAtTime(0.28, now + 0.08)
    master.gain.setValueAtTime(0.28, now + 2.65)
    master.gain.exponentialRampToValueAtTime(0.0001, now + 3.55)

    compressor.threshold.setValueAtTime(-18, now)
    compressor.knee.setValueAtTime(10, now)
    compressor.ratio.setValueAtTime(7, now)
    compressor.attack.setValueAtTime(0.003, now)
    compressor.release.setValueAtTime(0.12, now)

    master.connect(compressor)
    compressor.connect(ctx.destination)

    // 1. Mechanical wake-up: motor/actuator winds up under load.
    const motor = ctx.createOscillator()
    const motorGain = ctx.createGain()
    motor.type = 'sawtooth'
    motor.frequency.setValueAtTime(42, now)
    motor.frequency.exponentialRampToValueAtTime(104, now + 1.15)
    motor.frequency.exponentialRampToValueAtTime(72, now + 2.5)
    motorGain.gain.setValueAtTime(0.0001, now)
    motorGain.gain.exponentialRampToValueAtTime(0.07, now + 0.12)
    motorGain.gain.setValueAtTime(0.07, now + 1.25)
    motorGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.12)
    motor.connect(motorGain)
    motorGain.connect(master)
    motor.start(now)
    motor.stop(now + 3.18)

    // 2. Gear teeth engaging — three deliberate mechanical steps.
    gearEngagement(ctx, master, now + 0.18, 980)
    gearEngagement(ctx, master, now + 0.52, 780)
    gearEngagement(ctx, master, now + 0.87, 640)

    // 3. Heavy metal chassis locks.
    metallicClang(ctx, master, now + 1.18, 310, 0.14)
    metallicClang(ctx, master, now + 1.47, 420, 0.12)
    metallicClang(ctx, master, now + 1.75, 535, 0.10)

    // 4. A contained sci-fi energy spool begins.
    const sweep = ctx.createOscillator()
    const sweepGain = ctx.createGain()
    sweep.type = 'triangle'
    sweep.frequency.setValueAtTime(150, now + 1.3)
    sweep.frequency.exponentialRampToValueAtTime(1650, now + 2.66)
    sweepGain.gain.setValueAtTime(0.0001, now + 1.3)
    sweepGain.gain.exponentialRampToValueAtTime(0.045, now + 1.65)
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.82)
    sweep.connect(sweepGain)
    sweepGain.connect(master)
    sweep.start(now + 1.3)
    sweep.stop(now + 2.9)

    const resonance = ctx.createOscillator()
    const resonanceGain = ctx.createGain()
    resonance.type = 'sine'
    resonance.frequency.setValueAtTime(84, now + 1.35)
    resonance.frequency.linearRampToValueAtTime(174, now + 2.72)
    resonanceGain.gain.setValueAtTime(0.0001, now + 1.35)
    resonanceGain.gain.exponentialRampToValueAtTime(0.05, now + 1.85)
    resonanceGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2)
    resonance.connect(resonanceGain)
    resonanceGain.connect(master)
    resonance.start(now + 1.35)
    resonance.stop(now + 3.22)

    // 5. Arc-reactor ignition: low impact + bright electrical snap + hot core ring.
    const sub = ctx.createOscillator()
    const subGain = ctx.createGain()
    sub.type = 'sine'
    sub.frequency.setValueAtTime(58, now + 2.52)
    sub.frequency.exponentialRampToValueAtTime(29, now + 3.18)
    subGain.gain.setValueAtTime(0.0001, now + 2.52)
    subGain.gain.exponentialRampToValueAtTime(0.17, now + 2.55)
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.25)
    sub.connect(subGain)
    subGain.connect(master)
    sub.start(now + 2.52)
    sub.stop(now + 3.28)

    const ignition = ctx.createOscillator()
    const ignitionGain = ctx.createGain()
    ignition.type = 'sine'
    ignition.frequency.setValueAtTime(260, now + 2.55)
    ignition.frequency.exponentialRampToValueAtTime(2700, now + 2.82)
    ignitionGain.gain.setValueAtTime(0.0001, now + 2.55)
    ignitionGain.gain.exponentialRampToValueAtTime(0.2, now + 2.59)
    ignitionGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.28)
    ignition.connect(ignitionGain)
    ignitionGain.connect(master)
    ignition.start(now + 2.55)
    ignition.stop(now + 3.32)

    noiseBurst(ctx, master, now + 2.56, 0.16, 4800, 4, 0.16)
    noiseBurst(ctx, master, now + 2.62, 0.26, 760, 2.1, 0.1)

    hasPlayed = true
    window.setTimeout(() => void ctx?.close(), 4_000)
    return true
  } catch {
    await ctx?.close().catch(() => undefined)
    armForGesture()
    return false
  } finally {
    playing = false
  }
}
