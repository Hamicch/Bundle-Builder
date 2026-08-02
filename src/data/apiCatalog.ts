import type { Catalog } from '../types/catalog'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

/**
 * The bonus API mirrors the local catalog. When it's reachable (backend
 * running locally, proxied under Docker, or deployed alongside the app), the
 * app boots from its response; anywhere it isn't, this resolves to null and
 * the caller falls back to the bundled catalog instead.
 */
export async function fetchCatalog(): Promise<Catalog | null> {
  try {
    const res = await fetch(`${API_BASE}/api/catalog`)
    if (!res.ok) return null
    const data = (await res.json()) as Catalog
    return data.products?.length ? data : null
  } catch {
    return null
  }
}
