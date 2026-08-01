import '@testing-library/jest-dom/vitest'

// vitest's jsdom environment aliases `window` to `global`, which leaves
// Node's own (non-functional without --localstorage-file) localStorage in
// place. The real jsdom Storage lives on globalThis.jsdom.window instead.
Object.defineProperty(globalThis, 'localStorage', {
  value: (globalThis as { jsdom?: { window: Window } }).jsdom?.window.localStorage,
  configurable: true,
})

HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.open = true
}
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  this.open = false
  this.dispatchEvent(new Event('close'))
}
