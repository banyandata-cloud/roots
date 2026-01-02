import { render, screen } from '@testing-library/react';
import BaseCell from './BaseCell';

// HAPPY PATH TESTS
describe('BaseCell — Rendering & Basic Structure Behaviour', () => {
	test('renders all three components when provided', () => {
		render(
			<BaseCell
				component1={<span>One</span>}
				component2={<span>Two</span>}
				component3={<span>Three</span>}
			/>
		);

		expect(screen.getByText('One')).toBeInTheDocument();
		expect(screen.getByText('Two')).toBeInTheDocument();
		expect(screen.getByText('Three')).toBeInTheDocument();
	});

	test('renders with default RootDOM as div', () => {
		const { container } = render(<BaseCell component2={<span>Center</span>} />);

		expect(container.firstChild?.nodeName).toBe('DIV');
	});
});

// MEDIUM PATH TESTS
describe('BaseCell — Conditional Layout & Customisation Behaviour', () => {
	test('renders only component1 in center when component2 is empty', () => {
		render(<BaseCell component1={<span>Left</span>} component2='' />);

		expect(screen.getByText('Left')).toBeInTheDocument();
	});

	test('renders only component3 in center when component2 is empty', () => {
		render(<BaseCell component3={<span>Right</span>} component2='' />);

		expect(screen.getByText('Right')).toBeInTheDocument();
	});

	test('prioritizes component1 when component2 is empty and both sides exist', () => {
		render(
			<BaseCell
				component1={<span>Left</span>}
				component3={<span>Right</span>}
				component2=''
			/>
		);

		expect(screen.getByText('Left')).toBeInTheDocument();
		expect(screen.queryByText('Right')).toBeNull();
	});

	test('renders custom RootDOM element', () => {
		const { container } = render(
			<BaseCell RootDOM='button' component2={<span>Button Cell</span>} />
		);

		expect(container.firstChild?.nodeName).toBe('BUTTON');
	});
});

// RISKY PATH TESTS
describe('BaseCell — Edge Case Handling', () => {
	test('should NOT crash when all components are empty', () => {
		const { container } = render(<BaseCell component2='' />);

		const baseCell = container.querySelector('[data-elem="base-cell"]');
		expect(baseCell).toBeInTheDocument();
	});

	test('should NOT crash when component2 is an empty string with component1', () => {
		render(<BaseCell component1={<span>Left</span>} component2='' />);

		expect(screen.getByText('Left')).toBeInTheDocument();
	});

	test('passes attrs correctly to RootDOM', () => {
		render(
			<BaseCell component2={<span>Attrs</span>} attrs={{ 'aria-label': 'base-cell-aria' }} />
		);

		expect(screen.getByLabelText('base-cell-aria')).toBeInTheDocument();
	});

	test('supports flexible and radius props without crashing', () => {
		render(<BaseCell component2={<span>Styled</span>} flexible radius='round' />);

		expect(screen.getByText('Styled')).toBeInTheDocument();
	});
});

// SNAPSHOT TESTS
describe('BaseCell — Snapshot Rendering', () => {
	test('default base cell snapshot', () => {
		const { container } = render(
			<BaseCell
				component1={<span>1</span>}
				component2={<span>2</span>}
				component3={<span>3</span>}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	test('centered base cell snapshot (single component)', () => {
		const { container } = render(<BaseCell component2={<span>Center</span>} />);

		expect(container).toMatchSnapshot();
	});
});
