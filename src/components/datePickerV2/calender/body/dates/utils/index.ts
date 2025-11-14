import { fromUnixTime, getUnixTime, isAfter, isBefore } from 'date-fns';
import { MONTHS } from '../../../../../../constants';
import { getDatesInAMonth } from '../../../../../../utils';

interface GetDatesOfLastWeekParams {
	monthAsNumber: number;
	year: number;
	remainingDaysInFirstWeek: number;
}

interface GetDatesOfFirstWeekParams {
	monthAsNumber: number;
	year: number;
	remainingDaysInLastWeek: number;
}

interface GetDatesToDisplayParams {
	monthAsNumber: number;
	year: number;
	days: number[];
	dateObj: Date[];
}

interface DateRange {
	dates: string[];
	unix: number[];
}

interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

interface RangeSelectionParams {
	selectedRange: SelectedRange;
	date: Date;
}

const getDatesOfLastWeekOfLastMonth = ({
	monthAsNumber,
	year,
	remainingDaysInFirstWeek,
}: GetDatesOfLastWeekParams): Date[] => {
	if (remainingDaysInFirstWeek === 0) {
		return [];
	}

	let month: number;
	let fullYear: number;
	if (monthAsNumber === 0) {
		month = 11;
		fullYear = year - 1;
	} else {
		month = monthAsNumber - 1;
		fullYear = year;
	}
	const { dateObj } = getDatesInAMonth({
		month,
		year: fullYear,
	});

	return dateObj.slice(-remainingDaysInFirstWeek);
};

const getDatesOfFirstWeekOfNextMonth = ({
	monthAsNumber,
	year,
	remainingDaysInLastWeek,
}: GetDatesOfFirstWeekParams): Date[] => {
	let month: number;
	let fullYear: number;
	if (monthAsNumber === 11) {
		month = 0;
		fullYear = year + 1;
	} else {
		month = monthAsNumber + 1;
		fullYear = year;
	}
	const { dateObj } = getDatesInAMonth({
		month,
		year: fullYear,
	});
	return dateObj.slice(0, remainingDaysInLastWeek);
};

export const getDatesToDisplay = ({
	monthAsNumber,
	year,
	days,
	dateObj,
}: GetDatesToDisplayParams): Date[] => {
	const [firstDay] = days;
	const lastDayIndex = days.length - 1;
	const lastDay = days[lastDayIndex];

	if (firstDay === undefined || lastDay === undefined) {
		return dateObj;
	}

	const dates: Date[] = [
		...getDatesOfLastWeekOfLastMonth({
			monthAsNumber,
			year,
			remainingDaysInFirstWeek: firstDay,
		}),
		...dateObj,
		...getDatesOfFirstWeekOfNextMonth({
			monthAsNumber,
			year,
			remainingDaysInLastWeek: 7 - (lastDay + 1),
		}),
	];

	return dates;
};

export const rangeSelection = ({ selectedRange, date }: RangeSelectionParams): DateRange => {
	const dateAsNumber: number = date.getDate();
	const monthIndex = date.getMonth();
	const monthValue = MONTHS[monthIndex];
	const month: string = monthValue !== undefined ? monthValue.substring(0, 3) : '';
	const year: number = date.getFullYear();

	const selectedUnix = selectedRange.unix;
	const selectedDates = selectedRange.dates;

	if (selectedUnix?.[0] === getUnixTime(date.setHours(0, 0, 0, 0))) {
		return {
			dates: [],
			unix: [],
		};
	}

	if (!selectedDates || selectedDates.length === 0) {
		return {
			dates: [
				`${String(dateAsNumber)} ${month} ${String(year)}`,
				`${String(dateAsNumber)} ${month} ${String(year)}`,
			],
			unix: [
				getUnixTime(date.setHours(0, 0, 0, 0)),
				getUnixTime(
					date.toDateString() === new Date().toDateString()
						? new Date()
						: date.setHours(23, 59, 59, 59)
				),
			],
		};
	}

	if (selectedDates.length < 2) {
		const firstUnix = selectedUnix?.[0];
		if (
			selectedDates.length === 1 &&
			selectedUnix !== undefined &&
			firstUnix !== undefined &&
			isBefore(date, fromUnixTime(firstUnix))
		) {
			return {
				dates: [`${String(dateAsNumber)} ${month} ${String(year)}`, ...selectedDates],
				unix: [getUnixTime(date), ...selectedUnix],
			};
		}

		if (selectedUnix !== undefined) {
			return {
				dates: [...selectedDates, `${String(dateAsNumber)} ${month} ${String(year)}`],
				unix: [
					...selectedUnix,
					getUnixTime(
						date.toDateString() === new Date().toDateString()
							? new Date()
							: date.setHours(23, 59, 59, 59)
					),
				],
			};
		}
	}

	const firstUnix = selectedUnix?.[0];
	const secondUnix = selectedUnix?.[1];

	if (
		firstUnix !== undefined &&
		secondUnix !== undefined &&
		(isBefore(date, fromUnixTime(secondUnix)) || isAfter(date, fromUnixTime(secondUnix))) &&
		isAfter(date, fromUnixTime(firstUnix))
	) {
		const firstDate = selectedDates[0];
		if (firstDate !== undefined) {
			return {
				dates: [firstDate, `${String(dateAsNumber)} ${month} ${String(year)}`],
				unix: [
					firstUnix,
					getUnixTime(
						date.toDateString() === new Date().toDateString()
							? new Date()
							: date.setHours(23, 59, 59, 59)
					),
				],
			};
		}
	}

	if (firstUnix !== undefined && isBefore(date, fromUnixTime(firstUnix))) {
		const secondDate = selectedDates[1];
		if (secondDate !== undefined && secondUnix !== undefined) {
			return {
				dates: [`${String(dateAsNumber)} ${month} ${String(year)}`, secondDate],
				unix: [getUnixTime(date), secondUnix],
			};
		}
	}

	return {
		dates: [],
		unix: [],
	};
};
