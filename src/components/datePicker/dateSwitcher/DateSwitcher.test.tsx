import { render, screen, fireEvent } from '@testing-library/react';
import DateSwitcher from './DateSwitcher';

// MOCKS
jest.mock('../../../constants', () => ({
	FULL_MONTHS: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	],
}));

jest.mock('../../../utils', () => ({
	getDayInfo: (date: Date) => ({
		month: 'MockMonth',
		monthAsNumber: date.getMonth(),
		year: date.getFullYear(),
		dateAsNumber: date.getDate(),
	}),
}));

jest.mock('date-fns', () => ({
	getUnixTime: jest.fn(() => 123456),
}));

jest.mock('../../buttons', () => ({
	Button: ({ onClick }: any) => (
		<button data-testid='arrow-btn' onClick={onClick}>
			btn
		</button>
	),
}));

jest.mock('../../icons', () => ({
	ChevronIcon: () => <span />,
}));

jest.mock('../../text', () => ({
	Text: ({ children }: any) => <span>{children}</span>,
}));

// HELPERS

const createProps = (overrides = {}) => ({
	selectedMonth: {
		month: 'January',
		monthAsNumber: 0,
		year: 2024,
	},
	selectedDate: {
		year: 2024,
		month: 'January',
		date: 15,
		unix: 0,
	},
	setSelectedMonth: jest.fn(),
	setSelectedDate: jest.fn(),
	...overrides,
});

// HAPPY PATH
describe('DateSwitcher — Rendering & Basic Behaviour', () => {
	test('renders current month and year', () => {
		const props = createProps();
		render(<DateSwitcher {...props} />);

		expect(screen.getByText('January')).toBeInTheDocument();
		expect(screen.getByText('2024')).toBeInTheDocument();
	});

	test('increments month when next arrow is clicked from mid-month', () => {
		const props = createProps({
			selectedMonth: {
				month: 'February',
				monthAsNumber: 1,
				year: 2024,
			},
		});

		render(<DateSwitcher {...props} />);

		const buttons = screen.getAllByTestId('arrow-btn');

		// Month "next"
		fireEvent.click(buttons[1]);

		expect(props.setSelectedMonth).toHaveBeenCalled();
		expect(props.setSelectedDate).toHaveBeenCalled();
	});
});

// MEDIUM PATH (BOUNDARIES)
describe('DateSwitcher — Boundary Behaviour', () => {
	test('does NOT go below January', () => {
		const props = createProps();
		render(<DateSwitcher {...props} />);

		const buttons = screen.getAllByTestId('arrow-btn');

		// Month "prev" at January
		fireEvent.click(buttons[0]);

		expect(props.setSelectedMonth).not.toHaveBeenCalled();
		expect(props.setSelectedDate).not.toHaveBeenCalled();
	});

	test('does NOT exceed December', () => {
		const props = createProps({
			selectedMonth: {
				month: 'December',
				monthAsNumber: 11,
				year: 2024,
			},
		});

		render(<DateSwitcher {...props} />);

		const buttons = screen.getAllByTestId('arrow-btn');

		// Month "next" at December
		fireEvent.click(buttons[1]);

		expect(props.setSelectedMonth).not.toHaveBeenCalled();
		expect(props.setSelectedDate).not.toHaveBeenCalled();
	});
});

// RISKY PATH
describe('DateSwitcher — Edge Case Handling', () => {
	test('should NOT crash with minimal valid props', () => {
		render(
			<DateSwitcher
				selectedMonth={{ month: 'Jan', monthAsNumber: 0, year: 2024 }}
				selectedDate={{ year: 2024, month: 'Jan', date: 1, unix: 0 }}
				setSelectedMonth={jest.fn()}
				setSelectedDate={jest.fn()}
			/>
		);

		expect(screen.getByText('to')).toBeInTheDocument();
	});
});
