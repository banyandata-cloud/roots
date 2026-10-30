import { fireEvent, render, screen, within } from '@testing-library/react';
import DatePicker from './DatePicker';
import type { DatePickerMode, DatePickerValue } from './types';

const variants = (['range', 'single'] as const).flatMap((mode) =>
	[false, true].flatMap((time) => [false, true].map((future) => ({ mode, time, future })))
);

function initialValue(mode: DatePickerMode): DatePickerValue {
	return {
		preset: null,
		from: new Date(2024, 8, 2),
		to: mode === 'range' ? new Date(2024, 8, 3) : null,
	};
}

function selectDates(mode: DatePickerMode, start = 10, end = 12) {
	fireEvent.click(screen.getByRole('button', { name: new Date(2024, 8, start).toDateString() }));
	if (mode === 'range') {
		fireEvent.click(
			screen.getByRole('button', { name: new Date(2024, 8, end).toDateString() })
		);
	}
}

function recentLabel(mode: DatePickerMode, start = '10', end = '12') {
	return mode === 'range' ? `Sep ${start} → Sep ${end}, 2024` : `Sep ${start}, 2024`;
}

describe('DatePicker', () => {
	test('shows a default trigger label before anything is applied', () => {
		render(<DatePicker mode='range' />);

		expect(screen.getByRole('button', { expanded: false })).toHaveTextContent('Today');
	});

	test('opens the popover on trigger click and shows the preset list', () => {
		render(<DatePicker mode='range' />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));

		expect(screen.getByText('Last 7 days')).toBeInTheDocument();
		expect(screen.getByText('Apply dates')).toBeInTheDocument();
	});

	test('clicking a preset keeps it in the draft until Apply', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(<DatePicker mode='range' onChange={handleChange} />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByText('Last 7 days'));

		expect(handleChange).not.toHaveBeenCalled();
		expect(screen.getByRole('button', { expanded: true })).toHaveTextContent('Today');
		fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange.mock.calls[0]?.[0]?.preset).toBe('last-7-days');
		expect(screen.getByRole('button', { expanded: false })).toHaveTextContent('Last 7 days');
	});

	test('single mode applies the clicked day only after Apply', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(<DatePicker mode='single' onChange={handleChange} />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByRole('button', { current: 'date' }));

		expect(handleChange).not.toHaveBeenCalled();
		fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));

		expect(handleChange).toHaveBeenCalledTimes(1);
		const applied = handleChange.mock.calls[0]?.[0];
		expect(applied?.from).toBeInstanceOf(Date);
		expect(applied?.preset).toBeNull();
		expect(screen.getByRole('button', { expanded: false })).toBeInTheDocument();
	});

	test('selecting presets keeps the popover open until Apply', () => {
		render(<DatePicker mode='range' />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByText('Last 7 days'));
		fireEvent.click(screen.getByText('Last 30 days'));

		expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));

		expect(screen.getByRole('button', { expanded: false })).toBeInTheDocument();
	});

	test('range mode requires a start and an end before enabling Apply', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(<DatePicker mode='range' onChange={handleChange} />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByRole('button', { current: 'date' }));

		expect(handleChange).not.toHaveBeenCalled();
		expect(screen.getByRole('button', { name: 'Apply dates' })).toBeDisabled();
	});

	test('cancel restores the previously applied value and discards an unsaved draft', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(
			<DatePicker
				mode='single'
				time
				onChange={handleChange}
				defaultValue={{ preset: null, from: null, to: null }}
			/>
		);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByRole('button', { current: 'date' }));
		fireEvent.click(screen.getByText('Cancel'));

		expect(handleChange).not.toHaveBeenCalled();
		expect(screen.getByRole('button', { expanded: false })).toHaveTextContent('All time');
	});

	test('"This quarter" never selects a future day when future dates are disallowed', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(<DatePicker mode='range' future={false} onChange={handleChange} />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByText('This quarter'));
		fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));

		const applied = handleChange.mock.calls[0]?.[0];
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		expect(applied?.to).not.toBeNull();
		expect((applied?.to as Date).getTime()).toBeLessThanOrEqual(today.getTime());
	});

	test('"This quarter" keeps its real end date once future dates are allowed', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(<DatePicker mode='range' future onChange={handleChange} />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByText('This quarter'));
		fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));

		const applied = handleChange.mock.calls[0]?.[0];
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		// With future allowed, the quarter can legitimately extend past today.
		expect((applied?.to as Date).getTime()).toBeGreaterThanOrEqual(today.getTime());
	});

	test.each(variants)(
		'$mode, time=$time, future=$future: dates and recents commit only on Apply',
		({ mode, time, future }) => {
			const handleChange = jest.fn<void, [DatePickerValue]>();
			render(
				<DatePicker
					mode={mode}
					time={time}
					future={future}
					defaultValue={initialValue(mode)}
					onChange={handleChange}
				/>
			);
			const trigger = screen.getByRole('button', { expanded: false });
			const previousLabel = trigger.textContent;
			fireEvent.click(trigger);
			selectDates(mode);

			expect(handleChange).not.toHaveBeenCalled();
			expect(trigger.textContent).toBe(previousLabel);
			expect(screen.queryByText('Recent')).not.toBeInTheDocument();
			expect(
				screen.getByRole('textbox', { name: mode === 'range' ? 'START DATE' : 'DATE' })
			).toHaveValue('Sep 10, 2024');
			fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));

			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenLastCalledWith(
				expect.objectContaining({
					preset: null,
					from: new Date(2024, 8, 10),
					to: mode === 'range' ? new Date(2024, 8, 12) : null,
				})
			);
			expect(trigger).toHaveAttribute('aria-expanded', 'false');
			expect(trigger).toHaveTextContent('Sep 10, 2024');
			fireEvent.click(trigger);
			expect(
				within(screen.getByRole('dialog')).getByRole('button', { name: recentLabel(mode) })
			).toBeInTheDocument();
		}
	);

	test.each(variants)(
		'$mode, time=$time, future=$future: Cancel restores applied dates without adding recents',
		({ mode, time, future }) => {
			const handleChange = jest.fn<void, [DatePickerValue]>();
			render(
				<DatePicker
					mode={mode}
					time={time}
					future={future}
					defaultValue={initialValue(mode)}
					onChange={handleChange}
				/>
			);
			const trigger = screen.getByRole('button', { expanded: false });
			const previousLabel = trigger.textContent;
			fireEvent.click(trigger);
			selectDates(mode);
			fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
			fireEvent.click(trigger);

			expect(handleChange).not.toHaveBeenCalled();
			expect(trigger.textContent).toBe(previousLabel);
			expect(screen.queryByText('Recent')).not.toBeInTheDocument();
			expect(
				screen.getByRole('textbox', { name: mode === 'range' ? 'START DATE' : 'DATE' })
			).toHaveValue('Sep 02, 2024');
			fireEvent.click(screen.getByRole('button', { name: 'Yesterday' }));
			expect(handleChange).not.toHaveBeenCalled();
			expect(trigger.textContent).toBe(previousLabel);
			fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
			fireEvent.click(trigger);
			expect(
				screen.getByRole('textbox', { name: mode === 'range' ? 'START DATE' : 'DATE' })
			).toHaveValue('Sep 02, 2024');
		}
	);

	test.each(['range', 'single'] as const)(
		'%s: selecting a recent date requires Apply before changing the value or recent order',
		(mode) => {
			const handleChange = jest.fn<void, [DatePickerValue]>();
			render(
				<DatePicker mode={mode} defaultValue={initialValue(mode)} onChange={handleChange} />
			);
			const trigger = screen.getByRole('button', { expanded: false });
			fireEvent.click(trigger);
			selectDates(mode);
			fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));
			fireEvent.click(trigger);
			selectDates(mode, 16, 18);
			fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));
			fireEvent.click(trigger);
			const order = () =>
				within(screen.getByRole('dialog'))
					.getAllByRole('button')
					.map((button) => button.textContent)
					.filter(
						(label) =>
							label === recentLabel(mode) || label === recentLabel(mode, '16', '18')
					);
			const previousOrder = [recentLabel(mode, '16', '18'), recentLabel(mode)];
			expect(order()).toEqual(previousOrder);
			fireEvent.click(screen.getByRole('button', { name: recentLabel(mode) }));

			expect(handleChange).toHaveBeenCalledTimes(2);
			expect(trigger).toHaveTextContent('Sep 16, 2024');
			expect(order()).toEqual(previousOrder);
			fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
			fireEvent.click(trigger);
			expect(order()).toEqual(previousOrder);
			fireEvent.click(screen.getByRole('button', { name: recentLabel(mode) }));
			fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));
			fireEvent.click(trigger);

			expect(handleChange).toHaveBeenCalledTimes(3);
			expect(trigger).toHaveTextContent('Sep 10, 2024');
			expect(order()).toEqual([recentLabel(mode), recentLabel(mode, '16', '18')]);
		}
	);

	test.each(['range', 'single'] as const)(
		'%s: the deprecated autoApply prop cannot commit calendar selections',
		(mode) => {
			const handleChange = jest.fn<void, [DatePickerValue]>();
			render(
				<DatePicker
					mode={mode}
					autoApply
					defaultValue={initialValue(mode)}
					onChange={handleChange}
				/>
			);
			fireEvent.click(screen.getByRole('button', { expanded: false }));
			selectDates(mode);
			expect(handleChange).not.toHaveBeenCalled();
			expect(screen.queryByText('Recent')).not.toBeInTheDocument();
		}
	);

	test.each(['range', 'single'] as const)('%s: typed dates update only the draft', (mode) => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(
			<DatePicker mode={mode} defaultValue={initialValue(mode)} onChange={handleChange} />
		);
		const trigger = screen.getByRole('button', { expanded: false });
		const previousLabel = trigger.textContent;
		fireEvent.click(trigger);
		const input = screen.getByRole('textbox', { name: mode === 'range' ? 'END DATE' : 'DATE' });
		fireEvent.change(input, { target: { value: '2024-09-12' } });
		fireEvent.blur(input);
		expect(handleChange).not.toHaveBeenCalled();
		expect(trigger.textContent).toBe(previousLabel);
		expect(screen.queryByText('Recent')).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(trigger).toHaveTextContent('Sep 12, 2024');
	});

	test('pasted ranges wait for Apply and show shortened years in cross-year recents', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(<DatePicker defaultValue={initialValue('range')} onChange={handleChange} />);
		const trigger = screen.getByRole('button', { expanded: false });
		fireEvent.click(trigger);
		const input = screen.getByRole('textbox', { name: 'START DATE' });
		fireEvent.change(input, { target: { value: 'Dec 28, 2023 - Jan 04, 2024' } });
		fireEvent.blur(input);
		expect(handleChange).not.toHaveBeenCalled();
		expect(trigger).toHaveTextContent('Sep 02, 2024');
		expect(screen.queryByText('Recent')).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));
		fireEvent.click(trigger);
		expect(
			screen.getByRole('button', { name: "Dec 28, '23 → Jan 04, '24" })
		).toBeInTheDocument();
	});

	test.each(['outside click', 'Escape', 'trigger'])(
		'%s discards the draft on reopening',
		(dismiss) => {
			const handleChange = jest.fn<void, [DatePickerValue]>();
			render(<DatePicker defaultValue={initialValue('range')} onChange={handleChange} />);
			const trigger = screen.getByRole('button', { expanded: false });
			fireEvent.click(trigger);
			selectDates('range');
			if (dismiss === 'outside click') {
				fireEvent.pointerDown(document.body);
			} else if (dismiss === 'Escape') {
				fireEvent.keyDown(document.body, { key: 'Escape' });
			} else {
				fireEvent.click(trigger);
			}
			expect(trigger).toHaveAttribute('aria-expanded', 'false');
			fireEvent.click(trigger);
			expect(handleChange).not.toHaveBeenCalled();
			expect(screen.getByRole('textbox', { name: 'START DATE' })).toHaveValue('Sep 02, 2024');
			expect(screen.queryByText('Recent')).not.toBeInTheDocument();
		}
	);

	test('controlled values notify once on Apply and display the value accepted by the parent', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		const value = initialValue('range');
		const { rerender } = render(<DatePicker value={value} onChange={handleChange} />);
		const trigger = screen.getByRole('button', { expanded: false });
		fireEvent.click(trigger);
		selectDates('range');
		expect(handleChange).not.toHaveBeenCalled();
		fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(trigger).toHaveTextContent('Sep 02, 2024');
		rerender(<DatePicker value={handleChange.mock.calls[0]![0]} onChange={handleChange} />);
		expect(trigger).toHaveTextContent('Sep 10, 2024');
	});

	test.each(['range', 'single'] as const)(
		'%s: reopening through the controlled open prop discards an unapplied draft',
		(mode) => {
			const handleChange = jest.fn<void, [DatePickerValue]>();
			const props = { mode, defaultValue: initialValue(mode), onChange: handleChange };
			const { rerender } = render(<DatePicker {...props} open />);
			selectDates(mode);
			rerender(<DatePicker {...props} open={false} />);
			rerender(<DatePicker {...props} open />);

			expect(handleChange).not.toHaveBeenCalled();
			expect(screen.queryByText('Recent')).not.toBeInTheDocument();
			expect(
				screen.getByRole('textbox', { name: mode === 'range' ? 'START DATE' : 'DATE' })
			).toHaveValue('Sep 02, 2024');
		}
	);
});
