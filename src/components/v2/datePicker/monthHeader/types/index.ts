export type MonthHeaderPosition = 'left' | 'right' | 'single';

export interface MonthHeaderProps {
	title: string;
	position: MonthHeaderPosition;
	onPrevYear: () => void;
	onPrevMonth: () => void;
	onNextMonth: () => void;
	onNextYear: () => void;
	/** Future dates not allowed and the next month/year is after today. */
	forwardDisabled?: boolean | undefined;
}
