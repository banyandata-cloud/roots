export type BreadcrumbSeparator = 'chevron' | 'slash';

export type BreadcrumbType = 'text' | 'text-with-line' | 'button';

export interface BreadcrumbItem {
	id: string;
	label: string;
	href?: string | undefined;
	onClick?: (() => void) | undefined;
	isDisabled?: boolean | undefined;
	dropdownOptions?: BreadcrumbDropdownOption[] | undefined;
}

export interface BreadcrumbDropdownOption {
	label: string;
	value: string;
	onClick?: (() => void) | undefined;
}

export interface BreadcrumbsProps {
	crumbs: BreadcrumbItem[];
	type?: BreadcrumbType | undefined;
	separator?: BreadcrumbSeparator | undefined;
	className?: string | undefined;
}
