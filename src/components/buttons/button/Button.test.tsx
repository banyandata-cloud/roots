declare const require: any;

import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

// Mock
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
describe('Button — Rendering & Basic Interaction Behaviour', () => {
	test('renders button with title', () => {
		render(<Button title='Click Me' />);

		expect(screen.getByText('Click Me')).toBeInTheDocument();
	});

	test('calls onClick handler when clicked', () => {
		const onClick = jest.fn();

		render(<Button title='Btn' onClick={onClick} />);

		fireEvent.click(screen.getByTestId('base-button'));

		expect(onClick).toHaveBeenCalled();
	});
});

// MEDIUM PATH TESTS
describe('Button — Behaviour With Optional Props & Customisation', () => {
	test('renders left component when provided', () => {
		const LeftIcon = () => <span data-testid='left-icon'>L</span>;

		render(<Button title='With Left' leftComponent={LeftIcon} />);

		expect(screen.getByTestId('left-icon')).toBeInTheDocument();
	});

	test('renders right component when provided', () => {
		const RightIcon = () => <span data-testid='right-icon'>R</span>;

		render(<Button title='With Right' rightComponent={RightIcon} />);

		expect(screen.getByTestId('right-icon')).toBeInTheDocument();
	});

	test('renders both left and right components', () => {
		const LeftIcon = () => <span data-testid='left-icon'>L</span>;
		const RightIcon = () => <span data-testid='right-icon'>R</span>;

		render(<Button title='Both' leftComponent={LeftIcon} rightComponent={RightIcon} />);

		expect(screen.getByTestId('left-icon')).toBeInTheDocument();
		expect(screen.getByTestId('right-icon')).toBeInTheDocument();
	});

	test('passes disabled prop to BaseButton', () => {
		render(<Button title='Disabled' disabled />);

		expect(screen.getByTestId('base-button')).toBeDisabled();
	});

	test('passes button type correctly', () => {
		render(<Button title='Reset' type='reset' />);

		expect(screen.getByTestId('base-button')).toHaveAttribute('type', 'reset');
	});
});

// RISKY PATH TESTS
describe('Button — Edge Case Handling', () => {
	test('should NOT crash when title is empty', () => {
		render(<Button title='' />);

		expect(screen.getByTestId('base-button')).toBeInTheDocument();
	});

	test('should NOT crash when onClick is not provided', () => {
		render(<Button title='No Click' />);

		fireEvent.click(screen.getByTestId('base-button'));

		expect(screen.getByText('No Click')).toBeInTheDocument();
	});

	test('should render even when no left or right component is provided', () => {
		render(<Button title='Plain Button' />);

		expect(screen.getByText('Plain Button')).toBeInTheDocument();
	});
});

// SNAPSHOT TESTS
describe('Button — Snapshot Rendering', () => {
	test('default button snapshot', () => {
		const { container } = render(<Button title='Snapshot Button' />);

		expect(container).toMatchSnapshot();
	});

	test('button with icons snapshot', () => {
		const LeftIcon = () => <span>L</span>;
		const RightIcon = () => <span>R</span>;

		const { container } = render(
			<Button
				title='Snapshot'
				leftComponent={LeftIcon}
				rightComponent={RightIcon}
				variant='outlined'
				color='primary'
				size='md'
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
