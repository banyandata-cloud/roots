import {
	addDays,
	addMonths,
	endOfMonth,
	endOfQuarter,
	startOfDay,
	startOfMonth,
	subDays,
	subMonths,
} from 'date-fns';
import type { PresetDefinition } from '../types';

const today = (now: Date) => ({ from: startOfDay(now), to: startOfDay(now) });

const RANGE_PRESETS: PresetDefinition[] = [
	{ id: 'today', label: 'Today', resolve: today },
	{
		id: 'yesterday',
		label: 'Yesterday',
		resolve: (now) => ({ from: startOfDay(subDays(now, 1)), to: startOfDay(subDays(now, 1)) }),
	},
	{
		id: 'last-7-days',
		label: 'Last 7 days',
		resolve: (now) => ({ from: startOfDay(subDays(now, 6)), to: startOfDay(now) }),
	},
	{
		id: 'last-30-days',
		label: 'Last 30 days',
		resolve: (now) => ({ from: startOfDay(subDays(now, 29)), to: startOfDay(now) }),
	},
	{
		id: 'last-90-days',
		label: 'Last 90 days',
		resolve: (now) => ({ from: startOfDay(subDays(now, 89)), to: startOfDay(now) }),
	},
	{
		id: 'this-month',
		label: 'This month',
		resolve: (now) => ({ from: startOfMonth(now), to: startOfDay(now) }),
	},
	{
		id: 'last-month',
		label: 'Last month',
		resolve: (now) => {
			const lastMonth = subMonths(now, 1);
			return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
		},
	},
	{
		id: 'this-quarter',
		label: 'This quarter',
		resolve: (now) => ({
			from: startOfMonth(subMonths(now, now.getMonth() % 3)),
			to: endOfQuarter(now),
		}),
	},
];

const RANGE_FUTURE_PRESETS: PresetDefinition[] = [
	{
		id: 'next-14-days',
		label: 'Next 14 days',
		resolve: (now) => ({ from: startOfDay(now), to: startOfDay(addDays(now, 13)) }),
	},
	{
		id: 'next-30-days',
		label: 'Next 30 days',
		resolve: (now) => ({ from: startOfDay(now), to: startOfDay(addDays(now, 29)) }),
	},
	{
		id: 'next-month',
		label: 'Next month',
		resolve: (now) => {
			const nextMonth = addMonths(now, 1);
			return { from: startOfMonth(nextMonth), to: endOfMonth(nextMonth) };
		},
	},
];

const SINGLE_PRESETS: PresetDefinition[] = [
	{ id: 'today', label: 'Today', resolve: today },
	{
		id: 'yesterday',
		label: 'Yesterday',
		resolve: (now) => ({ from: startOfDay(subDays(now, 1)), to: startOfDay(subDays(now, 1)) }),
	},
	{
		id: '7-days-ago',
		label: '7 days ago',
		resolve: (now) => ({ from: startOfDay(subDays(now, 7)), to: startOfDay(subDays(now, 7)) }),
	},
	{
		id: '30-days-ago',
		label: '30 days ago',
		resolve: (now) => ({
			from: startOfDay(subDays(now, 30)),
			to: startOfDay(subDays(now, 30)),
		}),
	},
];

const SINGLE_FUTURE_PRESETS: PresetDefinition[] = [
	{
		id: 'tomorrow',
		label: 'Tomorrow',
		resolve: (now) => ({ from: startOfDay(addDays(now, 1)), to: startOfDay(addDays(now, 1)) }),
	},
];

/** Returns the preset list for a mode, appending the future-dated presets when `future` is allowed. */
export function getPresets(mode: 'single' | 'range', future: boolean): PresetDefinition[] {
	if (mode === 'single') {
		return future ? [...SINGLE_PRESETS, ...SINGLE_FUTURE_PRESETS] : SINGLE_PRESETS;
	}
	return future ? [...RANGE_PRESETS, ...RANGE_FUTURE_PRESETS] : RANGE_PRESETS;
}

export function findPreset(
	mode: 'single' | 'range',
	future: boolean,
	id: string
): PresetDefinition | undefined {
	return getPresets(mode, future).find((preset) => preset.id === id);
}
