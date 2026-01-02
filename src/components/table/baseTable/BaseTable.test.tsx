import { render, screen } from '@testing-library/react';
import BaseTable from './BaseTable';

//  MOCKS
jest.mock('../../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
}));

jest.mock('../header', () => ({
	TableHeader: () => <thead data-testid='table-header' />,
}));

jest.mock('../body', () => ({
	TableBody: () => <tbody data-testid='table-body' />,
}));

jest.mock('../placeholders/noData/general', () => ({
	NoDataPlaceHolder: () => <div data-testid='no-data-placeholder'>No Data</div>,
}));

jest.mock('./Skeleton', () => ({
	Skeleton: () => <div data-testid='table-skeleton'>Loading...</div>,
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
	toggleDrawer: jest.fn(),
};

// HAPPY PATH
describe('BaseTable — Rendering & Basic Behaviour', () => {
	test('renders table with header and body when data is present', () => {
		render(<BaseTable {...baseProps} />);

		expect(screen.getByTestId('table-header')).toBeInTheDocument();
		expect(screen.getByTestId('table-body')).toBeInTheDocument();
		expect(screen.queryByTestId('no-data-placeholder')).toBeNull();
	});
});

// MEDIUM PATH
describe('BaseTable — Conditional Rendering Behaviour', () => {
	test('renders no data placeholder when tableData is empty', () => {
		render(<BaseTable {...baseProps} tableData={[]} />);

		expect(screen.getByTestId('no-data-placeholder')).toBeInTheDocument();
		expect(screen.queryByTestId('table-header')).toBeNull();
		expect(screen.queryByTestId('table-body')).toBeNull();
	});

	test('renders skeleton when loading=true', () => {
		render(<BaseTable {...baseProps} loading />);

		expect(screen.getByTestId('table-skeleton')).toBeInTheDocument();
		expect(screen.queryByTestId('table-header')).toBeNull();
		expect(screen.queryByTestId('table-body')).toBeNull();
	});
});

// RISKY PATH
describe('BaseTable — Edge Case Handling', () => {
	test('does NOT crash when tableData is not an array', () => {
		render(
			<BaseTable
				{...baseProps}
				// @ts-expect-error – intentional bad input
				tableData={null}
			/>
		);

		expect(screen.getByTestId('no-data-placeholder')).toBeInTheDocument();
	});

	test('does NOT crash with minimal required props', () => {
		render(<BaseTable headerData={[]} tableData={[]} toggleDrawer={jest.fn()} />);

		expect(screen.getByTestId('no-data-placeholder')).toBeInTheDocument();
	});
});

// SNAPSHOT
describe('BaseTable — Snapshot Rendering', () => {
	test('matches snapshot for default table', () => {
		const { container } = render(<BaseTable {...baseProps} />);

		expect(container).toMatchSnapshot();
	});
});
