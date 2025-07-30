/* eslint-disable no-restricted-syntax */
export function sanitizeJSON<T extends Record<string, unknown>>(
	obj: T = {} as T,
	aliases: Partial<Record<keyof T, string>> = {},
	exclusions: (keyof T)[] = []
): Partial<Record<string, unknown>> {
	return Object.keys(obj).reduce<Partial<Record<string, unknown>>>((acc, param) => {
		const value = obj[param as keyof T];

		if (
			value !== '' &&
			value != null &&
			value !== 'null' &&
			value !== 'undefined' &&
			!exclusions.includes(param as keyof T)
		) {
			const alias = aliases[param as keyof T];
			const key = alias ?? param;

			acc[key] = value;
		}

		return acc;
	}, {});
}

export function areTwinObjects(a: unknown, b: unknown): boolean {
	if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
		return a === b;
	}

	const keysA = Object.keys(a as Record<string, unknown>);
	const keysB = Object.keys(b as Record<string, unknown>);

	if (keysA.length !== keysB.length) {
		return false;
	}

	return keysA.every((key) => {
		const valA = (a as Record<string, unknown>)[key];
		const valB = (b as Record<string, unknown>)[key];

		if (!keysB.includes(key)) {
			return false;
		}

		return areTwinObjects(valA, valB);
	});
}

const rePropName =
	/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const reEscapeChar = /\\(\\)?/g;

/**
 * Converts 'string' to a property path array
 * @param string} string The string to convert
 * @returns {Array} Returns the property path array
 */
export const stringToPath = (input: string): string[] => {
	const result: string[] = [];

	if (input.charCodeAt(0) === 46) {
		// '.'
		result.push('');
	}

	input.replace(
		rePropName,
		(
			match: string,
			number: string | undefined,
			quote: string | undefined,
			subString: string | undefined
		): string => {
			const val = quote ? (subString ?? '').replace(reEscapeChar, '$1') : (number ?? match);

			result.push(val);
			return match; // Required by .replace()
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
export function get<R = unknown>(
	object: unknown,
	path: string | (string | number | symbol)[],
	defaultValue?: R
): R {
	const pathArr: (string | number | symbol)[] = (() => {
		if (Array.isArray(path)) {
			return [...path];
		}
		if (typeof path === 'string') {
			return stringToPath(path);
		}
		return [];
	})();

	if (pathArr.length === 0) {
		return defaultValue as R;
	}

	let result: unknown = object;

	for (const key of pathArr) {
		if (result != null && typeof result === 'object') {
			result = (result as Record<string | number | symbol, unknown>)[key];
		} else {
			return defaultValue as R;
		}
	}

	return (result === undefined ? defaultValue : result) as R;
}

export const safeJSONParse = (input: string): object | null => {
	try {
		return JSON.parse(input) as object;
	} catch {
		return null;
	}
};
export function cloneDeep<T>(object: T): T {
	return JSON.parse(JSON.stringify(object)) as T;
}
