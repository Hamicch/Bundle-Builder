export type StepId = 'cameras' | 'plan' | 'sensors' | 'protection'

export interface Step {
  id: StepId
  title: string
  icon: 'camera' | 'shield' | 'sensor' | 'grid'
  category: string
}

export interface Variant {
  id: string
  label: string
  image: string
  swatch: string
  price: number
  compareAtPrice?: number
  defaultQty: number
}

export interface Product {
  id: string
  step: StepId
  name: string
  description: string
  learnMoreUrl: string
  image: string
  badge?: string
  price?: number
  compareAtPrice?: number
  priceLabel?: string
  defaultQty?: number
  required?: boolean
  variants?: Variant[]
  defaultActiveVariant?: string
}

export interface Plan {
  id: string
  step: StepId
  name: string
  description: string
  price: number
  compareAtPrice?: number
  billingPeriod: string
  default?: boolean
}

export interface Perk {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  priceLabel?: string
}

export interface ReviewMeta {
  categoryOrder: string[]
  financingLabel: string
  savingsTemplate: string
  guaranteeLabel: string
  returnsTitle: string
  returnsCopy: string
}

export interface Catalog {
  steps: Step[]
  products: Product[]
  plans: Plan[]
  perks: Perk[]
  reviewMeta: ReviewMeta
}
