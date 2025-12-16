import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BaseSidePanel from './BaseSidePanel';

// MOCKS
jest.mock('../modal/BaseModal', () => (props: any) => (
	<div data-testid='base-modal'>
		<div data-testid='modal-header'>{props.renderHeader}</div>
		<div data-testid='modal-body'>{props.children}</div>
		<div data-testid='modal-footer'>{props.renderFooter}</div>
	</div>
));

jest.mock('../tabs/Tabs', () => (props: any) => (
	<div data-testid='tabs'>
		<button data-testid='tab-1' onClick={() => props.setSelectedTab(1)}>
			Tab 1
		</button>
		<button data-testid='tab-2' onClick={() => props.setSelectedTab(2)}>
			Tab 2
		</button>
		<div data-testid='tabs-children'>{props.children}</div>
	</div>
));

// Utility fake tabs
const fakeTabs = [
	{ id: '1', title: 'Tab 1' },
	{ id: '2', title: 'Tab 2' },
];

// TESTS

// Happy paths
describe('BaseSidePanel — Drawer Mode Rendering', () => {
	test('renders drawer when isModal=false', () => {
		render(<BaseSidePanel open={true}>Body</BaseSidePanel>);

		expect(screen.getByText('Body')).toBeInTheDocument();
		expect(screen.queryByTestId('base-modal')).toBeNull();
	});

	test('applies drawer close class when open=false', () => {
		const { container } = render(<BaseSidePanel open={false}>Body</BaseSidePanel>);

		expect((container.firstChild as HTMLElement).className).toMatch(/close/);
	});

	test('renders header & footer when provided', () => {
		render(
			<BaseSidePanel
				open={true}
				renderHeader={<div>HEADER</div>}
				renderFooter={<div>FOOTER</div>}>
				Body
			</BaseSidePanel>
		);

		expect(screen.getByText('HEADER')).toBeInTheDocument();
		expect(screen.getByText('FOOTER')).toBeInTheDocument();
	});
});

// Medium paths
describe('BaseSidePanel — Modal Mode Rendering', () => {
	test('renders BaseModal when isModal=true', () => {
		render(
			<BaseSidePanel open={true} isModal renderHeader='HDR' renderFooter='FTR'>
				Body
			</BaseSidePanel>
		);

		expect(screen.getByTestId('base-modal')).toBeInTheDocument();
		expect(screen.getByTestId('modal-header')).toHaveTextContent('HDR');
		expect(screen.getByTestId('modal-body')).toHaveTextContent('Body');
		expect(screen.getByTestId('modal-footer')).toHaveTextContent('FTR');
	});
});

describe('BaseSidePanel — Tabs Rendering', () => {
	test('renders Tabs when tabsConfig.tabs exists', () => {
		render(
			<BaseSidePanel open={true} tabsConfig={{ tabs: fakeTabs }}>
				Content
			</BaseSidePanel>
		);

		expect(screen.getByTestId('tabs')).toBeInTheDocument();
		expect(screen.getByTestId('tabs-children')).toHaveTextContent('Content');
	});

	test('does NOT render Tabs when empty', () => {
		const { container } = render(
			<BaseSidePanel open={true} tabsConfig={{ tabs: [] }}>
				Content
			</BaseSidePanel>
		);

		expect(screen.queryByTestId('tabs')).toBeNull();
		expect(container.querySelector('[data-elem="body"]')).toBeInTheDocument();
	});
});

describe('BaseSidePanel — activeTab Sync Behavior', () => {
	test('activeTab updates selectedTab (1-based)', () => {
		const mockSet = jest.fn();
		render(
			<BaseSidePanel
				open={true}
				activeTab={0}
				toggleTableDrawer={{ data: {} }}
				setToggleTableDrawer={mockSet}
				tabsConfig={{ tabs: fakeTabs }}>
				Body
			</BaseSidePanel>
		);

		// Should set index: 0 (mirror external state)
		expect(mockSet).toHaveBeenCalledWith(
			expect.objectContaining({
				data: expect.objectContaining({ index: 0 }),
			})
		);
	});

	test('clicking a tab calls setToggleTableDrawer with correct index', () => {
		const mockSet = jest.fn();

		render(
			<BaseSidePanel
				open={true}
				toggleTableDrawer={{ data: {} }}
				setToggleTableDrawer={mockSet}
				tabsConfig={{ tabs: fakeTabs }}>
				Body
			</BaseSidePanel>
		);

		fireEvent.click(screen.getByTestId('tab-2')); // setSelectedTab(2)

		expect(mockSet).toHaveBeenCalledWith(
			expect.objectContaining({
				data: expect.objectContaining({ index: 1 }), // (2 - 1)
			})
		);
	});
});

// Risky Path
describe('BaseSidePanel — Edge Cases', () => {
	test('handles undefined tabsConfig', () => {
		render(<BaseSidePanel open={true}>Body</BaseSidePanel>);
		expect(screen.getByText('Body')).toBeInTheDocument();
	});

	test('handles invalid tabsConfig.tabs safely', () => {
		render(
			<BaseSidePanel open={true} tabsConfig={{ tabs: null as any }}>
				Body
			</BaseSidePanel>
		);

		expect(screen.queryByTestId('tabs')).toBeNull();
	});

	test('handles long className gracefully', () => {
		const longClass = 'x'.repeat(400);
		const { container } = render(
			<BaseSidePanel open={true} className={longClass}>
				Body
			</BaseSidePanel>
		);

		expect(container.firstChild).toBeTruthy();
	});
});

describe('BaseSidePanel — Snapshots', () => {
	test('drawer snapshot', () => {
		const { container } = render(<BaseSidePanel open={true}>Body</BaseSidePanel>);
		expect(container).toMatchSnapshot();
	});

	test('modal snapshot', () => {
		const { container } = render(
			<BaseSidePanel open={true} isModal>
				Body
			</BaseSidePanel>
		);
		expect(container).toMatchSnapshot();
	});

	test('tabs snapshot', () => {
		const { container } = render(
			<BaseSidePanel open={true} tabsConfig={{ tabs: fakeTabs }}>
				Body
			</BaseSidePanel>
		);
		expect(container).toMatchSnapshot();
	});
});
