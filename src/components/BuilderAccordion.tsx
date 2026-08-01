import { useBundle } from '../store/BundleProvider'
import { StepSection } from './StepSection'

/**
 * The design's builder is a vertical 4-step accordion — cameras, plan,
 * sensors, extra protection, in that order. Each step just needs to know
 * its own position and what step comes next, for the "Next: …" button.
 */
export function BuilderAccordion() {
  const { catalog } = useBundle()
  return (
    <div className="flex flex-col gap-4">
      {catalog.steps.map((step, i) => (
        <StepSection key={step.id} step={step} index={i} nextStep={catalog.steps[i + 1]} />
      ))}
    </div>
  )
}
