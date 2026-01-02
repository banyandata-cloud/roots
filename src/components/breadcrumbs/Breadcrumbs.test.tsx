import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';

declare const require: any;

// MOCKS

// Mock icons
jest.mock('../icons', () => ({
	CaretIcon: ({ className }: any) => <div data-testid='caret-icon' className={className} />,
}));

// Mock Button
jest.mock('../buttons/button/Button', () => {
	const React = require('react') as typeof import('react');

	return React.forwardRef<HTMLButtonElement, any>(
		(
			{ onClick, title, leftComponent, rightComponent }: any,
			ref: React.Ref<HTMLButtonElement>
		) => (
			<button data-testid='breadcrumbs-button' onClick={onClick} ref={ref}>
				{leftComponent && leftComponent()}
				<span>{title}</span>
				{rightComponent && rightComponent()}
			</button>
		)
	);
});

// Mock Popover
jest.mock('../popover', () => ({
	Popover: ({ open, children }: any) =>
		open ? <div data-testid='popover'>{children}</div> : null,
}));

// TEST DATA
const baseCrumbs = [
	{
		title: 'section-1',
		value: 'test',
		navigate: jest.fn(),
	},
	{
		title: 'section-2',
		value: 'test-2',
		navigate: jest.fn(),
	},
];

// HAPPY PATH TESTS
describe('Breadcrumbs — Rendering & Basic Interaction Behaviour', () => {
	test('renders last breadcrumb title and value in button', () => {
		render(<Breadcrumbs crumbs={baseCrumbs} />);

		expect(screen.getByText('section-2 : test-2')).toBeInTheDocument();
	});

	test('opens popover when button is clicked and crumbs length > 1', () => {
		render(<Breadcrumbs crumbs={baseCrumbs} />);

		fireEvent.click(screen.getByTestId('breadcrumbs-button'));

		expect(screen.getByTestId('popover')).toBeInTheDocument();
		expect(screen.getByText('section-1: test')).toBeInTheDocument();
	});
});

// MEDIUM PATH TESTS
describe('Breadcrumbs — Behaviour With Optional Props & Customisation', () => {
	test('calls navigate when non-disabled crumb is clicked', () => {
		const navigate = jest.fn();

		render(
			<Breadcrumbs
				crumbs={[
					{ title: 'first', value: 'one', navigate },
					{ title: 'last', value: 'two' },
				]}
			/>
		);

		fireEvent.click(screen.getByTestId('breadcrumbs-button'));
		fireEvent.click(screen.getByText('first: one'));

		expect(navigate).toHaveBeenCalled();
	});

	test('does NOT call navigate when crumb is disabled', () => {
		const navigate = jest.fn();

		render(
			<Breadcrumbs
				crumbs={[
					{
						title: 'disabled',
						value: 'crumb',
						isDisabled: true,
						navigate,
					},
					{ title: 'active', value: 'crumb' },
				]}
			/>
		);

		fireEvent.click(screen.getByTestId('breadcrumbs-button'));
		fireEvent.click(screen.getByText('disabled: crumb'));

		expect(navigate).not.toHaveBeenCalled();
	});

	test('renders icon when crumb icon is provided', () => {
		render(
			<Breadcrumbs
				crumbs={[
					{
						title: 'with-icon',
						value: 'test',
						icon: <div data-testid='custom-icon' />,
					},
					{ title: 'last', value: 'item' },
				]}
			/>
		);

		fireEvent.click(screen.getByTestId('breadcrumbs-button'));

		expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
	});
});

// RISKY PATH TESTS
describe('Breadcrumbs — Edge Case Handling', () => {
	test('returns null when crumbs array is empty', () => {
		const { container } = render(<Breadcrumbs crumbs={[]} />);

		expect(container.firstChild).toBeNull();
	});

	test('returns null when crumbs is not an array', () => {
		const { container } = render(<Breadcrumbs crumbs={undefined as unknown as any[]} />);

		expect(container.firstChild).toBeNull();
	});

	test('does NOT toggle popover when only one crumb exists', () => {
		render(<Breadcrumbs crumbs={[{ title: 'single', value: 'crumb' }]} />);

		fireEvent.click(screen.getByTestId('breadcrumbs-button'));

		expect(screen.queryByTestId('popover')).toBeNull();
	});

	test('should NOT crash when title or value is empty', () => {
		render(<Breadcrumbs crumbs={[{ title: '', value: '' }]} />);

		expect(screen.getByTestId('breadcrumbs-button')).toBeInTheDocument();
	});
});

// SNAPSHOT TESTS
describe('Breadcrumbs — Snapshot Rendering', () => {
	test('collapsed breadcrumbs snapshot', () => {
		const { container } = render(<Breadcrumbs crumbs={baseCrumbs} />);
		expect(container).toMatchSnapshot();
	});

	test('expanded breadcrumbs snapshot', () => {
		const { container } = render(<Breadcrumbs crumbs={baseCrumbs} />);

		fireEvent.click(screen.getByTestId('breadcrumbs-button'));

		expect(container).toMatchSnapshot();
	});
});
