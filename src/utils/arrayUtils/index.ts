export const sumArrayOfObjects = (objects: Record<string, number>[]): Record<string, number> => {
	const result = new Map<string, number>();

	objects.forEach((obj) => {
		Object.entries(obj).forEach(([key, value]) => {
			result.set(key, (result.get(key) ?? 0) + value);
		});
	});

	return Object.fromEntries(result.entries());
};

export const uniqueArray = <T>(array: T[]): T[] => {
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

interface ObjectDeduplicationParams<T extends Record<string, unknown>> {
	array?: T[];
	properties: (keyof T)[];
}

export function getDuplicatesSansArray<T extends Record<string, unknown>>({
	array = [],
	properties,
}: ObjectDeduplicationParams<T>): T[] {
	return array
		.filter((value, index, self) => {
			return (
				index ===
				self.findIndex((item) => {
					return properties.every((property) => {
						return item[property] === value[property];
					});
				})
			);
		})
		.filter(Boolean);
}

export function getUniquePrimitives<T extends string | number | boolean>(array: T[]): T[] {
	return [...new Set(array)].filter(Boolean);
}
