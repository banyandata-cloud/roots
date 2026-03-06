import { getUnixTime } from 'date-fns';

import { subDays, subHours, subMonths } from 'date-fns';

export const getDateAndUnixRange = (rangeObj = {}) => {
	const now = new Date();
	const nowUnix = getUnixTime(now);

	if (rangeObj.hours) {
		const startDate = subHours(now, rangeObj.hours);
		const startUnix = getUnixTime(startDate);

		return {
			dates: [startDate, now],
			unix: [startUnix, nowUnix],
		};
	}

	if (rangeObj.days) {
		const startDate = subDays(now, rangeObj.days);
		const startUnix = getUnixTime(startDate);

		return {
			dates: [startDate, now],
			unix: [startUnix, nowUnix],
		};
	}

	if (rangeObj.months) {
		const startDate = subMonths(now, rangeObj.months);
		const startUnix = getUnixTime(startDate);

		return {
			dates: [startDate, now],
			unix: [startUnix, nowUnix],
		};
	}

	return {
		dates: [],
		unix: [],
	};
};

export const dateRanges = (customRanges = []) => {
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

export const timeRanges = () => {
	const timeArray = [];
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
