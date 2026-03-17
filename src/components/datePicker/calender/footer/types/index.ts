import type { SelectedDate, SelectedRange, CustomRange } from '../../Calender';

export interface FooterProps {
	selectedDate?: SelectedDate | undefined;
	selectedRange?: SelectedRange | undefined;
	setSelectedRange?: ((range: SelectedRange) => void) | undefined;
	setSelectedDate?: ((date: SelectedDate) => void) | undefined;
	onApply: () => void;
	onClear: () => void;
	value?: number | number[] | undefined;
	customRanges?: CustomRange[] | undefined;
	setFixedRange?: ((value: boolean) => void) | undefined;
}
