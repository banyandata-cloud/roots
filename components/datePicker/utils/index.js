import { differenceInDays, differenceInHours, differenceInMonths, fromUnixTime } from 'date-fns';

export const isMaxRangeExceeded = ({ maxRange, selectedRange }) => {
	if (maxRange === null) {
		return false;
	}

	const { value, type } = maxRange;
	const { unix } = selectedRange;
	const [firstDateInRange, secondDateInRange] = unix;

	const diffInMonth = differenceInMonths(
		fromUnixTime(secondDateInRange),
		fromUnixTime(firstDateInRange)
	);
	const diffInDays = differenceInDays(
		fromUnixTime(secondDateInRange),
		fromUnixTime(firstDateInRange)
	);

	if (type === 'months') {
		return diffInMonth <= value && diffInDays < value * 30;
	}

	if (type === 'days') {
		return diffInDays <= value;
	}

	return false;
};

export const getDateRangeTag = (dates = []) => {
	const [startUnix, endUnix] = dates;

	const dayDifference = differenceInDays(fromUnixTime(endUnix), fromUnixTime(startUnix));

	const hourDifference = differenceInHours(fromUnixTime(endUnix), fromUnixTime(startUnix));

	if (hourDifference <= 24) {
		return 'hour';
	}

	if (dayDifference >= 30) {
		return 'month';
	}

	return 'day';
};
