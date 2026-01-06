import { render, screen } from '@testing-library/react';
import Stepper from './Stepper';

// MOCKS

// Mock Step component
jest.mock('./step/Step', () => {
	return ({ title, index, orientation }: any) => (
		<div data-testid='step'>
			<span data-testid='step-title'>{title}</span>
			<span data-testid='step-index'>{index}</span>
			<span data-testid='step-orientation'>{orientation}</span>
		</div>
	);
});

// TEST DATA
const stepsMock = [
	{
		title: 'Step A',
		description: null,
		active: false,
		completion: 1,
		error: false,
	},
	{
		title: 'Step B',
		description: 'Desc',
		active: true,
		completion: 0.5,
		error: false,
	},
];

// HAPPY PATH TESTS
describe('Stepper — Rendering & Basic Behaviour', () => {
	test('renders correct number of steps', () => {
		render(<Stepper steps={stepsMock} orientation='horizontal' />);

		expect(screen.getAllByTestId('step')).toHaveLength(2);
	});

	test('passes correct index to each Step', () => {
		render(<Stepper steps={stepsMock} orientation='horizontal' />);

		const indices = screen.getAllByTestId('step-index');
		expect(indices[0]).toHaveTextContent('0');
		expect(indices[1]).toHaveTextContent('1');
	});

	test('renders step titles correctly', () => {
		render(<Stepper steps={stepsMock} orientation='horizontal' />);

		expect(screen.getByText('Step A')).toBeInTheDocument();
		expect(screen.getByText('Step B')).toBeInTheDocument();
	});
});

// MEDIUM PATH TESTS
describe('Stepper — Behaviour With Orientation & Customisation', () => {
	test('passes horizontal orientation to steps by default', () => {
		render(<Stepper steps={stepsMock} orientation='horizontal' />);

		const orientations = screen.getAllByTestId('step-orientation');
		orientations.forEach((node) => {
			expect(node).toHaveTextContent('horizontal');
		});
	});

	test('passes vertical orientation to steps', () => {
		render(<Stepper steps={stepsMock} orientation='vertical' />);

		const orientations = screen.getAllByTestId('step-orientation');
		orientations.forEach((node) => {
			expect(node).toHaveTextContent('vertical');
		});
	});

	test('applies custom className to root container', () => {
		const { container } = render(
			<Stepper steps={stepsMock} orientation='horizontal' className='custom-stepper' />
		);

		expect(container.firstChild?.className).toContain('custom-stepper');
	});
});

// RISKY PATH TESTS
describe('Stepper — Edge Case Handling', () => {
	test('renders nothing when steps array is empty', () => {
		render(<Stepper steps={[]} orientation='horizontal' />);

		expect(screen.queryByTestId('step')).toBeNull();
	});

	test('does NOT crash when steps have duplicate titles', () => {
		render(
			<Stepper
				orientation='horizontal'
				steps={[
					{ title: 'Step', completion: 0, active: false, error: false },
					{ title: 'Step', completion: 1, active: false, error: false },
				]}
			/>
		);

		expect(screen.getAllByTestId('step')).toHaveLength(2);
	});
});

// SNAPSHOT TESTS
describe('Stepper — Snapshot Rendering', () => {
	test('default stepper snapshot', () => {
		const { container } = render(<Stepper steps={stepsMock} orientation='horizontal' />);

		expect(container).toMatchSnapshot();
	});

	test('vertical stepper snapshot', () => {
		const { container } = render(<Stepper steps={stepsMock} orientation='vertical' />);

		expect(container).toMatchSnapshot();
	});
});
