import { render, screen, fireEvent } from '@testing-library/react';
import HierarchyItem from './HierarchyItem';

// MOCKS
jest.mock('../../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
}));

jest.mock('../../buttons', () => ({
	Button: ({ onClick, leftComponent, title }: any) => (
		<button data-testid='btn' onClick={onClick}>
			{leftComponent ? leftComponent() : title}
		</button>
	),
}));

jest.mock('../../cell', () => ({
	BaseCell: ({ component1, component2, component3 }: any) => (
		<div>
			{component1}
			{component2}
			{component3}
		</div>
	),
}));

jest.mock('../../icons', () => ({
	ExpandCollapseIcon: () => <span data-testid='expand-icon' />,
	SearchIcon: () => <span data-testid='search-icon' />,
	EditIcon: () => <span data-testid='edit-icon' />,
}));

jest.mock('../../input/textField', () => {
	const React = require('react');
	return {
		TextFieldv2: React.forwardRef(({ onChange, onKeyDown }: any, ref: any) => (
			<input ref={ref} data-testid='search-input' onChange={onChange} onKeyDown={onKeyDown} />
		)),
	};
});

// HELPERS
const createProps = (overrides = {}) => ({
	title: <span>Node Title</span>,
	children: <div data-testid='children'>Child Node</div>,
	leftComponent: <span>L</span>,
	name: 'Node',
	pathString: 'root.node',
	isSearching: false,
	...overrides,
});

// HAPPY PATH
describe('HierarchyItem — Rendering & Basic Behaviour', () => {
	test('renders title', () => {
		render(<HierarchyItem {...createProps()} />);

		expect(screen.getByText('Node Title')).toBeInTheDocument();
	});

	test('opens and renders children when expand button is clicked', () => {
		render(<HierarchyItem {...createProps()} list />);

		fireEvent.click(screen.getAllByTestId('btn')[0]);

		expect(screen.getByTestId('children')).toBeInTheDocument();
	});

	test('calls onClick with new open state', () => {
		const onClick = jest.fn();
		render(<HierarchyItem {...createProps({ onClick })} list />);

		fireEvent.click(screen.getAllByTestId('btn')[0]);

		expect(onClick).toHaveBeenCalledWith(true);
	});
});

// MEDIUM PATH
describe('HierarchyItem — Search & Controlled Behaviour', () => {
	test('renders search input when searching and open', () => {
		render(<HierarchyItem {...createProps()} list defaultOpen isSearching />);

		expect(screen.getByTestId('search-input')).toBeInTheDocument();
	});

	test('calls onSearchSubmit on Enter', () => {
		const onSearchSubmit = jest.fn();

		render(<HierarchyItem {...createProps({ onSearchSubmit })} list defaultOpen isSearching />);

		fireEvent.keyDown(screen.getByTestId('search-input'), {
			key: 'Enter',
		});

		expect(onSearchSubmit).toHaveBeenCalled();
	});

	test('respects controlledOpen prop', () => {
		render(<HierarchyItem {...createProps()} list controlledOpen />);

		expect(screen.getByTestId('children')).toBeInTheDocument();
	});
});

// RISKY PATH
describe('HierarchyItem — Edge Case Handling', () => {
	test('should NOT crash with minimal required props', () => {
		render(
			<HierarchyItem
				title={<span>Minimal</span>}
				children={null}
				leftComponent={null}
				name='node'
				pathString='node'
				isSearching={false}
			/>
		);

		expect(screen.getByText('Minimal')).toBeInTheDocument();
	});
});
