import { render, screen, fireEvent } from '@testing-library/react';
import HierarchyBrowser from './HierarchyBrowser';

// MOCKS
jest.mock('../../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
}));

jest.mock('../item/HierarchyItem', () => ({
	__esModule: true,
	default: ({ children, onClick }: any) => (
		<div>
			<div data-testid='hierarchy-item' onClick={() => onClick?.(true)}>
				Title
			</div>
			{children}
		</div>
	),
}));

// TEST DATA
const metadata = [
	{
		title: 'Root',
		name: 'root',
		pathString: 'root',
		list: [
			{
				title: 'Child 1',
				name: 'child1',
				pathString: 'root.child1',
				list: false,
			},
			{
				title: 'Child 2',
				name: 'child2',
				pathString: 'root.child2',
				list: false,
			},
		],
	},
];

// HAPPY PATH
describe('HierarchyBrowser — Rendering & Basic Behaviour', () => {
	test('renders root items from metadata', () => {
		render(<HierarchyBrowser metadata={metadata} />);

		expect(screen.getAllByTestId('hierarchy-item').length).toBe(1);
	});

	test('renders children when defaultOpenLevel > 0', () => {
		render(<HierarchyBrowser metadata={metadata} defaultOpenLevel={1} />);

		// root + 2 children
		expect(screen.getAllByTestId('hierarchy-item').length).toBe(3);
	});

	test('calls onItemClick when an item is clicked', () => {
		const onItemClick = jest.fn();

		render(<HierarchyBrowser metadata={metadata} onItemClick={onItemClick} />);

		fireEvent.click(screen.getByTestId('hierarchy-item'));

		expect(onItemClick).toHaveBeenCalled();
	});
});

// MEDIUM PATH
describe('HierarchyBrowser — Behaviour Handling', () => {
	test('toggles children visibility when item is clicked', () => {
		render(<HierarchyBrowser metadata={metadata} />);

		// initially only root
		expect(screen.getAllByTestId('hierarchy-item').length).toBe(1);

		fireEvent.click(screen.getByTestId('hierarchy-item'));

		// children now visible
		expect(screen.getAllByTestId('hierarchy-item').length).toBe(3);
	});

	test('calls setItemProps when provided', () => {
		const setItemProps = jest.fn(() => ({}));

		render(<HierarchyBrowser metadata={metadata} setItemProps={setItemProps} />);

		expect(setItemProps).toHaveBeenCalled();
	});
});

// RISKY PATH
describe('HierarchyBrowser — Edge Case Handling', () => {
	test('does NOT crash with empty metadata', () => {
		render(<HierarchyBrowser metadata={[]} />);

		expect(screen.queryByTestId('hierarchy-item')).toBeNull();
	});

	test('does NOT crash when list is false', () => {
		render(
			<HierarchyBrowser
				metadata={[
					{
						title: 'Single',
						name: 'single',
						pathString: 'single',
						list: false,
					},
				]}
			/>
		);

		expect(screen.getAllByTestId('hierarchy-item').length).toBe(1);
	});
});

// SNAPSHOT
describe('HierarchyBrowser — Snapshot Rendering', () => {
	test('matches snapshot for initial render', () => {
		const { container } = render(<HierarchyBrowser metadata={metadata} />);

		expect(container).toMatchSnapshot();
	});
});
