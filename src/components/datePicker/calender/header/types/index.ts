import type {
	SelectedDate,
	SelectedMonth,
	SelectedRange,
	TimeRangeSelection,
	ActiveTimeSelection,
} from '../../Calender';

export interface HeaderProps {
	range?: boolean | undefined;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	selectedRange: SelectedRange;
	setSelectedRange: (range: SelectedRange) => void;
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	onMonthChange: (direction: 'prev' | 'next') => void;
	showDateSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	showTimeSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	dateSelectionView: boolean;
	timeSelectionView: boolean;
	activeGoToSelection?: string | undefined;
	setActiveGoToSelection: (value: string) => void;
	activeTimeSelection?: ActiveTimeSelection | undefined;
	setActiveTimeSelection: (value: ActiveTimeSelection | undefined) => void;
	timeRangeSelection?: TimeRangeSelection | undefined;
	setTimeRangeSelection?: ((value: TimeRangeSelection) => void) | undefined;
	defaultHourDiff?: number | undefined;
	limitHours?: number | undefined;
	showTime?: boolean | undefined;
	valueAsRange?: boolean | undefined;
}

export interface CarouselSwitchProps {
	onMonthChange: (direction: 'prev' | 'next') => void;
	selectedMonth: SelectedMonth;
}
