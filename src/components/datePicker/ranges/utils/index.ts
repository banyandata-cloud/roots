import { getUnixTime, subDays, subHours, subMonths } from 'date-fns';

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

export const dateRanges = (customRanges: CustomRange[] = [], alignToFullDay = false): DateRange[] => {
	if (customRanges?.length > 0) {
		return customRanges.map((range) => {
			return {
				title: range.title,
				dateRange: getDateAndUnixRange(
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
