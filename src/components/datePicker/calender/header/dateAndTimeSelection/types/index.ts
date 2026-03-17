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

export interface DateAndTimeSelectionProps {
	selectedDate?: SelectedDate | undefined;
	setActiveGoToSelection: (value: string) => void;
	activeGoToSelection?: string | undefined;
	showDateSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	showTimeSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	timeRangeSelection?: TimeRangeSelection | undefined;
	showTime?: boolean | undefined;
	valueAsRange?: boolean | undefined;
}
