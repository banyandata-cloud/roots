import type { ComponentProps, JSX, ReactNode } from 'react';

export type TextVariant = 'h1' | 'h2' | 'b1' | 'b2' | 'b3';
export type TextStroke = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextFontWeight = 100 | 200 | 300 | 400 | 500 | 600;
type ComponentType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a';

export interface TextProps<T extends keyof JSX.IntrinsicElements> {
	variant?: TextVariant;
	component?: ComponentType;
	stroke?: TextStroke;
	weight?: TextFontWeight;
	italic?: boolean;
	underline?: boolean;
	children?: ReactNode;
	className?: string;
	attrs?: ComponentProps<T>;
}
