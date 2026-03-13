import { getUnixTime, sub } from 'date-fns';
import { getDatesInStringFormat } from '../../../../utils';

interface CustomRange {
	title: string;
	type: string;
	value: number;
}

interface DateRange {
	dates: string[];
	unix: number[];
}

interface DateRangeResult {
	title: string;
	dateRange: DateRange;
}

type Duration = {
	[key: string]: number;
};

const getDateAndUnixRange = (duration: Duration): DateRange => {
	const startingDate = sub(new Date(), duration);
	const endingDate = new Date();

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

export const dateRanges = (customRanges: CustomRange[] = []): DateRangeResult[] => {
	if (customRanges?.length > 0) {
		return customRanges.map((range) => {
			return {
				title: range.title,
				dateRange: getDateAndUnixRange({
					[range.type]: range.value,
				}),
			};
		});
	}
	return [];
};
