import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import Alert from './Alert';

// mock popper
jest.mock('../popper/Popper', () => ({
	__esModule: true,
	default: ({ open, children }: any) =>
		open ? <div data-testid='mock-popper'>{children}</div> : null,
}));

// mock framer-motion
const mockScopeEl = { current: {} };
jest.mock('framer-motion', () => ({
	useAnimate: () => [mockScopeEl, jest.fn()],
}));

// mock floating-ui
const mockFloatingRef = jest.fn();
jest.mock('@floating-ui/react-dom-interactions', () => ({
	useFloating: () => ({
		floating: mockFloatingRef,
		context: {},
	}),
	useDismiss: () => ({}),
	useInteractions: () => ({
		getFloatingProps: (props: any) => props,
	}),
}));

jest.useFakeTimers();

describe('Alert — Basic Rendering Behaviour', () => {
	test('renders alert when alert() is invoked via ref', () => {
		const ref = createRef<any>();
		render(<Alert ref={ref} />);

		act(() => {
			ref.current.alert({
				title: 'Test Title',
				description: 'Test Description',
				type: 'info',
				variant: 'card',
			});
		});

		expect(screen.queryByText('Test Title')).not.toBeNull();
		expect(screen.queryByText('Test Description')).not.toBeNull();
		expect(document.querySelector('svg')).not.toBeNull();
	});

	test('applies the type class to the alert', () => {
		const ref = createRef<any>();
		const { container } = render(<Alert ref={ref} />);

		act(() => {
			ref.current.alert({ title: 'Error', type: 'error' });
		});

		expect(container.querySelector('[data-testid="mock-popper"] div')!.className).toContain(
			'error'
		);
	});

});

describe('Alert — Styling & Behaviour', () => {
	test('applies position class based on position prop', () => {
		const ref = createRef<any>();
		const { container } = render(<Alert ref={ref} position='top-center' />);

		act(() => {
			ref.current.alert({ title: 'Pos Test' });
		});

		const wrapper = container.querySelector('[data-testid="mock-popper"] div');
		expect(wrapper).not.toBeNull();
		expect(wrapper!.className).toContain('position-top-center');
	});

	test('hides icon when showIcon=false', () => {
		const ref = createRef<any>();
		render(<Alert ref={ref} showIcon={false} />);

		act(() => {
			ref.current.alert({ title: 'Test' });
		});

		expect(document.querySelector('svg')).toBeNull();
	});
});

describe('Alert — Edge Case Behaviour', () => {
	test('auto-dismiss closes alert after timeout', () => {
		const ref = createRef<any>();
		render(<Alert ref={ref} />);

		act(() => {
			ref.current.alert({
				title: 'Auto dismiss',
				autoDismiss: true,
				dismissTime: 2000,
			});
		});

		expect(screen.queryByText('Auto dismiss')).not.toBeNull();

		act(() => {
			jest.advanceTimersByTime(2000);
		});

		expect(screen.queryByText('Auto dismiss')).toBeNull();
	});

	test('custom onClose is called when manual close button is clicked', () => {
		const onClose = jest.fn();
		const ref = createRef<any>();
		render(<Alert ref={ref} />);

		act(() => {
			ref.current.alert({
				title: 'Closable',
				onClose,
				autoDismiss: false,
			});
		});

		fireEvent.click(screen.getByRole('button', { name: 'Close' }));

		expect(onClose).toHaveBeenCalledTimes(1);
	});
});

describe('Alert — Snapshot Rendering', () => {
	test('snapshot: alert open state', () => {
		const ref = createRef<any>();
		const { asFragment } = render(<Alert ref={ref} />);

		act(() => {
			ref.current.alert({
				title: 'Snapshot Title',
				description: 'Snap Desc',
				variant: 'card',
			});
		});

		expect(asFragment()).toMatchSnapshot();
	});

	test('snapshot: alert closed state', () => {
		const ref = createRef<any>();
		const { asFragment } = render(<Alert ref={ref} />);

		expect(asFragment()).toMatchSnapshot();
	});
});
