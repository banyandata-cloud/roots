import React from 'react';

export interface DropdownRef {
	focus: () => void;
}

export interface DropdownOption {
	value: string;
	label: string;
	icon?: React.ComponentType<any> | undefined;
}

// Advanced search types for key-value pair functionality
export interface SearchTag {
	id: string;
	key: string;
	value: string;
	isEditingValue?: boolean;
}

export interface AdvancedSearchResult {
	tags: Omit<SearchTag, 'id' | 'isEditingValue'>[];
	defaultSearch: string;
}

export interface DataLabel {
	singular: string;
	plural: string;
}

export interface DropdownProps {
	// Content props
	label?: string | undefined;
	placeholder?: string | undefined;
	helperText?: string | undefined;
	value?: string | undefined;
	defaultValue?: string | undefined;
	selectedValues?: string[] | undefined; // For multi-select
	defaultSelectedValues?: string[] | undefined; // For multi-select
	options?: DropdownOption[] | undefined;
	dataLabel?: string | DataLabel | undefined; // For multi-select display text (e.g., "Selected Item/Items")
	customAllLabel?: string | undefined; // For multi-select "All" option label

	// State props
	state?:
		| 'default'
		| 'selected'
		| 'focus'
		| 'disabled'
		| 'error'
		| 'warning'
		| 'read-only'
		| undefined;
	size?: 'sm' | 'md' | undefined;
	variant?: 'simple' | 'multi-select' | 'with-icon' | 'borderless' | 'search' | undefined;

	// Control props
	required?: boolean | undefined;
	disabled?: boolean | undefined;
	readOnly?: boolean | undefined;

	// Icon props
	helpIcon?: boolean | undefined;
	helpText?: string | undefined; // Tooltip content for help icon
	errorIcon?: boolean | undefined;
	warningIcon?: boolean | undefined;
	icon?: React.ComponentType<any> | undefined;

	// Search variant props
	searchIcon?: React.ComponentType<any> | undefined; // Custom search icon, defaults to v2 SearchIcon
	shortcut?: string | undefined; // Shortcut display text (e.g., '⌘T')
	onShortcut?: (() => void) | undefined; // Callback when shortcut is triggered

	// Advanced search props (key-value pair functionality)
	enableAdvancedSearch?: boolean | undefined; // Enable key-value pair search with badges
	searchTags?: SearchTag[] | undefined; // Controlled search tags
	defaultSearchTags?: SearchTag[] | undefined; // Default search tags
	availableKeys?: DropdownOption[] | undefined; // Available keys for tag creation
	onAdvancedSearchChange?: ((result: AdvancedSearchResult) => void) | undefined; // Structured search result callback

	// Tag options props (for showing dropdown in tag text fields)
	tagOptionsEnabled?: boolean | undefined; // Enable dropdown options for tag text fields
	tagOptions?: DropdownOption[] | undefined; // Available options for tag values

	// Event handlers
	onChange?: ((value: string) => void) | undefined;
	onMultiSelectChange?: ((values: string[]) => void) | undefined; // For multi-select
	onSearchChange?: ((searchValue: string) => void) | undefined; // For search variant input changes

	onFocus?: ((e: React.FocusEvent<HTMLElement>) => void) | undefined;
	onBlur?: ((e: React.FocusEvent<HTMLElement>) => void) | undefined;

	// Popover positioning
	popoverOffset?: number | undefined; // Custom offset for popover positioning
	popoverClassName?: string | undefined; // Custom class for popover container

	// Standard HTML props
	className?: string | undefined;
	id?: string | undefined;
	name?: string | undefined;
}
