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

export interface SelectedRange {
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

	const { dateObj } = getDatesInAMonth({ month, year: fullYear }) as { dateObj: Date[] };

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

	const { dateObj } = getDatesInAMonth({ month, year: fullYear }) as { dateObj: Date[] };

	return dateObj.slice(0, remainingDaysInLastWeek);
};

export const getDatesToDisplay = ({
	monthAsNumber,
	year,
	days,
	dateObj,
}: GetDatesToDisplayParams): Date[] => {
	const [firstDay] = days;

	const dates: Date[] = [
		...getDatesOfLastWeekOfLastMonth({
			monthAsNumber,
			year,
			remainingDaysInFirstWeek: firstDay!,
		}),
		...dateObj,
		...getDatesOfFirstWeekOfNextMonth({
			monthAsNumber,
			year,
			remainingDaysInLastWeek: 7 - (days[days.length - 1]! + 1),
		}),
	];

	return dates;
};

export const rangeSelection = ({ selectedRange, date }: RangeSelectionParams): SelectedRange => {
	const dateAsNumber = date?.getDate();
	const month = MONTHS[date?.getMonth()]?.substring(0, 3);
	const year = date?.getFullYear();

	if (selectedRange.unix?.[0] === getUnixTime(new Date(date).setHours(0, 0, 0, 0))) {
		return { dates: [], unix: [] };
	}

	if (!selectedRange?.dates || selectedRange?.dates?.length === 0) {
		return {
			dates: [`${dateAsNumber} ${month} ${year}`],
			unix: [getUnixTime(new Date(date).setHours(0, 0, 0, 0))],
		};
	}

	if (selectedRange.dates?.length < 2) {
		if (
			selectedRange.dates?.length === 1 &&
			isBefore(date, fromUnixTime(selectedRange.unix?.[0] as number))
		) {
			return {
				dates: [`${dateAsNumber} ${month} ${year}`, ...selectedRange.dates],
				unix: [
					getUnixTime(new Date(date).setHours(0, 0, 0, 0)),
					getUnixTime(new Date(date).setHours(23, 59, 59, 59)),
					...(selectedRange.unix as number[]),
				],
			};
		}

		return {
			dates: [...selectedRange.dates, `${dateAsNumber} ${month} ${year}`],
			unix: [
				...(selectedRange.unix as number[]),
				getUnixTime(new Date(date).setHours(23, 59, 59, 59)),
			],
		};
	}

	if (
		(isBefore(date, fromUnixTime(selectedRange.unix?.[1] as number)) ||
			isAfter(date, fromUnixTime(selectedRange.unix?.[1] as number))) &&
		isAfter(date, fromUnixTime(selectedRange.unix?.[0] as number))
	) {
		return {
			dates: [selectedRange.dates?.[0] as string, `${dateAsNumber} ${month} ${year}`],
			unix: [
				selectedRange.unix?.[0] as number,
				getUnixTime(new Date(date).setHours(23, 59, 59, 59)),
			],
		};
	}

	if (isBefore(date, fromUnixTime(selectedRange.unix?.[0] as number))) {
		return {
			dates: [`${dateAsNumber} ${month} ${year}`, selectedRange.dates?.[1] as string],
			unix: [
				getUnixTime(new Date(date).setHours(0, 0, 0, 0)),
				selectedRange.unix?.[1] as number,
			],
		};
	}

	return { dates: [], unix: [] };
};
