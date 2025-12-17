import { render, screen } from '@testing-library/react';
import Step from './Step';

describe('Step Component — Default Rendering Behavior', () => {
	test('renders index number when no completion or error is applied', () => {
		render(
			<Step index={2} total={4} orientation='horizontal' title={null} description={null} />
		);
		expect(screen.getByText('3')).toBeInTheDocument();
	});

	test('renders title and description when provided', () => {
		render(
			<Step
				index={0}
				total={3}
				orientation='horizontal'
				title='Step Title'
				description='Step description'
			/>
		);
		expect(screen.getByText('Step Title')).toBeInTheDocument();
		expect(screen.getByText('Step description')).toBeInTheDocument();
	});

	test('shows tick icon when completion is 1', () => {
		render(
			<Step
				index={0}
				total={3}
				orientation='horizontal'
				title={null}
				description={null}
				completion={1}
			/>
		);

		// FIX: target icon by its CSS class instead of data-testid
		expect(document.querySelector('.completion-icon')).toBeInTheDocument();
	});

	test('applies active styling when active is true', () => {
		const { container } = render(
			<Step
				index={0}
				total={3}
				orientation='horizontal'
				title={null}
				description={null}
				active
			/>
		);
		expect(container.querySelector('[data-elem="step"]')).toHaveClass('active');
	});
});

describe('Step Component — Custom Rendering Behavior', () => {
	test('renders custom icon component when renderIcon is provided', () => {
		const CustomIcon = () => <div>Custom Icon</div>;

		render(
			<Step
				index={0}
				total={3}
				orientation='horizontal'
				title={null}
				description={null}
				renderIcon={CustomIcon}
			/>
		);

		expect(screen.getByText('Custom Icon')).toBeInTheDocument();
	});

	test('renders custom title when renderTitle is provided', () => {
		const CustomTitle = () => <span>My Title</span>;

		render(
			<Step
				index={0}
				total={3}
				orientation='horizontal'
				title={null}
				description={null}
				renderTitle={CustomTitle}
			/>
		);

		expect(screen.getByText('My Title')).toBeInTheDocument();
	});

	test('renders custom description when renderDescription is provided', () => {
		const CustomDescription = () => <span>My Description</span>;

		render(
			<Step
				index={0}
				total={3}
				orientation='horizontal'
				title={null}
				description={null}
				renderDescription={CustomDescription}
			/>
		);

		expect(screen.getByText('My Description')).toBeInTheDocument();
	});
});

describe('Step Component — Edge Case States', () => {
	test('renders error icon when error is true', () => {
		render(
			<Step
				index={0}
				total={3}
				orientation='horizontal'
				title={null}
				description={null}
				error
			/>
		);

		expect(document.querySelector('.error-icon')).toBeInTheDocument();
	});

	test('shows progress ring when active and completion is between 0 and 1', () => {
		const { container } = render(
			<Step
				index={0}
				total={3}
				orientation='horizontal'
				title={null}
				description={null}
				active
				completion={0.5}
			/>
		);

		expect(container.querySelector('.progress')).toBeInTheDocument();
	});

	test('applies no-tail class when noTail is true', () => {
		const { container } = render(
			<Step
				index={0}
				total={3}
				orientation='horizontal'
				title={null}
				description={null}
				noTail
			/>
		);

		expect(container.querySelector('[data-elem="step"]')).toHaveClass('no-tail');
	});

	test('applies proper orientation class when orientation is provided', () => {
		const { container } = render(
			<Step index={0} total={3} orientation='vertical' title={null} description={null} />
		);

		expect(container.querySelector('[data-elem="step"]')).toHaveClass('vertical');
	});
});

//  SNAPSHOT RENDERING

describe('Step Component — Snapshot Rendering', () => {
	test('matches visual snapshot for a fully populated step', () => {
		const { asFragment } = render(
			<Step
				index={1}
				total={4}
				orientation='horizontal'
				title='Snapshot Title'
				description='Snapshot Description'
				active
				completion={0.75}
			/>
		);

		expect(asFragment()).toMatchSnapshot();
	});
});
