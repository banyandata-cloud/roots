import type { ChangeEvent, ReactNode } from 'react';
import type { IndicatorType } from '../assets/Indicator/types/index';

export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps {
	label?: string | undefined;
	size?: TagSize | undefined;
	/** Shows the close button; use `onClose` to react to it. */
	closable?: boolean | undefined;
	onClose?: (() => void) | undefined;
	/** Leading checkbox. */
	checkbox?: boolean | undefined;
	checked?: boolean | undefined;
	defaultChecked?: boolean | undefined;
	onCheckedChange?: ((checked: boolean) => void) | undefined;
	/** Leading status dot (Figma "Status"). */
	indicator?: boolean | undefined;
	indicatorType?: IndicatorType | undefined;
	/** Leading 16px icon (Figma "icons"). */
	icon?: ReactNode;
	/** Count chip after the label. */
	count?: number | undefined;
	/** Label followed by an editable value (Figma "Search"). */
	textField?: boolean | undefined;
	/** Label only, e.g. "Label:" (Figma "Searchtag"). */
	searchTag?: boolean | undefined;
	readOnly?: boolean | undefined;
	inputValue?: string | undefined;
	defaultInputValue?: string | undefined;
	inputPlaceholder?: string | undefined;
	onInputChange?: ((value: string, event: ChangeEvent<HTMLInputElement>) => void) | undefined;
	onInputBlur?: (() => void) | undefined;
	onInputEnter?: (() => void) | undefined;
	onInputClear?: (() => void) | undefined;
	onClick?: (() => void) | undefined;
}
