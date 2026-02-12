import { fireEvent, render, screen } from '@testing-library/react';
import Tabs from './Tabs';

jest.mock('../../input/dropdown/Dropdown', () => {
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

jest.mock('../../input/dropdown/dropdown-item/DropdownItem', () => {
	return function MockDropdownItem(props: any) {
		return <div>{props.title}</div>;
	};
});

const basicTabs = [
	{ id: '1', title: 'Tab1' },
	{ id: '2', title: 'Tab2' },
];

Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
	configurable: true,
	get() {
		return 20;
	},
});

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
	configurable: true,
	get() {
		return 80;
	},
});

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

		expect(screen.getByTestId('Tab1-test')).toBeInTheDocument();
		expect(screen.getByTestId('Tab2-test')).toBeInTheDocument();
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

		fireEvent.click(screen.getByTestId('Tab2-test'));
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

		expect(container.firstElementChild?.className).toContain('tabs-container-vertical');
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

describe('Tabs — Edge Cases & Dropdown', () => {
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

		fireEvent.click(screen.getByTestId('Tab1-test'));
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
