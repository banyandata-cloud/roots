import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from './CheckBox';

describe('Checkbox Component', () => {
	// HAPPY PATH TESTS
	describe('Expected and common usage scenarios', () => {
		it('renders checkbox with label', () => {
			render(<Checkbox label='Accept Terms' />);
			expect(screen.getByText('Accept Terms')).toBeInTheDocument();
		});

		it('toggles unchecked → checked in uncontrolled mode', () => {
			render(<Checkbox defaultChecked={false} />);
			const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

			expect(checkbox.checked).toBe(false);
			fireEvent.click(checkbox);
			expect(checkbox.checked).toBe(true);
		});

		it('calls onChange in controlled mode', () => {
			const handleChange = jest.fn();

			render(<Checkbox checked={false} onChange={handleChange} />);
			fireEvent.click(screen.getByRole('checkbox'));

			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		it('renders correctly without label', () => {
			render(<Checkbox />);
			expect(screen.getByRole('checkbox')).toBeInTheDocument();
		});
	});

	// MEDIUM PATH TESTS
	describe('Valid but less common configurations', () => {
		it('renders intermediate state icon', () => {
			const { container } = render(<Checkbox intermediate />);
			expect(container.querySelector('svg')).toBeInTheDocument();
		});

		it('applies correct position class when position="left"', () => {
			const { container } = render(<Checkbox position='left' />);
			expect(container.firstChild).toHaveClass('position-left');
		});

		it('does not update internal state in controlled mode', () => {
			const { rerender } = render(<Checkbox checked={false} />);
			const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

			fireEvent.click(checkbox);
			expect(checkbox.checked).toBe(false);

			rerender(<Checkbox checked={true} />);
			expect(checkbox.checked).toBe(true);
		});
	});

	// RISKY PATH TESTS
	describe('Edge cases and conflicting props', () => {
		it('does not change checked state when disabled (controlled)', () => {
			const handleChange = jest.fn();

			render(<Checkbox checked={false} disabled onChange={handleChange} />);

			const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

			fireEvent.click(checkbox);

			// State must remain unchanged
			expect(checkbox.checked).toBe(false);

			// onChange is still triggered due to current implementation
			expect(handleChange).toHaveBeenCalledTimes(1);
		});

		it('controlled component ignores internal state completely', () => {
			render(<Checkbox checked={false} defaultChecked />);
			const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

			expect(checkbox.checked).toBe(false);
		});
	});

	// SNAPSHOT TESTS
	describe('Snapshot', () => {
		it('matches snapshot', () => {
			const { container } = render(<Checkbox label='Snapshot' defaultChecked />);
			expect(container).toMatchSnapshot();
		});
	});
});
