import { format as fnsFormat } from 'date-fns';
import { DAYS, FULL_MONTHS, MONTHS } from '../constants';
import {
	InputHelperResult,
	DayInfo,
	DateRange,
	GetDatesInMonthParams,
	DatesInMonthResult,
} from '../types/utils';

export const sumArrayOfObjects = (
	objects: Array<Record<string, number>>
): Record<string, number> => {
	return objects.reduce((acc, cur) => {
		const keysOfCurrentObject = Object.keys(cur) as Array<keyof typeof cur>;

		keysOfCurrentObject.forEach((key) => {
			if (Object.prototype.hasOwnProperty.call(cur, key)) {
				acc[key] = (acc[key] || 0) + cur[key];
			}
		});

		return acc;
	}, {} as Record<string, number>);
};

export const getSpacedDisplayName = (string: string | undefined): string | undefined => {
	return string?.replace(/-/g, ' ').replace(/\b\w/g, (s) => {
		return s.toUpperCase();
	});
};

export const doubleDigitted = (number: number | undefined): string | undefined => {
	return number?.toString().slice(-2)?.padStart(2, '0');
};

export const getJSDateFromEpoch = (epoch: number) => {
	const date = new Date(0);
	date.setUTCSeconds(epoch);
	return date;
};

export const getDateFromEpoch = (epoch: number): string => {
	const date = new Date(0);
	date.setUTCSeconds(epoch);
	const paddedDate: string = date.getDate().toString().padStart(2, '0');
	const month: string = MONTHS[date.getMonth()];
	const year: number = date.getFullYear();
	return `${month} ${paddedDate}, ${year}`;
};

export const getTimeFromEpoch = (epoch: number): string => {
	const date: Date = new Date(0);
	date.setUTCSeconds(epoch);
	const hours = doubleDigitted(date.getHours());
	const minutes = doubleDigitted(date.getMinutes());
	const seconds = doubleDigitted(date.getSeconds());
	return `${hours}:${minutes}:${seconds}`;
};

// The above two functions will be depracted soon.

/**
 * To get the formatted time and date
 *
 * @param {string} epoch The epoch value : timestamp .
 * @param {string} type type of format to return either "date" or "time"
 * @param {string} format fomrat of date(optional) and time[default = 12 hrs]
 * @returns {string} Returns the formatted date or time.
 */

export const epochToFormattedDate = (
	epoch: number,
	type: 'time' | 'date',
	format?: number | string
): string | null => {
	const date = new Date(0);
	date.setUTCSeconds(epoch);

	if (type === 'time') {
		const hours = doubleDigitted(date.getHours());
		const minutes = doubleDigitted(date.getMinutes());
		const seconds = doubleDigitted(date.getSeconds());

		const hours12 = ((date.getHours() + 11) % 12) + 1;
		const meridian = date.getHours() >= 12 ? 'PM' : 'AM';

		const timeFormat: { [key: number]: string } = {
			24: `${hours}:${minutes}:${seconds} Hrs`,
			12: `${hours12}:${minutes}:${seconds} ${meridian}`,
		};

		return timeFormat[typeof format === 'number' ? format : 12];
	}

	if (type === 'date') {
		if (typeof format === 'string') {
			return fnsFormat(date, format);
		}

		const paddedDate = date.getDate().toString().padStart(2, '0');
		const month = MONTHS[date.getMonth()];
		const year = date.getFullYear();

		return `${month} ${paddedDate}, ${year}`;
	}

	return null;
};

export const uniqueArray = <T>(array: T[]): T[] => {
	return [...new Set(array)];
};

export const uniqueArrayOfObjects = <T extends Record<string, any>>(
	array: T[] = [],
	key: keyof T
): T[] => {
	return array.filter((value, index, self) => {
		return index === self.findIndex((t) => t[key] === value[key]);
	});
};

export const getInitialsOfName = (name: string = ''): string => {
	const names = name.split(' ');
	let initials = names[0].substring(0, 1).toUpperCase();
	if (names.length > 1) {
		initials += names[names.length - 1].substring(0, 1).toUpperCase();
	}
	return initials;
};

export const safeJSONParse = (object: string): any | null => {
	try {
		return JSON.parse(object);
	} catch (error) {
		return null;
	}
};

export function cloneDeep<T>(object: T): T {
	return safeJSONParse(JSON.stringify(object));
}

export function inputHelper(event: React.ChangeEvent<HTMLInputElement>): InputHelperResult {
	const { dataset, type } = event.target;
	const fieldName = event.target.name;
	const fieldValue = ['checkbox', 'radio'].includes(type)
		? event.target.checked
		: event.target.value;

	return {
		fieldName,
		fieldValue,
		dataset,
	};
}

export const getCurrentSearchParams = (searchParams?: URLSearchParams): Record<string, string> => {
	const currentSearchParams: Record<string, string> = {};

	searchParams?.forEach((value, key) => {
		currentSearchParams[key] = value;
	});

	return currentSearchParams;
};

const rePropName: RegExp =
	/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const reEscapeChar: RegExp = /\\(\\)?/g;

/**
 * Converts 'string' to a property path array
 * @param string} string The string to convert
 * @returns {Array} Returns the property path array
 */

export const stringToPath = (string: string): string[] => {
	const result: string[] = [];

	if (string.charCodeAt(0) === 46 /* . */) {
		result.push('');
	}

	string.replace(
		rePropName,
		(match: string, number: string, quote: string, subString: string) => {
			result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
			return '';
		}
	);

	return result;
};

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place..
 *
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */

export const get = <T = any, U = any>(
	object: T,
	path: string | string[],
	defaultValue?: U
): U | undefined => {
	let pathArr: string[] | null = null;
	let srcObject: any = object;

	if (Array.isArray(path)) {
		pathArr = [...path];
	} else if (typeof path === 'string') {
		pathArr = stringToPath(path);
	} else {
		return defaultValue;
	}

	if (!pathArr) {
		return defaultValue;
	}

	let index = 0;
	const { length } = pathArr;

	while (srcObject != null && index < length) {
		const key = pathArr[index++];
		srcObject = srcObject?.[key?.toString()];
		if (srcObject == null) {
			break;
		}
	}

	return index && index === length && srcObject !== undefined ? srcObject : defaultValue;
};

export const getDayInfo = (date: Date): DayInfo => {
	const month = FULL_MONTHS[date.getMonth()];
	const monthAsNumber = date.getMonth();
	const year = date.getFullYear();
	const dateAsNumber = date.getDate();
	const day = DAYS[date.getDay()];
	const dayAsNumber = date.getDay();
	const hoursIn12 = date.getHours();
	const hours = ((date.getHours() + 11) % 12) + 1;
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

export const getDatesInStringFormat = ({
	startingDate,
	endingDate,
}: DateRange): [string, string] => {
	return [
		`${startingDate.getDate()} ${MONTHS[startingDate.getMonth()].substring(
			0,
			3
		)} ${startingDate.getFullYear()}`,
		`${endingDate.getDate()} ${MONTHS[endingDate.getMonth()].substring(
			0,
			3
		)} ${endingDate.getFullYear()}`,
	];
};

export const getDatesInAMonth = ({ month, year }: GetDatesInMonthParams): DatesInMonthResult => {
	const date = new Date(Date.UTC(year, month, 1));
	const dates: number[] = [];
	const days: number[] = [];
	const dateObj: Date[] = [];

	while (date.getUTCMonth() === month) {
		const current = new Date(date);
		dates.push(current.getUTCDate());
		days.push(current.getUTCDay());
		dateObj.push(current);
		date.setUTCDate(date.getUTCDate() + 1);
	}

	return {
		dateObj,
		dates,
		days,
	};
};

export const getCSSVariableValue = (variable: string): string => {
	return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

export const sanitizeJSON = (
  obj: Record<string, any> = {},
  aliases: Record<string, string> = {},
  exclusions: string[] = []
): Record<string, any> => {
  return Object.keys(obj).reduce((acc: Record<string, any>, param: string) => {
    const value = obj[param];
    if (
      value !== '' &&
      value != null &&
      value !== 'null' &&
      value !== 'undefined' &&
      !exclusions.includes(param)
    ) {
      const alias = aliases[param];
      if (alias) {
        acc[alias] = value;
      } else {
        acc[param] = value;
      }
    }
    return acc;
  }, {});
};

