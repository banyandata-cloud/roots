import type { ChangeEvent, ComponentType, ReactNode } from 'react';

type Position = 'left' | 'right';
type Size = 'sm' | 'md' | 'lg';

// The SVG icons in your icon set should accept at least `className`
export type IconType = ComponentType<{ className?: string | undefined }>;

export interface CheckboxProps {
	label?: ReactNode;
	/** Fires with (event, checkedValue) */
	onChange?: (event: ChangeEvent<HTMLInputElement>, value: boolean) => void;
	/** Uncontrolled default state */
	defaultChecked?: boolean;
	/** Controlled state */
	checked?: boolean;
	position?: Position;
	size?: Size;
	className?: string | undefined;
	disabled?: boolean | undefined;
	/** If true, apply disabled styles to children only (keeps label container visually enabled) */
	disabledAsChild?: boolean;
	/** Shows the intermediate (indeterminate) icon when true */
	intermediate?: boolean;
	v2?: boolean;
}
