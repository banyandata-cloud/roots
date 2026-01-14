import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

// MOCKS

jest.mock('../../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
}));

jest.mock('../baseTable', () => {
	const React = require('react');

	return {
		BaseTableV2: React.forwardRef((props: any, ref: any) => {
			return (
				<table ref={ref} data-testid='base-table'>
					<tbody data-testid='table-body'>
						<tr data-testid='table-row' />
					</tbody>
				</table>
			);
		}),
	};
});

jest.mock('../../pagination', () => {
	const React = require('react');

	return {
		Pagination: React.forwardRef((_props: any, ref: any) => (
			<div ref={ref} data-testid='pagination' />
		)),
	};
});

jest.mock('../../sidePanel/BaseSidePanel', () => ({
	__esModule: true,
	default: ({ open, children }: any) =>
		open ? <div data-testid='side-panel'>{children}</div> : null,
}));

jest.mock('./tableFilters', () => ({
	TableFilters: ({ onSearch, toggleDrawer }: any) => (
		<div data-testid='table-filters'>
			<button
				data-testid='search-btn'
				onClick={() => {
					onSearch?.('test');
				}}
			/>
			<button
				data-testid='drawer-btn'
				onClick={() => {
					toggleDrawer();
				}}
			/>
		</div>
	),
}));

// IntersectionObserver mock
beforeAll(() => {
	class MockIntersectionObserver {
		observe = jest.fn();
		unobserve = jest.fn();
		disconnect = jest.fn();
	}
	(global as any).IntersectionObserver = MockIntersectionObserver;
});

//  TEST DATA

const headerData = [
	{ id: 'name', title: 'Name', size: 'md' },
	{ id: 'age', title: 'Age', size: 'md' },
];

const tableData = [{ id: 1, name: 'John', age: 30 }];

const baseProps = {
	headerData,
	tableData,
	uniqueKey: 'id',
};

// HAPPY PATH

describe('Table — Rendering & Basic Behaviour', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders base table and filters', () => {
		render(<Table {...baseProps} />);

		expect(screen.getByTestId('table-filters')).toBeInTheDocument();
		expect(screen.getByTestId('base-table')).toBeInTheDocument();
	});

	test('renders pagination when paginationData is provided', () => {
		render(<Table {...baseProps} paginationData={{ page: 1, total: 10 }} />);

		expect(screen.getByTestId('pagination')).toBeInTheDocument();
	});
});

//  MEDIUM PATH

describe('Table — Behaviour With Props', () => {
	test('calls onSearch when search is triggered', () => {
		const onSearch = jest.fn();

		render(<Table {...baseProps} searchProps={{ onSearch }} />);

		fireEvent.click(screen.getByTestId('search-btn'));
		expect(onSearch).toHaveBeenCalledWith('test');
	});

	test('renders side panel when drawerProps are provided and opened', () => {
		const drawerProps = {
			renderBody: [() => <div data-testid='drawer-body'>Body</div>],
		};

		render(<Table {...baseProps} tableDrawerProps={drawerProps} />);

		fireEvent.click(screen.getByTestId('drawer-btn'));
		expect(screen.getByTestId('side-panel')).toBeInTheDocument();
	});
});

// RISKY PATH

describe('Table — Edge Case Handling', () => {
	test('does not crash with empty data', () => {
		render(<Table headerData={[]} tableData={[]} uniqueKey='id' />);

		expect(screen.getByTestId('base-table')).toBeInTheDocument();
	});

	test('handles non-array tableData safely', () => {
		render(<Table headerData={headerData} tableData={null as any} uniqueKey='id' />);

		expect(screen.getByTestId('base-table')).toBeInTheDocument();
	});
});

// SNAPSHOT

describe('Table — Snapshot Rendering', () => {
	test('matches snapshot for default table', () => {
		const { container } = render(<Table {...baseProps} />);
		expect(container).toMatchSnapshot();
	});
});
