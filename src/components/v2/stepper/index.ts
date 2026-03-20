// ─── Main component ───────────────────────────────────────────────────────────
export { default as Stepper } from './Stepper';

// ─── All types (old + new) ────────────────────────────────────────────────────
export type {
	// Shared
	Orientation, // ← renamed to avoid conflict with Step component
	StepperProps,
	StepperSize,
	StepperVariant,
	// Old types
	StepProps,
	StepStatus,
	// New types
	Step as StepType,
} from './types';

// ─── Old Step sub-component (for direct use if needed) ────────────────────────
export { Step } from './step';
