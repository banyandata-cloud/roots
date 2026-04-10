export type BadgeVariant = 'pill' | 'badge' | 'modern';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
	label: string;
	variant?: BadgeVariant | undefined;
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
