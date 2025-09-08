import type { ReactElement, ReactNode } from 'react';

export type Orientation = 'horizontal' | 'vertical';

export interface StepProps {
	/** Main label of the step */
	title: ReactNode;
	/** Optional secondary text */
	description?: ReactNode;
	/** Whether this step is the one currently in focus */
	active?: boolean;
	/** 0 → 1 indicating progress of the active step */
	completion?: number;
	/** Mark the step as error */
	error?: boolean;
	/** Zero-based index of this step in the list (supplied by Stepper) */
	index: number;
	/** Total number of steps (supplied by Stepper) */
	total: number;
	/** Hide the tail/connector behind this step */
	noTail?: boolean;
	/** Layout direction */
	orientation: Orientation;

	/** Render overrides (receive full StepProps) */
	renderIcon?: (p: StepProps) => ReactElement | null;
	renderTitle?: (p: StepProps) => ReactElement | null;
	renderDescription?: (p: StepProps) => ReactElement | null;
}
