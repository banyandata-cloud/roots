/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { format as fnsFormat } from 'date-fns';
import { DAYS, FULL_MONTHS, MONTHS } from '../constants';

export const sumArrayOfObjects = (objects) => {
	return objects.reduce((acc, cur) => {
		const keysOfCurrentObject = Object.keys(cur);
		keysOfCurrentObject.forEach((key) => {
			if (Object.prototype.hasOwnProperty.call(cur, key)) {
				acc[key] = (acc[key] || 0) + cur[key];
			}
		});
		return acc;
	}, {});
};

export const getSpacedDisplayName = (string) => {
	return string?.replace(/-/g, ' ').replace(/\b\w/g, (s) => {
		return s.toUpperCase();
	});
};

export const doubleDigitted = (number) => {
	return number?.toString().slice(-2)?.padStart(2, '0');
};

export const getJSDateFromEpoch = (epoch) => {
	const date = new Date(0);
	date.setUTCSeconds(epoch);
	return date;
};

export const getDateFromEpoch = (epoch) => {
	const date = new Date(0);
	date.setUTCSeconds(epoch);
	const paddedDate = date.getDate().toString().padStart(2, '0');
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();
	return `${month} ${paddedDate}, ${year}`;
};

export const getTimeFromEpoch = (epoch) => {
	const date = new Date(0);
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
export const epochToFormattedDate = (epoch, type, format) => {
	const date = new Date(0);
	date.setUTCSeconds(epoch);
	if (type === 'time') {
		const hours = doubleDigitted(date.getHours());
		const minutes = doubleDigitted(date.getMinutes());
		const seconds = doubleDigitted(date.getSeconds());
		const hours12 = ((date.getHours() + 11) % 12) + 1;
		const meridian = date.getHours() >= 12 ? 'PM' : 'AM';
		const timeFormat = {
			24: `${hours}:${minutes}:${seconds} Hrs`,
			12: `${hours12}:${minutes}:${seconds} ${meridian}`,
		};
		return timeFormat[format ?? 12];
	}
	if (type === 'date') {
		if (format) {
			return fnsFormat(date, format);
		}
		const paddedDate = date.getDate().toString().padStart(2, '0');
		const month = MONTHS[date.getMonth()];
		const year = date.getFullYear();
		return `${month} ${paddedDate}, ${year}`;
	}
	return null;
};

export const uniqueArray = (array) => {
	return [...new Set(array)];
};

export const uniqueArrayOfObjects = (array = [], key = '') => {
	return array.filter((value, index, self) => {
		return (
			index ===
			self.findIndex((t) => {
				return t[key] === value[key];
			})
		);
	});
};

export const getInitialsOfName = (name = '') => {
	const names = name.split(' ');
	let initials = names[0].substring(0, 1).toUpperCase();
	if (names.length > 1) {
		initials += names[names.length - 1].substring(0, 1).toUpperCase();
	}
	return initials;
};

export const safeJSONParse = (object) => {
	try {
		return JSON.parse(object);
	} catch (error) {
		return null;
	}
};

export function cloneDeep(object) {
	return safeJSONParse(JSON.stringify(object));
}

export function classes(...args) {
	const sanitizedArgs = args.filter(Boolean);

	return sanitizedArgs.join(' ');
}

export function inputHelper(event) {
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

export const getCurrentSearchParams = (searchParams) => {
	const currentSearchParams = {};
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
export const stringToPath = (string) => {
	const result = [];
	if (string.charCodeAt(0) === 46 /* . */) {
		result.push('');
	}
	string.replace(rePropName, (match, number, quote, subString) => {
		result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
	});
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
export const get = (object, path, defaultValue = undefined) => {
	let pathArr = null;
	let srcObject = object;
	if (Array.isArray(path)) {
		pathArr = [...path];
	} else if (typeof path === 'string') {
		pathArr = stringToPath(path);
	} else {
		return defaultValue;
	}

	let index = 0;
	const { length } = pathArr;

	while (object != null && index < length) {
		const key = pathArr[index++];
		srcObject = srcObject?.[key?.toString?.()];
		if (srcObject == null) {
			break;
		}
	}
	return index && index === length && srcObject !== undefined ? srcObject : defaultValue;
};

export const getDayInfo = (date) => {
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

export const getDatesInStringFormat = ({ startingDate, endingDate }) => {
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

export const getDatesInAMonth = ({ month, year }) => {
	const date = new Date(Date.UTC(year, month, 1));
	const dates = [];
	const days = [];
	const dateObj = [];
	while (date.getUTCMonth() === month) {
		const dateNumber = new Date(date).getDate();
		const dayNumber = new Date(date).getDay();
		dates.push(dateNumber);
		days.push(dayNumber);
		dateObj.push(new Date(date));
		date.setUTCDate(date.getUTCDate() + 1);
	}
	return {
		dateObj,
		dates,
		days,
	};
};

export const getCSSVariableValue = (variable) => {
	return getComputedStyle(document.documentElement).getPropertyValue(variable);
};

export const sanitizeJSON = (obj = {}, aliases = {}, exclusions = []) => {
	return Object.keys(obj).reduce((acc, param) => {
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

export const areTwinObjects = (obj1, obj2) => {
	// Check if both are objects and not null
	if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
		return obj1 === obj2;
	}

	// Check if both objects have the same number of keys
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) {
		return false;
	}

	// Check if all keys and values are equal
	for (const key of keys1) {
		if (!keys2.includes(key) || !areTwinObjects(obj1[key], obj2[key])) {
			return false;
		}
	}

	return true;
};

export const getDuplicatesSansArray = ({ array = [], properties = [], hasObjects = true }) => {
	if (hasObjects) {
		return array
			.filter((value, index, self) => {
				return (
					index ===
					self.findIndex((item) => {
						return properties.every((property) => {
							return item?.[property] === value?.[property];
						});
					})
				);
			})
			.filter(Boolean);
	}
	return cloneDeep([...new Set(array)].filter(Boolean));
};

export const generateColors = ({
	count = 1,
	excludedColors = [],
	exclusionThreshold = 30,
	distinctionThreshold = 40,
	excludedHueRanges = [],
}) => {
	const colors = [];

	const minLightness = 30;
	const maxLightness = 70;

	const minSaturation = 65;
	const maxSaturation = 100;

	const normalizedExcludedColors = excludedColors.map((color) => {
		return color.startsWith('#') ? color : `#${color}`;
	});

	const hexToRGB = (hex) => {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return [r, g, b];
	};

	const hexToHSL = (hex) => {
		const r = parseInt(hex.slice(1, 3), 16) / 255;
		const g = parseInt(hex.slice(3, 5), 16) / 255;
		const b = parseInt(hex.slice(5, 7), 16) / 255;

		const cmin = Math.min(r, g, b);
		const cmax = Math.max(r, g, b);
		const delta = cmax - cmin;

		let h = 0;
		let s = 0;
		let l = 0;

		if (delta === 0) {
			h = 0;
		} else if (cmax === r) {
			h = ((g - b) / delta) % 6;
		} else if (cmax === g) {
			h = (b - r) / delta + 2;
		} else {
			h = (r - g) / delta + 4;
		}

		h = Math.round(h * 60);
		if (h < 0) h += 360;

		l = (cmax + cmin) / 2;

		s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		s = Math.round(s * 100);
		l = Math.round(l * 100);

		return [h, s, l];
	};

	const colorDistance = (hex1, hex2) => {
		const rgb1 = hexToRGB(hex1);
		const rgb2 = hexToRGB(hex2);

		const rMean = (rgb1[0] + rgb2[0]) / 2;
		const r = rgb1[0] - rgb2[0];
		const g = rgb1[1] - rgb2[1];
		const b = rgb1[2] - rgb2[2];

		const weightR = 2 + rMean / 256;
		const weightG = 4.0;
		const weightB = 2 + (255 - rMean) / 256;

		return Math.sqrt(weightR * r * r + weightG * g * g + weightB * b * b);
	};

	function hslToHex(h, s, l) {
		h = ((h % 360) + 360) % 360;
		s = Math.max(0, Math.min(100, s));
		l = Math.max(0, Math.min(100, l));

		l /= 100;
		const a = (s * Math.min(l, 1 - l)) / 100;

		const f = (n) => {
			const k = (n + h / 30) % 12;
			const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color)
				.toString(16)
				.padStart(2, '0');
		};

		return `#${f(0)}${f(8)}${f(4)}`;
	}

	const isHueExcluded = (hue) => {
		return excludedHueRanges.some((range) => {
			if (range.min > range.max) {
				return hue >= range.min || hue <= range.max;
			}
			return hue >= range.min && hue <= range.max;
		});
	};

	const isTooSimilarToExcluded = (hexColor) => {
		const [hue] = hexToHSL(hexColor);
		if (isHueExcluded(hue)) {
			return true;
		}

		for (const excludedColor of normalizedExcludedColors) {
			if (colorDistance(hexColor, excludedColor) < exclusionThreshold) {
				return true;
			}
		}

		return false;
	};

	const generateDistinctColor = () => {
		let attempts = 0;
		const maxAttempts = 300;

		while (attempts < maxAttempts) {
			const h = Math.floor(Math.random() * 360);
			const s = Math.floor(Math.random() * (maxSaturation - minSaturation)) + minSaturation;
			const l = Math.floor(Math.random() * (maxLightness - minLightness)) + minLightness;

			if (isHueExcluded(h)) {
				attempts++;
				continue;
			}

			const hexColor = hslToHex(h, s, l);

			if (isTooSimilarToExcluded(hexColor)) {
				attempts++;
				continue;
			}

			let isDistinct = true;
			for (const existingColor of colors) {
				if (colorDistance(hexColor, existingColor) < distinctionThreshold) {
					isDistinct = false;
					break;
				}
			}

			if (isDistinct || attempts >= maxAttempts - 1) {
				return hexColor;
			}

			attempts++;
		}

		for (let adjustedAttempts = 0; adjustedAttempts < 50; adjustedAttempts++) {
			const h = Math.floor(Math.random() * 360);

			if (isHueExcluded(h)) {
				continue;
			}

			const s = 90;
			const l = 50;

			const hexColor = hslToHex(h, s, l);

			if (!isTooSimilarToExcluded(hexColor)) {
				let mostDistinct = true;
				let minDistance = Infinity;

				for (const existingColor of colors) {
					const distance = colorDistance(hexColor, existingColor);
					minDistance = Math.min(minDistance, distance);
					if (distance < distinctionThreshold * 0.7) {
						mostDistinct = false;
					}
				}

				if (mostDistinct || adjustedAttempts >= 49) {
					return hexColor;
				}
			}
		}

		return hslToHex(Math.floor(Math.random() * 360), 80, 50);
	};

	let failsafeCounter = 0;
	const maxFailsafe = count * 3;

	while (colors.length < count && failsafeCounter < maxFailsafe) {
		const newColor = generateDistinctColor();
		colors.push(newColor);
		failsafeCounter++;
	}

	return colors;
};

export const isEmptyHtmlString = (htmlString) => {
	const textContent = htmlString.replace(/<[^>]*>/g, '');
	return textContent.trim() === '';
};
