import { render, screen } from '@testing-library/react';
import Step from './Step';

// MOCKS

// Mock COLORS
jest.mock('../../../styles', () => ({
	COLORS: {
		highlight: '#00ff00',
	},
}));

// Mock icons
jest.mock('../../icons', () => ({
	CrossIcon: ({ className }: any) => (
		<span data-testid='cross-icon' className={className}>
			X
		</span>
	),
	TickIcon: ({ className }: any) => (
		<span data-testid='tick-icon' className={className}>
			✓
		</span>
	),
}));

// BASE PROPS
const baseProps = {
	title: 'Step title',
	description: 'Step description',
	index: 0,
	orientation: 'horizontal' as const,
};

// HAPPY PATH TESTS
describe('Step — Rendering & Basic Behaviour', () => {
	test('renders step index when not completed or errored', () => {
		render(<Step {...baseProps} />);

		expect(screen.getByText('1')).toBeInTheDocument();
	});

	test('renders title and description', () => {
		render(<Step {...baseProps} />);

		expect(screen.getByText('Step title')).toBeInTheDocument();
		expect(screen.getByText('Step description')).toBeInTheDocument();
	});

	test('renders tick icon when completion is 1', () => {
		render(<Step {...baseProps} completion={1} />);

		expect(screen.getByTestId('tick-icon')).toBeInTheDocument();
	});
});

// MEDIUM PATH TESTS
describe('Step — Behaviour With State & Customisation', () => {
	test('renders error icon when error=true', () => {
		render(<Step {...baseProps} error />);

		expect(screen.getByTestId('cross-icon')).toBeInTheDocument();
	});

	test('renders progress indicator when active and partially completed', () => {
		const { container } = render(<Step {...baseProps} active completion={0.5} />);

		expect(container.querySelector(`.${'progress'}`)).toBeTruthy();
	});

	test('uses custom renderIcon when provided', () => {
		const RenderIcon = () => <span data-testid='custom-icon'>ICON</span>;

		render(<Step {...baseProps} renderIcon={RenderIcon} />);

		expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
	});

	test('uses custom renderTitle when provided', () => {
		const RenderTitle = () => <span data-testid='custom-title'>Custom Title</span>;

		render(<Step {...baseProps} renderTitle={RenderTitle} />);

		expect(screen.getByTestId('custom-title')).toBeInTheDocument();
	});

	test('uses custom renderDescription when provided', () => {
		const RenderDescription = () => <span data-testid='custom-description'>Custom Desc</span>;

		render(<Step {...baseProps} renderDescription={RenderDescription} />);

		expect(screen.getByTestId('custom-description')).toBeInTheDocument();
	});
});

// RISKY PATH TESTS
describe('Step — Edge Case Handling', () => {
	test('should NOT crash when title and description are null', () => {
		render(<Step index={0} title={null} description={null} orientation='horizontal' />);

		expect(screen.getByText('1')).toBeInTheDocument();
	});

	test('applies noTail class when noTail=true', () => {
		const { container } = render(<Step {...baseProps} noTail />);

		expect(container.querySelector('[data-elem="step"]')?.className).toContain('no-tail');
	});

	test('supports vertical orientation', () => {
		const { container } = render(<Step {...baseProps} orientation='vertical' />);

		expect(container.querySelector('[data-elem="step"]')?.className).toContain('vertical');
	});
});

// SNAPSHOT TESTS
describe('Step — Snapshot Rendering', () => {
	test('default step snapshot', () => {
		const { container } = render(<Step {...baseProps} />);
		expect(container).toMatchSnapshot();
	});

	test('completed active step snapshot', () => {
		const { container } = render(<Step {...baseProps} active completion={1} />);

		expect(container).toMatchSnapshot();
	});
});
