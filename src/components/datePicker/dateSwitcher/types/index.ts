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

export interface SwitchSelectorProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	type: 'month' | 'year';
	range?: boolean | undefined;
	timeRange?: boolean | undefined;
	selectedRange?: SelectedRange | undefined;
	setSelectedRange?: ((range: SelectedRange) => void) | undefined;
	committedRange?: SelectedRange | undefined;
	activeGoToSelection?: string | undefined;
	isDefaultRangeUntouched?: boolean | undefined;
	setIsDefaultRangeUntouched?: ((value: boolean) => void) | undefined;
}

export interface DateSwitcherProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	range?: boolean | undefined;
	timeRange?: boolean | undefined;
	selectedRange?: SelectedRange | undefined;
	setSelectedRange?: ((range: SelectedRange) => void) | undefined;
	committedRange?: SelectedRange | undefined;
	activeGoToSelection?: string | undefined;
	isDefaultRangeUntouched?: boolean | undefined;
	setIsDefaultRangeUntouched?: ((value: boolean) => void) | undefined;
}
