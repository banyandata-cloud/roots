import { differenceInDays, differenceInMonths, fromUnixTime } from 'date-fns';

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
