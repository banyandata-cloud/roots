import { render, screen } from '@testing-library/react';
import Callout from './Callout';

// Mock utils
jest.mock('../../utils/utils', () => ({
	classes: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// Mock Alert Icons
jest.mock('../icons', () => ({
	AlertIcon: {
		Info: (props: any) => <div data-testid='icon-info' {...props} />,
		Error: (props: any) => <div data-testid='icon-error' {...props} />,
		Warning: (props: any) => <div data-testid='icon-warning' {...props} />,
		Success: (props: any) => <div data-testid='icon-success' {...props} />,
		Danger: (props: any) => <div data-testid='icon-danger' {...props} />,
	},
}));

// HAPPY PATH TESTS

describe('Callout — Rendering Behaviour', () => {
	test('renders title and description when provided', () => {
		render(<Callout title='Hello' description='World' type='info' />);

		expect(screen.getByText('Hello')).toBeInTheDocument();
		expect(screen.getByText('World')).toBeInTheDocument();
	});

	test('renders default icon based on type', () => {
		render(<Callout title='Info' description='Desc' type='info' />);
		expect(screen.getByTestId('icon-info')).toBeInTheDocument();
	});
});

//  MEDIUM PATH TESTS
describe('Callout — Custom Behaviour & Styling', () => {
	test('renders custom icon when provided', () => {
		const CustomIcon = (props: any) => (
			<div data-testid='custom-icon' {...props}>
				*X*
			</div>
		);

		render(
			<Callout title='Test' description='Custom icon desc' type='info' icon={CustomIcon} />
		);

		expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
	});

	test('renders custom action component when provided', () => {
		const Action = () => <button data-testid='custom-action'>OK</button>;

		render(<Callout title='Action Test' description='desc' type='success' action={Action} />);

		expect(screen.getByTestId('custom-action')).toBeInTheDocument();
	});

	test('applies shadow class when shadow=true', () => {
		const { container } = render(
			<Callout title='Shadow' description='desc' type='warning' shadow />
		);

		expect(container.firstChild).toHaveClass('shadow');
	});
});

// RISKY PATH TESTS
describe('Callout — Edge Case Behaviour', () => {
	test('does not crash when title/description are empty strings', () => {
		const { container } = render(<Callout title='' description='' type='success' />);

		expect(container.firstChild).toBeInTheDocument();

		// Because empty string is falsy, the elements should NOT be rendered
		expect(container.querySelector('[data-elem="title"]')).toBeNull();
		expect(container.querySelector('[data-elem="desc"]')).toBeNull();
	});

	test('does not render icon when showIcon=false', () => {
		render(<Callout title='No Icon' description='desc' type='danger' showIcon={false} />);

		expect(screen.queryByTestId('icon-danger')).toBeNull();
	});
});

// SNAPSHOT TESTS
describe('Callout — Snapshot Rendering', () => {
	test('matches snapshot with full data', () => {
		const { container } = render(
			<Callout
				title='Snapshot Title'
				description='Snapshot description'
				type='error'
				shadow
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
