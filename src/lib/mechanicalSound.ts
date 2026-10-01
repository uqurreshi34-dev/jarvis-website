const STARTUP_AUDIO_URL =
  'https://raw.githubusercontent.com/abdulbasit-25/Jarvis-using-HTML-CSS-and-JS/main/V2/assets/audio/jarvis-147563.mp3'

const startupAudio = new Audio(STARTUP_AUDIO_URL)
startupAudio.preload = 'auto'
startupAudio.volume = 0.95
void startupAudio.load()

let hasPlayed = false

export function playMechanicalStartupSound(): Promise<boolean> {
  if (hasPlayed) return Promise.resolve(true)

  startupAudio.currentTime = 0

  return startupAudio.play()
    .then(() => {
      hasPlayed = true
      return true
    })
    .catch(() => false)
}
