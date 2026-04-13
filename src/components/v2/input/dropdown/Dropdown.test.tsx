import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown } from './index';

// Mock utils
jest.mock('../../../../utils', () => ({
	classes: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// Mock icons
jest.mock('../../icons', () => ({
	HelpIcon: (props: any) => <div data-testid='help-icon' {...props} />,
	ErrorIcon: (props: any) => <div data-testid='error-icon' {...props} />,
	WarningIcon: (props: any) => <div data-testid='warning-icon' {...props} />,
	TickIcon: (props: any) => <div data-testid='tick-icon' {...props} />,
}));

jest.mock('../../icons/chevron-down', () => ({
	ChevronDownIcon: (props: any) => <div data-testid='chevron-down-icon' {...props} />,
}));

jest.mock('../../../icons', () => ({
	CrossIcon: (props: any) => <div data-testid='cross-icon' {...props} />,
}));

jest.mock('../../checkbox', () => ({
	CheckBox: ({ checked, onChange, disabled, ...props }: any) => (
		<input
			type='checkbox'
			checked={checked}
			onChange={onChange}
			disabled={disabled}
			data-testid='multi-select-checkbox'
			{...props}
		/>
	),
}));

jest.mock('../../../popover', () => ({
	Popover: ({ children, open, ...props }: any) =>
		open ? (
			<div data-testid='popover' {...props}>
				{children}
			</div>
		) : null,
}));

jest.mock('../../buttons/button', () => ({
	Button: ({ title, onClick, disabled, className, ...props }: any) => (
		<button
			onClick={onClick}
			disabled={disabled}
			className={className}
			data-testid='dropdown-button'
			{...props}>
			{title}
		</button>
	),
}));

const mockOptions = [
	{ value: 'admin', label: 'Admin User' },
	{ value: 'editor', label: 'Editor User' },
	{ value: 'viewer', label: 'Viewer User' },
	{ value: 'guest', label: 'Guest User' },
];

describe('Dropdown - Single Select', () => {
	test('renders basic dropdown with label and placeholder', () => {
		render(<Dropdown label='User Role' placeholder='Select a role' options={mockOptions} />);

		expect(screen.getByText('User Role')).toBeInTheDocument();
		expect(screen.getByText('Select a role')).toBeInTheDocument();
	});

	test('handles single select onChange', () => {
		const mockOnChange = jest.fn();
		render(
			<Dropdown
				label='User Role'
				placeholder='Select a role'
				options={mockOptions}
				onChange={mockOnChange}
			/>
		);

		const button = screen.getByTestId('dropdown-button');
		fireEvent.click(button);

		// Check if popover is open
		expect(screen.getByTestId('popover')).toBeInTheDocument();
	});

	test('displays selected value', () => {
		render(<Dropdown label='User Role' value='admin' options={mockOptions} />);

		expect(screen.getByText('Admin User')).toBeInTheDocument();
	});
});

describe('Dropdown - Multi Select', () => {
	test('renders multi-select dropdown with count badge', () => {
		render(
			<Dropdown
				label='Users'
				variant='multi-select'
				selectedValues={['admin', 'editor']}
				options={mockOptions}
			/>
		);

		expect(screen.getByText('Users')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument(); // Count badge
		expect(screen.getByTestId('cross-icon')).toBeInTheDocument(); // Close button in badge
	});

	test('shows placeholder when no values selected', () => {
		render(
			<Dropdown
				label='Users'
				variant='multi-select'
				selectedValues={[]}
				placeholder='Select users'
				options={mockOptions}
			/>
		);

		expect(screen.getByText('Select users')).toBeInTheDocument();
	});

	test('handles multi-select onChange', () => {
		const mockOnMultiSelectChange = jest.fn();
		render(
			<Dropdown
				label='Users'
				variant='multi-select'
				selectedValues={['admin']}
				options={mockOptions}
				onMultiSelectChange={mockOnMultiSelectChange}
			/>
		);

		const button = screen.getByTestId('dropdown-button');
		fireEvent.click(button);

		// Should show checkboxes in multi-select mode
		expect(screen.getByTestId('popover')).toBeInTheDocument();
	});

	test('handles clear all functionality', () => {
		const mockOnMultiSelectChange = jest.fn();
		render(
			<Dropdown
				label='Users'
				variant='multi-select'
				selectedValues={['admin', 'editor']}
				options={mockOptions}
				onMultiSelectChange={mockOnMultiSelectChange}
			/>
		);

		const closeButton = screen.getByTestId('cross-icon').closest('button');
		fireEvent.click(closeButton!);

		expect(mockOnMultiSelectChange).toHaveBeenCalledWith([]);
	});

	test('renders with proper states', () => {
		render(
			<Dropdown
				label='Users'
				variant='multi-select'
				state='error'
				selectedValues={[]}
				options={mockOptions}
			/>
		);

		expect(screen.getByTestId('error-icon')).toBeInTheDocument();
	});

	test('handles disabled state', () => {
		render(
			<Dropdown
				label='Users'
				variant='multi-select'
				disabled={true}
				selectedValues={['admin']}
				options={mockOptions}
			/>
		);

		const button = screen.getByTestId('dropdown-button');
		expect(button).toBeDisabled();
	});
});

describe('Dropdown - Error States', () => {
	test('shows error icon in error state', () => {
		render(<Dropdown label='User Role' state='error' options={mockOptions} />);

		expect(screen.getByTestId('error-icon')).toBeInTheDocument();
	});

	test('shows warning icon in warning state', () => {
		render(<Dropdown label='User Role' state='warning' options={mockOptions} />);

		expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
	});
});
