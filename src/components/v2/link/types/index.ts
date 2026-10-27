import type { MouseEvent } from 'react';

type LinkSize = 'sm' | 'md' | 'lg';
export type LinkVariant = 'styled' | 'unstyled';

export interface LinkProps {
	children: React.ReactNode;
	href: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
	variant?: LinkVariant;
	size?: LinkSize;
	withIcon?: boolean;
	disabled?: boolean;
	className?: string;
	attrs?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
