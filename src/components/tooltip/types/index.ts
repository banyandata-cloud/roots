import type { ReactElement, ReactNode, Ref } from 'react';

export type ReactElementWithRef<T = unknown> = ReactElement & {
	ref?: Ref<T> | null;
};

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipVariant = 'light' | 'dark';

export interface TooltipProps {
	children: ReactElement;
	position?: TooltipPosition;
	content: ReactNode;
	variant?: TooltipVariant;
	className?: string;
	showPointer?: boolean;
}
