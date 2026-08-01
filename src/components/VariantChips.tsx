import type { Variant } from '../types/catalog'

interface Props {
  variants: Variant[]
  activeId: string
  onSelect: (variantId: string) => void
  productName: string
}

/**
 * The design shows a row of color chips under products with more than one
 * finish — a small swatch and a label per option. Each variant keeps its own
 * quantity in the store; clicking a chip only changes which variant the
 * card's stepper is currently pointed at.
 */
export function VariantChips({ variants, activeId, onSelect, productName }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label={`${productName} color`}>
      {variants.map((variant) => {
        const active = variant.id === activeId
        return (
          <button
            key={variant.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(variant.id)}
            className={`flex items-center gap-1 rounded-md border px-1.5 py-1 text-[12px] font-medium tracking-body transition-colors ${
              active
                ? 'border-success bg-success/5 text-ink'
                : 'border-ink/15 bg-white text-ink hover:border-ink/35'
            }`}
          >
            <span
              className="size-3 shrink-0 rounded-full border border-ink/15"
              style={{ backgroundColor: variant.swatch }}
              aria-hidden="true"
            />
            {variant.label}
          </button>
        )
      })}
    </div>
  )
}
