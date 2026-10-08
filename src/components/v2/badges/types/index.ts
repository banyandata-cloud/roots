export type BadgeVariant = 'pill' | 'badge' | 'modern';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeColor =
	| 'brand'
	| 'red'
	| 'gray-blue'
	| 'gray'
	| 'green'
	| 'indigo'
	| 'orange'
	| 'pink'
	| 'purple';

export interface BadgeProps {
	icon?: React.ReactNode;
	label: string;
	variant?: BadgeVariant | undefined;
	color?: BadgeColor | undefined;
	size?: BadgeSize | undefined;
	onClose?: ((e: React.MouseEvent) => void) | undefined;
	dot?: boolean | undefined;
	dotColor?: string | undefined;
	arrow?: boolean | undefined;
	arrowColor?: string | undefined;
	arrowLead?: boolean | undefined;
	arrowLeadColor?: string | undefined;
	upArrow?: boolean | undefined;
	upArrowColor?: string | undefined;
	plus?: boolean | undefined;
	plusColor?: string | undefined;
	className?: string | undefined;
}
