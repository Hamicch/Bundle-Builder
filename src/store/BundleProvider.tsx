import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react'
import { fetchCatalog } from '../data/apiCatalog'
import { catalog as localCatalog } from '../data/catalog'
import type { Catalog } from '../types/catalog'
import { bundleReducer, initialState, type BundleAction, type BundleState } from './bundleState'

interface BundleContextValue {
  catalog: Catalog
  state: BundleState
  dispatch: Dispatch<BundleAction>
}

const BundleContext = createContext<BundleContextValue | null>(null)

/**
 * Renders instantly from the bundled local catalog, then quietly checks the
 * bonus API in the background. If it answers, its catalog takes over; if it
 * doesn't (no backend running, no Docker, no deploy), nothing changes.
 */
export function BundleProvider({
  children,
  initial,
}: {
  children: ReactNode
  initial?: BundleState
}) {
  const [catalog, setCatalog] = useState(localCatalog)
  const [state, dispatch] = useReducer(bundleReducer, initial ?? initialState(localCatalog))

  useEffect(() => {
    let cancelled = false
    fetchCatalog().then((remote) => {
      if (remote && !cancelled) setCatalog(remote)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <BundleContext.Provider value={{ catalog, state, dispatch }}>{children}</BundleContext.Provider>
  )
}

export function useBundle(): BundleContextValue {
  const ctx = useContext(BundleContext)
  if (!ctx) throw new Error('useBundle must be used inside <BundleProvider>')
  return ctx
}
