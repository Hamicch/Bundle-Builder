import { Cctv, Grip, Radar, ShieldCheck, type LucideIcon } from 'lucide-react'
import type { Step } from '../types/catalog'

const icons: Record<Step['icon'], LucideIcon> = {
  camera: Cctv,
  shield: ShieldCheck,
  sensor: Radar,
  grid: Grip,
}

/**
 * Each accordion header in the design carries its own icon (camera, shield,
 * sensor waves, grid). Lucide's equivalents read the same at this size, so
 * we map to those instead of shipping matching custom icon assets.
 */
export function StepIcon({ icon, className }: { icon: Step['icon']; className?: string }) {
  const Icon = icons[icon]
  return <Icon className={className} aria-hidden="true" />
}
