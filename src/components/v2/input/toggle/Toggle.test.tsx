import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from './Toggle';

// HAPPY PATH
describe('Toggle — Basic rendering', () => {
	test('renders toggle with label', () => {
		render(<Toggle label='Toggle me' />);

		expect(screen.getByText('Toggle me')).toBeInTheDocument();
		expect(screen.getByRole('checkbox')).toBeInTheDocument();
	});

	test('renders unchecked by default when no checked or defaultChecked is provided', () => {
		render(<Toggle label='Default toggle' />);

		const input = screen.getByRole('checkbox') as HTMLInputElement;
		expect(input.checked).toBe(false);
	});
});

// MEDIUM PATH
describe('Toggle — Controlled and uncontrolled behavior', () => {
	test('calls onChange in controlled mode', () => {
		const onChange = jest.fn();

		render(<Toggle label='Controlled' checked={false} onChange={onChange} />);

		const input = screen.getByRole('checkbox');
		fireEvent.click(input);

		expect(onChange).toHaveBeenCalled();
		expect(onChange).toHaveBeenCalledWith(expect.any(Object), true);
	});

	test('updates internal state in uncontrolled mode', () => {
		render(<Toggle label='Uncontrolled' defaultChecked={false} />);

		const input = screen.getByRole('checkbox') as HTMLInputElement;

		expect(input.checked).toBe(false);

		fireEvent.click(input);
		expect(input.checked).toBe(true);
	});
});

// RISKY PATH
describe('Toggle — Risky paths', () => {
	test('does not change state when disabled', () => {
		const onChange = jest.fn();

		render(<Toggle label='Disabled toggle' disabled checked={false} onChange={onChange} />);

		const input = screen.getByRole('checkbox') as HTMLInputElement;

		expect(input.disabled).toBe(true);

		fireEvent.click(input);

		expect(onChange).not.toHaveBeenCalled();
	});

	test('does not trigger onChange when readonly', () => {
		const onChange = jest.fn();

		render(<Toggle label='Readonly toggle' readonly checked={false} onChange={onChange} />);

		const input = screen.getByRole('checkbox');
		fireEvent.click(input);

		expect(onChange).not.toHaveBeenCalled();
	});
});

// SNAPSHOT TESTING
describe('Toggle — Snapshots', () => {
	test('matches default snapshot', () => {
		const { container } = render(<Toggle label='Snapshot toggle' />);

		expect(container).toMatchSnapshot();
	});

	test('matches snapshot with complex props', () => {
		const { container } = render(
			<Toggle label='Complex toggle' size='l' defaultChecked className='custom-class' />
		);

		expect(container).toMatchSnapshot();
	});
});
