import { format as fnsFormat } from 'date-fns';
import { DAYS, FULL_MONTHS, MONTHS } from '../../constants';
import { doubleDigitted } from '../stringUtils';

export const getJSDateFromEpoch = (epoch: number): Date => {
	const date = new Date(0);
	date.setSeconds(epoch);
	return date;
};

export const getDateFromEpoch = (epoch: number): string => {
	const date = new Date(0);
	date.setSeconds(epoch);

	const paddedDate = date.getDate().toString().padStart(2, '0');
	const month = MONTHS[date.getMonth()] ?? 'Jan';
	const year = date.getFullYear();

	return `${month} ${paddedDate}, ${year.toString()}`;
};

export const getTimeFromEpoch = (epoch: number): string => {
	const date = new Date(0);
	date.setSeconds(epoch);

	const hours = doubleDigitted(date.getHours());
	const minutes = doubleDigitted(date.getMinutes());
	const seconds = doubleDigitted(date.getSeconds());

	return `${hours}:${minutes}:${seconds}`;
};

type TimeFormat = 12 | 24;
type DateFormat = string;

export const epochToFormattedDate = (
	epoch: number,
	type: 'time' | 'date',
	format: TimeFormat | DateFormat = 12,
	universal = false
): string | null => {
	const date = new Date(0);
	date.setUTCSeconds(epoch);

	if (type === 'time') {
		const hours = doubleDigitted(universal ? date.getUTCHours() : date.getHours());
		const minutes = doubleDigitted(universal ? date.getUTCMinutes() : date.getMinutes());
		const seconds = doubleDigitted(universal ? date.getUTCSeconds() : date.getSeconds());

		const hours12 = universal
			? ((date.getUTCHours() + 11) % 12) + 1
			: ((date.getHours() + 11) % 12) + 1;

		let meridian = date.getUTCHours() >= 12 ? 'PM' : 'AM';

		if (universal) {
			meridian = date.getHours() >= 12 ? 'PM' : 'AM';
		}

		const timeFormat: Record<TimeFormat, string> = {
			24: `${hours}:${minutes}:${seconds} Hrs`,
			12: `${hours12.toString()}:${minutes}:${seconds} ${meridian}`,
		};

		return timeFormat[format as TimeFormat];
	}
	if (format && typeof format === 'string' && format !== '12' && format !== '24') {
		return fnsFormat(date, format);
	}

	const paddedDate = universal
		? date.getUTCDate().toString().padStart(2, '0')
		: date.getDate().toString().padStart(2, '0');
	const month = MONTHS[universal ? date.getUTCMonth() : date.getMonth()] ?? 'Jan';
	const year = universal ? date.getUTCFullYear() : date.getFullYear();

	return `${month} ${paddedDate}, ${year.toString()}`;
};

export interface DayInfo {
	month: (typeof FULL_MONTHS)[number];
	monthAsNumber: number;
	year: number;
	dateAsNumber: number;
	day: (typeof DAYS)[number];
	dayAsNumber: number;
	hoursIn12: number;
	hours: number;
	minutes: number;
	seconds: number;
	meridian: 'AM' | 'PM';
}

export const getDayInfo = (date: Date): DayInfo => {
	const month = FULL_MONTHS[date.getMonth()] ?? 'January';
	const day = DAYS[date.getDay()] ?? 'Su';

	const monthAsNumber = date.getMonth();
	const dayAsNumber = date.getDay();
	const year = date.getFullYear();
	const dateAsNumber = date.getDate();

	const hoursIn12 = date.getHours();
	const hours = ((hoursIn12 + 11) % 12) + 1;
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const meridian = hoursIn12 >= 12 ? 'PM' : 'AM';

	return {
		month,
		monthAsNumber,
		year,
		dateAsNumber,
		day,
		dayAsNumber,
		hoursIn12,
		hours,
		minutes,
		seconds,
		meridian,
	};
};

interface DateRange {
	startingDate: Date;
	endingDate: Date;
}

export const getDatesInStringFormat = ({
	startingDate,
	endingDate,
}: DateRange): [string, string] => {
	const format = (date: Date): string => {
		const day = date.getDate();
		const month = MONTHS[date.getMonth()] ?? 'Jan';
		const year = date.getFullYear();

		return `${day.toString()} ${month} ${year.toString()}`;
	};

	return [format(startingDate), format(endingDate)];
};

interface GetDatesInAMonthParams {
	month: number;
	year: number;
}

interface DatesInMonth {
	dateObj: Date[];
	dates: number[];
	days: number[];
}

export const getDatesInAMonth = ({ month, year }: GetDatesInAMonthParams): DatesInMonth => {
	const date = new Date(Date.UTC(year, month, 1));

	const dateObj: Date[] = [];
	const dates: number[] = [];
	const days: number[] = [];

	while (date.getUTCMonth() === month) {
		dateObj.push(new Date(date));
		dates.push(date.getUTCDate());
		days.push(date.getUTCDay());

		date.setUTCDate(date.getUTCDate() + 1);
	}

	return {
		dateObj,
		dates,
		days,
	};
};
