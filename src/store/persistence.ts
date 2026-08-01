import type { Catalog } from '../types/catalog'
import { initialState, MAX_QTY, type BundleState } from './bundleState'

const STORAGE_KEY = 'bundle-builder:v1'

export function saveState(state: BundleState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function loadSavedState(catalog: Catalog): BundleState | null {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
  if (!raw) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (typeof parsed !== 'object' || parsed === null) return null

  const candidate = parsed as Partial<BundleState>
  const base = initialState(catalog)

  const quantities: BundleState['quantities'] = {}
  for (const key of Object.keys(base.quantities)) {
    const value = candidate.quantities?.[key]
    quantities[key] =
      typeof value === 'number' && Number.isInteger(value) && value >= 0
        ? Math.min(value, MAX_QTY)
        : 0
  }
  // Required items ignore the snapshot entirely: their steppers are disabled,
  // so a saved value that drifted from the catalog would be uncorrectable.
  for (const product of catalog.products) {
    if (product.required && !product.variants) {
      quantities[product.id] = product.defaultQty ?? 1
    }
  }

  const activeVariants: BundleState['activeVariants'] = {}
  for (const product of catalog.products) {
    if (!product.variants) continue
    const saved = candidate.activeVariants?.[product.id]
    activeVariants[product.id] = product.variants.some((v) => v.id === saved)
      ? saved!
      : base.activeVariants[product.id]
  }

  const planId = catalog.plans.some((p) => p.id === candidate.planId)
    ? (candidate.planId as string)
    : base.planId

  const openStep =
    candidate.openStep === null || catalog.steps.some((s) => s.id === candidate.openStep)
      ? (candidate.openStep as BundleState['openStep'])
      : base.openStep

  return { quantities, activeVariants, planId, openStep }
}

export function clearSavedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // storage unavailable (e.g. private mode) — nothing to clear
  }
}

export { STORAGE_KEY }
