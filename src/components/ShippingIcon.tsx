/**
 * The design's shipping row uses a rounded delivery-van glyph with a cab
 * window and trailing motion lines — no icon library has that exact shape,
 * so it's redrawn here as an inline SVG.
 */
export function ShippingIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 12h4M3.5 16h2.5" />
      <rect x="8" y="8" width="13" height="13" rx="1.6" />
      <path d="M21 12h4.2a1.6 1.6 0 0 1 1.28.64l2.2 2.93a1.6 1.6 0 0 1 .32.96V19.4a1.6 1.6 0 0 1-1.6 1.6H26" />
      <path d="M21 14.5h3.6l1.9 2.5" />
      <circle cx="13" cy="23" r="2.4" fill="white" />
      <circle cx="24" cy="23" r="2.4" fill="white" />
    </svg>
  )
}
