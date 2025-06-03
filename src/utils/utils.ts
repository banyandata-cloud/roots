/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import React from 'react';

import { format as fnsFormat } from 'date-fns';
import { DAYS, FULL_MONTHS, MONTHS } from '../constants';
import type {
	ColorOptions,
	DateRange,
	DatesInMonthResult,
	DayInfo,
	GetDatesInMonthParams,
	HSL,
} from '../types/utils';

export const sumArrayOfObjects = (objects: Record<string, number>[]): Record<string, number> => {
	return objects.reduce<Record<string, number>>((acc, cur) => {
		Object.keys(cur).forEach((key) => {
			acc[key] = (acc[key] ?? 0) + (cur[key] ?? 0);
		});
		return acc;
	}, {});
};

export const getSpacedDisplayName = (string = ''): string => {
	return string.replace(/-/g, ' ').replace(/\b\w/g, (s) => {
		return s.toUpperCase();
	});
};

export const doubleDigitted = (number = 0): string => {
	return number.toString().slice(-2).padStart(2, '0');
};

export const getJSDateFromEpoch = (epoch: number): Date => {
	const date = new Date(0);
	date.setUTCSeconds(epoch);
	return date;
};

export const getDateFromEpoch = (epoch: number): string => {
	const date = new Date(0);
	date.setUTCSeconds(epoch);
	const paddedDate = date.getDate().toString().padStart(2, '0');
	const month = MONTHS[date.getMonth()] ?? 'InvalidMonth';
	const year = date.getFullYear();
	return `${month} ${paddedDate}, ${year.toString()}`;
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

		const timeFormat: Record<number, string> = {
			24: `${hours.toString()}:${minutes.toString()}:${seconds.toString()} Hrs`,
			12: `${hours12.toString()}:${minutes.toString()}:${seconds.toString()} ${meridian}`,
		};

		const resolvedFormat = typeof format === 'number' ? format : 12;
		return timeFormat[resolvedFormat] ?? 'AM';
	}

	if (typeof format === 'string') {
		return fnsFormat(date, format);
	}

	const paddedDate = date.getDate().toString().padStart(2, '0');
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();

	return `${month ?? 'Unknown'} ${paddedDate}, ${year.toString()}`;
};

export const uniqueArray = <T>(array: T[]): T[] => {
	return [...new Set(array)];
};

export const uniqueArrayOfObjects = <T extends object>(array: T[] = [], key: keyof T): T[] => {
	return array.filter((value, index, self) => {
		return (
			index ===
			self.findIndex((t) => {
				return t[key] === value[key];
			})
		);
	});
};

export const getInitialsOfName = (name = ''): string => {
	const names = name.split(' ');
	let initials = names[0] ? names[0].substring(0, 1).toUpperCase() : '';
	if (names.length > 1) {
		initials += names[names.length - 1]?.substring(0, 1).toUpperCase() ?? '';
	}
	return initials;
};

export const safeJSONParse = (object: string): unknown => {
	try {
		return JSON.parse(object);
	} catch {
		return null;
	}
};

export function cloneDeep<T extends object>(object: T): T {
	return JSON.parse(JSON.stringify(object)) as T;
}

export function classes(...args: (string | false | null | undefined)[]): string {
	const sanitizedArgs = args.filter(Boolean);
	return sanitizedArgs.join(' ');
}

export function inputHelper(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): {
	fieldName?: string;
	fieldValue: string;
	dataset?: DOMStringMap;
} {
	const { dataset, name, value } = event.target;
	return {
		fieldName: name,
		fieldValue: value, // Always a string for text/email/password/textarea
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

const rePropName =
	/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const reEscapeChar = /\\(\\)?/g;

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

export const get = <U = unknown>(
	object: unknown,
	path: string | string[],
	defaultValue?: U
): U | undefined => {
	let pathArr: string[];

	if (Array.isArray(path)) {
		pathArr = [...path];
	} else if (typeof path === 'string') {
		pathArr = stringToPath(path);
	} else {
		return defaultValue;
	}

	let srcObject: unknown = object;
	let index = 0;
	const { length } = pathArr;

	while (index < length) {
		const key = pathArr[index++];

		if (typeof srcObject === 'object' && srcObject !== null && key !== undefined) {
			srcObject = (srcObject as Record<string, unknown>)[key.toString()];
		} else {
			srcObject = undefined;
		}

		if (srcObject == null) {
			break;
		}
	}

	return index === length && srcObject !== undefined ? (srcObject as U) : defaultValue;
};

export const getDayInfo = (date: Date): DayInfo => {
	const monthIndex = date.getMonth();
	const dayIndex = date.getDay();

	return {
		month: FULL_MONTHS[monthIndex] ?? 'InvalidMonth',
		monthAsNumber: monthIndex,
		year: date.getFullYear(),
		dateAsNumber: date.getDate(),
		day: DAYS[dayIndex] ?? 'InvalidDay',
		dayAsNumber: dayIndex,
		hoursIn12: date.getHours(),
		hours: ((date.getHours() + 11) % 12) + 1,
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		meridian: date.getHours() >= 12 ? 'PM' : 'AM',
	};
};

export const getDatesInStringFormat = ({
	startingDate,
	endingDate,
}: DateRange): [string, string] => {
	const formatDate = (date: Date) => {
		const day = date.getDate().toString();
		const month = MONTHS[date.getMonth()]?.substring(0, 3) ?? 'Jan';
		const year = date.getFullYear().toString();
		return `${day} ${month} ${year}`;
	};

	return [formatDate(startingDate), formatDate(endingDate)];
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

export const sanitizeJSON = <T extends Record<string, unknown>>(
	obj: T = {} as T,
	aliases: Record<string, string> = {},
	exclusions: string[] = []
): Record<string, unknown> => {
	return Object.keys(obj).reduce((acc: Record<string, unknown>, param: string) => {
		const value = obj[param];
		if (
			value !== '' &&
			value != null &&
			value !== 'null' &&
			value !== 'undefined' &&
			!exclusions.includes(param)
		) {
			const key = aliases[param] ?? param;
			acc[key] = value;
		}
		return acc;
	}, {});
};

export const areTwinObjects = (obj1: unknown, obj2: unknown): boolean => {
	if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
		return obj1 === obj2;
	}

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	return keys1.every((key) => {
		if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
			return false;
		}

		const val1 = (obj1 as Record<string, unknown>)[key];
		const val2 = (obj2 as Record<string, unknown>)[key];
		return areTwinObjects(val1, val2);
	});
};

export function getDuplicatesSansArray<T extends Record<string, unknown>>({
	array = [],
	properties = [],
	hasObjects = true,
}: {
	array?: T[];
	properties?: (keyof T)[];
	hasObjects?: boolean;
}): T[] {
	if (hasObjects) {
		return array.filter((value, index, self) => {
			return (
				index ===
				self.findIndex((item) => {
					return properties.every((prop) => {
						return item[prop] === value[prop];
					});
				})
			);
		});
	}

	// For primitive types
	return Array.from(new Set(array as unknown[])) as T[];
}

export const generateColors = (options: ColorOptions = {}): string[] => {
	const {
		count = 1,
		excludedColors = [],
		exclusionThreshold = 30,
		distinctionThreshold = 40,
		excludedHueRanges = [],
	} = options;

	const colors: string[] = [];
	const minLightness = 30;
	const maxLightness = 70;
	const minSaturation = 65;
	const maxSaturation = 100;

	const normalizedExcludedColors = excludedColors.map((color) => {
		return color.startsWith('#') ? color : `#${color}`;
	});

	// Hex to RGB conversion
	const hexToRGB = (hex: string): [number, number, number] => {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return [r, g, b];
	};

	// Hex to HSL conversion
	const hexToHSL = (hex: string): HSL => {
		const [r, g, b] = hexToRGB(hex).map((v) => {
			return v / 255;
		}) as [number, number, number];

		const cmin = Math.min(r, g, b);
		const cmax = Math.max(r, g, b);
		const delta = cmax - cmin;

		let h = 0;
		if (delta !== 0) {
			if (cmax === r) h = ((g - b) / delta) % 6;
			else if (cmax === g) h = (b - r) / delta + 2;
			else h = (r - g) / delta + 4;
			h = Math.round(h * 60);
			if (h < 0) h += 360;
		}

		const l = (cmax + cmin) / 2;
		const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		return {
			h,
			s: Math.round(s * 100),
			l: Math.round(l * 100),
		};
	};

	// Color distance calculation
	const colorDistance = (hex1: string, hex2: string): number => {
		const [r1, g1, b1] = hexToRGB(hex1);
		const [r2, g2, b2] = hexToRGB(hex2);
		const rMean = (r1 + r2) / 2;
		const r = r1 - r2;
		const g = g1 - g2;
		const b = b1 - b2;
		const weightR = 2 + rMean / 256;
		const weightG = 4.0;
		const weightB = 2 + (255 - rMean) / 256;
		return Math.sqrt(weightR * r * r + weightG * g * g + weightB * b * b);
	};

	// HSL to Hex conversion
	const hslToHex = (h: number, s: number, l: number): string => {
		h = ((h % 360) + 360) % 360;
		s = Math.max(0, Math.min(100, s));
		l = Math.max(0, Math.min(100, l));

		l /= 100;
		const a = (s * Math.min(l, 1 - l)) / 100;

		const f = (n: number): string => {
			const k = (n + h / 30) % 12;
			const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color)
				.toString(16)
				.padStart(2, '0');
		};

		return `#${f(0)}${f(8)}${f(4)}`;
	};

	// Hue range exclusion check
	const isHueExcluded = (hue: number): boolean => {
		return excludedHueRanges.some((range) => {
			return range.min > range.max
				? hue >= range.min || hue <= range.max
				: hue >= range.min && hue <= range.max;
		});
	};

	// Color similarity check
	const isTooSimilarToExcluded = (hexColor: string): boolean => {
		const { h } = hexToHSL(hexColor);
		if (isHueExcluded(h)) return true;

		return normalizedExcludedColors.some((excludedColor) => {
			return colorDistance(hexColor, excludedColor) < exclusionThreshold;
		});
	};

	// Main color generation with all fallback logic
	const generateDistinctColor = (): string => {
		// Primary generation attempt
		for (let attempts = 0; attempts < 300; attempts++) {
			const h = Math.floor(Math.random() * 360);
			const s = Math.floor(Math.random() * (maxSaturation - minSaturation)) + minSaturation;
			const l = Math.floor(Math.random() * (maxLightness - minLightness)) + minLightness;

			if (isHueExcluded(h)) continue;

			const hexColor = hslToHex(h, s, l);
			if (isTooSimilarToExcluded(hexColor)) continue;

			const isDistinct = colors.every((existing) => {
				return colorDistance(hexColor, existing) >= distinctionThreshold;
			});
			if (isDistinct) return hexColor;
		}

		// Fallback generation attempt
		for (let adjustedAttempts = 0; adjustedAttempts < 50; adjustedAttempts++) {
			const h = Math.floor(Math.random() * 360);
			if (isHueExcluded(h)) continue;

			const hexColor = hslToHex(h, 90, 50);
			if (isTooSimilarToExcluded(hexColor)) continue;

			const minDistance = Math.min(
				...colors.map((existing) => {
					return colorDistance(hexColor, existing);
				})
			);
			if (minDistance >= distinctionThreshold * 0.7) return hexColor;
		}

		// Final fallback
		return hslToHex(Math.floor(Math.random() * 360), 80, 50);
	};

	// Generate the requested colors with failsafe
	let failsafeCounter = 0;
	const maxFailsafe = count * 3;

	while (colors.length < count && failsafeCounter < maxFailsafe) {
		const newColor = generateDistinctColor();
		colors.push(newColor);
		failsafeCounter++;
	}

	return colors;
};

export const isEmptyHtmlString = (htmlString: string): boolean => {
	const textContent = htmlString.replace(/<[^>]*>/g, '');
	return textContent.trim() === '';
};
