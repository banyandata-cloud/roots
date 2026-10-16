import { fireEvent, render, screen } from '@testing-library/react';
import Tabs from './Tabs';

jest.mock('../../input/dropdown/Dropdown', () => {
	return function MockDropdown(props: any) {
		return (
			<div data-testid='variant-dropdown'>
				{props.children?.map?.((child: any) => (
					<button
						key={child.props.value}
						data-testid={`variant-option-${child.props.value}`}
						onClick={() => props.onChange?.({}, child.props.value)}
					>
						{child}
					</button>
				))}
			</div>
		);
	};
});

jest.mock('../../input/dropdown/dropdown-item/DropdownItem', () => {
	return function MockDropdownItem(props: any) {
		return <span>{props.title}</span>;
	};
});

const tabs = [
	{ id: 'one', title: 'One' },
	{ id: 'two', title: 'Two' },
	{ id: 'three', title: 'Three' },
];

const renderTabs = (props: Partial<React.ComponentProps<typeof Tabs>> = {}) =>
	render(
		<Tabs type='brand' tabs={tabs} selectedTab='one' setSelectedTab={jest.fn()} {...props} />
	);

describe('Tabs design-system variants', () => {
	test('renders tablist and selected tab semantics', () => {
		renderTabs();
		expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
		expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'false');
	});

	test('selects a tab on click', () => {
		const setSelectedTab = jest.fn();
		renderTabs({ setSelectedTab });
		fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
		expect(setSelectedTab).toHaveBeenCalledWith('two');
	});

	test('exposes the selected panel relationship', () => {
		renderTabs({ children: <p>Panel content</p> });
		const tab = screen.getByRole('tab', { name: 'One' });
		const panel = screen.getByRole('tabpanel');
		expect(tab).toHaveAttribute('aria-controls', panel.id);
		expect(panel).toHaveAttribute('aria-labelledby', tab.id);
	});

	test('moves focus and selection with horizontal arrows', () => {
		const setSelectedTab = jest.fn();
		renderTabs({ setSelectedTab });
		const first = screen.getByRole('tab', { name: 'One' });
		first.focus();
		fireEvent.keyDown(first, { key: 'ArrowRight' });
		expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
		expect(setSelectedTab).toHaveBeenCalledWith('two');
	});

	test('wraps around with horizontal arrows', () => {
		renderTabs({ selectedTab: 'three' });
		const last = screen.getByRole('tab', { name: 'Three' });
		last.focus();
		fireEvent.keyDown(last, { key: 'ArrowRight' });
		expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
	});

	test('skips disabled tabs during arrow navigation', () => {
		renderTabs({ tabs: [tabs[0], { ...tabs[1], disabled: true }, tabs[2]] });
		const first = screen.getByRole('tab', { name: 'One' });
		fireEvent.keyDown(first, { key: 'ArrowRight' });
		expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
	});

	test('Home and End focus the first and last enabled tabs', () => {
		renderTabs();
		const middle = screen.getByRole('tab', { name: 'Two' });
		fireEvent.keyDown(middle, { key: 'Home' });
		expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
		fireEvent.keyDown(screen.getByRole('tab', { name: 'One' }), { key: 'End' });
		expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
	});

	test('vertical tabs respond to vertical arrows', () => {
		renderTabs({ direction: 'vertical' });
		const first = screen.getByRole('tab', { name: 'One' });
		fireEvent.keyDown(first, { key: 'ArrowDown' });
		expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
	});

	test('renders a badge value', () => {
		renderTabs({ tabs: [{ id: 'one', title: 'One', badge: 4 }] });
		expect(screen.getByRole('tab', { name: 'One 4' })).toBeInTheDocument();
	});

	test('renders a right icon', () => {
		const RightIcon = () => <span data-testid='right-icon' />;
		renderTabs({ tabs: [{ id: 'one', title: 'One', rightIcon: RightIcon }] });
		expect(screen.getByTestId('right-icon')).toBeInTheDocument();
	});

	test('preserves dropdown tab selection', () => {
		const setSelectedTab = jest.fn();
		renderTabs({
			tabs: [
				tabs[0],
				{
					id: 'more',
					title: 'More',
					dropdown: true,
					dropdownItems: [{ id: 'four', title: 'Four' }],
				},
			],
			setSelectedTab,
		});
		fireEvent.click(screen.getByTestId('variant-option-four'));
		expect(setSelectedTab).toHaveBeenCalledWith('four');
	});

	test('supports each public visual variant', () => {
		for (const type of ['brand', 'gray', 'border', 'minimal', 'underline'] as const) {
			const { unmount } = renderTabs({ type, size: 'md' });
			expect(screen.getByRole('tab', { name: 'One' })).toBeInTheDocument();
			unmount();
		}
	});
});
