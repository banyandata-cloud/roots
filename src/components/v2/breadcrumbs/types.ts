export type BreadcrumbSeparator = 'chevron' | 'slash';

export type BreadcrumbType = 'text' | 'text-with-line' | 'button';

export interface BreadcrumbItem {
	label: string;
	href?: string;
	onClick?: () => void;
	isDisabled?: boolean;
	dropdownOptions?: BreadcrumbDropdownOption[];
}

export interface BreadcrumbDropdownOption {
	label: string;
	value: string;
	onClick?: () => void;
}

export interface BreadcrumbsProps {
	crumbs: BreadcrumbItem[];
	type?: BreadcrumbType;
	separator?: BreadcrumbSeparator;
	className?: string;
}
