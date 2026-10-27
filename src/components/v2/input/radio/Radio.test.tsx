import { fireEvent, render, screen } from '@testing-library/react';
import Radio from './Radio';

describe('Radio', () => {
	it('selects on click and reports the change when uncontrolled', () => {
		const onChange = jest.fn();
		render(<Radio label='Option' onChange={onChange} />);
		const input = screen.getByRole('radio');
		expect(input).not.toBeChecked();
		fireEvent.click(input);
		expect(input).toBeChecked();
		expect(onChange).toHaveBeenCalledWith(expect.anything(), true);
	});

	it('follows the checked prop when controlled', () => {
		const { rerender } = render(<Radio label='Option' checked={false} onChange={() => {}} />);
		expect(screen.getByRole('radio')).not.toBeChecked();
		rerender(<Radio label='Option' checked onChange={() => {}} />);
		expect(screen.getByRole('radio')).toBeChecked();
	});

	it('deselects the others in the same group', () => {
		render(
			<>
				<Radio name='g' label='A' defaultChecked />
				<Radio name='g' label='B' />
			</>
		);
		fireEvent.click(screen.getByLabelText('B'));
		expect(screen.getByLabelText('A')).not.toBeChecked();
		expect(screen.getByLabelText('B')).toBeChecked();
	});

	it('does not change or report when readOnly', () => {
		const onChange = jest.fn();
		render(<Radio label='Option' readOnly onChange={onChange} />);
		const input = screen.getByRole('radio');
		fireEvent.click(input);
		expect(input).not.toBeChecked();
		expect(onChange).not.toHaveBeenCalled();
		expect(input).toHaveAttribute('aria-readonly', 'true');
	});

	it('is not selectable when disabled', () => {
		render(<Radio label='Option' disabled />);
		expect(screen.getByRole('radio')).toBeDisabled();
	});

	it('describes the radio with the error message, which wins over warning', () => {
		render(<Radio label='Option' error='Bad' warning='Careful' />);
		const input = screen.getByRole('radio');
		const message = screen.getByText('Bad');
		expect(screen.queryByText('Careful')).toBeNull();
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input.getAttribute('aria-describedby')).toBe(message.parentElement?.id);
	});

	it('shows a warning message without marking the input invalid', () => {
		render(<Radio label='Option' warning='Careful' />);
		expect(screen.getByText('Careful')).toBeInTheDocument();
		expect(screen.getByRole('radio')).not.toHaveAttribute('aria-invalid');
	});
});
