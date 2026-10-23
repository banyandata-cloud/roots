import type { ReactElement } from 'react';

export type DatePickerMode = 'single' | 'range';

export type SingleTimeMode = 'whole-day' | 'particular' | 'range';

/** 24-hour internal representation; display formatting (12/24h) happens at render time. */
export interface TimeOfDay {
	hour: number;
	minute: number;
}

export interface PresetDefinition {
	id: string;
	label: string;
	/** Computes the concrete dates for "now" — moving presets recompute every time they're read. */
	resolve: (now: Date) => { from: Date; to: Date };
}

export interface DatePickerValue {
	/** Preset id when the value matches a known preset exactly; null/undefined for a custom value. */
	preset?: string | null | undefined;
	from: Date | null;
	to: Date | null;
	fromTime?: TimeOfDay | null | undefined;
	toTime?: TimeOfDay | null | undefined;
	/** Single mode only: which time sub-mode is active. */
	timeMode?: SingleTimeMode | undefined;
}

export interface DatePickerProps {
	/** One date or a range. Fixed per page. */
	mode?: DatePickerMode | undefined;
	/** Shows the time controls. Turns auto-apply off. */
	time?: boolean | undefined;
	/** Allows future days and adds the future presets. */
	future?: boolean | undefined;
	/** Applies after the second click or a preset. Ignored when time is on. */
	autoApply?: boolean | undefined;
	/** First day with data (new tenant). Earlier starts are moved to it. */
	dataStart?: Date | null | undefined;
	/** Per user and per page default preset id. */
	defaultPreset?: string | undefined;
	value?: DatePickerValue | undefined;
	defaultValue?: DatePickerValue | undefined;
	/** Fires when a value is applied (auto-apply or the Apply button). */
	onChange?: ((value: DatePickerValue) => void) | undefined;
	onCancel?: (() => void) | undefined;
	/** Set by the 24-hour switch; shared by all time controls. */
	hour12?: boolean | undefined;
	onHour12Change?: ((hour12: boolean) => void) | undefined;
	/** Shown in the footer; API conversion is a developer task. */
	timeZone?: string | undefined;
	open?: boolean | undefined;
	defaultOpen?: boolean | undefined;
	onOpenChange?: ((open: boolean) => void) | undefined;
	/**
	 * Custom trigger renderer; a default C1-style trigger button is rendered when omitted.
	 * Not yet matched to the final Figma C1 spec — refine once it is available.
	 */
	trigger?:
		| ((state: { label: string; subLabel: string | undefined; open: boolean }) => ReactElement)
		| undefined;
	className?: string | undefined;
	id?: string | undefined;
}

export type DayBand = 'none' | 'full';

export interface DayInfo {
	date: Date;
	inCurrentMonth: boolean;
	isToday: boolean;
	isDisabled: boolean;
	isSelectionStart: boolean;
	isSelectionEnd: boolean;
	isInRange: boolean;
	isHoverPreview: boolean;
	/** A strictly-in-between day gets the flat, full-width band; the selected pill never does. */
	band: DayBand;
}

export type DateFieldRole = 'start' | 'end' | 'date';
