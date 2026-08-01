import { describe, expect, it } from 'vitest'
import { catalog } from './catalog'

describe('catalog integrity', () => {
  it('gives every step something to render', () => {
    for (const step of catalog.steps) {
      const populated =
        catalog.products.some((p) => p.step === step.id) ||
        catalog.plans.some((p) => p.step === step.id)
      expect(populated, `step "${step.id}" has no products or plans`).toBe(true)
    }
  })

  it('points each variant product at a default variant that exists', () => {
    for (const product of catalog.products) {
      if (!product.variants) continue
      const ids = product.variants.map((v) => v.id)
      expect(ids, `"${product.id}" default variant`).toContain(product.defaultActiveVariant)
    }
  })
})
