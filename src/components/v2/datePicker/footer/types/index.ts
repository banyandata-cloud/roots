import type { DropdownOption } from '../../../input/dropdown/types';

export interface FooterProps {
	defaultPresetOptions: DropdownOption[];
	defaultPresetValue: string;
	onDefaultPresetChange: (value: string) => void;
	hour12: boolean;
	onHour12Change: (hour12: boolean) => void;
	timeZone: string;
	onCancel: () => void;
	onApply: () => void;
	applyDisabled?: boolean | undefined;
	/** Hides the Apply button text area change — auto-apply already applied the value. */
	showApply?: boolean | undefined;
}
