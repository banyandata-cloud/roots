import { render, screen } from '@testing-library/react';
import Header from './Header';

// MOCKS
jest.mock('date-fns', () => ({
	subHours: jest.fn((date) => date),
	subMinutes: jest.fn((date) => date),
}));

jest.mock('../../../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
	getDayInfo: () => ({
		year: 2024,
		month: 'January',
		monthAsNumber: 0,
		dateAsNumber: 1,
		hours: 10,
		hoursIn12: 10,
		minutes: 30,
		meridian: 'AM',
	}),
}));

jest.mock('../../../buttons', () => ({
	Button: ({ onClick, 'data-elem': dataElem }: any) => (
		<button data-testid={dataElem} onClick={onClick}>
			btn
		</button>
	),
}));

jest.mock('../../../icons', () => ({
	ChevronIcon: () => <span data-testid='chevron-icon' />,
}));

jest.mock('../../dateSwitcher', () => ({
	DateSwitcher: () => <div data-testid='date-switcher' />,
}));

jest.mock('../../timeSwitcher', () => ({
	TimeSwitcher: () => <div data-testid='time-switcher' />,
}));

jest.mock('./dateAndTimeSelection', () => ({
	DateAndTimeSelection: () => <div data-testid='date-time-selection' />,
}));

// BASE PROPS
const createProps = (overrides = {}) => ({
	range: false,
	dateSelectionView: false,
	timeSelectionView: false,
	defaultHourDiff: 1,
	selectedDate: { unix: 123 },
	setTimeRangeSelection: jest.fn(),
	...overrides,
});

// HAPPY PATH
describe('Header — Rendering & Basic Behaviour', () => {
	test('renders DateAndTimeSelection by default', () => {
		render(<Header {...createProps()} />);

		expect(screen.getByTestId('date-time-selection')).toBeInTheDocument();
	});

	test('renders carousel switcher when no selection view is active', () => {
		render(<Header {...createProps()} />);

		expect(screen.getByTestId('left')).toBeInTheDocument();
		expect(screen.getByTestId('right')).toBeInTheDocument();
	});

	test('renders carousel buttons when no selection view is active', () => {
		render(<Header {...createProps()} />);

		expect(screen.getByTestId('left')).toBeInTheDocument();
		expect(screen.getByTestId('right')).toBeInTheDocument();
	});
});

// MEDIUM PATH
describe('Header — Conditional Rendering Behaviour', () => {
	test('renders DateSwitcher when dateSelectionView=true', () => {
		render(<Header {...createProps()} dateSelectionView />);

		expect(screen.getByTestId('date-switcher')).toBeInTheDocument();
		expect(screen.queryByTestId('left')).toBeNull();
	});

	test('renders TimeSwitcher when timeSelectionView=true', () => {
		render(<Header {...createProps()} timeSelectionView />);

		expect(screen.getByTestId('time-switcher')).toBeInTheDocument();
		expect(screen.queryByTestId('right')).toBeNull();
	});
});

// RISKY PATH
describe('Header — Edge Case Handling', () => {
	test('should NOT crash with minimal props', () => {
		render(<Header selectedDate={{ unix: undefined }} setTimeRangeSelection={jest.fn()} />);

		expect(screen.getByTestId('date-time-selection')).toBeInTheDocument();
	});
});
