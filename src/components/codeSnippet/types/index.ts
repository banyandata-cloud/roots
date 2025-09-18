import type { MotionProps } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

export interface CodeSnippetProps {
	/**  
	Show Copy Button if true
	*/
	copy?: boolean;
	/**
	 *  Code snippet in string format
	 */
	code: string;
	/**
	 * Code's programming language
	 */
	language: string;
	/**
	 * Show Line numbers in the left if true
	 */
	showLineNumbers?: boolean;
	/**
	 * Theme of Code Snippet
	 */
	theme: 'light' | 'dark';
	/**
	 *  class name to style the code ("pre" tag). Not the container.
	 */
	className?: string | undefined;
}

export type MotionSpanProps = ComponentPropsWithoutRef<'span'> & MotionProps;
