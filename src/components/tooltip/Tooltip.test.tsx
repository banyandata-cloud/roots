import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from './Tooltip';

jest.mock('../popper', () => ({
	Popper: ({ children }: any) => <div data-testid='popper'>{children}</div>,
}));

//    MOCK floating-ui with internal open state
let mockOpen = false;

jest.mock('@floating-ui/react-dom-interactions', () => {
	return {
		useFloating: () => ({
			x: 50,
			y: 50,
			strategy: 'absolute',
			placement: 'top',
			middlewareData: { arrow: { x: 10, y: 5 } },

			reference: jest.fn(),
			floating: jest.fn(),

			context: {
				get open() {
					return mockOpen;
				},
				onOpenChange: (v: boolean) => {
					mockOpen = v;
				},
			},
		}),

		useHover: () => ({
			props: {
				onMouseEnter: () => (mockOpen = true),
				onMouseLeave: () => (mockOpen = false),
			},
		}),

		useFocus: () => ({ props: {} }),
		useDismiss: () => ({ props: {} }),
		useRole: () => ({ props: {} }),

		useInteractions: () => ({
			getReferenceProps: (props: any) => props,
			getFloatingProps: (props: any) => props,
		}),
	};
});

// HAPPY PATH
describe('Tooltip — Rendering & Basic Behaviour', () => {
	beforeEach(() => {
		mockOpen = false;
	});

	test('renders the child component', () => {
		render(
			<Tooltip content='Hello Tooltip'>
				<div data-testid='child'>Hover</div>
			</Tooltip>
		);

		expect(screen.getByTestId('child')).toBeInTheDocument();
	});

	test('tooltip appears on hover', () => {
		render(
			<Tooltip content='Tooltip Info'>
				<div data-testid='child'>Hover</div>
			</Tooltip>
		);

		fireEvent.mouseEnter(screen.getByTestId('child'));

		expect(screen.getByTestId('popper')).toBeInTheDocument();
		expect(screen.getByText('Tooltip Info')).toBeInTheDocument();
	});
});

// MEDIUM PATH
describe('Tooltip — Behaviour With Extended Props', () => {
	beforeEach(() => {
		mockOpen = false;
	});

	test('shows pointer arrow when enabled', () => {
		render(
			<Tooltip content='Info' showPointer>
				<div data-testid='child'>Hover</div>
			</Tooltip>
		);

		fireEvent.mouseEnter(screen.getByTestId('child'));
		expect(screen.getByTestId('popper').querySelector('.arrow')).toBeTruthy();
	});

	test('hides pointer arrow when disabled', () => {
		render(
			<Tooltip content='Info' showPointer={false}>
				<div data-testid='child'>Hover</div>
			</Tooltip>
		);

		fireEvent.mouseEnter(screen.getByTestId('child'));
		expect(screen.getByTestId('popper').querySelector('.arrow')).toBeFalsy();
	});

	test('applies correct variant class', () => {
		render(
			<Tooltip content='Info' variant='light'>
				<div data-testid='child'>Hover</div>
			</Tooltip>
		);

		fireEvent.mouseEnter(screen.getByTestId('child'));

		const tooltip = screen.getByTestId('popper').firstElementChild!;
		expect(tooltip.className).toContain('light');
	});
});

//  RISKY PATH
describe('Tooltip — Edge Case Handling', () => {
	beforeEach(() => {
		mockOpen = false;
	});

	test('does not render tooltip body when content=null', () => {
		render(
			<Tooltip content={null}>
				<div data-testid='child'>Hover</div>
			</Tooltip>
		);

		fireEvent.mouseEnter(screen.getByTestId('child'));

		const popper = screen.getByTestId('popper');
		expect(popper).toBeInTheDocument();

		const tooltipBody = popper.querySelector('.tooltip');

		expect(tooltipBody).toBeInTheDocument();
		expect(tooltipBody!.textContent?.trim()).toBe('');
	});

	test('applies computed position styles correctly', () => {
		render(
			<Tooltip content='Info'>
				<div data-testid='child'>Hover</div>
			</Tooltip>
		);

		fireEvent.mouseEnter(screen.getByTestId('child'));

		const tooltip = screen.getByTestId('popper').firstElementChild as HTMLElement;

		expect(tooltip.style.top).toBe('50px');
		expect(tooltip.style.left).toBe('50px');
	});
});

//    SNAPSHOT TESTS
describe('Tooltip — Snapshot Rendering', () => {
	beforeEach(() => {
		mockOpen = false;
	});

	test('default snapshot', () => {
		const { container } = render(
			<Tooltip content='Snapshot Test'>
				<div>Hover</div>
			</Tooltip>
		);

		fireEvent.mouseEnter(screen.getByText('Hover'));
		expect(container).toMatchSnapshot();
	});

	test('variant snapshot', () => {
		const { container } = render(
			<Tooltip variant='light' content='Snapshot'>
				<div>Hover</div>
			</Tooltip>
		);

		fireEvent.mouseEnter(screen.getByText('Hover'));
		expect(container).toMatchSnapshot();
	});
});
