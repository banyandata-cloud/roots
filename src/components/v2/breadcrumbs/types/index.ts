export type BreadcrumbSeparator = 'chevron' | 'slash';

export type BreadcrumbType = 'text' | 'text-with-line' | 'button';

export interface BreadcrumbItem {
	id: string;
	label: string | undefined;
	href?: string | undefined;
	onClick?: () => void | undefined;
	isDisabled?: boolean | undefined;
	dropdownOptions?: BreadcrumbDropdownOption[] | undefined;
}

export interface SeparatorProps {
	separator: BreadcrumbSeparator;
}

export interface DropdownProps {
	options: BreadcrumbDropdownOption[];
	onClose: () => void;
	anchorRef: React.RefObject<HTMLSpanElement | null>;
}

export interface BreadcrumbDropdownOption {
	label: string;
	value: string;
	onClick?: () => void | undefined;
}

export interface BreadcrumbsProps {
	crumbs: BreadcrumbItem[];
	type?: BreadcrumbType | undefined;
	separator?: BreadcrumbSeparator | undefined;
	className?: string | undefined;
	activeIndex?: number | undefined;
}
