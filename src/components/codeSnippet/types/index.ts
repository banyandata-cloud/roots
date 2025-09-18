import type { MotionProps } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

export interface CodeSnippetProps {
	copy?: boolean;
	code: string;
	language: string;
	showLineNumbers?: boolean;
	theme: 'light' | 'dark';
	className?: string | undefined;
}

export type MotionSpanProps = ComponentPropsWithoutRef<'span'> & MotionProps;
