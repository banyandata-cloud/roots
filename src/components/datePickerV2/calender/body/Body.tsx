import { useState, type ReactElement } from 'react';
import styles from './Body.module.css';
import { Dates } from './dates';
import { Days } from './days';

interface SelectedMonth {
	month: string;
	monthAsNumber: number;
	year: number;
}

interface SelectedDate {
	month?: string;
	year?: number;
	date?: number;
	unix?: number;
}

interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

interface BodyProps {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	displayMonthRight: SelectedMonth;
	setDisplayMonthRight: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	range: boolean;
	selectedRange: SelectedRange;
	setSelectedRange: (range: SelectedRange) => void;
	disabledDates: string[];
	disableDatesBefore: number[];
	enableFutureDates: boolean;
	disableDatesAfter: number[];
	setFixedTime: (time: number) => void;
	setFixedTimeRange: (range: [number, number]) => void;
}

interface DatesPropsExtended {
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	displayMonthRight: SelectedMonth;
	setDisplayMonthRight: (month: SelectedMonth) => void;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	range: boolean;
	selectedRange: SelectedRange;
	setSelectedRange: (range: SelectedRange) => void;
	disabledDates: string[];
	disableDatesBefore: number[];
	enableFutureDates: boolean;
	disableDatesAfter: number[];
	setFixedTime: (time: number) => void;
	setFixedTimeRange: (range: [number, number]) => void;
}

const Body = (props: BodyProps): ReactElement => {
	const {
		displayMonthRight,
		setDisplayMonthRight,
		selectedDate,
		setSelectedDate,
		range,
		selectedRange,
		setSelectedRange,
		disabledDates,
		disableDatesBefore,
		enableFutureDates,
		disableDatesAfter,
		setFixedTime,
		setFixedTimeRange,
	} = props;

	const [hoveredEndingDate, setHoveredEndingDate] = useState<number | null>(() => {
		return null;
	});

	const prp1: DatesPropsExtended = {
		selectedMonth: displayMonthRight,
		setSelectedMonth: setDisplayMonthRight,
		displayMonthRight,
		setDisplayMonthRight,
		selectedDate,
		setSelectedDate,
		range,
		selectedRange,
		setSelectedRange,
		disabledDates,
		disableDatesBefore,
		enableFutureDates,
		disableDatesAfter,
		setFixedTime,
		setFixedTimeRange,
	};

	return (
		<div className={styles.root}>
			<div className={styles['body-left']}>
				<Days />
				<Dates
					hoveredEndingDate={hoveredEndingDate}
					setHoveredEndingDate={setHoveredEndingDate}
					{...props}
				/>
			</div>
			<div className={styles['body-right']}>
				<Days />
				<Dates
					hoveredEndingDate={hoveredEndingDate}
					setHoveredEndingDate={setHoveredEndingDate}
					{...prp1}
				/>
			</div>
		</div>
	);
};

export default Body;
