const STARTUP_AUDIO_URL =
  'https://raw.githubusercontent.com/lavenderdotpet/CC0-Public-Domain-Sounds/f2b6264f9ab89fabc266914c3654685d68c5a39b/sci-fi-sounds/Audio/engineCircular_000.ogg'

let hasPlayed = false
let startupPromise: Promise<boolean> | null = null

function createStartupAudio() {
  const audio = new Audio(STARTUP_AUDIO_URL)
  audio.preload = 'auto'
  audio.volume = 0.9
  return audio
}

export function playMechanicalStartupSound(): Promise<boolean> {
  if (hasPlayed) return Promise.resolve(true)
  if (startupPromise) return startupPromise

  startupPromise = new Promise<boolean>((resolve) => {
    const audio = createStartupAudio()

    let settled = false

    const cleanup = () => {
      window.removeEventListener('pointerdown', retry)
      window.removeEventListener('keydown', retry)
      audio.removeEventListener('error', fail)
    }

    const finish = (started: boolean) => {
      if (settled) return
      settled = true
      cleanup()
      if (started) hasPlayed = true
      resolve(started)
    }

    const fail = () => {
      // Keep the gesture listeners alive. Browsers can reject the first
      // autoplay attempt even though the same audio is valid after a tap.
    }

    const retry = () => {
      void audio.play()
        .then(() => finish(true))
        .catch(() => undefined)
    }

    audio.addEventListener('error', fail)
    window.addEventListener('pointerdown', retry)
    window.addEventListener('keydown', retry)

    retry()
  })

  return startupPromise
}
