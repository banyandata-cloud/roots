import { sanitizeJSON, areTwinObjects, stringToPath, get, safeJSONParse, cloneDeep } from './index';

// HAPPY PATH
describe('objectUtils — basic and expected functionality', () => {
	test('sanitizeJSON removes empty and invalid values', () => {
		const input = {
			name: 'John',
			age: 30,
			email: '',
			status: null,
			role: 'admin',
		};

		const result = sanitizeJSON(input);

		expect(result).toEqual({
			name: 'John',
			age: 30,
			role: 'admin',
		});
	});

	test('areTwinObjects returns true for identical objects', () => {
		const a = { x: 1, y: { z: 2 } };
		const b = { x: 1, y: { z: 2 } };

		expect(areTwinObjects(a, b)).toBe(true);
	});

	test('stringToPath converts dot notation to path array', () => {
		const result = stringToPath('a.b.c');

		expect(result).toEqual(['a', 'b', 'c']);
	});

	test('get retrieves nested value using string path', () => {
		const obj = { a: { b: { c: 10 } } };

		const result = get<number>(obj, 'a.b.c');

		expect(result).toBe(10);
	});
});

//  MEDIUM PATH
describe('objectUtils — handles common variations and options', () => {
	test('sanitizeJSON applies aliases correctly', () => {
		const input = {
			firstName: 'John',
			lastName: 'Doe',
		};

		const result = sanitizeJSON(input, {
			firstName: 'first_name',
		});

		expect(result).toEqual({
			first_name: 'John',
			lastName: 'Doe',
		});
	});

	test('sanitizeJSON excludes specified keys', () => {
		const input = {
			username: 'john',
			password: 'secret',
		};

		const result = sanitizeJSON(input, {}, ['password']);

		expect(result).toEqual({
			username: 'john',
		});
	});

	test('areTwinObjects returns false for objects with different values', () => {
		const a = { x: 1, y: 2 };
		const b = { x: 1, y: 3 };

		expect(areTwinObjects(a, b)).toBe(false);
	});

	test('get returns default value when path does not exist', () => {
		const obj = { a: { b: 1 } };

		const result = get(obj, 'a.b.c', 'default');

		expect(result).toBe('default');
	});

	test('stringToPath supports array index notation', () => {
		const result = stringToPath('a[0].b');

		expect(result).toEqual(['a', '0', 'b']);
	});
});

// RISKY PATH
describe('objectUtils — edge cases and defensive behavior', () => {
	test('sanitizeJSON handles undefined input safely', () => {
		const result = sanitizeJSON(undefined as unknown as Record<string, unknown>);

		expect(result).toEqual({});
	});

	test('areTwinObjects correctly compares primitive values', () => {
		expect(areTwinObjects(1, 1)).toBe(true);
		expect(areTwinObjects(1, 2)).toBe(false);
	});

	test('get returns default value for non-object input', () => {
		const result = get(10, 'a.b', 'fallback');

		expect(result).toBe('fallback');
	});

	test('safeJSONParse returns parsed object for valid JSON', () => {
		const input = '{"a":1,"b":2}';

		const result = safeJSONParse(input);

		expect(result).toEqual({ a: 1, b: 2 });
	});

	test('safeJSONParse returns null for invalid JSON', () => {
		const result = safeJSONParse('{ invalid json }');

		expect(result).toBeNull();
	});

	test('cloneDeep creates a deep copy of an object', () => {
		const original = { a: { b: 1 } };
		const cloned = cloneDeep(original);

		expect(cloned).toEqual(original);
		expect(cloned).not.toBe(original);

		(cloned as any).a.b = 2;

		expect(original.a.b).toBe(1);
	});
});
