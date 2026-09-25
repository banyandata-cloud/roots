export interface TimeSlot {
	HOURS?: number | undefined;
	MINS?: number | undefined;
	MER?: string | undefined;
}

export interface TimeRangeSelection {
	next?: TimeSlot | undefined;
	previous?: TimeSlot | undefined;
}

export interface SelectedDate {
	date?: number;
	month?: string;
	year?: number;
}

export interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

export interface SelectedMonth {
	month: string;
	monthAsNumber: number;
	year: number;
}

export type ActiveTimeSelection = {
	previous?: 'HR' | 'MIN' | undefined;
	next?: 'HR' | 'MIN' | undefined;
};

export interface DateAndTimeSelectionProps {
	selectedDate?: SelectedDate | undefined;
	setActiveGoToSelection: (value: string) => void;
	activeGoToSelection?: string | undefined;
	showDateSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	showTimeSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	timeRangeSelection?: TimeRangeSelection | undefined;
	showTime?: boolean | undefined;
	valueAsRange?: boolean | undefined;
	range?: boolean | undefined;
	selectedRange?: SelectedRange | undefined;
	setSelectedMonth?: ((month: SelectedMonth) => void) | undefined;
	setActiveTimeSelection?: ((value: ActiveTimeSelection) => void) | undefined;
	committedRange?: SelectedRange | undefined;
}
