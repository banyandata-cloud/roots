import { fireEvent, render, screen } from '@testing-library/react';
import Tabs from './Tabs';

jest.mock('../input/dropdown', () => {
	return {
		Dropdown: function MockDropdown(props: any) {
			return (
				<div data-testid='variant-dropdown'>
					{props.options?.map((option: any) => (
						<button
							key={option.value}
							data-testid={`variant-option-${option.value}`}
							onClick={() => props.onChange?.(option.value)}
						>
							{option.label}
						</button>
					))}
				</div>
			);
		},
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

	test('renders an injected Syconia-style left icon component', () => {
		const SyconiaIcon = () => <svg data-testid='syconia-icon' aria-hidden='true' />;
		renderTabs({ tabs: [{ id: 'one', title: 'My details', leftIcon: SyconiaIcon }] });
		expect(screen.getByTestId('syconia-icon')).toBeInTheDocument();
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

	test('keeps all tab and panel ids unique across instances', () => {
		render(
			<>
				<Tabs type='brand' tabs={tabs} selectedTab='one' setSelectedTab={jest.fn()} />
				<Tabs type='gray' tabs={tabs} selectedTab='one' setSelectedTab={jest.fn()} />
			</>
		);
		const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	test.each([
		['unknown selected id', 'missing', tabs],
		['selected disabled tab', 'one', [{ ...tabs[0], disabled: true }, tabs[1]]],
		[
			'selected dropdown item',
			'four',
			[
				tabs[0],
				{
					id: 'more',
					title: 'More',
					dropdown: true,
					dropdownItems: [{ id: 'four', title: 'Four' }],
				},
			],
		],
	])('provides a tab stop for %s', (_description, selectedTab, tabItems) => {
		renderTabs({ tabs: tabItems, selectedTab });
		expect(screen.getAllByRole('tab').some((tab) => tab.getAttribute('tabindex') === '0')).toBe(
			true
		);
	});
});
