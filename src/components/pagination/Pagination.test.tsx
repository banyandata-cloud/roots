import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

// MOCKS

jest.mock('../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
}));

jest.mock('../icons', () => ({
	ArrowIcon: () => <span data-testid='arrow-icon' />,
}));

jest.mock('../text', () => ({
	Text: ({ children }: any) => <span>{children}</span>,
}));

jest.mock('../tooltip', () => ({
	Tooltip: ({ children }: any) => <>{children}</>,
}));

jest.mock('../cell', () => ({
	BaseCell: ({ component1, component2, children }: any) => (
		<div data-testid='base-cell'>
			{component1}
			{component2}
			{children}
		</div>
	),
}));

jest.mock('../buttons', () => ({
	Button: ({ onClick, title, children }: any) => (
		<button type='button' onClick={onClick}>
			{title ?? children}
		</button>
	),
}));

jest.mock('../input', () => {
	const React = jest.requireActual('react');

	return {
		Dropdownv2: ({ onChange }: any) => (
			<div data-testid='dropdown' onClick={() => onChange?.({}, '25')} />
		),
		DropdownItemv2: ({ title }: any) => <div>{title}</div>,
		TextFieldv2: React.forwardRef((props: any, ref) => {
			const { inputProps, ...rest } = props;
			return <input ref={ref} data-testid='jump-input' {...rest} />;
		}),
	};
});

// TEST DATA

const paginationState = {
	totalPages: 5,
	currentPage: 1,
	step: 10,
	totalData: 100,
};

//  HAPPY PATH

describe('Pagination — Rendering & Basic Behaviour', () => {
	test('renders pagination root', () => {
		render(<Pagination paginationState={paginationState} />);

		expect(screen.getByText('1')).toBeInTheDocument();
	});

	test('renders page numbers', () => {
		render(<Pagination paginationState={paginationState} />);

		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
	});
});

// MEDIUM PATH

describe('Pagination — Interaction Behaviour', () => {
	test('dispatches SET_PAGE when page number is clicked', () => {
		const dispatch = jest.fn();

		render(<Pagination paginationState={paginationState} paginationDispatch={dispatch} />);

		fireEvent.click(screen.getByText('2'));

		expect(dispatch).toHaveBeenCalledWith({
			type: 'SET_PAGE',
			payload: 2,
		});
	});

	test('dispatches SET_STEP when dropdown changes', () => {
		const dispatch = jest.fn();

		render(<Pagination paginationState={paginationState} paginationDispatch={dispatch} />);

		fireEvent.click(screen.getByTestId('dropdown'));

		expect(dispatch).toHaveBeenCalledWith({
			type: 'SET_STEP',
			payload: 25,
		});
	});

	test('dispatches SET_PAGE on jump-to-page submit', () => {
		const dispatch = jest.fn();

		render(<Pagination paginationState={paginationState} paginationDispatch={dispatch} />);

		const input = screen.getByTestId('jump-input');

		fireEvent.change(input, {
			target: { value: '3' },
		});

		fireEvent.submit(input.closest('form')!);

		expect(dispatch).toHaveBeenCalledWith({
			type: 'SET_PAGE',
			payload: 3,
		});
	});
});

// RISKY PATH

describe('Pagination — Edge Case Handling', () => {
	test('does NOT crash with minimal props', () => {
		render(<Pagination />);

		expect(screen.queryByText('1')).toBeNull();
	});

	test('does NOT crash when paginationDispatch is missing', () => {
		render(<Pagination paginationState={paginationState} />);

		fireEvent.click(screen.getByText('2'));
	});
});

// SNAPSHOT

describe('Pagination — Snapshot Rendering', () => {
	test('matches snapshot for initial render', () => {
		const { container } = render(<Pagination paginationState={paginationState} />);

		expect(container).toMatchSnapshot();
	});
});
