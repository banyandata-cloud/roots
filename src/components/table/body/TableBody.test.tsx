import { render, screen } from '@testing-library/react';
import TableBody from './TableBody';

//  MOCKS
const mockTableRow = jest.fn(() => <tr data-testid='table-row' />);

jest.mock('../row', () => ({
	TableRow: (props: any) => {
		mockTableRow(props);
		return <tr data-testid='table-row' />;
	},
}));

jest.mock('../../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// TEST DATA
const headerData = [
	{ id: 'name', title: 'Name' },
	{ id: 'age', title: 'Age' },
];

const tableData = [
	{ id: 1, name: 'Aryan', age: 27 },
	{ id: 2, name: 'Pradeep', age: 24 },
];

const baseProps = {
	headerData,
	tableData,
	checkedRows: [],
	setCheckedRows: jest.fn(),
};

// HELPER
const renderBody = (ui: React.ReactNode) => render(<table>{ui}</table>);

// HAPPY PATH
describe('TableBody — Rendering & Basic Behaviour', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders table body element', () => {
		renderBody(<TableBody {...baseProps} />);

		expect(screen.getByRole('rowgroup')).toBeInTheDocument();
	});

	test('renders a TableRow for each data item', () => {
		renderBody(<TableBody {...baseProps} />);

		expect(mockTableRow).toHaveBeenCalledTimes(2);
		expect(screen.getAllByTestId('table-row')).toHaveLength(2);
	});
});

// MEDIUM PATH
describe('TableBody — Data Mapping Behaviour', () => {
	test('passes correct datum and index to TableRow', () => {
		renderBody(<TableBody {...baseProps} />);

		expect(mockTableRow).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({
				datum: tableData[0],
			})
		);

		expect(mockTableRow).toHaveBeenNthCalledWith(
			2,
			expect.objectContaining({
				datum: tableData[1],
			})
		);
	});

	test('forwards selection props correctly', () => {
		renderBody(<TableBody {...baseProps} onCheck={jest.fn()} uniqueKey='id' checkAsRadio />);

		expect(mockTableRow).toHaveBeenCalledWith(
			expect.objectContaining({
				checkedRows: [],
				setCheckedRows: baseProps.setCheckedRows,
				onCheck: expect.any(Function),
				checkAsRadio: true,
				uniqueKey: 'id',
			})
		);
	});
});

//  RISKY PATH
describe('TableBody — Edge Case Handling', () => {
	test('does NOT crash when tableData is empty', () => {
		renderBody(
			<TableBody
				headerData={headerData}
				tableData={[]}
				checkedRows={[]}
				setCheckedRows={jest.fn()}
			/>
		);

		expect(screen.getByRole('rowgroup')).toBeInTheDocument();
		expect(screen.queryAllByTestId('table-row')).toHaveLength(0);
	});
});

// SNAPSHOT
describe('TableBody — Snapshot Rendering', () => {
	test('matches snapshot for default body', () => {
		const { container } = renderBody(<TableBody {...baseProps} />);

		expect(container).toMatchSnapshot();
	});
});
