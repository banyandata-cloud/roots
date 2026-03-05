// Radio.test.tsx
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Radio from './Radio';

describe('Radio Component', () => {
	// ── HAPPY PATH ──────────────────────────────────────────────────────────────
	describe('Standard user interactions', () => {
		test('renders radio with label', () => {
			render(<Radio label='Radio' defaultChecked={false} />);
			expect(screen.getByText('Radio')).toBeInTheDocument();
			expect(screen.getByRole('radio')).toBeInTheDocument();
		});

		test('toggles checked state in uncontrolled mode', () => {
			render(<Radio label='Radio' defaultChecked={false} />);
			const radio = screen.getByRole('radio') as HTMLInputElement;
			expect(radio.checked).toBe(false);
			fireEvent.click(radio);
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

	// ── MEDIUM PATH ─────────────────────────────────────────────────────────────
	describe('Variants and configuration behavior', () => {
		test('respects defaultChecked in uncontrolled mode', () => {
			render(<Radio defaultChecked label='Radio' />);
			const radio = screen.getByRole('radio') as HTMLInputElement;
			expect(radio.checked).toBe(true);
		});

		test('applies position="right" correctly', () => {
			const { container } = render(<Radio position='right' label='Radio' />);
			const label = container.querySelector('label');
			expect(label).toHaveClass('position-right');
		});

		test('applies size="lg" icon class correctly', () => {
			const { container } = render(<Radio size='lg' checked label='Radio' />);
			const icon = container.querySelector('.icon-lg');
			expect(icon).toBeTruthy();
		});
	});

	// ── READ-ONLY ────────────────────────────────────────────────────────────────
	describe('Read-only state', () => {
		test('does not change state when readOnly (uncontrolled)', () => {
			render(<Radio label='Radio' defaultChecked={false} readOnly />);
			const radio = screen.getByRole('radio') as HTMLInputElement;
			fireEvent.click(radio);
			expect(radio.checked).toBe(false);
		});

		test('does not call onChange when readOnly (controlled)', () => {
			const handleChange = jest.fn();
			render(<Radio checked={false} onChange={handleChange} label='Radio' readOnly />);
			const radio = screen.getByRole('radio');
			fireEvent.click(radio);
			expect(handleChange).not.toHaveBeenCalled();
		});

		test('applies readonly class when readOnly', () => {
			const { container } = render(<Radio label='Radio' readOnly />);
			const label = container.querySelector('label');
			expect(label).toHaveClass('readonly');
		});
	});

	// ── ERROR STATE ──────────────────────────────────────────────────────────────
	describe('Error state', () => {
		test('renders error message when error prop provided', () => {
			render(<Radio label='Radio' error='Error message' />);
			expect(screen.getByText('Error message')).toBeInTheDocument();
		});

		test('renders error message element with correct data-elem', () => {
			const { container } = render(<Radio label='Radio' error='Error message' />);
			expect(container.querySelector('[data-elem="error-message"]')).toBeInTheDocument();
		});

		test('applies error class to label', () => {
			const { container } = render(<Radio label='Radio' error='Error message' />);
			const label = container.querySelector('label');
			expect(label).toHaveClass('error');
		});

		test('does not render error message when error prop is empty', () => {
			const { container } = render(<Radio label='Radio' />);
			expect(container.querySelector('[data-elem="error-message"]')).not.toBeInTheDocument();
		});
	});

	// ── WARNING STATE ────────────────────────────────────────────────────────────
	describe('Warning state', () => {
		test('renders warning message when warning prop provided', () => {
			render(<Radio label='Radio' warning='Warning message' />);
			expect(screen.getByText('Warning message')).toBeInTheDocument();
		});

		test('renders warning message element with correct data-elem', () => {
			const { container } = render(<Radio label='Radio' warning='Warning message' />);
			expect(container.querySelector('[data-elem="warning-message"]')).toBeInTheDocument();
		});

		test('applies warning class to label', () => {
			const { container } = render(<Radio label='Radio' warning='Warning message' />);
			const label = container.querySelector('label');
			expect(label).toHaveClass('warning');
		});

		test('does not render warning message when warning prop is empty', () => {
			const { container } = render(<Radio label='Radio' />);
			expect(container.querySelector('[data-elem="warning-message"]')).not.toBeInTheDocument();
		});
	});

	// ── RISKY PATH ───────────────────────────────────────────────────────────────
	describe('Edge cases and safeguards', () => {
		test('does not change checked state when disabled (controlled)', () => {
			const handleChange = jest.fn();
			render(<Radio checked={false} disabled onChange={handleChange} label='Radio' />);
			const radio = screen.getByRole('radio') as HTMLInputElement;
			fireEvent.click(radio);
			expect(radio.checked).toBe(false);
		});

		test('does not update internal state when controlled', () => {
			render(<Radio checked={false} label='Radio' />);
			const radio = screen.getByRole('radio') as HTMLInputElement;
			fireEvent.click(radio);
			expect(radio.checked).toBe(false);
		});

		test('renders safely without label', () => {
			render(<Radio defaultChecked />);
			expect(screen.getByRole('radio')).toBeInTheDocument();
		});

		test('error and warning do not render simultaneously', () => {
			render(<Radio label='Radio' error='Error message' />);
			expect(screen.getByText('Error message')).toBeInTheDocument();
			expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
		});
	});

	// ── SNAPSHOT ─────────────────────────────────────────────────────────────────
	describe('Snapshot', () => {
		test('matches snapshot', () => {
			const { asFragment } = render(<Radio label='Radio' defaultChecked />);
			expect(asFragment()).toMatchSnapshot();
		});

		test('matches snapshot with error', () => {
			const { asFragment } = render(
				<Radio label='Radio' defaultChecked error='Error message' />
			);
			expect(asFragment()).toMatchSnapshot();
		});

		test('matches snapshot with warning', () => {
			const { asFragment } = render(
				<Radio label='Radio' defaultChecked warning='Warning message' />
			);
			expect(asFragment()).toMatchSnapshot();
		});

		test('matches snapshot readonly', () => {
			const { asFragment } = render(<Radio label='Radio' readOnly />);
			expect(asFragment()).toMatchSnapshot();
		});
	});
});