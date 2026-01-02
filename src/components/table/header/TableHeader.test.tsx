import { render, screen } from '@testing-library/react';
import TableHeader from './TableHeader';

// MOCKS

const mockTableRow = jest.fn(() => <tr data-testid='table-row' />);

jest.mock('../row', () => ({
	TableRow: (props: any) => {
		mockTableRow(props);
		return <tr data-testid='table-row' />;
	},
}));

// TEST DATA

const headerData = [
	{ id: 'name', title: 'Name' },
	{ id: 'age', title: 'Age' },
];

const baseProps = {
	headerData,
	checkedRows: [],
	setCheckedRows: jest.fn(),
};

// HAPPY PATH

describe('TableHeader — Rendering & Basic Behaviour', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders table header element', () => {
		render(
			<table>
				<TableHeader {...baseProps} />
			</table>
		);

		expect(screen.getByRole('rowgroup')).toBeInTheDocument();
	});

	test('renders a single TableRow', () => {
		render(
			<table>
				<TableHeader {...baseProps} />
			</table>
		);

		expect(mockTableRow).toHaveBeenCalledTimes(1);
	});
});

// MEDIUM PATH

describe('TableHeader — Prop Forwarding Behaviour', () => {
	test('passes header-specific props to TableRow', () => {
		const onSort = jest.fn();
		const expandable = jest.fn();

		render(
			<table>
				<TableHeader
					{...baseProps}
					onSort={onSort}
					sortValue={{}}
					expandable={expandable}
					rowHeight='lg'
				/>
			</table>
		);

		expect(mockTableRow).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'header',
				headerData,
				onSort,
				sortValue: {},
				expandable,
				rowHeight: 'lg',
			})
		);
	});

	test('forwards selection props correctly', () => {
		const checkedRows = [{ id: 1 }];

		render(
			<table>
				<TableHeader
					{...baseProps}
					checkedRows={checkedRows}
					setCheckedRows={baseProps.setCheckedRows}
					onCheck={jest.fn()}
				/>
			</table>
		);

		expect(mockTableRow).toHaveBeenCalledWith(
			expect.objectContaining({
				checkedRows,
				setCheckedRows: baseProps.setCheckedRows,
				onCheck: expect.any(Function),
			})
		);
	});
});

// RISKY PATH

describe('TableHeader — Edge Case Handling', () => {
	test('does NOT crash with minimal required props', () => {
		render(
			<table>
				<TableHeader headerData={[]} checkedRows={[]} setCheckedRows={jest.fn()} />
			</table>
		);

		expect(screen.getByTestId('table-row')).toBeInTheDocument();
	});
});

// SNAPSHOT

describe('TableHeader — Snapshot Rendering', () => {
	test('matches snapshot for default header', () => {
		const { container } = render(
			<table>
				<TableHeader {...baseProps} />
			</table>
		);

		expect(container).toMatchSnapshot();
	});
});
