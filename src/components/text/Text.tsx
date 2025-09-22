import { createElement, forwardRef, isValidElement, type ReactElement } from 'react';
import type { TextProps } from './types';

const variantMap: Record<number | string, string> = {
	h1: 'bn-text-4xl bn-leading-tight bn-font-semibold',
	h2: 'bn-text-3xl bn-leading-snug bn-font-semibold',
	b1: 'bn-text-base bn-leading-7',
	b2: 'bn-text-sm  bn-leading-6',
	b3: 'bn-text-xs  bn-leading-5',
};

const weightMap: Record<number | string, string> = {
	100: 'bn-font-thin',
	200: 'bn-font-extralight',
	300: 'bn-font-light',
	400: 'bn-font-normal',
	500: 'bn-font-medium',
	600: 'bn-font-semibold',
	700: 'bn-font-bold',
	800: 'bn-font-extrabold',
	900: 'bn-font-black',
};

const strokeMap: Record<string, string | undefined> = {
	regular: 'bn-stroke-regular',
	medium: 'bn-stroke-medium',
	strong: 'bn-stroke-strong',
};

const Text = forwardRef<HTMLElement, TextProps>((props, ref): ReactElement | null => {
	const {
		variant = 'b1',
		component = 'span',
		stroke = 'regular',
		weight,
		italic,
		underline,
		children,
		className = '',
		attrs = {},
	} = props;

	const cls = [
		'bn-text-text',
		variantMap[variant] ?? '',
		strokeMap[stroke] ?? '',
		italic ? 'bn-italic' : '',
		underline ? 'bn-underline' : '',
		weight ? (weightMap[weight] ?? '') : '',
		className,
	]
		.filter(Boolean)
		.join(' ');

	const el = createElement(
		component,
		{
			ref,
			className: cls,
			...(attrs as Record<string, unknown>),
		},
		children
	);

	return isValidElement(el) ? el : null;
});

Text.displayName = 'Text';
export default Text;
