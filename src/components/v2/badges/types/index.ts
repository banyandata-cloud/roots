export type BadgeVariant = 'pill-color' | 'badge-color' | 'badge-modern';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
	label: string;
	variant?: BadgeVariant | undefined;
	size?: BadgeSize | undefined;
	onClose?: () => void | undefined;
	className?: string | undefined;
}
