import { render, screen, fireEvent } from '@testing-library/react';
import TableRow from './TableRow';

// MOCKS

jest.mock('../../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
}));

jest.mock('../../input', () => ({
	Checkbox: ({ onChange, checked }: any) => (
		<input type='checkbox' data-testid='checkbox' checked={checked} onChange={onChange} />
	),
	Radio: ({ onChange, checked }: any) => (
		<input type='radio' data-testid='radio' checked={checked} onChange={onChange} />
	),
}));

jest.mock('../cell', () => ({
	TableCellV2: ({ cellContent }: any) => <td data-testid='table-cell'>{cellContent}</td>,
}));

// TEST DATA

const headerData = [
	{ id: 'name', title: 'Name' },
	{ id: 'age', title: 'Age' },
];

const datum = {
	id: 1,
	name: 'Aryan',
	age: 27,
};

const baseProps = {
	datum,
	headerData,
	checkedRows: [],
	setCheckedRows: jest.fn(),
};

// HELPER

const renderRow = (ui: React.ReactNode) =>
	render(
		<table>
			<tbody>{ui}</tbody>
		</table>
	);

// HAPPY PATH

describe('TableRow — Rendering & Basic Behaviour', () => {
	test('renders correct number of cells', () => {
		renderRow(<TableRow {...baseProps} />);

		expect(screen.getAllByTestId('table-cell')).toHaveLength(2);
	});

	test('calls onRowClick when row is clicked', () => {
		const onRowClick = jest.fn();

		renderRow(<TableRow {...baseProps} onRowClick={onRowClick} />);

		fireEvent.click(screen.getByRole('row'));

		expect(onRowClick).toHaveBeenCalledWith(datum);
	});
});

// MEDIUM PATH

describe('TableRow — Interaction Behaviour', () => {
	test('renders checkbox when onCheck is provided', () => {
		renderRow(<TableRow {...baseProps} onCheck={jest.fn()} uniqueKey='id' />);

		expect(screen.getByTestId('checkbox')).toBeInTheDocument();
	});

	test('adds row to checkedRows on checkbox click', () => {
		const setCheckedRows = jest.fn();
		const onCheck = jest.fn();

		renderRow(
			<TableRow
				{...baseProps}
				setCheckedRows={setCheckedRows}
				onCheck={onCheck}
				uniqueKey='id'
			/>
		);

		fireEvent.click(screen.getByTestId('checkbox'));

		expect(setCheckedRows).toHaveBeenCalledWith([datum]);
		expect(onCheck).toHaveBeenCalledWith([datum]);
	});

	test('invokes expandable renderer when row is clicked', () => {
		const expandable = jest.fn(() => null);

		renderRow(<TableRow {...baseProps} expandable={expandable} />);

		fireEvent.click(screen.getByRole('row'));

		expect(expandable).toHaveBeenCalledWith(expect.objectContaining({ datum }));
	});
});

// RISKY PATH

describe('TableRow — Edge Case Handling', () => {
	test('does NOT crash with minimal required props', () => {
		renderRow(
			<TableRow datum={{}} headerData={[]} checkedRows={[]} setCheckedRows={jest.fn()} />
		);

		expect(screen.getByRole('row')).toBeInTheDocument();
	});

	test('does NOT crash when expandable returns false', () => {
		renderRow(<TableRow {...baseProps} expandable={() => false as any} />);

		expect(screen.getByRole('row')).toBeInTheDocument();
	});
});

// SNAPSHOT

describe('TableRow — Snapshot Rendering', () => {
	test('matches snapshot for default row', () => {
		const { container } = renderRow(<TableRow {...baseProps} />);

		expect(container).toMatchSnapshot();
	});
});
