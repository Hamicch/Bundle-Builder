import { useEffect, useRef } from 'react'
import { formatPrice } from '../store/selectors'

interface Props {
  open: boolean
  total: number
  onClose: () => void
}

/**
 * The design's Checkout button has nowhere real to send the shopper — the
 * brief only asks for a placeholder — so this just confirms the bundle
 * total and hands them back to the builder.
 */
export function CheckoutModal({ open, total, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="checkout-modal-title"
      className="m-auto w-[360px] max-w-[90vw] rounded-card p-6 shadow-xl backdrop:bg-ink/40"
    >
      <h2 id="checkout-modal-title" className="text-[18px] font-semibold tracking-body">
        Thanks for building your system!
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-ink/70">
        This is a prototype, so checkout isn&rsquo;t wired up. Your {formatPrice(total)} bundle is
        safe right where it is.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-4 w-full rounded bg-brand py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand/90"
      >
        Back to my system
      </button>
    </dialog>
  )
}
