import { render, fireEvent, cleanup } from '@testing-library/react';
import { useRef, useState, useEffect } from 'react';
import Popover from '../components/popover/Popover';

//  Test wrapper using a Popover

const PopoverTestWrapper = ({ onClose }: { onClose: () => void }) => {
	const anchorRef = useRef<HTMLButtonElement | null>(null);
	const [anchorReady, setAnchorReady] = useState(false);
	const [open, setOpen] = useState(true);

	useEffect(() => {
		if (anchorRef.current) {
			setAnchorReady(true);
		}
	}, []);

	return (
		<>
			<button ref={anchorRef}>Anchor</button>

			{anchorReady && (
				<Popover
					open={open}
					setOpen={setOpen}
					onClose={onClose}
					anchorEl={anchorRef.current}>
					<div>Popover Content</div>
				</Popover>
			)}
		</>
	);
};

// HAPPY PATH

describe('useOutsideClickListener — initialization via Popover', () => {
	test('registers dismiss behaviour when Popover is mounted', () => {
		const onClose = jest.fn();

		render(<PopoverTestWrapper onClose={onClose} />);

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	test('cleans up dismiss behaviour on unmount', () => {
		const onClose = jest.fn();

		const { unmount } = render(<PopoverTestWrapper onClose={onClose} />);

		unmount();

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(onClose).not.toHaveBeenCalled();
	});
});

//  MEDIUM PATH

describe('useOutsideClickListener — interaction behaviour via Popover', () => {
	test('does not close when clicking inside popover content', () => {
		const onClose = jest.fn();

		const { getByText } = render(<PopoverTestWrapper onClose={onClose} />);

		fireEvent.mouseDown(getByText('Popover Content'));

		expect(onClose).not.toHaveBeenCalled();
	});

	test('closes popover when dismissed using Escape key', () => {
		const onClose = jest.fn();

		render(<PopoverTestWrapper onClose={onClose} />);

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(onClose).toHaveBeenCalledTimes(1);
	});
});

//  RISKY PATH

describe('useOutsideClickListener — edge cases via Popover', () => {
	test('does not throw when anchorEl is initially null', () => {
		const onClose = jest.fn();

		expect(() => {
			render(<PopoverTestWrapper onClose={onClose} />);
		}).not.toThrow();
	});

	test('uses latest onClose callback after re-render', () => {
		const firstOnClose = jest.fn();
		const secondOnClose = jest.fn();

		const { rerender } = render(<PopoverTestWrapper onClose={firstOnClose} />);

		rerender(<PopoverTestWrapper onClose={secondOnClose} />);

		fireEvent.keyDown(document, { key: 'Escape' });

		expect(firstOnClose).not.toHaveBeenCalled();
		expect(secondOnClose).toHaveBeenCalledTimes(1);
	});
});

// CLEANUP

afterEach(() => {
	cleanup();
	jest.restoreAllMocks();
});
