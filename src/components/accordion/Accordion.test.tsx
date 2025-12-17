import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';

// MOCKS

// Mock icons
jest.mock('../icons', () => ({
	CaretIcon: () => <div data-testid='caret-icon' />,
	ExpandArrowAltIcon: () => <div data-testid='expand-icon' />,
}));

// Mock BaseCell (clickable container)
jest.mock('../cell', () => ({
	BaseCell: ({ attrs, component1, component2, component3 }: any) => (
		<button data-testid='base-cell' onClick={attrs?.onClick}>
			{component1}
			{component2}
			{component3}
		</button>
	),
}));

// Mock Button used in onExpand
jest.mock('../buttons', () => ({
	Button: ({ onClick, title }: any) => (
		<button data-testid='expand-btn' onClick={onClick}>
			{title}
		</button>
	),
}));

// Mock framer-motion so animations don't break Jest
jest.mock('framer-motion', () => ({
	motion: {
		div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
	},
}));

// HAPPY PATH TESTS
describe('Accordion — Rendering & Interaction Behaviour', () => {
	test('renders title and closed body when defaultOpen=false', () => {
		render(<Accordion title='Hello' description='desc' defaultOpen={false} />);

		expect(screen.getByText('Hello')).toBeInTheDocument();
		expect(screen.queryByText('desc')).toBeNull();
	});

	test('opens when clicked in uncontrolled mode', () => {
		render(<Accordion title='Click Me' description='Body Content' defaultOpen={false} />);

		fireEvent.click(screen.getByTestId('base-cell'));

		expect(screen.getByText('Body Content')).toBeInTheDocument();
	});
});

// MEDIUM PATH TESTS
describe('Accordion — Controlled Mode & Customisation Behaviour', () => {
	test('controlled mode → onToggle should be called', () => {
		const mockToggle = jest.fn();

		render(
			<Accordion title='Controlled' open={false} onToggle={mockToggle} description='Body' />
		);

		fireEvent.click(screen.getByTestId('base-cell'));

		expect(mockToggle).toHaveBeenCalledWith(false);
	});

	test('renders left & right custom components', () => {
		const CustomIcon = () => <div data-testid='custom-icon' />;

		render(
			<Accordion
				title='Icons'
				description='test'
				leftComponent={CustomIcon}
				rightComponent={CustomIcon}
			/>
		);

		expect(screen.getAllByTestId('custom-icon').length).toBe(2);
	});
});

// RISKY PATH TESTS
describe('Accordion — Edge Case Handling', () => {
	test('should NOT crash when title is empty', () => {
		render(<Accordion title='' description='desc' defaultOpen={false} />);

		expect(screen.getByTestId('base-cell')).toBeInTheDocument();
	});

	test('should NOT crash when description is omitted', () => {
		render(<Accordion title='No Desc' defaultOpen />);

		// Body still renders, children may be empty
		expect(screen.getByTestId('base-cell')).toBeInTheDocument();
	});
});

// SNAPSHOT TESTS
describe('CodeSnippet — Snapshot Rendering', () => {
	test('closed accordion snapshot', () => {
		const { container } = render(
			<Accordion title='Snap Title' description='Snap Desc' defaultOpen={false} />
		);

		expect(container).toMatchSnapshot();
	});

	test('open accordion snapshot', () => {
		const { container } = render(
			<Accordion title='Snap Title' description='Snap Desc' defaultOpen />
		);

		expect(container).toMatchSnapshot();
	});
});
