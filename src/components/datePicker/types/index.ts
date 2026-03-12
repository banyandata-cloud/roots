import type {
	TimeSlot,
	TimeRangeSelection,
	SelectedDate,
	SelectedRange,
	SelectedMonth,
	CustomRange,
} from '../calender/types';

export type {
	TimeSlot,
	TimeRangeSelection,
	SelectedDate,
	SelectedRange,
	SelectedMonth,
	CustomRange,
};

export interface MaxRange {
	value: number;
	type: 'months' | 'days';
}

export interface ApplyArgs {
	rangeSelected: SelectedRange;
	dateSelected?: SelectedDate;
}

export interface DatePickerProps {
	placeholder?: string;
	label?: string;
	range?: boolean;
	onApply?: ((value: number | number[], fixedRange: string | null, tag: string) => void) | null;
	onClear?: () => void;
	value?: number | number[] | null;
	disabled?: boolean;
	disabledDates?: string[];
	maxRange?: MaxRange | null;
	className?: string;
	disableDatesBefore?: number[];
	disableDatesAfter?: number[];
	defaultRangeSelection?: number[] | null;
	customRanges?: CustomRange[] | null;
	custom?: boolean;
	highlightOnSelect?: boolean;
	valueAsRange?: boolean;
	defaultHourDiff?: number | null;
	limitHours?: number | null;
	showTime?: boolean;
	timeRange?: boolean;
	popperClassName?: string;
	showCustomRanges?: boolean;
	v2?: boolean;
	enableFutureDates?: boolean;
}
