import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, CheckCircle2, ExternalLink, Github, Wifi } from 'lucide-react'
import { Nav, type Tab } from '@/components/Nav'
import { Reactor } from '@/components/Reactor'
import { FeatureCard } from '@/components/FeatureCard'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import type { Feature } from '@/types'

const coreFeatures: Feature[] = [
  { title: 'Smart Home Integration', summary: 'Control lights, temperatures, sensors and more while JARVIS keeps an eye on your environment.', detail: 'JARVIS connects home-facing devices into one conversational layer. The room sensor already reports temperature, humidity and motion directly into the desktop assistant.', icon: 'home', accent: 'cyan' },
  { title: 'Memory & Knowledge', summary: 'Remember important details, answer questions and learn from your own information.', detail: 'Connected memory handles subjects, relationships, notes and local knowledge so JARVIS can answer from what he actually knows rather than guessing.', icon: 'brain', accent: 'cyan' },
  { title: 'Blender Integration', summary: 'Inspect and modify live 3D scenes, generate models and bring ideas to life.', detail: 'JARVIS can inspect a live Blender scene, reason about objects and make natural-language modifications while protecting against unsafe or invented object operations.', icon: 'blender', accent: 'cyan' },
  { title: 'Voice & Conversation', summary: 'Natural, fast conversations with cloud transcription and speech that starts sooner.', detail: 'JARVIS uses a voice pipeline designed around low-latency interaction, including early speech output so a longer answer does not need to finish rendering before the first sentence starts.', icon: 'mic', accent: 'cyan' },
  { title: 'Camera & Vision', summary: 'ESP32-CAM support for live snapshots, visual inspection and camera-aware responses.', detail: 'A connected ESP32-CAM can capture an image on request and send the view back into JARVIS for visual understanding.', icon: 'camera', accent: 'cyan' },
  { title: 'Sensor History', summary: 'Track temperature, humidity, motion and more — then turn that history into useful insight.', detail: 'Sensor readings are retained so JARVIS can describe recent trends, show charts, identify gaps and answer past-tense room questions without pretending a missing reading existed.', icon: 'history', accent: 'cyan' },
]

const otherFeatures: Feature[] = [
  { title: 'TradingView Integration', summary: 'Pull market data and technical analysis directly into the JARVIS experience.', detail: 'The TradingView MCP provides read-only market analysis including price data, technical indicators and screener capabilities.', icon: 'trading', accent: 'cyan' },
  { title: 'Room Intelligence', summary: 'Understand your environment, spot changes and get proactive room-aware responses.', detail: 'JARVIS can use current sensor context when answering general questions and can describe how the room behaved over a longer period.', icon: 'room', accent: 'cyan' },
  { title: 'Status & Diagnostics', summary: 'Check services, connected boards, response speed, history and model usage.', detail: 'The status report aggregates connected-service health, sensor boards, daily sensor records, response timing and recent model/cache usage.', icon: 'status', accent: 'cyan' },
  { title: 'Protocols', summary: 'Talk, run commands and pause when needed for repeatable demos or workflows.', detail: 'Protocols can coordinate speech, commands and pauses so a sequence can run predictably rather than relying on ad-hoc manual steps.', icon: 'protocol', accent: 'cyan' },
  { title: 'Self-Healing Connectivity', summary: 'Sensors and camera boards can recover when JARVIS disappears or a connection stalls.', detail: 'Recent networking work makes stalled TLS handshakes and reconnect conditions less disruptive, allowing connected boards to recover without manual intervention.', icon: 'recover', accent: 'cyan' },
  { title: 'File & Desktop Tools', summary: 'Work across files, applications, notes and connected services from one command layer.', detail: 'JARVIS can route requests through native desktop actions, connected MCP services and safe file workflows without turning every request into a generic LLM call.', icon: 'files', accent: 'cyan' },
]

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[.28em] text-sky-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-400">{copy}</p>
    </div>
  )
}

function FeatureGrid({ features, onOpen }: { features: Feature[]; onOpen: (feature: Feature) => void }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {features.map((feature) => <FeatureCard key={feature.title} feature={feature} onOpen={() => onOpen(feature)} />)}
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState<Tab>('home')
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const allFeatures = useMemo(() => [...coreFeatures, ...otherFeatures], [])



  useEffect(() => {
    document.title = active === 'home' ? 'JARVIS — AI • HOME • LIFE' : `JARVIS — ${active.replace(/(^|_)/g, ' ').replace(/^./, (c) => c.toUpperCase())}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [active])

  const openFeature = (feature: Feature) => setSelectedFeature(feature)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020812] text-white">
      <Nav active={active} onSelect={(tab) => { setActive(tab); setSelectedFeature(null) }} />

      {active === 'home' && (
        <main>
          <section className="scanlines stars relative isolate overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,157,255,.19),transparent_33%),radial-gradient(circle_at_15%_65%,rgba(4,74,126,.13),transparent_32%)]" />
            <div className="relative mx-auto grid min-h-[calc(100vh-65px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr_1fr] lg:px-8">
              <div className="order-2 lg:order-1">
                <p className="text-sm font-semibold uppercase tracking-[.26em] text-sky-400">Your connected AI assistant</p>
                <h1 className="mt-4 text-5xl font-bold tracking-[-.05em] sm:text-6xl lg:text-7xl">Hello, I’m <span className="text-sky-400">JARVIS</span></h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">A practical AI layer for your home, your knowledge, your tools and your everyday life — connected to real hardware and real actions.</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    ['home', 'Smart Home', 'Control and monitor your environment'],
                    ['brain', 'Knowledge', 'Remember, reason and answer'],
                    ['automation', 'Automation', 'Streamline daily workflows'],
                    ['recover', 'Always On', 'Secure, resilient connectivity'],
                  ].map(([icon, title, copy]) => (
                    <div key={title} className="flex gap-3 rounded-2xl border border-sky-400/10 bg-sky-950/25 p-3">
                      <span className="mt-0.5 text-sky-300"><Icon name={icon} size={18} /></span>
                      <div><p className="text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{copy}</p></div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActive('features')} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-[#00101c] shadow-[0_0_28px_rgba(0,170,255,.25)] transition hover:bg-sky-400">Explore Features <ArrowRight size={17} /></button>
              </div>

              <div className="order-1 flex justify-center lg:order-2">
                <div className="relative flex w-full justify-center">
                  <div className="absolute inset-0 m-auto h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
                  <Reactor />
                </div>
              </div>

              <div className="order-3 flex items-center lg:justify-end">
                <div className="max-w-xs border-l border-sky-400/20 pl-5 text-left">
                  <p className="text-sm leading-7 text-sky-200/90">“A more connected life starts when intelligence can see, remember and act.”</p>
                  <p className="mt-3 text-xs uppercase tracking-[.2em] text-slate-500">JARVIS design principle</p>
                  <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)]" /> JARVIS is online</div>
                </div>
              </div>
            </div>
            <button onClick={() => document.getElementById('core-preview')?.scrollIntoView()} aria-label="Scroll to features" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-sky-400/20 bg-sky-400/5 p-2 text-sky-300 md:block"><ArrowDown size={18} /></button>
          </section>

          <section id="core-preview" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Core Features" title="The essentials that make JARVIS your assistant." copy="The system is designed around the things that make an assistant useful in the real world: conversation, memory, live information and the ability to work with connected hardware." />
            <FeatureGrid features={coreFeatures} onOpen={openFeature} />
            <div className="mt-10 flex justify-center"><button onClick={() => setActive('features')} className="text-sm font-semibold text-sky-300 hover:text-white">See all core features →</button></div>
          </section>

          <section className="border-y border-sky-400/8 bg-[#04111d] px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle eyebrow="Built to Expand" title="Hardware is part of the system." copy="JARVIS already talks to connected ESP32 hardware. The roadmap naturally extends from room sensing to cameras, portable interfaces and dedicated physical experiences." />
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  ['radio', 'Sensors', 'Temperature, humidity and motion can feed the assistant continuously over Wi-Fi.'],
                  ['camera', 'Vision', 'An ESP32-CAM can become JARVIS’s eyes when a visual question needs answering.'],
                  ['bot', 'Physical Interfaces', 'Future devices can give JARVIS a voice, buttons, LEDs and a physical presence.'],
                ].map(([icon, title, copy]) => <div key={title} className="glass rounded-2xl p-6"><div className="text-sky-300"><Icon name={icon} size={24} /></div><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p></div>)}
              </div>
            </div>
          </section>
        </main>
      )}

      {active === 'features' && (
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><SectionTitle eyebrow="Core Features" title="Everything JARVIS does at the centre of the experience." copy="Each capability below is presented as a real system feature rather than a vague AI promise." /><FeatureGrid features={coreFeatures} onOpen={openFeature} /><div className="mt-14 glass rounded-3xl p-8 sm:p-10"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.26em] text-sky-400">Connected stack</p><h3 className="mt-2 text-2xl font-semibold">One assistant, multiple layers.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Desktop intelligence, local state, cloud models, sensors and external services can share one command experience.</p></div><button onClick={() => setActive('status')} className="inline-flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm font-semibold text-sky-200">See System Status <ArrowRight size={16} /></button></div></div></main>
      )}

      {active === 'other' && (
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><SectionTitle eyebrow="Other Features" title="The wider JARVIS system." copy="Beyond the core assistant experience, JARVIS can connect to specialist tools, protocols, diagnostics and resilient hardware services." /><FeatureGrid features={otherFeatures} onOpen={openFeature} /></main>
      )}

      {active === 'about' && (
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="About JARVIS" title="Built as a connected assistant, not a chat box." copy="JARVIS combines conversation with deterministic actions, connected services and physical hardware. The goal is a system that can remember, observe, reason and act while remaining explicit about what it can see and do." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ['Open architecture', 'JARVIS can connect to MCP services and specialist integrations without hard-wiring every service into the core.'],
              ['Real hardware', 'The current system already includes a working ESP32-WROOM room sensor and an ESP32-CAM path for vision.'],
              ['Safety by design', 'Sensitive actions can stay deterministic and separately permissioned instead of being left entirely to free-form model output.'],
              ['Designed to grow', 'The same architecture can support more sensors, cameras and future physical interfaces without rebuilding the desktop brain.'],
            ].map(([title, copy]) => <div key={title} className="glass rounded-2xl p-6"><div className="text-sky-300"><Icon name="check" size={22} /></div><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p></div>)}
          </div>
          <div className="mt-8 rounded-2xl border border-sky-400/10 bg-sky-400/5 p-5 text-sm text-slate-400">This public site is a presentation layer for the project; it does not expose your private API keys, local JARVIS state or desktop controls.</div>
        </main>
      )}

      {active === 'status' && (
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="System Status" title="A clean public view of the JARVIS architecture." copy="The live desktop HUD remains the authoritative operational view. This page describes what the public-facing system is built around without exposing private service state." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ['Desktop Brain', 'Operational', 'Connected local assistant'],
              ['Room Sensor', 'Operational', 'ESP32-WROOM • Wi-Fi'],
              ['Vision Path', 'Ready', 'ESP32-CAM support'],
              ['Connected Services', 'Configured', 'MCP architecture'],
            ].map(([name, state, detail]) => <div key={name} className="glass rounded-2xl p-5"><div className="flex items-center gap-2 text-emerald-400"><Wifi size={17} /><span className="text-xs font-bold uppercase tracking-[.18em]">{state}</span></div><h3 className="mt-4 text-lg font-semibold">{name}</h3><p className="mt-1 text-sm text-slate-500">{detail}</p></div>)}
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="glass rounded-3xl p-7"><p className="text-xs font-bold uppercase tracking-[.26em] text-sky-400">Architecture</p><div className="mt-6 space-y-4">{[['PC', 'JARVIS brain, memory and tools'], ['Wi-Fi', 'Secure transport to connected boards'], ['WROOM', 'Room sensor node'], ['ESP32-CAM', 'On-demand vision node'], ['MCP', 'External service integrations']].map(([key, value]) => <div key={key} className="flex items-center gap-4"><span className="w-28 shrink-0 rounded-lg border border-sky-400/10 bg-sky-400/5 px-3 py-2 text-center text-xs font-bold uppercase tracking-[.16em] text-sky-300">{key}</span><span className="text-sm text-slate-400">{value}</span></div>)}</div></div>
            <div className="glass rounded-3xl p-7"><p className="text-xs font-bold uppercase tracking-[.26em] text-sky-400">Health Philosophy</p><div className="mt-6 space-y-4">{['Prefer recovery over manual reconnects.', 'Keep secrets out of the public website.', 'Use real sensor state rather than guesses.', 'Keep specialist actions bounded and explicit.'].map((item) => <div key={item} className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />{item}</div>)}</div></div>
          </div>
        </main>
      )}

      <Footer />

      {selectedFeature && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#00050a]/75 p-3 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={() => setSelectedFeature(null)}>
          <div className="glass max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4"><div><div className="mb-4 inline-flex rounded-xl border border-sky-400/15 bg-sky-400/8 p-2.5 text-sky-300"><Icon name={selectedFeature.icon} size={24} /></div><h2 className="text-2xl font-semibold">{selectedFeature.title}</h2></div><button onClick={() => setSelectedFeature(null)} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">Close</button></div>
            <p className="mt-6 text-base leading-8 text-slate-300">{selectedFeature.detail}</p>
            <div className="mt-8 rounded-2xl border border-sky-400/10 bg-sky-400/5 p-5 text-sm text-slate-400">JARVIS keeps this capability connected to the same command, memory and service architecture used by the rest of the system.</div>
          </div>
        </div>
      )}
    </div>
  )
}
