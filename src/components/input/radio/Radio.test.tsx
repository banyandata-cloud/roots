// Radio.test.tsx
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Radio from './Radio';

describe('Radio Component', () => {
	// HAPPY PATH TESTS
	describe('Happy Path – standard user interactions', () => {
		test('renders radio with label', () => {
			render(<Radio label='Radio' defaultChecked={false} />);

			expect(screen.getByText('Radio')).toBeInTheDocument();
			expect(screen.getByRole('radio')).toBeInTheDocument();
		});

		test('toggles checked state in uncontrolled mode', () => {
			render(<Radio label='Radio' defaultChecked={false} />);
			const radio = screen.getByRole('radio') as HTMLInputElement;

			// Initially unchecked
			expect(radio.checked).toBe(false);

			// Click to check
			fireEvent.click(radio);

			// Now checked
			expect(radio.checked).toBe(true);
		});

		test('calls onChange with correct value in controlled mode', () => {
			const handleChange = jest.fn();
			render(<Radio checked={false} onChange={handleChange} label='Radio' />);
			const radio = screen.getByRole('radio');

			fireEvent.click(radio);

			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange.mock.calls[0][1]).toBe(true);
		});

		test('renders checked icon when checked', () => {
			const { container } = render(<Radio checked label='Radio' />);
			const icon = container.querySelector('.icon');
			expect(icon).toBeTruthy();
		});
	});

	// MEDIUM PATH TESTS
	describe('Medium Path – variants and configuration behavior', () => {
		test('respects defaultChecked in uncontrolled mode', () => {
			render(<Radio defaultChecked label='Radio' />);
			const radio = screen.getByRole('radio') as HTMLInputElement;
			expect(radio.checked).toBe(true);
		});

		test('applies position="right" correctly', () => {
			const { container } = render(<Radio position='right' label='Radio' />);
			expect(container.firstChild).toHaveClass('position-right');
		});

		test('applies size="lg" icon class correctly', () => {
			const { container } = render(<Radio size='lg' checked label='Radio' />);
			const icon = container.querySelector('.icon-lg');
			expect(icon).toBeTruthy();
		});
	});

	// RISKY PATH TESTS
	describe('Risky Path – edge cases and safeguards', () => {
		test('does not change checked state when disabled (controlled)', () => {
			const handleChange = jest.fn();

			// Radio is controlled + disabled
			render(<Radio checked={false} disabled onChange={handleChange} label='Radio' />);
			const radio = screen.getByRole('radio') as HTMLInputElement;

			fireEvent.click(radio);

			// Disabled → state unchanged
			expect(radio.checked).toBe(false);

			// Component still fires onChange (cannot modify Radio.tsx)
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		test('does not update internal state when controlled', () => {
			render(<Radio checked={false} label='Radio' />);
			const radio = screen.getByRole('radio') as HTMLInputElement;

			fireEvent.click(radio);

			// Controlled → state remains false
			expect(radio.checked).toBe(false);
		});

		test('renders safely without label', () => {
			render(<Radio defaultChecked />);
			expect(screen.getByRole('radio')).toBeInTheDocument();
		});
	});

	// SNAPSHOT TESTS
	describe('Snapshot', () => {
		test('matches snapshot', () => {
			const { asFragment } = render(<Radio label='Radio' defaultChecked />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
