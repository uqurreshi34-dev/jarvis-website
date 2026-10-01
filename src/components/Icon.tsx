import {
  Activity,
  Bot,
  Brain,
  Camera,
  LineChart,
  CheckCircle2,
  Cpu,
  Eye,
  FolderCog,
  Gauge,
  Github,
  Globe2,
  Home,
  Lightbulb,
  Mic2,
  Network,
  RadioTower,
  Settings2,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

type Props = { name: string; size?: number }

const icons: Record<string, LucideIcon> = {
  home: Home,
  brain: Brain,
  blender: Cpu,
  mic: Mic2,
  camera: Camera,
  history: Activity,
  trading: LineChart,
  room: Thermometer,
  status: Gauge,
  protocol: Workflow,
  recover: ShieldCheck,
  automation: Sparkles,
  files: FolderCog,
  github: Github,
  network: Network,
  eye: Eye,
  radio: RadioTower,
  light: Lightbulb,
  globe: Globe2,
  bot: Bot,
  settings: Settings2,
  check: CheckCircle2,
}

export function Icon({ name, size = 20 }: Props) {
  const Component = icons[name] ?? Sparkles
  return <Component size={size} strokeWidth={1.8} />
}
