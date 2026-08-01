import { formatPrice } from '../store/selectors'

interface Props {
  price: number
  compareAtPrice?: number
  priceLabel?: string
  variant?: 'card' | 'review'
  suffix?: string
}

/**
 * The design shows the same struck-through-compare-at-over-active-price
 * layout in two places — the product card and the review line — just in a
 * different size and color. One component covers both via `variant`.
 */
export function PriceBlock({ price, compareAtPrice, priceLabel, variant = 'card', suffix }: Props) {
  const activeClass =
    variant === 'card'
      ? 'text-[16px] text-price tracking-body'
      : 'text-[14px] font-semibold text-brand'
  const struckClass = variant === 'card' ? 'text-[16px] text-strike' : 'text-[12px] text-price/70'

  const active = priceLabel ?? `${formatPrice(price)}${suffix ?? ''}`

  return (
    <div className="flex flex-col items-end leading-tight">
      {compareAtPrice != null && compareAtPrice > price && (
        <s className={struckClass}>
          {formatPrice(compareAtPrice)}
          {suffix}
        </s>
      )}
      <span className={activeClass}>{active}</span>
    </div>
  )
}
