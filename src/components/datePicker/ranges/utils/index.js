import { getUnixTime, sub } from 'date-fns';
import { getDatesInStringFormat } from '../../../../utils';

const getDateAndUnixRange = (duration) => {
	const startingDate = sub(new Date(), duration);

	const endingDate = new Date();

	const dates = getDatesInStringFormat({
		startingDate,
		endingDate,
	});

	const unix = [
		getUnixTime(startingDate.setHours(0, 0, 0, 0)),
		getUnixTime(endingDate.setHours(23, 59, 59, 59)),
	];

	return {
		dates,
		unix,
	};
};

export const dateRanges = (customRanges = []) => {
	console.log({
		customRanges,
	});
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
