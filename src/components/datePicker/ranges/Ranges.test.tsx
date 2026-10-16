import { fireEvent, render, screen } from '@testing-library/react';
import CustomDateRanges from './Ranges';
import { dateRanges } from './utils';
import { findMatchingPresetTitle } from '../utils';

const customRanges = [
	{ title: 'Last 7 Days', type: 'days', value: 7 },
	{ title: 'This Month', type: 'days', value: 14 },
];

const renderRanges = (overrides: Partial<React.ComponentProps<typeof CustomDateRanges>> = {}) =>
	render(
		<CustomDateRanges
			customRanges={customRanges}
			selectedRange={{ dates: [], unix: [] }}
			setSelectedRange={jest.fn()}
			setFixedRange={jest.fn()}
			fixedRange='Last 7 Days'
			{...overrides}
		/>
	);

describe('Date picker custom ranges', () => {
	test('exposes stable hooks and selected state for FinOps preset integration', () => {
		renderRanges({ singleActivePreset: true });

		const list = document.querySelector('[data-elem="custom-ranges"]');
		const selectedPreset = screen.getByRole('button', { name: 'Last 7 Days' });
		const inactivePreset = screen.getByRole('button', { name: 'This Month' });

		expect(list).toHaveAttribute('data-elem', 'custom-ranges');
		expect(list).toHaveAttribute('data-single-active-preset', 'true');
		expect(selectedPreset).toHaveAttribute('data-preset-title', 'Last 7 Days');
		expect(selectedPreset).toHaveAttribute('data-preset-selected', 'true');
		expect(selectedPreset).toHaveAttribute('aria-pressed', 'true');
		expect(inactivePreset).toHaveAttribute('aria-pressed', 'false');
	});

	test('selects and applies a custom range when its preset is clicked', () => {
		const setSelectedRange = jest.fn();
		const setFixedRange = jest.fn();
		renderRanges({ setSelectedRange, setFixedRange });

		fireEvent.click(screen.getByRole('button', { name: 'This Month' }));

		expect(setSelectedRange).toHaveBeenCalledWith(
			expect.objectContaining({ dates: expect.any(Array), unix: expect.any(Array) })
		);
		expect(setFixedRange).toHaveBeenCalledWith('This Month');
	});

	test('shows This Quarter as active when selected in FinOps single-preset mode', () => {
		renderRanges({
			customRanges: [{ title: 'This Quarter', type: 'days', value: 15 }],
			fixedRange: 'This Quarter',
			singleActivePreset: true,
		});

		expect(screen.getByRole('button', { name: 'This Quarter' })).toHaveAttribute(
			'aria-pressed',
			'true'
		);
	});

	test.each(['Last Quarter', 'Last 3 Months'])(
		'shows %s as active when selected in FinOps single-preset mode',
		(title) => {
			renderRanges({
				customRanges: [{ title, type: 'days', value: 100 }],
				fixedRange: title,
				singleActivePreset: true,
			});

			expect(screen.getByRole('button', { name: title })).toHaveAttribute(
				'aria-pressed',
				'true'
			);
		}
	);

	test('uses full calendar boundaries for FinOps month and quarter presets', () => {
		jest.useFakeTimers().setSystemTime(new Date(2026, 6, 16, 12));
		const presets = dateRanges(
			[
				{ title: 'This Month', type: 'days', value: 15 },
				{ title: 'This Quarter', type: 'days', value: 15 },
				{ title: 'Last 3 Months', type: 'days', value: 106 },
				{ title: 'Last Quarter', type: 'days', value: 106 },
			],
			false,
			true
		);
		const rangeFor = (title: string) =>
			presets.find((preset) => preset.title === title)?.dateRange;

		expect(rangeFor('This Month')?.dates[0]).toEqual(new Date(2026, 6, 1));
		expect(rangeFor('This Month')?.dates[1]).toEqual(new Date(2026, 6, 31, 23, 59, 59, 999));
		expect(rangeFor('This Quarter')?.dates[0]).toEqual(new Date(2026, 6, 1));
		expect(rangeFor('This Quarter')?.dates[1]).toEqual(new Date(2026, 6, 16, 12));
		expect(rangeFor('Last 3 Months')?.dates[0]).toEqual(new Date(2026, 3, 1));
		expect(rangeFor('Last 3 Months')?.dates[1]).toEqual(new Date(2026, 5, 30, 23, 59, 59, 999));
		expect(rangeFor('Last Quarter')?.dates[0]).toEqual(new Date(2026, 3, 1));
		expect(rangeFor('Last Quarter')?.dates[1]).toEqual(new Date(2026, 5, 30, 23, 59, 59, 999));
		jest.useRealTimers();
	});

	test('restores the explicitly applied preset when calendar ranges overlap', () => {
		jest.useFakeTimers().setSystemTime(new Date(2026, 6, 16, 12));
		const presets = dateRanges(
			[
				{ title: 'Last Quarter', type: 'days', value: 106 },
				{ title: 'Last 3 Months', type: 'days', value: 106 },
			],
			false,
			true
		);
		const sharedRange = presets.find((preset) => preset.title === 'Last 3 Months')?.dateRange
			.unix;

		expect(findMatchingPresetTitle(presets, sharedRange)).toBe('Last Quarter');
		expect(findMatchingPresetTitle(presets, sharedRange, 'Last 3 Months')).toBe(
			'Last 3 Months'
		);
		expect(findMatchingPresetTitle(presets, sharedRange, 'Last Quarter')).toBe('Last Quarter');
		jest.useRealTimers();
	});

	test('keeps calendar-named custom ranges in the legacy duration mode unless opted in', () => {
		jest.useFakeTimers().setSystemTime(new Date(2026, 6, 16, 12));
		const presets = dateRanges([{ title: 'This Month', type: 'days', value: 5 }]);

		expect(presets[0]?.dateRange.dates[0]).toEqual(new Date(2026, 6, 11, 12));
		expect(presets[0]?.dateRange.dates[1]).toEqual(new Date(2026, 6, 16, 12));
		jest.useRealTimers();
	});
});
