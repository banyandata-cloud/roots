import type { CSSProperties } from 'react';

export type SkeletonVariant = 'text' | 'circle' | 'rounded' | 'ellipse';
export type SkeletonTheme = 'light' | 'dark';

export interface SkeletonProps {
	height?: number | string;
	width?: number | string;
	variant?: SkeletonVariant;
	theme?: SkeletonTheme;
	className?: string;
	style?: CSSProperties;
	noAnimation?: boolean;
}
