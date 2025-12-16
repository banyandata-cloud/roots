import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';

// MOCKS

// Button mock
jest.mock('../buttons', () => ({
	Button: (props: any) => (
		<button
			data-testid={`btn-${props.title || props.id}`}
			disabled={props.disabled}
			onClick={props.onClick}>
			{props.leftComponent && props.leftComponent()}
			{props.title}
			{props.rightComponent && props.rightComponent()}
		</button>
	),
}));

// Dropdown mock — triggers onChange for each DropdownItem
jest.mock('../input/dropdown/Dropdown', () => {
	return function MockDropdown(props: any) {
		return (
			<div data-testid='dropdown'>
				{props.children &&
					props.children.map?.((child: any) => (
						<div
							key={child.props.value}
							data-testid={`dropdown-item-${child.props.value}`}
							onClick={() => props.onChange?.({}, child.props.value)}>
							{child}
						</div>
					))}
			</div>
		);
	};
});

// DropdownItem mock — ONLY renders (NO click inside)
jest.mock('../input/dropdown/dropdown-item/DropdownItem', () => {
	return function MockDropdownItem(props: any) {
		return <div>{props.title}</div>;
	};
});

// TEST UTILITIES
const basicTabs = [
	{ id: '1', title: 'Tab1' },
	{ id: '2', title: 'Tab2' },
];

// Fake DOM layout for slider
Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
	get() {
		return 20;
	},
});
Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
	get() {
		return 80;
	},
});

// HAPPY PATH TESTS
describe('Tabs — Rendering & Basic Behaviour', () => {
	test('renders tabs with titles', () => {
		render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(screen.getByTestId('btn-Tab1')).toBeInTheDocument();
		expect(screen.getByTestId('btn-Tab2')).toBeInTheDocument();
	});

	test('renders children inside tab content', () => {
		render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'>
				<div>Child content</div>
			</Tabs>
		);

		expect(screen.getByText('Child content')).toBeInTheDocument();
	});

	test('activates correct tab based on selectedTab', () => {
		const { container } = render(
			<Tabs
				tabs={basicTabs}
				selectedTab='2'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(container.innerHTML).toContain('active');
	});
});

// MEDIUM PATH TESTS
describe('Tabs — Interaction, Icons, Layout', () => {
	test('clicking a tab calls setSelectedTab with correct id', () => {
		const mockSet = jest.fn();

		render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={mockSet}
				direction='horizontal'
			/>
		);

		fireEvent.click(screen.getByTestId('btn-Tab2'));
		expect(mockSet).toHaveBeenCalledWith('2');
	});

	test('renders vertical orientation', () => {
		const { container } = render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='vertical'
			/>
		);

		expect((container.firstElementChild as HTMLElement).className).toContain(
			'tabs-container-vertical'
		);
	});

	test('renders left icon', () => {
		const tabsWithLeftIcon = [
			{ id: '1', title: 'Tab1', leftIcon: () => <div data-testid='leftIcon' /> },
		];

		render(
			<Tabs
				tabs={tabsWithLeftIcon}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(screen.getByTestId('leftIcon')).toBeInTheDocument();
	});

	test('renders right icon', () => {
		const tabsWithRightIcon = [
			{ id: '1', title: 'Tab1', rightIcon: () => <div data-testid='rightIcon' /> },
		];

		render(
			<Tabs
				tabs={tabsWithRightIcon}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(screen.getByTestId('rightIcon')).toBeInTheDocument();
	});

	test('slider updates according to active tab', () => {
		const { container } = render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		const slider = container.querySelector('[class*="tab-slider"]') as HTMLElement;
		expect(slider.style.left).toBe('20px');
		expect(slider.style.width).toBe('80px');
	});
});

// RISKY PATH TESTS
describe('Tabs — Edge Cases & Dropdown (RISKY PATH)', () => {
	test('renders dropdown tab', () => {
		const tabsWithDropdown = [
			{ id: '1', title: 'Tab1' },
			{
				id: '4',
				title: 'Options',
				dropdown: true,
				dropdownItems: [{ id: '4', title: 'Opt1' }],
			},
		];

		render(
			<Tabs
				tabs={tabsWithDropdown}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(screen.getByTestId('dropdown')).toBeInTheDocument();
		expect(screen.getByTestId('dropdown-item-4')).toBeInTheDocument();
	});

	test('selecting a dropdown item calls setSelectedTab', () => {
		const mockSet = jest.fn();

		const tabsWithDropdown = [
			{ id: '1', title: 'Tab1' },
			{
				id: '4',
				title: 'Options',
				dropdown: true,
				dropdownItems: [{ id: '5', title: 'Opt A' }],
			},
		];

		render(
			<Tabs
				tabs={tabsWithDropdown}
				selectedTab='1'
				setSelectedTab={mockSet}
				direction='horizontal'
			/>
		);

		fireEvent.click(screen.getByTestId('dropdown-item-5'));

		expect(mockSet).toHaveBeenCalledWith('5');
	});

	test('disabled tab should NOT call setSelectedTab', () => {
		const mockSet = jest.fn();

		const tabsDisabled = [
			{ id: '1', title: 'Tab1', disabled: true },
			{ id: '2', title: 'Tab2' },
		];

		render(
			<Tabs
				tabs={tabsDisabled}
				selectedTab='1'
				setSelectedTab={mockSet}
				direction='horizontal'
			/>
		);

		fireEvent.click(screen.getByTestId('btn-Tab1'));
		expect(mockSet).not.toHaveBeenCalled();
	});

	test('fallback: selectedTab not found → slider points to first tab', () => {
		const { container } = render(
			<Tabs
				tabs={basicTabs}
				selectedTab='999'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		const slider = container.querySelector('[class*="tab-slider"]') as HTMLElement;
		expect(slider.style.left).toBe('20px');
	});

	test('handles empty tabs array safely', () => {
		const { container } = render(
			<Tabs tabs={[]} selectedTab='1' setSelectedTab={jest.fn()} direction='horizontal' />
		);

		expect(container.firstChild).toBeTruthy();
	});
});

// SNAPSHOT TESTS
describe('Tabs — Snapshots', () => {
	test('default horizontal snapshot', () => {
		const { container } = render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(container).toMatchSnapshot();
	});

	test('vertical snapshot', () => {
		const { container } = render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='vertical'
			/>
		);

		expect(container).toMatchSnapshot();
	});

	test('dropdown snapshot', () => {
		const { container } = render(
			<Tabs
				tabs={[
					{ id: '1', title: 'Tab1' },
					{
						id: '4',
						title: 'Options',
						dropdown: true,
						dropdownItems: [{ id: '5', title: 'Opt1' }],
					},
				]}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
