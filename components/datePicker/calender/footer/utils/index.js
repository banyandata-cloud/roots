import { getUnixTime, sub } from 'date-fns';
import { MONTHS } from '../../../../../constants';

const getDateAndUnixRange = (duration) => {
	const startingDate = sub(new Date(), duration);
	startingDate.setHours(0, 0, 0, 0);

	const endingDate = new Date();
	endingDate.setHours(0, 0, 0, 0);

	const dates = [
		`${startingDate.getDate()} ${MONTHS[startingDate.getMonth()].substring(
			0,
			3
		)} ${startingDate.getFullYear()}`,
		`${endingDate.getDate()} ${MONTHS[endingDate.getMonth()].substring(
			0,
			3
		)} ${endingDate.getFullYear()}`,
	];

	const unix = [getUnixTime(startingDate), getUnixTime(endingDate)];

	return {
		dates,
		unix,
	};
};

export const dateRanges = [
	{
		title: '7 Days',
		dateRange: getDateAndUnixRange({
			days: 7,
		}),
	},
	{
		title: '15 Days',
		dateRange: getDateAndUnixRange({
			days: 15,
		}),
	},
	{
		title: '1 Month',
		dateRange: getDateAndUnixRange({
			months: 1,
		}),
	},
];
