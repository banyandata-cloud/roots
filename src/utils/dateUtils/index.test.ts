import {
	getJSDateFromEpoch,
	getDateFromEpoch,
	getTimeFromEpoch,
	epochToFormattedDate,
	getDayInfo,
	getDatesInStringFormat,
	getDatesInAMonth,
} from './index';

// HAPPY PATH
describe('dateUtils — basic and expected date transformations', () => {
	test('getJSDateFromEpoch returns a valid Date instance', () => {
		const epoch = 1000;

		const result = getJSDateFromEpoch(epoch);

		expect(result).toBeInstanceOf(Date);
		expect(result.getTime()).toBeGreaterThan(0);
	});

	test('getDateFromEpoch returns formatted date string', () => {
		const epoch = 0;

		const result = getDateFromEpoch(epoch);

		expect(result).toMatch(/^[A-Za-z]{3} \d{2}, \d{4}$/);
	});

	test('getTimeFromEpoch returns valid HH:MM:SS format', () => {
		const epoch = 3661;

		const result = getTimeFromEpoch(epoch);

		expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
	});
});

//  MEDIUM PATH
describe('dateUtils — formatted output and derived values', () => {
	test('epochToFormattedDate returns time string in 12-hour format', () => {
		const epoch = 0;

		const result = epochToFormattedDate(epoch, 'time');

		expect(result).toMatch(/^\d{1,2}:\d{2}:\d{2} (AM|PM)$/);
	});

	test('epochToFormattedDate returns time string in 24-hour format', () => {
		const epoch = 3661;

		const result = epochToFormattedDate(epoch, 'time', 24);

		expect(result).toMatch(/^\d{2}:\d{2}:\d{2} Hrs$/);
	});

	test('epochToFormattedDate supports custom date format', () => {
		const epoch = 0;

		const result = epochToFormattedDate(epoch, 'date', 'yyyy-MM-dd');

		expect(result).toBe('1970-01-01');
	});

	test('getDayInfo returns correct derived day metadata', () => {
		const date = new Date('2023-08-15T14:30:45');

		const result = getDayInfo(date);

		expect(result).toMatchObject({
			year: 2023,
			dateAsNumber: 15,
			minutes: 30,
			seconds: 45,
			meridian: 'PM',
		});

		expect(result.hours).toBeGreaterThanOrEqual(1);
		expect(result.hours).toBeLessThanOrEqual(12);
	});
});

//  RISKY PATH
describe('dateUtils — edge cases and boundary conditions', () => {
	test('epochToFormattedDate handles universal (UTC) date formatting', () => {
		const epoch = 0;

		const result = epochToFormattedDate(epoch, 'date', 12, true);

		expect(result).toBe('Jan 01, 1970');
	});

	test('getDatesInStringFormat returns correct formatted date range', () => {
		const result = getDatesInStringFormat({
			startingDate: new Date(2023, 0, 1),
			endingDate: new Date(2023, 0, 5),
		});

		expect(result).toEqual(['1 Jan 2023', '5 Jan 2023']);
	});

	test('getDatesInAMonth returns all dates for January', () => {
		const result = getDatesInAMonth({
			month: 0,
			year: 2023,
		});

		expect(result.dates.length).toBe(31);
		expect(result.dateObj[0]).toBeInstanceOf(Date);
		expect(result.days.length).toBe(31);
	});

	test('getDatesInAMonth handles February non-leap year correctly', () => {
		const result = getDatesInAMonth({
			month: 1,
			year: 2023,
		});

		expect(result.dates.length).toBe(28);
	});
});
