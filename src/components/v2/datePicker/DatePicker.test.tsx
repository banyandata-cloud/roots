import { fireEvent, render, screen } from '@testing-library/react';
import DatePicker from './DatePicker';
import type { DatePickerValue } from './types';

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

	test('clicking a preset applies instantly but keeps the popover open', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(<DatePicker mode='range' onChange={handleChange} />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByText('Last 7 days'));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange.mock.calls[0]?.[0]?.preset).toBe('last-7-days');
		expect(screen.getByRole('button', { expanded: true })).toHaveTextContent('Last 7 days');
		// The popover itself is still open — only Cancel/Apply close it.
		expect(screen.getByRole('button', { name: 'Apply dates' })).toBeInTheDocument();
	});

	test('single mode applies the clicked day immediately but keeps the popover open', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(<DatePicker mode='single' onChange={handleChange} />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByRole('button', { current: 'date' }));

		expect(handleChange).toHaveBeenCalledTimes(1);
		const applied = handleChange.mock.calls[0]?.[0];
		expect(applied?.from).toBeInstanceOf(Date);
		expect(applied?.preset).toBeNull();
		expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument();
	});

	test('only Cancel or Apply dates closes the popover', () => {
		render(<DatePicker mode='range' />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByText('Last 7 days'));
		fireEvent.click(screen.getByText('Last 30 days'));

		expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'Apply dates' }));

		expect(screen.getByRole('button', { expanded: false })).toBeInTheDocument();
	});

	test('range mode requires a start and an end before auto-applying', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		render(<DatePicker mode='range' onChange={handleChange} />);

		fireEvent.click(screen.getByRole('button', { expanded: false }));
		fireEvent.click(screen.getByRole('button', { current: 'date' }));

		expect(handleChange).not.toHaveBeenCalled();
		expect(screen.getByRole('button', { name: 'Apply dates' })).toBeDisabled();
	});

	test('cancel restores the previously applied value and discards an unsaved draft', () => {
		const handleChange = jest.fn<void, [DatePickerValue]>();
		// time=true turns auto-apply off, so a day click only updates the draft.
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

		const applied = handleChange.mock.calls[0]?.[0];
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		// With future allowed, the quarter can legitimately extend past today.
		expect((applied?.to as Date).getTime()).toBeGreaterThanOrEqual(today.getTime());
	});
});
