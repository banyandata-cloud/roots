import { classes, inputHelper } from './index';

describe('classes', () => {
	test('joins truthy class names', () => {
		expect(classes('a', 'b')).toBe('a b');
	});

	test('skips falsy values', () => {
		expect(classes('a', false, null, undefined, '', 'b')).toBe('a b');
	});

	test('returns an empty string when nothing is truthy', () => {
		expect(classes(false, undefined)).toBe('');
	});
});

describe('inputHelper', () => {
	const change = (target: Partial<HTMLInputElement>) =>
		({ target }) as unknown as Parameters<typeof inputHelper>[0];

	test('reads name and value from a text input', () => {
		const input = document.createElement('input');
		input.name = 'email';
		input.value = 'a@b.c';
		expect(inputHelper(change(input))).toMatchObject({
			fieldName: 'email',
			fieldValue: 'a@b.c',
		});
	});

	test('returns the checked state for checkboxes and radios', () => {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.name = 'agree';
		checkbox.checked = true;
		expect(inputHelper(change(checkbox)).fieldValue).toBe(true);
	});
});
