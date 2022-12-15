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
	return number?.toString().padStart(2, '0');
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

export default function safeJSONParse(object) {
	try {
		return JSON.parse(object);
	} catch (error) {
		return null;
	}
}

export function cloneDeep(object) {
	return safeJSONParse(JSON.stringify(object));
}

export function classes(...args) {
	return args.join(' ');
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
 * `undefined`, the `defaultValue` is returned in its place.
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
	return {
		month,
		monthAsNumber,
		year,
		dateAsNumber,
		day,
		dayAsNumber,
	};
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

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */ export const htmlToElement = (html) => {
	const template = document.createElement('template');
	// Never return a text node of whitespace as the result
	template.innerHTML = html.trim();
	return template.content.firstChild;
};

export const getCSSVariableValue = (variable) => {
	return getComputedStyle(document.documentElement).getPropertyValue(variable);
};
