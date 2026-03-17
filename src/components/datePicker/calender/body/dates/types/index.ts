export interface SelectedMonth {
	month: string;
	monthAsNumber: number;
	year: number;
}

export interface SelectedDate {
	date?: number;
	month?: string;
	year?: number;
	unix?: number;
}

export interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

export interface DatesInMonth {
	days: number[];
	dateObj: Date[];
}

export interface DatesProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	range?: boolean | undefined;
	selectedRange: SelectedRange;
	setSelectedRange: (range: SelectedRange) => void;
	disabledDates: string[];
	disableDatesBefore?: number | undefined;
	enableFutureDates?: boolean | undefined;
	disableDatesAfter?: number | undefined;
	setFixedRange?: ((value: boolean) => void) | undefined;
}
