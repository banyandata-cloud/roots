import {
	sumArrayOfObjects,
	uniqueArray,
	uniqueArrayOfObjects,
	getDuplicatesSansArray,
	getUniquePrimitives,
} from './index';

//  LOCAL TYPED HELPER
const typedUniqueArrayOfObjects = uniqueArrayOfObjects as unknown as <
	T extends Record<string, unknown>,
>(
	array: T[],
	key: keyof T
) => T[];

//  HAPPY PATH
describe('arrayUtils — basic and expected functionality', () => {
	test('sumArrayOfObjects aggregates values by key', () => {
		const input = [
			{ a: 1, b: 2 },
			{ a: 3, c: 4 },
		];

		const result = sumArrayOfObjects(input);

		expect(result).toEqual({
			a: 4,
			b: 2,
			c: 4,
		});
	});

	test('uniqueArray removes duplicate primitive values', () => {
		const input = [1, 2, 2, 3, 1];

		const result = uniqueArray(input);

		expect(result).toEqual([1, 2, 3]);
	});
});

// MEDIUM PATH
describe('arrayUtils — handles common variations and inputs', () => {
	test('uniqueArrayOfObjects removes duplicates based on provided key', () => {
		type Item = { id: number; name: string };

		const input: Item[] = [
			{ id: 1, name: 'A' },
			{ id: 2, name: 'B' },
			{ id: 1, name: 'C' },
		];

		const result = typedUniqueArrayOfObjects(input, 'id');

		expect(result).toEqual([
			{ id: 1, name: 'A' },
			{ id: 2, name: 'B' },
		]);
	});

	test('getDuplicatesSansArray returns unique objects based on multiple properties', () => {
		const input = [
			{ id: 1, type: 'x' },
			{ id: 1, type: 'x' },
			{ id: 2, type: 'y' },
		];

		const result = getDuplicatesSansArray({
			array: input,
			properties: ['id', 'type'],
		});

		expect(result).toEqual([
			{ id: 1, type: 'x' },
			{ id: 2, type: 'y' },
		]);
	});
});

// RISKY PATH
describe('arrayUtils — edge cases and defensive behavior', () => {
	test('sumArrayOfObjects returns empty object for empty input', () => {
		const result = sumArrayOfObjects([]);

		expect(result).toEqual({});
	});

	test('uniqueArrayOfObjects returns empty array when input is empty', () => {
		type Item = { id: number };

		const result = typedUniqueArrayOfObjects<Item>([], 'id');

		expect(result).toEqual([]);
	});

	test('getDuplicatesSansArray handles missing array safely', () => {
		const result = getDuplicatesSansArray({
			properties: ['id'],
		});

		expect(result).toEqual([]);
	});

	test('getUniquePrimitives removes falsy values and duplicates', () => {
		const input = [1, 0, 2, false, 2, '', 3];

		const result = getUniquePrimitives(input);

		expect(result).toEqual([1, 2, 3]);
	});

	test('uniqueArray preserves original order of first occurrences', () => {
		const input = ['a', 'b', 'a', 'c', 'b'];

		const result = uniqueArray(input);

		expect(result).toEqual(['a', 'b', 'c']);
	});
});
