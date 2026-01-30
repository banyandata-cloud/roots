import type { HTMLAttributes, ReactElement } from 'react';
import type { TextFontWeight, TextStroke, TextVariant } from '../../text';

type LinkTraget = '_blank' | '_self' | '_parent' | '_top';
type LinkUnderline = 'none' | 'hover' | 'always';

export interface LinkProps {
	variant: TextVariant;
	stroke: TextStroke;
	weight: TextFontWeight;
	italic: boolean;
	children: ReactElement;
	href: string;
	target: LinkTraget;
	attrs: HTMLAttributes<HTMLAnchorElement>;
	className: string;
	underline: LinkUnderline;
	onClick: () => void;
	v2?: boolean;
}
