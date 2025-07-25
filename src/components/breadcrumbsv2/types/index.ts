import type { ReactNode } from 'react';

interface Crumb {
	title: string;
	value: string | number;
	icon?: ReactNode;
	navigate?: () => void;
	isDisabled?: boolean;
}

export interface BreadCrumbsProps {
	crumbs: Crumb[];
	className?: string;
}
