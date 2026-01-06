import type { ChangeEvent } from 'react';
import { inputHelper } from './index';

//  HAPPY PATH
describe('inputHelper — extracts field name, value, and dataset correctly', () => {
	test('returns name and value for text input', () => {
		const input = document.createElement('input');
		input.name = 'username';
		input.value = 'john_doe';
		input.type = 'text';
		input.dataset.role = 'admin';

		const event = {
			target: input,
		} as ChangeEvent<HTMLInputElement>;

		const result = inputHelper(event);

		expect(result.fieldName).toBe('username');
		expect(result.fieldValue).toBe('john_doe');
		expect(result.dataset).toBe(input.dataset);
		expect(result.dataset.role).toBe('admin');
	});

	test('returns name and value for textarea input', () => {
		const textarea = document.createElement('textarea');
		textarea.name = 'description';
		textarea.value = 'hello world';

		const event = {
			target: textarea,
		} as ChangeEvent<HTMLTextAreaElement>;

		const result = inputHelper(event);

		expect(result.fieldName).toBe('description');
		expect(result.fieldValue).toBe('hello world');
	});
});

// MEDIUM PATH
describe('inputHelper — handles checkbox and radio inputs correctly', () => {
	test('returns boolean value for checkbox input', () => {
		const checkbox = document.createElement('input');
		checkbox.name = 'isActive';
		checkbox.type = 'checkbox';
		checkbox.checked = true;

		const event = {
			target: checkbox,
		} as ChangeEvent<HTMLInputElement>;

		const result = inputHelper(event);

		expect(result.fieldName).toBe('isActive');
		expect(result.fieldValue).toBe(true);
	});

	test('returns boolean value for radio input', () => {
		const radio = document.createElement('input');
		radio.name = 'gender';
		radio.type = 'radio';
		radio.checked = false;

		const event = {
			target: radio,
		} as ChangeEvent<HTMLInputElement>;

		const result = inputHelper(event);

		expect(result.fieldName).toBe('gender');
		expect(result.fieldValue).toBe(false);
	});
});

// RISKY PATH
describe('inputHelper — edge cases and defensive behavior', () => {
	test('returns string value for select element', () => {
		const select = document.createElement('select');
		select.name = 'country';

		const option = document.createElement('option');
		option.value = 'IN';
		option.text = 'India';
		select.appendChild(option);

		select.value = 'IN';
		select.dataset.region = 'asia';

		const event = {
			target: select,
		} as ChangeEvent<HTMLSelectElement>;

		const result = inputHelper(event);

		expect(result.fieldName).toBe('country');
		expect(result.fieldValue).toBe('IN');
		expect(result.dataset).toBe(select.dataset);
		expect(result.dataset.region).toBe('asia');
	});

	test('handles empty dataset gracefully', () => {
		const input = document.createElement('input');
		input.name = 'email';
		input.value = 'test@example.com';
		input.type = 'email';

		const event = {
			target: input,
		} as ChangeEvent<HTMLInputElement>;

		const result = inputHelper(event);

		expect(result.dataset).toBe(input.dataset);
		expect(Object.keys(result.dataset)).toHaveLength(0);
	});
});
