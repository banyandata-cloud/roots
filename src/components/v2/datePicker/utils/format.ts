import { differenceInCalendarDays, differenceInMinutes, format } from 'date-fns';
import type { TimeOfDay } from '../types';

export function formatDateLabel(date: Date): string {
	return format(date, 'MMM dd, yyyy');
}

export function formatMonthTitle(date: Date): string {
	return format(date, 'MMMM yyyy');
}

export function formatTimeOfDay(time: TimeOfDay, hour12: boolean): string {
	if (!hour12) {
		return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`;
	}
	const period = time.hour >= 12 ? 'PM' : 'AM';
	const hour12Value = time.hour % 12 === 0 ? 12 : time.hour % 12;
	return `${hour12Value}:${String(time.minute).padStart(2, '0')} ${period}`;
}

/**
 * Length of a range (edge case #17): full days plus leftover hours ("33 days 20 hrs").
 * Under 24 hours: hours only. Under 1 hour: minutes only. Without time: whole days.
 */
export function formatDuration(
	from: Date,
	to: Date,
	options: { withTime: boolean } = { withTime: false }
): string {
	const { withTime } = options;
	const totalMinutes = differenceInMinutes(to, from);

	if (!withTime) {
		const days = differenceInCalendarDays(to, from) + 1;
		return `${days} ${days === 1 ? 'day' : 'days'}`;
	}

	if (totalMinutes < 60) {
		return `${totalMinutes} ${totalMinutes === 1 ? 'min' : 'mins'}`;
	}

	if (totalMinutes < 24 * 60) {
		const hours = Math.floor(totalMinutes / 60);
		return `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
	}

	const days = Math.floor(totalMinutes / (24 * 60));
	const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
	if (hours === 0) {
		return `${days} ${days === 1 ? 'day' : 'days'}`;
	}
	return `${days} ${days === 1 ? 'day' : 'days'} ${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
}

export function getSystemTimeZone(): string {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	} catch {
		return 'UTC';
	}
}
