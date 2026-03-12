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

export interface SwitchSelectorProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	type: 'month' | 'year';
}

export interface DateSwitcherProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
}
