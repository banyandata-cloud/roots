import { getUnixTime, sub } from 'date-fns';
import { getDatesInStringFormat } from '../../../../../utils';

const getDateAndUnixRange = (duration) => {
	const startingDate = sub(new Date(), duration);
	startingDate.setHours(0, 0, 0, 0);

	const endingDate = new Date();
	endingDate.setHours(0, 0, 0, 0);

	const dates = getDatesInStringFormat({
		startingDate,
		endingDate,
	});

	const unix = [getUnixTime(startingDate), getUnixTime(endingDate)];

	return {
		dates,
		unix,
	};
};

export const dateRanges = (customRanges = []) => {
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
			dateRange: getDateAndUnixRange({
				hours: 24,
			}),
		},
		{
			title: 'Last 7 Days',
			dateRange: getDateAndUnixRange({
				days: 7,
			}),
		},
		{
			title: 'Last 15 Days',
			dateRange: getDateAndUnixRange({
				days: 15,
			}),
		},
		{
			title: 'Last 1 Month',
			dateRange: getDateAndUnixRange({
				months: 1,
			}),
		},
	];
};
