import { useRef } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import useResize from './useResize';

const TestComponent = ({ enabled = true }: { enabled?: boolean }) => {
	// Ref used by JSX
	const divRef = useRef<HTMLDivElement>(null);

	// Ref passed to hook
	const elementRef = useRef<HTMLElement>(null!);

	// Bridge the refs
	const setRef = (node: HTMLDivElement | null) => {
		divRef.current = node;
		elementRef.current = node as HTMLElement;
	};

	useResize({
		ref: elementRef,
		enabled,
		styles: {
			minWidth: 100,
			maxWidth: 300,
			borderSize: 10,
		},
	});

	return <div ref={setRef} data-testid='resizable' style={{ width: '200px' }} />;
};

// Happy path
describe('useResize — initializes resize behavior when enabled', () => {
	test('registers mousedown listener on the target element', () => {
		const spy = jest.spyOn(HTMLElement.prototype, 'addEventListener');

		render(<TestComponent enabled />);

		expect(spy).toHaveBeenCalledWith('mousedown', expect.any(Function), false);

		spy.mockRestore();
	});

	test('registers mouseup listener on the document element', () => {
		const spy = jest.spyOn(document.documentElement, 'addEventListener');

		render(<TestComponent enabled />);

		expect(spy).toHaveBeenCalledWith('mouseup', expect.any(Function), false);

		spy.mockRestore();
	});
});

// Medium path
describe('useResize — handles interaction conditions safely', () => {
	test('does not throw when mousedown occurs without valid resize conditions', () => {
		const { getByTestId } = render(<TestComponent enabled />);

		expect(() => {
			fireEvent.mouseDown(getByTestId('resizable'));
			fireEvent.mouseMove(document);
			fireEvent.mouseUp(document);
		}).not.toThrow();
	});

	test('prevents resize behavior entirely when hook is disabled', () => {
		const { getByTestId } = render(<TestComponent enabled={false} />);

		const element = getByTestId('resizable');

		fireEvent.mouseDown(element);
		fireEvent.mouseMove(document);

		expect(element.style.width).toBe('200px');
	});
});

// Risky path
describe('useResize — cleans up listeners and avoids side effects', () => {
	test('removes mouseup listener when component is unmounted', () => {
		const spy = jest.spyOn(document.documentElement, 'removeEventListener');

		const { unmount } = render(<TestComponent enabled />);
		unmount();

		expect(spy).toHaveBeenCalledWith('mouseup', expect.any(Function), false);

		spy.mockRestore();
	});

	test('does not throw when unmounted without any user interaction', () => {
		const { unmount } = render(<TestComponent enabled />);
		expect(() => unmount()).not.toThrow();
	});
});

// CLEANUP
afterEach(() => {
	cleanup();
	jest.restoreAllMocks();
});
