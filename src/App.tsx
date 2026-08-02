import { useEffect, useMemo, useState } from 'react'
import { BuilderAccordion } from './components/BuilderAccordion'
import { ReviewPanel } from './components/ReviewPanel'
import { fetchCatalog } from './data/apiCatalog'
import { catalog as localCatalog } from './data/catalog'
import { BundleProvider } from './store/BundleProvider'
import { initialState } from './store/bundleState'
import { loadSavedState } from './store/persistence'
import type { Catalog } from './types/catalog'

/**
 * Resolves the catalog once at boot — the bonus API when it answers, the
 * bundled copy otherwise — and only then derives state from it. Settling on
 * a single catalog up front (rather than swapping one in after the fact)
 * means the restored quantities and the rendered catalog are always
 * validated against the same source.
 *
 * The design itself is a two-column layout: the step-by-step builder on the
 * left, the live review panel on the right, stacking below desktop. A saved
 * system (via "Save my system for later") is restored here on load.
 */
function App() {
  const [catalog, setCatalog] = useState<Catalog | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchCatalog().then((remote) => {
      if (!cancelled) setCatalog(remote ?? localCatalog)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const initial = useMemo(
    () => (catalog ? (loadSavedState(catalog) ?? initialState(catalog)) : null),
    [catalog],
  )

  if (!catalog || !initial) {
    return (
      <main className="mx-auto max-w-[1196px] px-4 py-8" aria-busy="true">
        <p className="text-center text-[14px] font-medium text-ink/60">Loading your builder…</p>
      </main>
    )
  }

  return (
    <BundleProvider catalog={catalog} initial={initial}>
      <main className="mx-auto max-w-[1196px] px-4 py-8">
        <h1 className="mb-4 text-center text-[24px] font-semibold md:sr-only">
          Let&rsquo;s get started!
        </h1>
        <div className="flex gap-[29px] max-lg:flex-col">
          <div className="min-w-0 flex-1">
            <BuilderAccordion />
          </div>
          <aside className="w-[399px] shrink-0 self-start max-lg:w-full lg:sticky lg:top-4">
            <ReviewPanel />
          </aside>
        </div>
      </main>
    </BundleProvider>
  )
}

export default App
