import type { ReactNode } from 'react';

export interface EmptyStateProps {
	className?: string;
	title?: ReactNode;
	description?: ReactNode;
	/** Optional illustration or icon rendered above the title. */
	icon?: ReactNode;
	/** Label of the action button. Only shown when `onAction` is provided. */
	actionLabel?: string | undefined;
	onAction?: (() => void) | undefined;
	/** Renders the card surface (border, radius, padding). */
	bordered?: boolean;
}
