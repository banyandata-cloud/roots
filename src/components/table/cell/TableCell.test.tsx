import { render, screen, fireEvent } from '@testing-library/react';
import TableCell from './TableCell';

// MOCKS

jest.mock('../../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
}));

jest.mock('../../cell', () => ({
	BaseCell: ({ component1, component2, component3 }: any) => (
		<td data-testid='base-cell'>
			{component1}
			{component2}
			{component3}
		</td>
	),
}));

jest.mock('../../buttons', () => ({
	Button: ({ onClick, title }: any) => (
		<button data-testid='sort-btn' onClick={onClick}>
			{title}
		</button>
	),
}));

jest.mock('../../icons', () => ({
	SortIcon: ({ position }: any) => <span data-testid='sort-icon'>{position}</span>,
}));

// TEST HELPERS

const baseProps = {
	id: 'name',
	cellContent: 'Cell Value',
};

// HAPPY PATH

describe('TableCell — Rendering & Basic Behaviour', () => {
	test('renders cell content', () => {
		render(<TableCell {...baseProps} />);

		expect(screen.getByText('Cell Value')).toBeInTheDocument();
	});

	test('renders header sort icon when sortable', () => {
		render(<TableCell {...baseProps} type='header' sort />);

		expect(screen.getByTestId('sort-icon')).toBeInTheDocument();
	});
});

// MEDIUM PATH

describe('TableCell — Sorting & Prop Behaviour', () => {
	test('calls onSort with next sort state on click', () => {
		const onSort = jest.fn();

		render(<TableCell {...baseProps} type='header' sort onSort={onSort} />);

		fireEvent.click(screen.getByTestId('sort-btn'));

		expect(onSort).toHaveBeenCalledWith('name', 'desc');
	});

	test('updates sort state when sortValue changes', () => {
		render(<TableCell {...baseProps} type='header' sort sortValue={{ name: 'asc' }} />);

		expect(screen.getByText('az')).toBeInTheDocument();
	});

	test('renders HTML content when html=true', () => {
		render(<TableCell {...baseProps} html cellContent='<strong>HTML</strong>' />);

		expect(screen.getByText('HTML')).toBeInTheDocument();
	});

	test('applies multiline class when multiLine=true', () => {
		render(<TableCell {...baseProps} multiLine />);

		expect(screen.getByText('Cell Value')).toBeInTheDocument();
	});
});

// RISKY PATH

describe('TableCell — Edge Case Handling', () => {
	test('does NOT crash with non-string content', () => {
		render(<TableCell {...baseProps} cellContent={{ a: 1 }} />);

		expect(screen.getByText(JSON.stringify({ a: 1 }))).toBeInTheDocument();
	});

	test('does NOT crash without optional props', () => {
		render(<TableCell id='id' />);

		expect(screen.getByTestId('base-cell')).toBeInTheDocument();
	});
});

// SNAPSHOT

describe('TableCell — Snapshot Rendering', () => {
	test('matches snapshot for default cell', () => {
		const { container } = render(<TableCell {...baseProps} />);

		expect(container).toMatchSnapshot();
	});
});
