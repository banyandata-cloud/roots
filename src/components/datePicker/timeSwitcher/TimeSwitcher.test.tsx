import { render, screen, fireEvent } from '@testing-library/react';
import TimeSwitcher from './TimeSwitcher';

// MOCKS
jest.mock('../../../utils', () => ({
	classes: (...args: any[]) => args.filter(Boolean).join(' '),
	doubleDigitted: (val: number) => String(val).padStart(2, '0'),
}));

jest.mock('../../buttons', () => ({
	Button: ({ onClick, title, className }: any) => (
		<button data-testid='btn' className={className} onClick={onClick}>
			{title}
		</button>
	),
}));

jest.mock('../../text', () => ({
	Text: ({ children }: any) => <span>{children}</span>,
}));

jest.mock('../utils', () => ({
	calculateMeridian: jest.fn((next: string) => next),
}));

// HELPERS
const createProps = (overrides = {}) => ({
	activeTimeSelection: {},
	setActiveTimeSelection: jest.fn(),
	setTimeRangeSelection: jest.fn(),
	timeRangeSelection: {
		previous: { HOURS: 10, MINS: 30, MER: 'AM' },
		next: { HOURS: 11, MINS: 45, MER: 'AM' },
	},
	...overrides,
});

// HAPPY PATH
describe('TimeSwitcher — Rendering & Basic Behaviour', () => {
	test('renders hour, minute and meridian buttons', () => {
		render(<TimeSwitcher {...createProps()} />);

		const buttons = screen.getAllByTestId('btn');

		// HR, MIN, AM, PM
		expect(buttons.length).toBeGreaterThanOrEqual(4);
		expect(screen.getByText('AM')).toBeInTheDocument();
		expect(screen.getByText('PM')).toBeInTheDocument();
	});

	test('updates active time selection when HR is clicked', () => {
		const props = createProps();
		render(<TimeSwitcher {...props} />);

		const buttons = screen.getAllByTestId('btn');

		// First button = HOURS
		fireEvent.click(buttons[0]);

		expect(props.setActiveTimeSelection).toHaveBeenCalledWith({
			next: 'HR',
		});
	});

	test('updates active time selection when MIN is clicked', () => {
		const props = createProps();
		render(<TimeSwitcher {...props} />);

		const buttons = screen.getAllByTestId('btn');

		// Second button = MINUTES
		fireEvent.click(buttons[1]);

		expect(props.setActiveTimeSelection).toHaveBeenCalledWith({
			next: 'MIN',
		});
	});
});

// --------------------
// MEDIUM PATH
// --------------------
describe('TimeSwitcher — Range Behaviour', () => {
	test('renders previous and next counters when valueAsRange=true', () => {
		render(<TimeSwitcher {...createProps()} valueAsRange />);

		expect(screen.getByText('to')).toBeInTheDocument();

		// More buttons due to two counters
		expect(screen.getAllByTestId('btn').length).toBeGreaterThan(4);
	});

	test('renders only next counter when valueAsRange=false', () => {
		render(<TimeSwitcher {...createProps()} />);

		expect(screen.queryByText('to')).toBeNull();
	});
});

// --------------------
// RISKY PATH
// --------------------
describe('TimeSwitcher — Edge Case Handling', () => {
	test('should NOT crash with minimal valid props', () => {
		render(
			<TimeSwitcher
				setActiveTimeSelection={jest.fn()}
				setTimeRangeSelection={jest.fn()}
				timeRangeSelection={{
					next: { HOURS: 1, MINS: 0, MER: 'AM' },
				}}
			/>
		);

		expect(screen.getByText('01')).toBeInTheDocument();
	});
});
