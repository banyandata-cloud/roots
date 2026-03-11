import type { Duration } from 'date-fns';
import { getUnixTime, sub } from 'date-fns';
import { getDatesInStringFormat } from '../../../../../utils';

// --- Types ---

interface DateRange {
	dates: string[];
	unix: number[];
}

interface DateRangeItem {
	title: string;
	dateRange: DateRange;
}

interface CustomRange {
	title: string;
	type: keyof Duration;
	value: number;
}

// --- Helper Function ---

const getDateAndUnixRange = (duration: Duration): DateRange => {
	const startingDate = sub(new Date(), duration);
	startingDate.setHours(0, 0, 0, 0);

	const endingDate = new Date();
	endingDate.setHours(0, 0, 0, 0);

	const dates = getDatesInStringFormat({
		startingDate,
		endingDate,
	}) as string[];

	const unix = [getUnixTime(startingDate), getUnixTime(endingDate)];

	return {
		dates,
		unix,
	};
};

// --- Exported Function ---

export const dateRanges = (customRanges: CustomRange[] = []): DateRangeItem[] => {
	if (customRanges?.length > 0) {
		return customRanges.map((range) => {
			return {
				title: range.title,
				dateRange: getDateAndUnixRange({
					[range.type]: [range.value],
				}),
			};
		});
	}

	return [
		{
			title: 'Last 24 Hours',
			dateRange: getDateAndUnixRange({ hours: 24 }),
		},
		{
			title: 'Last 7 Days',
			dateRange: getDateAndUnixRange({ days: 7 }),
		},
		{
			title: 'Last 15 Days',
			dateRange: getDateAndUnixRange({ days: 15 }),
		},
		{
			title: 'Last 1 Month',
			dateRange: getDateAndUnixRange({ months: 1 }),
		},
	];
};
