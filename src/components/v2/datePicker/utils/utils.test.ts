import { addDays, isSameDay, subDays } from 'date-fns';
import {
	buildDayInfo,
	buildMonthMatrix,
	clampRangeToToday,
	clampToDataStart,
	swapIfReversed,
} from './calendarMath';
import { formatDuration, formatTimeOfDay } from './format';
import { parseRangeText, parseTypedDate } from './parse';
import { getPresets } from './presets';

describe('presets', () => {
	test('range presets exclude future-dated presets by default', () => {
		const ids = getPresets('range', false).map((preset) => preset.id);
		expect(ids).toEqual([
			'today',
			'yesterday',
			'last-7-days',
			'last-30-days',
			'last-90-days',
			'this-month',
			'last-month',
			'this-quarter',
		]);
	});

	test('future presets are appended only when allowed', () => {
		const ids = getPresets('range', true).map((preset) => preset.id);
		expect(ids).toEqual(expect.arrayContaining(['next-14-days', 'next-30-days', 'next-month']));
	});

	test('single mode has its own, shorter preset list', () => {
		const ids = getPresets('single', false).map((preset) => preset.id);
		expect(ids).toEqual(['today', 'yesterday', '7-days-ago', '30-days-ago']);
	});

	test('last-7-days resolves to a 7-day window ending today', () => {
		const now = new Date(2026, 9, 12); // Oct 12, 2026
		const preset = getPresets('range', false).find((item) => item.id === 'last-7-days');
		const { from, to } = preset!.resolve(now);
		expect(isSameDay(to, now)).toBe(true);
		expect(isSameDay(from, subDays(now, 6))).toBe(true);
	});

	test('this-quarter resolves past today on its own — callers must clamp it', () => {
		// Oct 12, 2026 is in Q4 (Oct-Dec), so the raw quarter end is in the future.
		const now = new Date(2026, 9, 12);
		const preset = getPresets('range', false).find((item) => item.id === 'this-quarter');
		const { to } = preset!.resolve(now);
		expect(to.getTime()).toBeGreaterThan(now.getTime());
	});

	test('clampRangeToToday pulls a preset range back to today when future dates are disallowed', () => {
		const now = new Date(2026, 9, 12);
		const preset = getPresets('range', false).find((item) => item.id === 'this-quarter');
		const clamped = clampRangeToToday(preset!.resolve(now), now, false);
		expect(isSameDay(clamped.to, now)).toBe(true);
		expect(clamped.to.getTime()).toBeLessThanOrEqual(now.getTime());
	});

	test('clampRangeToToday is a no-op once future dates are allowed', () => {
		const now = new Date(2026, 9, 12);
		const preset = getPresets('range', false).find((item) => item.id === 'this-quarter');
		const raw = preset!.resolve(now);
		const clamped = clampRangeToToday(raw, now, true);
		expect(clamped).toEqual(raw);
	});
});

describe('calendarMath', () => {
	test('buildMonthMatrix always returns exactly 42 days (6 weeks)', () => {
		const days = buildMonthMatrix(new Date(2026, 9, 1));
		expect(days).toHaveLength(42);
	});

	test('swapIfReversed orders an accidentally-reversed pick', () => {
		const a = new Date(2026, 9, 10);
		const b = new Date(2026, 9, 5);
		const [from, to] = swapIfReversed(a, b);
		expect(from).toBe(b);
		expect(to).toBe(a);
	});

	test('clampToDataStart moves an earlier start up to the first day of data', () => {
		const dataStart = new Date(2026, 9, 1);
		const tooEarly = new Date(2026, 8, 15);
		const clamped = clampToDataStart(tooEarly, dataStart);
		expect(isSameDay(clamped, dataStart)).toBe(true);
	});

	test('clampToDataStart leaves a valid date untouched', () => {
		const dataStart = new Date(2026, 9, 1);
		const validDate = new Date(2026, 9, 15);
		expect(clampToDataStart(validDate, dataStart)).toBe(validDate);
	});

	test('buildDayInfo marks a day strictly between start and end as in-range with a full band', () => {
		const now = new Date(2026, 9, 12);
		const info = buildDayInfo({
			date: new Date(2026, 9, 10),
			month: now,
			now,
			future: false,
			selectionStart: new Date(2026, 9, 5),
			selectionEnd: new Date(2026, 9, 15),
			hoverPreviewEnd: null,
		});
		expect(info.isInRange).toBe(true);
		expect(info.band).toBe('full');
	});

	test('buildDayInfo disables a future day by default', () => {
		const now = new Date(2026, 9, 12);
		const info = buildDayInfo({
			date: addDays(now, 1),
			month: now,
			now,
			future: false,
			selectionStart: null,
			selectionEnd: null,
			hoverPreviewEnd: null,
		});
		expect(info.isDisabled).toBe(true);
	});

	test('buildDayInfo allows a future day when future is true', () => {
		const now = new Date(2026, 9, 12);
		const info = buildDayInfo({
			date: addDays(now, 1),
			month: now,
			now,
			future: true,
			selectionStart: null,
			selectionEnd: null,
			hoverPreviewEnd: null,
		});
		expect(info.isDisabled).toBe(false);
	});
});

describe('format', () => {
	test('formatDuration counts whole days without time', () => {
		const from = new Date(2026, 8, 1);
		const to = new Date(2026, 8, 30);
		expect(formatDuration(from, to)).toBe('30 days');
	});

	test('formatDuration reports days and leftover hours with time on', () => {
		const from = new Date(2026, 8, 1, 0, 0);
		const to = new Date(2026, 8, 31, 20, 0);
		expect(formatDuration(from, to, { withTime: true })).toBe('30 days 20 hrs');
	});

	test('formatTimeOfDay renders 12-hour and 24-hour formats', () => {
		expect(formatTimeOfDay({ hour: 13, minute: 5 }, true)).toBe('1:05 PM');
		expect(formatTimeOfDay({ hour: 13, minute: 5 }, false)).toBe('13:05');
		expect(formatTimeOfDay({ hour: 0, minute: 0 }, true)).toBe('12:00 AM');
	});
});

describe('parse', () => {
	const reference = new Date(2026, 9, 12); // Oct 12, 2026

	test('parses a month-name date with a year', () => {
		const result = parseTypedDate('Feb 05, 2024', reference);
		expect(result).toEqual(new Date(2024, 1, 5));
	});

	test('parses an ISO date', () => {
		const result = parseTypedDate('2024-02-05', reference);
		expect(result).toEqual(new Date(2024, 1, 5));
	});

	test('reads a numeric date day-first', () => {
		const result = parseTypedDate('20/08/2024', reference);
		expect(result).toEqual(new Date(2024, 7, 20));
	});

	test('reads a numeric date month-first when the second number is over 12', () => {
		const result = parseTypedDate('08/20/2024', reference);
		expect(result).toEqual(new Date(2024, 7, 20));
	});

	test('rejects a two-digit year', () => {
		expect(parseTypedDate('20/08/24', reference)).toBeNull();
	});

	test('rejects an impossible date', () => {
		expect(parseTypedDate('2024-02-30', reference)).toBeNull();
	});

	test('fills in the current year when none is given', () => {
		const result = parseTypedDate('Oct 7', reference);
		expect(result).toEqual(new Date(2026, 9, 7));
	});

	test('parses a full pasted range with years', () => {
		const result = parseRangeText('Aug 20, 2024 - Oct 07, 2026', reference);
		expect(result).toEqual({ from: new Date(2024, 7, 20), to: new Date(2026, 9, 7) });
	});

	test('parses a short range such as "Oct 1 - 7"', () => {
		const result = parseRangeText('Oct 1 - 7', reference);
		expect(result).toEqual({ from: new Date(2026, 9, 1), to: new Date(2026, 9, 7) });
	});

	test('moves a reversed no-year range back a year instead of swapping', () => {
		// Today is Oct 12, 2026: "Nov 1 to Oct 7" gives Nov 01, 2025 to Oct 07, 2026.
		const result = parseRangeText('Nov 1 to Oct 7', reference);
		expect(result).toEqual({ from: new Date(2025, 10, 1), to: new Date(2026, 9, 7) });
	});
});
