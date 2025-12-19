import { useRef } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import useOutsideClickListener from './useOutsideClickListener';

const TestComponent = ({ onOutsideClick }: { onOutsideClick: () => void }) => {
	// JSX expects HTMLDivElement
	const divRef = useRef<HTMLDivElement | null>(null);

	// Hook expects HTMLElement
	const elementRef = useRef<HTMLElement | null>(null);

	// Bridge both refs safely
	const setRef = (node: HTMLDivElement | null) => {
		divRef.current = node;
		elementRef.current = node;
	};

	useOutsideClickListener(onOutsideClick, elementRef);

	return (
		<div>
			<div ref={setRef} data-testid='inside'>
				Inside
			</div>
			<div data-testid='outside'>Outside</div>
		</div>
	);
};

// HAPPY PATH
describe('useOutsideClickListener — initializes and registers listeners', () => {
	test('registers mousedown listener on document', () => {
		const spy = jest.spyOn(document, 'addEventListener');
		const cb = jest.fn();

		render(<TestComponent onOutsideClick={cb} />);

		expect(spy).toHaveBeenCalledWith('mousedown', expect.any(Function));

		spy.mockRestore();
	});

	test('removes mousedown listener on unmount', () => {
		const spy = jest.spyOn(document, 'removeEventListener');
		const cb = jest.fn();

		const { unmount } = render(<TestComponent onOutsideClick={cb} />);

		unmount();

		expect(spy).toHaveBeenCalledWith('mousedown', expect.any(Function));

		spy.mockRestore();
	});
});

// MEDIUM PATH
describe('useOutsideClickListener — detects outside clicks correctly', () => {
	test('does not call callback when clicking inside the element', () => {
		const cb = jest.fn();
		const { getByTestId } = render(<TestComponent onOutsideClick={cb} />);

		fireEvent.mouseDown(getByTestId('inside'));

		expect(cb).not.toHaveBeenCalled();
	});

	test('calls callback when clicking outside the element', () => {
		const cb = jest.fn();
		const { getByTestId } = render(<TestComponent onOutsideClick={cb} />);

		fireEvent.mouseDown(getByTestId('outside'));

		expect(cb).toHaveBeenCalledTimes(1);
	});
});

// RISKY PATH
describe('useOutsideClickListener — handles edge cases safely', () => {
	test('does not throw when ref is null', () => {
		const cb = jest.fn();

		const NullRefComponent = () => {
			const ref = useRef<HTMLElement | null>(null);
			useOutsideClickListener(cb, ref);
			return <div data-testid='outside' />;
		};

		const { getByTestId } = render(<NullRefComponent />);

		expect(() => {
			fireEvent.mouseDown(getByTestId('outside'));
		}).not.toThrow();
	});

	test('uses latest callback after re-render', () => {
		const firstCb = jest.fn();
		const secondCb = jest.fn();

		const { rerender, getByTestId } = render(<TestComponent onOutsideClick={firstCb} />);

		rerender(<TestComponent onOutsideClick={secondCb} />);

		fireEvent.mouseDown(getByTestId('outside'));

		expect(firstCb).not.toHaveBeenCalled();
		expect(secondCb).toHaveBeenCalledTimes(1);
	});
});

// CLEANUP
afterEach(() => {
	cleanup();
	jest.restoreAllMocks();
});
