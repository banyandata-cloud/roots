import type { HTMLAttributeAnchorTarget } from 'react';

type LinkSize = 'sm' | 'md' | 'lg';
export type LinkVariant = 'styled' | 'unstyled';

export interface LinkProps {
	children: React.ReactNode;
	href: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	onClick?: (e: HTMLAttributeAnchorTarget) => void;
	variant?: LinkVariant;
	size?: LinkSize;
	withIcon?: boolean;
	disabled?: boolean;
	className?: string;
	attrs?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
