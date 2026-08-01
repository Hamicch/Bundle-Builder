import { ShieldCheck } from 'lucide-react'
import { useBundle } from '../store/BundleProvider'
import type { Plan } from '../types/catalog'
import { PriceBlock } from './PriceBlock'

/**
 * The design only shows the plan step collapsed, so there's no expanded
 * reference for this card's layout — it reuses the product-card shape but
 * behaves as a single-select radio instead of a stepper, since a plan is
 * picked once rather than counted.
 */
export function PlanCard({ plan }: { plan: Plan }) {
  const { state, dispatch } = useBundle()
  const selected = state.planId === plan.id

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => dispatch({ type: 'selectPlan', planId: plan.id })}
      className={`relative flex w-full items-center gap-3 rounded-card bg-white p-[11px] text-left transition-colors ${
        selected ? 'border-2 border-brand-border' : 'border-2 border-transparent'
      }`}
      data-testid={`plan-${plan.id}`}
    >
      <span className="flex size-[64px] shrink-0 items-center justify-center rounded-lg bg-lavender">
        <ShieldCheck className="size-8 text-brand" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[16px] font-semibold tracking-body">{plan.name}</span>
        <span className="text-[12px] leading-[1.3] font-medium tracking-body text-ink/70">
          {plan.description}
        </span>
      </span>
      <PriceBlock
        price={plan.price}
        compareAtPrice={plan.compareAtPrice}
        suffix={`/${plan.billingPeriod}`}
      />
    </button>
  )
}
