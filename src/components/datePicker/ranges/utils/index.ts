import { getUnixTime, sub } from 'date-fns';
import { getDatesInStringFormat } from '../../../../utils';

// --- Types ---

interface Duration {
	[key: string]: number;
}

interface DateRange {
	dates: string[];
	unix: number[];
}

interface CustomRange {
	title: string;
	type: string;
	value: number;
}

interface DateRangeResult {
	title: string;
	dateRange: DateRange;
}

interface TimeSlot {
	label: string;
	value: number;
}

// --- Utils ---

export const getDateAndUnixRange = (duration: Duration): DateRange => {
	const startingDate = sub(new Date(), duration);
	const endingDate = new Date();

	const dates = getDatesInStringFormat({
		startingDate,
		endingDate,
	}) as string[];

	const unix = [
		getUnixTime(startingDate.setHours(0, 0, 0, 0)),
		getUnixTime(endingDate.setHours(23, 59, 59, 59)),
	];

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

export const timeRanges = (): TimeSlot[] => {
	const timeArray: TimeSlot[] = [];
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
