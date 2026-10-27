import type { ReactNode } from 'react';

// Figma text styles (design-system/text-styles.json).
export type TextVariant =
	| 'heading-xxlarge'
	| 'heading-xlarge'
	| 'heading-large'
	| 'heading-medium'
	| 'heading-small'
	| 'heading-xsmall'
	| 'heading-xxsmall'
	| 'body-large'
	| 'body'
	| 'body-small'
	| 'metric-large'
	| 'metric-medium'
	| 'metric-small'
	| 'code';
export type TextStroke = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextComponentType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a';

export interface TextProps {
	/** Figma text style. Defaults to 'body' (14/20). */
	variant?: TextVariant;
	component?: TextComponentType;
	/** Overrides the weight of the variant. Metric is bold-only and code is regular-only in Figma. */
	stroke?: TextStroke | undefined;
	italic?: boolean;
	underline?: boolean;
	children?: ReactNode;
	className?: string | undefined;
	attrs?: unknown;
}
