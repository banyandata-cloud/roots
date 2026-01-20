type LinkSize = 'sm' | 'md' | 'lg';

export interface LinkProps {
	children: React.ReactNode;
	href: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	onClick?: () => void;

	size?: LinkSize;
	withIcon?: boolean;
	disabled?: boolean;

	className?: string;
	attrs?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
