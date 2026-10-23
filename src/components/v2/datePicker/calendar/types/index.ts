import type { MonthHeaderPosition } from '../../monthHeader/types';

export interface CalendarProps {
	/** Any day within the month to display. */
	month: Date;
	position: MonthHeaderPosition;
	now: Date;
	future: boolean;
	selectionStart: Date | null;
	selectionEnd: Date | null;
	hoverPreviewEnd: Date | null;
	onSelectDay: (date: Date) => void;
	onHoverDay: (date: Date) => void;
	onHoverLeave: () => void;
	onPrevYear: () => void;
	onPrevMonth: () => void;
	onNextMonth: () => void;
	onNextYear: () => void;
}
