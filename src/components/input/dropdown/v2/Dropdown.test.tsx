import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown';
import { DropdownItemv2 } from '../dropdown-item';

// Silence Floating UI + animation warnings and internal debug logs
beforeAll(() => {
	jest.spyOn(console, 'error').mockImplementation(() => {});
	jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
	(console.error as jest.Mock).mockRestore();
	(console.log as jest.Mock).mockRestore();
});

//  HAPPY PATH
describe('Dropdown — Basic rendering and expected behavior', () => {
	test('renders label and placeholder correctly', () => {
		render(
			<Dropdown label='Country' onChange={jest.fn()}>
				<DropdownItemv2 title='India' value='IN' />
				<DropdownItemv2 title='USA' value='US' />
			</Dropdown>
		);

		expect(screen.getByText('Country')).toBeInTheDocument();
		expect(screen.getByText('Choose an option')).toBeInTheDocument();
	});

	test('updates internal value when selecting an option in uncontrolled mode', () => {
		render(
			<Dropdown label='Country' onChange={jest.fn()}>
				<DropdownItemv2 title='India' value='IN' />
				<DropdownItemv2 title='USA' value='US' />
			</Dropdown>
		);

		const input = screen.getByRole('textbox');

		fireEvent.click(input);
		fireEvent.click(screen.getByText('India'));

		expect(input).toHaveValue('IN');
	});
});

//  MEDIUM PATH
describe('Dropdown — Props, variants, and interaction behavior', () => {
	test('reflects controlled value when value prop is provided', () => {
		render(
			<Dropdown value='US' onChange={jest.fn()}>
				<DropdownItemv2 title='India' value='IN' />
				<DropdownItemv2 title='USA' value='US' />
			</Dropdown>
		);

		expect(screen.getByRole('textbox')).toHaveValue('US');
	});

	test('supports multi-select and triggers onChange with multiple values', () => {
		const handleChange = jest.fn();

		render(
			<Dropdown multi onChange={handleChange}>
				<DropdownItemv2 title='Apple' value='apple' />
				<DropdownItemv2 title='Banana' value='banana' />
			</Dropdown>
		);

		fireEvent.click(screen.getByRole('textbox'));
		fireEvent.click(screen.getByText('Apple'));
		fireEvent.click(screen.getByText('Banana'));

		expect(handleChange).toHaveBeenCalled();
		expect(screen.getByText('Choose options')).toBeInTheDocument();
	});
});

//  RISKY PATH
describe('Dropdown — Edge cases and uncommon scenarios', () => {
	test('does not open dropdown when disabled', () => {
		render(
			<Dropdown disabled onChange={jest.fn()}>
				<DropdownItemv2 title='One' value='1' />
			</Dropdown>
		);

		fireEvent.click(screen.getByRole('textbox'));

		expect(screen.queryByRole('group')).not.toBeInTheDocument();
	});

	test('clears selected value when clear action is triggered in search mode', () => {
		const handleChange = jest.fn();

		render(
			<Dropdown
				search={{
					placeholder: 'Search',
					value: '',
					onChange: jest.fn(),
				}}
				onChange={handleChange}>
				<DropdownItemv2 title='React' value='react' />
			</Dropdown>
		);

		const [dropdownInput] = screen.getAllByRole('textbox');

		fireEvent.click(dropdownInput);
		fireEvent.click(screen.getByText('React'));

		const clearButton = document.querySelector('.crossIcon')?.parentElement;

		expect(clearButton).toBeInTheDocument();

		fireEvent.click(clearButton as HTMLElement);

		expect(handleChange).toHaveBeenLastCalledWith(expect.anything(), null);
	});
});

//  SNAPSHOT TESTS
describe('Dropdown — Snapshot Tests (UI regression protection)', () => {
	test('matches snapshot for default dropdown', () => {
		const { container } = render(
			<Dropdown label='City' onChange={jest.fn()}>
				<DropdownItemv2 title='Bangalore' value='blr' />
				<DropdownItemv2 title='Mumbai' value='mum' />
			</Dropdown>
		);

		expect(container).toMatchSnapshot();
	});

	test('matches snapshot for multi-select dropdown', () => {
		const { container } = render(
			<Dropdown multi onChange={jest.fn()}>
				<DropdownItemv2 title='Red' value='red' />
				<DropdownItemv2 title='Blue' value='blue' />
			</Dropdown>
		);

		expect(container).toMatchSnapshot();
	});
});
