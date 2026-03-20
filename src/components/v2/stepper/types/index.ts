export type Orientation = 'horizontal' | 'vertical';
export type StepStatus = 'incomplete' | 'current' | 'completed';
export type StepperSize = 'sm' | 'md';
export type StepperVariant = 'icon' | 'noIcon' | 'progressBar';

export interface Step {
	label?: string | undefined;
	description?: string | undefined;
	status: StepStatus;
	step?: number | undefined;
}

export interface StepperProps {
	steps?: Step[] | undefined;
	size?: StepperSize | undefined;
	variant?: StepperVariant | undefined;
	orientation?: Orientation | undefined;
	className?: string | undefined;
	style?: React.CSSProperties | undefined;
}
