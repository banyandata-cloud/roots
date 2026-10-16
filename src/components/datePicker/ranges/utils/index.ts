import {
	endOfMonth,
	endOfQuarter,
	getUnixTime,
	startOfMonth,
	startOfQuarter,
	startOfYear,
	subDays,
	subHours,
	subMonths,
} from 'date-fns';

interface RangeObj {
	hours?: number;
	days?: number;
	months?: number;
}

export interface DateUnixRange {
	dates: Date[];
	unix: number[];
}

interface CustomRange {
	title: string;
	type: string;
	value: number;
}

interface DateRange {
	title: string;
	dateRange: DateUnixRange;
}

interface TimeRange {
	label: string;
	value: number;
}

const getCalendarPresetRange = (title: string, now: Date): DateUnixRange | null => {
	let startDate: Date;
	let endDate: Date;

	switch (title) {
		case 'This Month':
			startDate = startOfMonth(now);
			endDate = endOfMonth(now);
			break;
		case 'This Quarter':
			startDate = startOfQuarter(now);
			endDate = now;
			break;
		case 'This Year':
			startDate = startOfYear(now);
			endDate = now;
			break;
		case 'Last Month':
			startDate = startOfMonth(subMonths(now, 1));
			endDate = endOfMonth(startDate);
			break;
		case 'Last Quarter': {
			const previousQuarter = subMonths(now, 3);
			startDate = startOfQuarter(previousQuarter);
			endDate = endOfQuarter(previousQuarter);
			break;
		}
		case 'Last 3 Months':
			startDate = startOfMonth(subMonths(now, 3));
			endDate = endOfMonth(subMonths(now, 1));
			break;
		case 'Last 6 Months':
			startDate = startOfMonth(subMonths(now, 6));
			endDate = endOfMonth(subMonths(now, 1));
			break;
		case 'Last 12 Months':
			startDate = startOfMonth(subMonths(now, 12));
			endDate = endOfMonth(subMonths(now, 1));
			break;
		default:
			return null;
	}

	return {
		dates: [startDate, endDate],
		unix: [getUnixTime(startDate), getUnixTime(endDate)],
	};
};

export const getDateAndUnixRange = (
	rangeObj: RangeObj = {},
	alignToFullDay = false
): DateUnixRange => {
	const now = new Date();

	const inclusiveValue = (value: number): number => {
		return alignToFullDay ? Math.max(value - 1, 0) : value;
	};

	let startDate: Date | undefined;

	if (rangeObj.hours) {
		startDate = subHours(now, rangeObj.hours);
	} else if (rangeObj.days) {
		startDate = subDays(now, inclusiveValue(rangeObj.days));
	} else if (rangeObj.months) {
		startDate = subMonths(now, inclusiveValue(rangeObj.months));
	}

	if (!startDate) {
		return {
			dates: [],
			unix: [],
		};
	}

	const endDate = new Date(now);

	if (alignToFullDay && !rangeObj.hours) {
		startDate.setHours(0, 0, 0, 0);
		endDate.setHours(23, 59, 59, 999);
	}

	return {
		dates: [startDate, endDate],
		unix: [getUnixTime(startDate), getUnixTime(endDate)],
	};
};

export const dateRanges = (
	customRanges: CustomRange[] = [],
	alignToFullDay = false,
	useCalendarPresets = false
): DateRange[] => {
	if (customRanges?.length > 0) {
		return customRanges.map((range) => {
			return {
				title: range.title,
				dateRange:
					(useCalendarPresets ? getCalendarPresetRange(range.title, new Date()) : null) ??
					getDateAndUnixRange(
						{
							[range.type]: range.value,
						},
						alignToFullDay
					),
			};
		});
	}
	return [];
};

export const timeRanges = (): TimeRange[] => {
	const timeArray: TimeRange[] = [];
	const HALF_HOUR_IN_SECONDS = 30 * 60;
	const TOTAL_HALF_HOURS = 48;

	for (let i = 0; i < TOTAL_HALF_HOURS; i++) {
		const totalSeconds = i * HALF_HOUR_IN_SECONDS;
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);

		const formattedHours = hours.toString().padStart(2, '0');
		const formattedMinutes = minutes.toString().padStart(2, '0');

		timeArray.push({
			label: `${formattedHours}:${formattedMinutes}`,
			value: totalSeconds,
		});
	}

	return timeArray;
};
