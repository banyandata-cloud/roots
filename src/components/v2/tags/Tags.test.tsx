import { fireEvent, render, screen } from '@testing-library/react';
import Tag from './Tags';

describe('Tag', () => {
	it('renders the label and exposes the layout hooks', () => {
		const { container } = render(<Tag label='Label' count={5} checkbox indicator />);
		const root = container.firstElementChild as HTMLElement;
		expect(screen.getByText('Label')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(root.dataset.lead).toBe('checkbox');
		expect(root.dataset.trail).toBe('count');
		expect(root.dataset.stacked).toBe('true');
	});

	it('only renders the close button when closable and calls onClose', () => {
		const onClose = jest.fn();
		const { rerender } = render(<Tag label='Label' />);
		expect(screen.queryByRole('button', { name: 'Remove' })).toBeNull();
		rerender(<Tag label='Label' closable onClose={onClose} />);
		fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('does not bubble the close click to onClick', () => {
		const onClick = jest.fn();
		render(<Tag label='Label' closable onClick={onClick} />);
		fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
		expect(onClick).not.toHaveBeenCalled();
	});

	it('reports checkbox changes', () => {
		const onCheckedChange = jest.fn();
		render(<Tag label='Label' checkbox onCheckedChange={onCheckedChange} />);
		fireEvent.click(screen.getByRole('checkbox'));
		expect(onCheckedChange).toHaveBeenCalledWith(true);
	});

	describe('text field', () => {
		it('edits uncontrolled values and mirrors them in the sizer', () => {
			const onInputChange = jest.fn();
			render(<Tag label='Label:' textField onInputChange={onInputChange} />);
			const input = screen.getByRole('textbox');
			fireEvent.change(input, { target: { value: 'abc' } });
			expect(onInputChange).toHaveBeenCalledWith('abc', expect.anything());
			expect((input as HTMLInputElement).value).toBe('abc');
			expect(input.parentElement).toHaveAttribute('data-value', 'abc');
		});

		it('fires onInputEnter on Enter and onInputClear on Backspace when empty', () => {
			const onInputEnter = jest.fn();
			const onInputClear = jest.fn();
			render(
				<Tag
					label='Label:'
					textField
					onInputEnter={onInputEnter}
					onInputClear={onInputClear}
				/>
			);
			const input = screen.getByRole('textbox');
			fireEvent.keyDown(input, { key: 'Enter' });
			fireEvent.keyDown(input, { key: 'Backspace' });
			expect(onInputEnter).toHaveBeenCalledTimes(1);
			expect(onInputClear).toHaveBeenCalledTimes(1);
		});

		it('is not editable when readOnly', () => {
			const onInputChange = jest.fn();
			render(
				<Tag
					label='Label:'
					textField
					readOnly
					inputValue='Search'
					onInputChange={onInputChange}
				/>
			);
			const input = screen.getByRole('textbox') as HTMLInputElement;
			expect(input.readOnly).toBe(true);
			fireEvent.change(input, { target: { value: 'x' } });
			expect(onInputChange).not.toHaveBeenCalled();
		});
	});
});
