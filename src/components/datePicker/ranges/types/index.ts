export interface DateRange {
	dates: Date[];
	unix: number[];
}

export interface CustomRange {
	title: string;
	type: string;
	value: number;
}

export interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

export interface CustomRangesProps {
	customRanges?: CustomRange[] | undefined;
	selectedRange?: SelectedRange | undefined;
	setSelectedRange: (range: DateRange) => void;
	setFixedRange: (title: string) => void;
}
