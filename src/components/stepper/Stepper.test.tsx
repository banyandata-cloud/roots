import { render, screen } from '@testing-library/react';
import Stepper from './Stepper';

// Mock classes utility so CSS modules do not interfere
jest.mock('../../utils', () => ({
	classes: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// Happy path
describe('Stepper — Rendering Behaviour', () => {
	test('renders all steps based on steps array', () => {
		render(
			<Stepper
				orientation='horizontal'
				steps={[
					{ title: 'A', description: null, active: false, completion: 1, error: false },
					{
						title: 'B',
						description: 'Desc',
						active: true,
						completion: 0.3,
						error: false,
					},
					{ title: 'C', description: null, active: false, completion: 0, error: true },
				]}
			/>
		);

		expect(screen.getByText('A')).toBeInTheDocument();
		expect(screen.getByText('B')).toBeInTheDocument();
		expect(screen.getByText('C')).toBeInTheDocument();
	});

	test('renders descriptions when provided', () => {
		render(
			<Stepper
				orientation='horizontal'
				steps={[
					{
						title: 'Step 1',
						description: 'Description text',
						active: true,
						completion: 0,
						error: false,
					},
				]}
			/>
		);

		expect(screen.getByText('Description text')).toBeInTheDocument();
	});
});

// Medium path

describe('Stepper — Styling Behaviour', () => {
	test('applies correct orientation class', () => {
		const { container } = render(
			<Stepper
				orientation='vertical'
				steps={[
					{ title: 'One', description: null, active: false, completion: 0, error: false },
				]}
			/>
		);

		expect(container.firstChild).toHaveClass('vertical');
	});

	test('applies custom className', () => {
		const { container } = render(
			<Stepper
				className='custom-class'
				orientation='horizontal'
				steps={[
					{ title: 'X', description: null, active: false, completion: 0, error: false },
				]}
			/>
		);

		expect(container.firstChild).toHaveClass('custom-class');
	});
});

// Risky path

describe('Stepper — Edge Case Behaviour', () => {
	test('handles empty steps array without crashing', () => {
		const { container } = render(<Stepper steps={[]} orientation='horizontal' />);
		expect(container.firstChild).toBeInTheDocument();
		expect(container.querySelectorAll('[data-elem="step"]').length).toBe(0);
	});

	test('renders steps with error state correctly', () => {
		const { container } = render(
			<Stepper
				orientation='horizontal'
				steps={[
					{
						title: 'Error Step',
						description: null,
						active: false,
						completion: 0,
						error: true,
					},
				]}
			/>
		);

		// Step will contain class "error"
		const stepElem = container.querySelector('[data-elem="step"]');
		expect(stepElem).toHaveClass('error');
	});

	test('renders completed steps correctly', () => {
		const { container } = render(
			<Stepper
				orientation='horizontal'
				steps={[
					{
						title: 'Done',
						description: null,
						active: false,
						completion: 1,
						error: false,
					},
				]}
			/>
		);

		const stepElem = container.querySelector('[data-elem="step"]');
		expect(stepElem).toHaveClass('completed');
	});
});

//  SNAPSHOT TESTS

describe('Stepper — Snapshot Rendering', () => {
	test('matches snapshot for horizontal stepper', () => {
		const { container } = render(
			<Stepper
				orientation='horizontal'
				steps={[
					{
						title: 'Step A',
						description: null,
						active: false,
						completion: 1,
						error: false,
					},
					{
						title: 'Step B',
						description: 'Some description',
						active: true,
						completion: 0.5,
						error: false,
					},
				]}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	test('matches snapshot for vertical stepper', () => {
		const { container } = render(
			<Stepper
				orientation='vertical'
				steps={[
					{
						title: 'Vertical 1',
						description: null,
						active: true,
						completion: 0,
						error: false,
					},
					{
						title: 'Vertical 2',
						description: 'Desc',
						active: false,
						completion: 1,
						error: false,
					},
				]}
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
