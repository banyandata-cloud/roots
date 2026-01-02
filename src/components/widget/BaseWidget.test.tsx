import { render, screen, fireEvent } from '@testing-library/react';
import BaseWidget from './BaseWidget';

// MOCKS

jest.mock('../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
}));

jest.mock('../buttons', () => {
	const React = require('react');

	return {
		BaseButton: React.forwardRef(({ title, onClick }: any, ref: any) => (
			<button ref={ref} data-testid='base-button' onClick={onClick}>
				{title}
			</button>
		)),
		Button: ({ title, onClick }: any) => (
			<button data-testid='button' onClick={onClick}>
				{title}
			</button>
		),
	};
});

jest.mock('../popover', () => ({
	Popover: ({ open, children }: any) =>
		open ? <div data-testid='popover'>{children}</div> : null,
}));

jest.mock('../sidePanel/BaseSidePanel', () => ({
	__esModule: true,
	default: ({ open, children }: any) =>
		open ? <div data-testid='side-panel'>{children}</div> : null,
}));

jest.mock('../text', () => ({
	Text: ({ children, ...rest }: any) => <span {...rest}>{children}</span>,
}));

jest.mock('../toggle', () => ({
	Toggle: () => <div data-testid='toggle' />,
}));

jest.mock('../datePicker', () => ({
	DatePicker: () => <div data-testid='datepicker' />,
}));

jest.mock('../input', () => ({
	Dropdownv2: ({ children }: any) => <div data-testid='dropdown'>{children}</div>,
	DropdownItemv2: ({ title }: any) => <div data-testid='dropdown-item'>{title}</div>,
}));

jest.mock('../icons', () => ({
	ArrowIcon: () => <span data-testid='arrow-icon' />,
	CaretIcon: () => <span data-testid='caret-icon' />,
	FilterIcon: () => <span data-testid='filter-icon' />,
	MaximizeIcon: () => <span data-testid='maximize-icon' />,
}));

// TEST DATA

const MockChild = (props: any) => (
	<div data-testid='child' {...props}>
		Child
	</div>
);

const baseProps = {
	title: 'Test Widget',
	children: <MockChild />,
};

// HAPPY PATH

describe('BaseWidget — Rendering & Basic Behaviour', () => {
	test('renders widget root and title', () => {
		render(<BaseWidget {...baseProps} />);

		expect(screen.getByText('Test Widget')).toBeInTheDocument();
		expect(screen.getByTestId('child')).toBeInTheDocument();
	});

	test('renders back button when showBack is true', () => {
		const onBack = jest.fn();

		render(<BaseWidget {...baseProps} showBack onBack={onBack} />);

		fireEvent.click(screen.getByTestId('button'));
		expect(onBack).toHaveBeenCalledTimes(1);
	});
});

// MEDIUM PATH

describe('BaseWidget — Interactive Behaviour', () => {
	test('opens title popover when titleOptions are provided', () => {
		render(
			<BaseWidget
				{...baseProps}
				titleOptions={<div data-testid='title-options'>Options</div>}
			/>
		);

		fireEvent.click(screen.getByTestId('base-button'));
		expect(screen.getByTestId('popover')).toBeInTheDocument();
	});

	test('renders header options correctly', () => {
		render(
			<BaseWidget
				{...baseProps}
				options={[
					{
						id: 'toggle',
						options: [],
					},
				]}
			/>
		);

		expect(screen.getByTestId('toggle')).toBeInTheDocument();
	});

	test('opens side panel when filter option is clicked', () => {
		render(
			<BaseWidget
				{...baseProps}
				options={[
					{
						id: 'filter',
					},
				]}
			/>
		);

		fireEvent.click(screen.getByTestId('button'));
		expect(screen.getByTestId('side-panel')).toBeInTheDocument();
	});
});

// RISKY PATH

describe('BaseWidget — Edge Case Handling', () => {
	test('does not crash with minimal props', () => {
		const { container } = render(<BaseWidget />);

		expect(container.querySelector('[data-elem="children"]')).toBeInTheDocument();
	});

	test('handles empty children safely', () => {
		render(<BaseWidget title='Empty Widget' />);
		expect(screen.getByText('Empty Widget')).toBeInTheDocument();
	});
});

// SNAPSHOT

describe('BaseWidget — Snapshot Rendering', () => {
	test('matches snapshot for default widget', () => {
		const { container } = render(<BaseWidget {...baseProps} />);
		expect(container).toMatchSnapshot();
	});
});
