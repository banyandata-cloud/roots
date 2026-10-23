import {
	addDays,
	addMonths,
	endOfMonth,
	endOfWeek,
	isAfter,
	isBefore,
	isSameDay,
	isSameMonth,
	setHours,
	setMinutes,
	setSeconds,
	startOfDay,
	startOfMonth,
	startOfWeek,
	subMonths,
} from 'date-fns';
import type { DayInfo, TimeOfDay } from '../types';

const WEEK_STARTS_ON = 1; // Monday first (locale/first-day-of-week is a developer decision; see spec section 9 #41).

/** Always exactly 6 rows (42 days) so the popover never changes height between months. */
export function buildMonthMatrix(monthDate: Date): Date[] {
	const firstOfMonth = startOfMonth(monthDate);
	const gridStart = startOfWeek(firstOfMonth, { weekStartsOn: WEEK_STARTS_ON });
	const days: Date[] = [];
	for (let i = 0; i < 42; i += 1) {
		days.push(addDays(gridStart, i));
	}
	return days;
}

export function isFutureDisabled(date: Date, future: boolean, now: Date): boolean {
	if (future) {
		return false;
	}
	return isAfter(startOfDay(date), startOfDay(now));
}

/**
 * Clamps a resolved preset range so it never lands on a disabled future day (e.g. "This
 * quarter" naturally runs past today). A no-op when future dates are allowed.
 */
export function clampRangeToToday(
	range: { from: Date; to: Date },
	now: Date,
	future: boolean
): { from: Date; to: Date } {
	if (future) {
		return range;
	}
	const today = startOfDay(now);
	return {
		from: isAfter(range.from, today) ? today : range.from,
		to: isAfter(range.to, today) ? today : range.to,
	};
}

/** A start before the first day of data moves to that day (edge case #9). */
export function clampToDataStart(date: Date, dataStart: Date | null | undefined): Date {
	if (dataStart && isBefore(startOfDay(date), startOfDay(dataStart))) {
		return startOfDay(dataStart);
	}
	return date;
}

/** Picking an earlier second day swaps Start and End (edge case #6). */
export function swapIfReversed(from: Date, to: Date): [Date, Date] {
	return isAfter(from, to) ? [to, from] : [from, to];
}

export function combineDateAndTime(date: Date, time: TimeOfDay | null | undefined): Date {
	if (!time) {
		return date;
	}
	return setSeconds(setMinutes(setHours(date, time.hour), time.minute), 0);
}

export function buildDayInfo(options: {
	date: Date;
	month: Date;
	now: Date;
	future: boolean;
	selectionStart: Date | null;
	selectionEnd: Date | null;
	hoverPreviewEnd: Date | null;
}): DayInfo {
	const { date, month, now, future, selectionStart, selectionEnd, hoverPreviewEnd } = options;

	const previewEnd = selectionStart && !selectionEnd ? hoverPreviewEnd : null;
	const rangeStart = selectionStart;
	const rangeEnd = selectionEnd ?? previewEnd;
	const [lo, hi] =
		rangeStart && rangeEnd ? swapIfReversed(rangeStart, rangeEnd) : [rangeStart, rangeEnd];

	const isSelectionStart = !!selectionStart && isSameDay(date, selectionStart);
	const isSelectionEnd = !!selectionEnd && isSameDay(date, selectionEnd);
	const isInRange =
		!!lo &&
		!!hi &&
		isAfter(startOfDay(date), startOfDay(lo)) &&
		isBefore(startOfDay(date), startOfDay(hi));
	const isHoverPreview =
		!!previewEnd &&
		!!rangeStart &&
		!isSelectionStart &&
		(isInRange || isSameDay(date, previewEnd));

	// The Figma master component shows the selected (start/end) pill with no band of its
	// own — only the strictly-in-between days carry the flat, full-width band.
	const band: DayInfo['band'] = isInRange ? 'full' : 'none';

	return {
		date,
		inCurrentMonth: isSameMonth(date, month),
		isToday: isSameDay(date, now),
		isDisabled: isFutureDisabled(date, future, now),
		isSelectionStart,
		isSelectionEnd,
		isInRange,
		isHoverPreview,
		band,
	};
}

export function getMonthGridEnd(monthDate: Date): Date {
	return endOfWeek(endOfMonth(monthDate), { weekStartsOn: WEEK_STARTS_ON });
}

export function shiftMonths(monthDate: Date, amount: number): Date {
	return amount >= 0 ? addMonths(monthDate, amount) : subMonths(monthDate, -amount);
}
