import { fireEvent, render, screen } from '@testing-library/react';
import Tabs from './Tabs';

// -----------------------------
// MOCKS
// -----------------------------

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

// -----------------------------
// TEST UTILITIES
// -----------------------------

const basicTabs = [
	{ id: '1', title: 'Tab1' },
	{ id: '2', title: 'Tab2' },
];

// Fake layout for slider
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

// -----------------------------
// RENDERING TESTS
// -----------------------------

describe('Tabs — Rendering', () => {
	test('renders all tab buttons', () => {
		render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(screen.getByRole('button', { name: 'Tab1' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Tab2' })).toBeInTheDocument();
	});

	test('renders children content', () => {
		render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'>
				<div>Child Content</div>
			</Tabs>
		);

		expect(screen.getByText('Child Content')).toBeInTheDocument();
	});

	test('applies active class correctly', () => {
		const { container } = render(
			<Tabs
				tabs={basicTabs}
				selectedTab='2'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(container.querySelector('.active')).toBeTruthy();
	});
});

// -----------------------------
// INTERACTION TESTS
// -----------------------------

describe('Tabs — Interaction', () => {
	test('clicking a tab calls setSelectedTab', () => {
		const mockSet = jest.fn();

		render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={mockSet}
				direction='horizontal'
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Tab2' }));

		expect(mockSet).toHaveBeenCalledWith('2');
	});

	test('disabled tab does not trigger setSelectedTab', () => {
		const mockSet = jest.fn();

		render(
			<Tabs
				tabs={[
					{ id: '1', title: 'Tab1', disabled: true },
					{ id: '2', title: 'Tab2' },
				]}
				selectedTab='1'
				setSelectedTab={mockSet}
				direction='horizontal'
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Tab1' }));

		expect(mockSet).not.toHaveBeenCalled();
	});
});

// -----------------------------
// LAYOUT TESTS
// -----------------------------

describe('Tabs — Layout & Slider', () => {
	test('renders vertical layout', () => {
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

	test('slider positions correctly', () => {
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

// -----------------------------
// DROPDOWN TESTS
// -----------------------------

describe('Tabs — Dropdown', () => {
	test('renders dropdown tab', () => {
		render(
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

		expect(screen.getByTestId('dropdown')).toBeInTheDocument();
		expect(screen.getByTestId('dropdown-item-5')).toBeInTheDocument();
	});

	test('dropdown item selection triggers setSelectedTab', () => {
		const mockSet = jest.fn();

		render(
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
				setSelectedTab={mockSet}
				direction='horizontal'
			/>
		);

		fireEvent.click(screen.getByTestId('dropdown-item-5'));

		expect(mockSet).toHaveBeenCalledWith('5');
	});
});

// -----------------------------
// SNAPSHOTS (Minimal + Stable)
// -----------------------------

describe('Tabs — Snapshots', () => {
	test('horizontal snapshot', () => {
		const { container } = render(
			<Tabs
				tabs={basicTabs}
				selectedTab='1'
				setSelectedTab={jest.fn()}
				direction='horizontal'
			/>
		);

		expect(container.querySelector('.tabs')).toMatchSnapshot();
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

		expect(container.querySelector('.vertical')).toMatchSnapshot();
	});
});
