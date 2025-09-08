import type { Orientation, StepProps } from '../step/types';

export interface StepperProps {
	steps: Omit<StepProps, 'index' | 'total' | 'orientation'>[];
	orientation: Orientation;
	className?: string;
}
