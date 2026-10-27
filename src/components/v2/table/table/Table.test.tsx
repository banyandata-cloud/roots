import { fireEvent, render, screen } from '@testing-library/react';
import { BaseTableV2 } from '../baseTable';
import Table from './Table';

class IntersectionObserverMock {
	observe = jest.fn();
	disconnect = jest.fn();
	unobserve = jest.fn();
}

beforeAll(() => {
	Object.defineProperty(window, 'IntersectionObserver', {
		writable: true,
		configurable: true,
		value: IntersectionObserverMock,
	});
});

const headerData = [
	{
		id: 'name',
		title: 'Name',
		sort: true,
		columnFilter: true,
		filterOptions: ['Option 1', 'Option 2'],
	},
	{ id: 'age', title: 'Age' },
];
const tableData = [
	{ id: '1', name: 'Row 1', age: 21 },
	{ id: '2', name: 'Row 2', age: 22 },
];

describe('Table — rendering', () => {
	test('renders the header and body cells', () => {
		render(<Table headerData={headerData} tableData={tableData} uniqueKey='id' />);

		expect(screen.getByText('Name')).toBeInTheDocument();
		expect(screen.getByText('Row 1')).toBeInTheDocument();
		expect(screen.getByText('Row 2')).toBeInTheDocument();
	});

	test('renders the tableHeader slot above the table', () => {
		render(
			<Table
				headerData={headerData}
				tableData={tableData}
				uniqueKey='id'
				tableHeader={() => <span>Cloud</span>}
			/>
		);

		expect(screen.getByText('Cloud')).toBeInTheDocument();
	});

	test('shows the empty state with a retry action and marks the root as empty', () => {
		const onRetry = jest.fn();
		const { container } = render(
			<Table
				headerData={headerData}
				tableData={[]}
				uniqueKey='id'
				emptyTitle='No Data'
				emptyDescription='Nothing here'
				onRetry={onRetry}
				retryLabel='Retry'
			/>
		);

		expect(screen.getByText('No Data')).toBeInTheDocument();
		expect((container.firstChild as HTMLElement).className).toContain('empty');

		fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
		expect(onRetry).toHaveBeenCalledTimes(1);
	});
});

describe('Table — header actions', () => {
	test('cycles the sort direction through onSort', () => {
		const onSort = jest.fn();
		render(
			<Table headerData={headerData} tableData={tableData} uniqueKey='id' onSort={onSort} />
		);

		const sort = screen.getByRole('button', { name: 'Sort Name' });
		fireEvent.click(sort);
		fireEvent.click(sort);
		fireEvent.click(sort);

		expect(onSort.mock.calls.map(([, direction]) => direction)).toEqual([
			'asc',
			'desc',
			'default',
		]);
	});

	test('opens the filter dropdown and reports the selected options', () => {
		const onFilter = jest.fn();
		render(
			<Table
				headerData={[{ ...headerData[0]!, onFilter }, headerData[1]!]}
				tableData={tableData}
				uniqueKey='id'
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Filter Name' }));
		fireEvent.click(screen.getByLabelText('Option 2'));

		expect(onFilter).toHaveBeenCalledWith('name', ['Option 2']);
		expect(screen.getByRole('button', { name: 'Clear filter Name' })).toBeInTheDocument();
	});
});

describe('Table — selection', () => {
	test('selects a row through the checkbox column', () => {
		const onCheck = jest.fn();
		render(
			<Table headerData={headerData} tableData={tableData} uniqueKey='id' onCheck={onCheck} />
		);

		const checkboxes = screen.getAllByRole('checkbox');
		fireEvent.click(checkboxes[1]!);

		expect(onCheck).toHaveBeenCalledWith([tableData[0]]);
	});

	test('marks selected and disabled rows with data attributes', () => {
		const { container } = render(
			<Table
				headerData={headerData}
				tableData={tableData}
				uniqueKey='id'
				onCheck={() => undefined}
				defaultCheckedRows={[tableData[0]!]}
				disableCheck={(datum) => datum.id === '2'}
			/>
		);

		const rows = container.querySelectorAll('tbody tr[data-elem="table-row"]');
		expect(rows[0]).toHaveAttribute('data-selected', 'true');
		expect(rows[1]).toHaveAttribute('data-disabled', 'true');
	});
});

describe('BaseTable — expandable rows', () => {
	const renderExpandable = () =>
		render(
			<BaseTableV2
				headerData={[{ id: 'name', title: 'Name' }]}
				tableData={tableData}
				uniqueKey='id'
				expandable={({ datum }) =>
					datum.id === '2' ? (null as never) : <td>Details for {String(datum.id)}</td>
				}
			/>
		);

	test('toggles the expanded content with the arrow button', () => {
		renderExpandable();

		const [first] = screen.getAllByRole('button', { name: 'Expand row' });
		expect(first).toHaveAttribute('aria-expanded', 'false');

		fireEvent.click(first!);
		expect(screen.getByText('Details for 1')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Collapse row' })).toHaveAttribute(
			'aria-expanded',
			'true'
		);
	});

	test('disables the arrow for rows without expandable content', () => {
		renderExpandable();

		const buttons = screen.getAllByRole('button', { name: 'Expand row' });
		expect(buttons[1]).toBeDisabled();
	});
});
