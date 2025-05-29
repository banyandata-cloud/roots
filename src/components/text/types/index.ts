import type { HTMLAttributes, ReactNode } from 'react';

type Variant = 'h1' | 'h2' | 'b1' | 'b2' | 'b3';
type ComponentType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a';
type Stroke = 'regular' | 'medium' | 'semibold' | 'bold';
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600;

export interface TextProps {
	variant?: Variant;
	component?: ComponentType;
	stroke?: Stroke;
	weight?: FontWeight;
	italic?: boolean;
	underline?: boolean;
	children?: ReactNode;
	className?: string;
	attrs?: HTMLAttributes<HTMLElement>;
}
