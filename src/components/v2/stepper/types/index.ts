import type { ReactElement, ReactNode } from 'react';

// ─── Shared ───────────────────────────────────────────────────────────────────

export type Orientation = 'horizontal' | 'vertical';

// ─── New variant types ────────────────────────────────────────────────────────

export type StepStatus = 'incomplete' | 'current' | 'completed';
export type StepperSize = 'sm' | 'md';
export type StepperVariant = 'icon' | 'noIcon' | 'progressBar';

export interface Step {
	label?: string;
	description?: string;
	status: StepStatus;
	/** Override auto-index with a custom step number */
	step?: number;
}

// ─── Old Step types (kept for backwards compatibility) ────────────────────────

export interface StepProps {
	/** Main label of the step */
	title: ReactNode;
	/** Optional secondary text */
	description?: ReactNode;
	/** Whether this step is the one currently in focus */
	active?: boolean;
	/** 0 → 1 indicating progress of the active step */
	completion?: number;
	/** Mark the step as error — type kept, not yet implemented visually */
	error?: boolean;
	/** Zero-based index of this step in the list (supplied by Stepper) */
	index: number;
	/** Total number of steps (supplied by Stepper) */
	total: number;
	/** Hide the tail/connector behind this step */
	noTail?: boolean;
	/** Layout direction */
	orientation: Orientation;
	/** Render overrides — types kept, not yet implemented visually */
	renderIcon?: (p: StepProps) => ReactElement | null;
	renderTitle?: (p: StepProps) => ReactElement | null;
	renderDescription?: (p: StepProps) => ReactElement | null;
}

export interface StepperProps {
	// New API
	steps?: Step[];
	size?: StepperSize;
	variant?: StepperVariant;

	// Old API
	legacySteps?: Omit<StepProps, 'index' | 'total' | 'orientation'>[];

	// Shared
	orientation?: Orientation;
	className?: string;
	style?: React.CSSProperties;
}
