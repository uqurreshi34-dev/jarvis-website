import type { Feature } from '@/types'
import { Icon } from '@/components/Icon'

type Props = { feature: Feature; onOpen: () => void }

export function FeatureCard({ feature, onOpen }: Props) {
  return (
    <button onClick={onOpen} className="group glass w-full rounded-2xl p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-sky-950/50">
      <div className="mb-4 inline-flex rounded-xl border border-sky-400/15 bg-sky-400/8 p-2.5 text-sky-300">
        <Icon name={feature.icon} size={22} />
      </div>
      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{feature.summary}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-sky-300 opacity-80 group-hover:opacity-100">
        Explore <span aria-hidden="true">→</span>
      </span>
    </button>
  )
}
