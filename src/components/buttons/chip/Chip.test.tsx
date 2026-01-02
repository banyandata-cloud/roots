declare const require: any;

import { render, screen, fireEvent } from '@testing-library/react';
import Chip from './Chip';

// MOCKS

// Mock BaseButton (child dependency)
jest.mock('../baseButton', () => ({
	BaseButton: ({ title, component1, component3, onClick, className, disabled, type }: any) => (
		<button
			data-testid='base-button'
			className={className}
			onClick={onClick}
			disabled={disabled}
			type={type}>
			{component1}
			<span data-testid='title'>{title}</span>
			{component3}
		</button>
	),
}));

// HAPPY PATH TESTS
describe('Chip — Rendering & Basic Interaction Behaviour', () => {
	test('renders chip with title', () => {
		render(<Chip title='Chip Name' />);

		expect(screen.getByText('Chip Name')).toBeInTheDocument();
	});

	test('calls onClick handler when chip is clicked', () => {
		const onClick = jest.fn();

		render(<Chip title='Clickable Chip' onClick={onClick} />);

		fireEvent.click(screen.getByTestId('base-button'));

		expect(onClick).toHaveBeenCalled();
	});
});

// MEDIUM PATH TESTS
describe('Chip — Behaviour With Optional Props & Customisation', () => {
	test('renders left component when provided', () => {
		const LeftIcon = () => <span data-testid='left-icon'>L</span>;

		render(<Chip title='With Left' leftComponent={LeftIcon} />);

		expect(screen.getByTestId('left-icon')).toBeInTheDocument();
	});

	test('renders right component when provided', () => {
		const RightIcon = () => <span data-testid='right-icon'>R</span>;

		render(<Chip title='With Right' rightComponent={RightIcon} />);

		expect(screen.getByTestId('right-icon')).toBeInTheDocument();
	});

	test('renders both left and right components', () => {
		const LeftIcon = () => <span data-testid='left-icon'>L</span>;
		const RightIcon = () => <span data-testid='right-icon'>R</span>;

		render(<Chip title='Both' leftComponent={LeftIcon} rightComponent={RightIcon} />);

		expect(screen.getByTestId('left-icon')).toBeInTheDocument();
		expect(screen.getByTestId('right-icon')).toBeInTheDocument();
	});

	test('passes disabled prop correctly', () => {
		render(<Chip title='Disabled Chip' disabled />);

		expect(screen.getByTestId('base-button')).toBeDisabled();
	});

	test('passes button type correctly', () => {
		render(<Chip title='Submit Chip' type='submit' />);

		expect(screen.getByTestId('base-button')).toHaveAttribute('type', 'submit');
	});
});

// RISKY PATH TESTS
describe('Chip — Edge Case Handling', () => {
	test('should NOT crash when title is empty', () => {
		render(<Chip title='' />);

		expect(screen.getByTestId('base-button')).toBeInTheDocument();
	});

	test('should NOT crash when onClick is not provided', () => {
		render(<Chip title='No Click' />);

		fireEvent.click(screen.getByTestId('base-button'));

		expect(screen.getByText('No Click')).toBeInTheDocument();
	});

	test('should render even when only icon is provided', () => {
		const IconOnly = () => <span data-testid='icon-only'>I</span>;

		render(<Chip title='' leftComponent={IconOnly} />);

		expect(screen.getByTestId('icon-only')).toBeInTheDocument();
	});
});

// SNAPSHOT TESTS
describe('Chip — Snapshot Rendering', () => {
	test('default chip snapshot', () => {
		const { container } = render(<Chip title='Snapshot Chip' />);

		expect(container).toMatchSnapshot();
	});

	test('chip with icons snapshot', () => {
		const LeftIcon = () => <span>L</span>;
		const RightIcon = () => <span>R</span>;

		const { container } = render(
			<Chip
				title='Snapshot'
				leftComponent={LeftIcon}
				rightComponent={RightIcon}
				size='md'
				color='success'
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
