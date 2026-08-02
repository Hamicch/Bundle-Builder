import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'
import type { Catalog } from '../types/catalog'
import { bundleReducer, type BundleAction, type BundleState } from './bundleState'

interface BundleContextValue {
  catalog: Catalog
  state: BundleState
  dispatch: Dispatch<BundleAction>
}

const BundleContext = createContext<BundleContextValue | null>(null)

/**
 * Holds the catalog and reducer state for the tree. Both are already
 * resolved by the time this mounts (see App), so it stays a plain holder
 * with no fetching or catalog swapping of its own — which is what keeps the
 * rendered catalog and the derived state from ever disagreeing.
 */
export function BundleProvider({
  catalog,
  initial,
  children,
}: {
  catalog: Catalog
  initial: BundleState
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(bundleReducer, initial)

  return (
    <BundleContext.Provider value={{ catalog, state, dispatch }}>{children}</BundleContext.Provider>
  )
}

export function useBundle(): BundleContextValue {
  const ctx = useContext(BundleContext)
  if (!ctx) throw new Error('useBundle must be used inside <BundleProvider>')
  return ctx
}
