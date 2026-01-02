import { render, screen, fireEvent } from '@testing-library/react';
import BaseButton from './BaseButton';

// --------------------
// MOCKS
// --------------------

// Mock BaseCell
jest.mock('../../cell', () => ({
	BaseCell: ({ component1, component2, component3, attrs, className, RootDOM }: any) => {
		const Root = RootDOM || 'button';

		return (
			<Root data-testid='base-cell' className={className} {...attrs}>
				{component1}
				{component2}
				{component3}
			</Root>
		);
	},
}));

// TEST DATA
const clickEvent = new MouseEvent('click', {
	bubbles: true,
	cancelable: true,
});

// HAPPY PATH TESTS
describe('BaseButton — Rendering & Basic Interaction Behaviour', () => {
	test('renders button with title', () => {
		render(<BaseButton title='Click Me' />);

		expect(screen.getByText('Click Me')).toBeInTheDocument();
	});

	test('calls onClick handler when clicked', () => {
		const onClick = jest.fn();

		render(<BaseButton title='Btn' onClick={onClick} />);

		fireEvent.click(screen.getByTestId('base-cell'), clickEvent);

		expect(onClick).toHaveBeenCalled();
	});

	test('blurs button on click by default', () => {
		render(<BaseButton title='Blur Test' />);

		const btn = screen.getByTestId('base-cell');
		const blurSpy = jest.spyOn(btn, 'blur');

		fireEvent.click(btn);

		expect(blurSpy).toHaveBeenCalled();
	});
});

// MEDIUM PATH TESTS
describe('BaseButton — Behaviour With Optional Props', () => {
	test('does NOT blur when blurOnClick=false', () => {
		render(<BaseButton title='No Blur' blurOnClick={false} />);

		const btn = screen.getByTestId('base-cell');
		const blurSpy = jest.spyOn(btn, 'blur');

		fireEvent.click(btn);

		expect(blurSpy).not.toHaveBeenCalled();
	});

	test('renders left and right components', () => {
		render(
			<BaseButton
				title='With Icons'
				component1={<span data-testid='left-comp'>L</span>}
				component3={<span data-testid='right-comp'>R</span>}
			/>
		);

		expect(screen.getByTestId('left-comp')).toBeInTheDocument();
		expect(screen.getByTestId('right-comp')).toBeInTheDocument();
	});

	test('passes disabled attribute correctly', () => {
		render(<BaseButton title='Disabled' disabled />);

		expect(screen.getByTestId('base-cell')).toBeDisabled();
	});

	test('applies variant class correctly', () => {
		const { container } = render(<BaseButton title='Outlined' variant='outlined' />);

		expect(container.firstChild).toBeTruthy();
	});
});

// RISKY PATH TESTS
describe('BaseButton — Edge Case Handling', () => {
	test('should NOT crash when title is empty', () => {
		render(<BaseButton title='' />);

		expect(screen.getByTestId('base-cell')).toBeInTheDocument();
	});

	test('should NOT crash when onClick is not provided', () => {
		render(<BaseButton title='No Click' />);

		fireEvent.click(screen.getByTestId('base-cell'));

		expect(screen.getByText('No Click')).toBeInTheDocument();
	});

	test('supports different button types', () => {
		render(<BaseButton title='Reset Btn' type='reset' />);

		expect(screen.getByTestId('base-cell')).toHaveAttribute('type', 'reset');
	});
});

// SNAPSHOT TESTS
describe('BaseButton — Snapshot Rendering', () => {
	test('default base button snapshot', () => {
		const { container } = render(<BaseButton title='Snapshot Button' />);

		expect(container).toMatchSnapshot();
	});

	test('base button with components snapshot', () => {
		const { container } = render(
			<BaseButton
				title='Snapshot'
				component1={<span>L</span>}
				component3={<span>R</span>}
				variant='outlined'
				size='md'
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
