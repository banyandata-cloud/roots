import type { DropdownOption } from '../../input/dropdown/types';
import type { TimeOfDay } from '../types';

/** Shown in a TimeSelect whenever its value is unset (edge-case-safe default: 9:00 AM). */
export const DEFAULT_TIME: TimeOfDay = { hour: 9, minute: 0 };

export function getHourOptions(hour12: boolean): DropdownOption[] {
	if (hour12) {
		return Array.from({ length: 12 }, (_, i) => {
			const hour = i + 1;
			return { value: String(hour), label: String(hour) };
		});
	}
	return Array.from({ length: 24 }, (_, hour) => ({
		value: String(hour),
		label: String(hour).padStart(2, '0'),
	}));
}

export function getMinuteOptions(currentMinute: number): DropdownOption[] {
	const minutes = new Set<number>([
		0,
		5,
		10,
		15,
		20,
		25,
		30,
		35,
		40,
		45,
		50,
		55,
		59,
		currentMinute,
	]);
	return Array.from(minutes)
		.sort((a, b) => a - b)
		.map((minute) => ({ value: String(minute), label: String(minute).padStart(2, '0') }));
}

export const PERIOD_OPTIONS: DropdownOption[] = [
	{ value: 'AM', label: 'AM' },
	{ value: 'PM', label: 'PM' },
];

export function to12Hour(hour: number): { hour12: number; period: 'AM' | 'PM' } {
	const period = hour >= 12 ? 'PM' : 'AM';
	const hour12 = hour % 12 === 0 ? 12 : hour % 12;
	return { hour12, period };
}

export function from12Hour(hour12: number, period: 'AM' | 'PM'): number {
	const base = hour12 % 12;
	return period === 'PM' ? base + 12 : base;
}

/** Converts a time to total minutes since midnight, for range/ordering comparisons. */
export function timeToMinutes(time: TimeOfDay): number {
	return time.hour * 60 + time.minute;
}
