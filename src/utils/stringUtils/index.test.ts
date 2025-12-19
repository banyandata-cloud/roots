import {
	getSpacedDisplayName,
	getInitialsOfName,
	classes,
	isEmptyHtmlString,
	getCSSVariableValue,
	doubleDigitted,
} from './index';

//  HAPPY PATH
describe('stringUtils — basic and expected string transformations', () => {
	test('getSpacedDisplayName formats camelCase and kebab case correctly', () => {
		expect(getSpacedDisplayName('userProfile')).toBe('User Profile');
		expect(getSpacedDisplayName('user-profile')).toBe('User Profile');
	});

	test('getInitialsOfName returns initials from first and last name', () => {
		expect(getInitialsOfName('John Doe')).toBe('JD');
	});

	test('classes joins valid class names', () => {
		const result = classes('btn', 'primary', 'large');

		expect(result).toBe('btn primary large');
	});

	test('doubleDigitted pads single digit numbers', () => {
		expect(doubleDigitted(5)).toBe('05');
	});
});

// MEDIUM PATH
describe('stringUtils — handles common variations and inputs', () => {
	test('getSpacedDisplayName preserves acronyms and capitalizes words', () => {
		expect(getSpacedDisplayName('APIResponseCode')).toBe('API Response Code');
		expect(getSpacedDisplayName('_user_DB_status')).toBe('User DB Status');
	});

	test('getInitialsOfName handles extra spaces gracefully', () => {
		expect(getInitialsOfName('   Alice   Bob   ')).toBe('AB');
	});

	test('classes ignores falsy values', () => {
		const result = classes('btn', false, null, undefined, 'active');

		expect(result).toBe('btn active');
	});

	test('isEmptyHtmlString returns false for meaningful content', () => {
		expect(isEmptyHtmlString('<p>Hello</p>')).toBe(false);
	});

	test('doubleDigitted handles two-digit numbers correctly', () => {
		expect(doubleDigitted(12)).toBe('12');
	});
});

// RISKY PATH
describe('stringUtils — edge cases and defensive behavior', () => {
	test('getSpacedDisplayName returns empty string for empty input', () => {
		expect(getSpacedDisplayName('')).toBe('');
		expect(getSpacedDisplayName(undefined as unknown as string)).toBe('');
	});

	test('getInitialsOfName returns empty string for invalid input', () => {
		expect(getInitialsOfName('')).toBe('');
		expect(getInitialsOfName('   ')).toBe('');
	});

	test('isEmptyHtmlString detects empty HTML content', () => {
		expect(isEmptyHtmlString('<div><span></span></div>')).toBe(true);
	});

	test('getCSSVariableValue returns value of CSS variable', () => {
		document.documentElement.style.setProperty('--primary-color', 'red');

		const result = getCSSVariableValue('--primary-color');

		expect(result).toBe('red');
	});

	test('doubleDigitted returns empty string for undefined input', () => {
		expect(doubleDigitted(undefined)).toBe('');
	});
});
