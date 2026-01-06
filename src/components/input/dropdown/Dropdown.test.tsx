jest.mock('react-merge-refs', () => ({
	mergeRefs: () => jest.fn(),
}));

import { fireEvent, render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';
import DropdownItem from './dropdown-item/DropdownItem';

describe('Dropdown Component', () => {
	// HAPPY PATH TESTS
	describe('Standard user interactions', () => {
		it('renders dropdown with placeholder', () => {
			render(
				<Dropdown placeholder='Select option' onChange={jest.fn()}>
					<DropdownItem title='Option A' value='A' />
					<DropdownItem title='Option B' value='B' />
				</Dropdown>
			);

			expect(screen.getByText('Select option')).toBeInTheDocument();
		});

		it('opens dropdown and selects an option (uncontrolled)', () => {
			render(
				<Dropdown placeholder='Select option' onChange={jest.fn()}>
					<DropdownItem title='Option A' value='A' />
					<DropdownItem title='Option B' value='B' />
				</Dropdown>
			);

			fireEvent.click(screen.getByRole('button'));
			fireEvent.click(screen.getByRole('option', { name: 'Option A' }));

			expect(screen.getByDisplayValue('A')).toBeInTheDocument();
		});

		it('calls onChange in controlled mode', () => {
			const handleChange = jest.fn();

			render(
				<Dropdown value='A' onChange={handleChange}>
					<DropdownItem title='Option A' value='A' />
					<DropdownItem title='Option B' value='B' />
				</Dropdown>
			);

			fireEvent.click(screen.getByRole('button'));
			fireEvent.click(screen.getByRole('option', { name: 'Option B' }));

			expect(handleChange).toHaveBeenCalled();
		});
	});

	// MEDIUM PATH TESTS
	describe('Multi-select & formatter behavior', () => {
		it('supports multi-select selection', () => {
			render(
				<Dropdown multi onChange={jest.fn()}>
					<DropdownItem title='Option 1' value='1' variant='checkbox' />
					<DropdownItem title='Option 2' value='2' variant='checkbox' />
				</Dropdown>
			);

			fireEvent.click(screen.getByRole('button'));
			fireEvent.click(screen.getByRole('option', { name: 'Option 1' }));
			fireEvent.click(screen.getByRole('option', { name: 'Option 2' }));

			expect(screen.getByText(/2 option(s)? selected/i)).toBeInTheDocument();
		});

		it('applies custom formatter correctly', () => {
			render(
				<Dropdown
					multi
					formatter={(count) => `${count} option selected`}
					onChange={jest.fn()}>
					<DropdownItem title='Option 1' value='1' variant='checkbox' />
					<DropdownItem title='Option 2' value='2' variant='checkbox' />
				</Dropdown>
			);

			fireEvent.click(screen.getByRole('button'));
			fireEvent.click(screen.getByRole('option', { name: 'Option 1' }));

			expect(screen.getByText(/1 option selected/i)).toBeInTheDocument();
		});
	});

	// RISKY PATH TESTS
	describe('Edge cases and safeguards', () => {
		it('does not open when disabled', () => {
			render(
				<Dropdown disabled onChange={jest.fn()}>
					<DropdownItem title='Option A' value='A' />
				</Dropdown>
			);

			fireEvent.click(screen.getByRole('button'));

			expect(screen.queryByRole('option')).not.toBeInTheDocument();
		});

		it('renders safely with no children', () => {
			render(<Dropdown placeholder='Empty' onChange={jest.fn()} />);
			expect(screen.getByText('Empty')).toBeInTheDocument();
		});

		it('handles controlled value not present in options', () => {
			render(
				<Dropdown value='X' onChange={jest.fn()}>
					<DropdownItem title='Option A' value='A' />
				</Dropdown>
			);

			expect(screen.getByRole('textbox')).toHaveValue('');
		});
	});

	// SNAPSHOT TESTS
	describe('Snapshot', () => {
		it('matches snapshot', () => {
			const { asFragment } = render(
				<Dropdown label='Dropdown Label' placeholder='Select'>
					<DropdownItem title='Option A' value='A' />
					<DropdownItem title='Option B' value='B' />
				</Dropdown>
			);

			expect(asFragment()).toMatchSnapshot();
		});
	});
});
