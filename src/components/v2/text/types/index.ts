import type { ReactNode } from 'react';

export type TextVariant = 'h1' | 'h2' | 'b1' | 'b2' | 'b3';
export type TextStroke = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
export type TextFontWeight = 100 | 200 | 300 | 400 | 500 | 600;
export type TextComponentType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a';

export interface TextProps {
	variant?: TextVariant;
	component?: TextComponentType;
	stroke?: TextStroke;
	weight?: TextFontWeight;
	italic?: boolean;
	underline?: boolean;
	children?: ReactNode;
	className?: string | undefined;
	attrs?: unknown;
}
