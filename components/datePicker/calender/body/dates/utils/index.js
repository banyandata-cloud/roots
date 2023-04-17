import { fromUnixTime, getUnixTime, isAfter, isBefore } from 'date-fns';
import { MONTHS } from '../../../../../../constants';
import { getDatesInAMonth } from '../../../../../../utils';

const getDatesOfLastWeekOfLastMonth = ({ monthAsNumber, year, remainingDaysInFirstWeek }) => {
	if (remainingDaysInFirstWeek === 0) {
		return [];
	}

	let month;
	let fullYear;
	if (monthAsNumber === 0) {
		month = 11;
		fullYear = year - 1;
	} else {
		month = monthAsNumber - 1;
		fullYear = year;
	}
	const { dateObj } = getDatesInAMonth({
		month,
		year: fullYear,
	});

	return dateObj.slice(-remainingDaysInFirstWeek);
};

const getDatesOfFirstWeekOfNextMonth = ({ monthAsNumber, year, remainingDaysInLastWeek }) => {
	let month;
	let fullYear;
	if (monthAsNumber === 11) {
		month = 0;
		fullYear = year + 1;
	} else {
		month = monthAsNumber + 1;
		fullYear = year;
	}
	const { dateObj } = getDatesInAMonth({
		month,
		year: fullYear,
	});
	return dateObj.slice(0, remainingDaysInLastWeek);
};

export const getDatesToDisplay = ({ monthAsNumber, year, days, dateObj }) => {
	const [firstDay] = days;

	const dates = [
		...getDatesOfLastWeekOfLastMonth({
			monthAsNumber,
			year,
			remainingDaysInFirstWeek: firstDay,
		}),
		...dateObj,
		...getDatesOfFirstWeekOfNextMonth({
			monthAsNumber,
			year,
			remainingDaysInLastWeek: 7 - (days[days.length - 1] + 1),
		}),
	];

	return dates;
};

export const rangeSelection = ({ selectedRange, date }) => {
	const dateAsNumber = date?.getDate();
	const month = MONTHS[date?.getMonth()]?.substring(0, 3);
	const year = date?.getFullYear();

	if (selectedRange.unix?.[0] === getUnixTime(date.setHours(0, 0, 0, 0))) {
		return {
			dates: [],
			unix: [],
		};
	}

	if (!selectedRange?.dates || selectedRange?.dates?.length === 0) {
		return {
			dates: [`${dateAsNumber} ${month} ${year}`, `${dateAsNumber} ${month} ${year}`],
			unix: [
				getUnixTime(date.setHours(0, 0, 0, 0)),
				getUnixTime(date.setHours(23, 59, 59, 59)),
			],
		};
	}

	if (selectedRange.dates?.length < 2) {
		if (
			selectedRange.dates?.length === 1 &&
			isBefore(date, fromUnixTime(selectedRange.unix?.[0]))
		) {
			return {
				dates: [`${dateAsNumber} ${month} ${year}`, ...selectedRange.dates],
				unix: [getUnixTime(date), ...selectedRange.unix],
			};
		}

		return {
			dates: [...selectedRange.dates, `${dateAsNumber} ${month} ${year}`],
			unix: [...selectedRange.unix, getUnixTime(date)],
		};
	}
	if (
		(isBefore(date, fromUnixTime(selectedRange.unix?.[1])) ||
			isAfter(date, fromUnixTime(selectedRange.unix?.[1]))) &&
		isAfter(date, fromUnixTime(selectedRange.unix?.[0]))
	) {
		return {
			dates: [selectedRange.dates?.[0], `${dateAsNumber} ${month} ${year}`],
			unix: [selectedRange.unix?.[0], getUnixTime(date)],
		};
	}
	if (isBefore(date, fromUnixTime(selectedRange.unix?.[0]))) {
		return {
			dates: [`${dateAsNumber} ${month} ${year}`, selectedRange.dates?.[1]],
			unix: [getUnixTime(date), selectedRange.unix?.[1]],
		};
	}

	return {
		dates: [],
		unix: [],
	};
};
