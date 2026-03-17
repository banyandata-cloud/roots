export interface SelectedDate {
	date?: number;
	month?: string;
	year?: number;
	unix?: number;
}

export interface SelectedMonth {
	month: string;
	monthAsNumber: number;
	year: number;
}

export interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

export interface TimeSlot {
	HOURS?: number | undefined;
	MINS?: number | undefined;
	MER?: string | undefined;
}

export interface TimeRangeSelection {
	next?: TimeSlot;
	previous?: TimeSlot;
}

export interface CustomRange {
	title: string;
	type: string;
	value: number;
}

export type ActiveTimeSelection = {
	previous?: 'HR' | 'MIN' | undefined;
	next?: 'HR' | 'MIN' | undefined;
};

export interface CalenderProps {
	range?: boolean;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	selectedRange: SelectedRange;
	setSelectedRange: (range: SelectedRange) => void;
	onApply: () => void;
	onClear: () => void;
	disabledDates?: string[];
	disableDatesBefore?: number;
	disableDatesAfter?: number;
	value?: number | number[];
	setFixedRange?: (value: boolean) => void;
	fixedRange?: boolean;
	customRanges?: CustomRange[];
	timeRangeSelection?: TimeRangeSelection;
	setTimeRangeSelection: (value: TimeRangeSelection) => void;
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	defaultHourDiff?: number;
	limitHours?: number;
	showTime?: boolean;
	valueAsRange?: boolean;
	enableFutureDates?: boolean;
}
