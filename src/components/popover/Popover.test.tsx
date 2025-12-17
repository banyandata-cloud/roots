import { render, fireEvent } from '@testing-library/react';
import Popover from './Popover';

//  Mock Popper
jest.mock('../popper', () => ({
	Popper: ({ children, open }: any) =>
		open ? <div data-testid='mock-popper'>{children}</div> : null,
}));

//  Helper
const createAnchor = () => {
	const el = document.createElement('div');
	document.body.appendChild(el);
	return el;
};

//  Happy path
describe('Popover — Rendering Behaviour', () => {
	test('does not render content when open=false', () => {
		const { queryByTestId } = render(
			<Popover anchorEl={createAnchor()} open={false}>
				Hidden
			</Popover>
		);

		expect(queryByTestId('mock-popper')).toBeNull();
	});

	test('renders content when open=true', () => {
		const { queryByTestId } = render(
			<Popover anchorEl={createAnchor()} open={true}>
				Visible
			</Popover>
		);

		expect(queryByTestId('mock-popper')).toBeTruthy();
	});

	test('applies theme classes', () => {
		const { container } = render(
			<Popover anchorEl={createAnchor()} open={true} theme='dark'>
				Themed Popover
			</Popover>
		);

		// Themed wrapper is the element with .dark-theme
		const themedDiv = container.querySelector('.dark-theme');

		expect(themedDiv).not.toBeNull();
		expect(themedDiv).toHaveClass('dark-theme');
	});
});

//  Medium path
describe('Popover — Interaction Behaviour', () => {
	test('calls onClose when open changes from true → false', () => {
		const onClose = jest.fn();

		const { rerender } = render(
			<Popover anchorEl={createAnchor()} open={true} onClose={onClose}>
				Content
			</Popover>
		);

		rerender(
			<Popover anchorEl={createAnchor()} open={false} onClose={onClose}>
				Content
			</Popover>
		);

		expect(onClose).toHaveBeenCalled();
	});

	test('calls setOpen when dismiss interaction happens (Escape)', () => {
		const setOpen = jest.fn();

		render(
			<Popover anchorEl={createAnchor()} open={true} setOpen={setOpen}>
				Test
			</Popover>
		);

		// Escape key triggers useDismiss from floating-ui
		fireEvent.keyDown(document, { key: 'Escape' });

		expect(setOpen).toHaveBeenCalled();
	});
});

//  Risky path
describe('Popover — Edge Case Behaviour', () => {
	test('renders even when anchorEl changes dynamically', () => {
		const { rerender, queryByTestId } = render(
			<Popover anchorEl={null} open={true}>
				Content
			</Popover>
		);

		expect(queryByTestId('mock-popper')).toBeTruthy();

		rerender(
			<Popover anchorEl={createAnchor()} open={true}>
				Content
			</Popover>
		);

		expect(queryByTestId('mock-popper')).toBeTruthy();
	});

	test('should not crash if children is null', () => {
		const { queryByTestId } = render(
			<Popover anchorEl={createAnchor()} open={true}>
				{null}
			</Popover>
		);

		expect(queryByTestId('mock-popper')).toBeTruthy();
	});
});

//  Snapshot Rendering
describe('Popover — Snapshot Rendering', () => {
	test('matches snapshot when open', () => {
		const { container } = render(
			<Popover anchorEl={createAnchor()} open={true}>
				Snapshot Content
			</Popover>
		);
		expect(container).toMatchSnapshot();
	});

	test('matches snapshot when closed', () => {
		const { container } = render(
			<Popover anchorEl={createAnchor()} open={false}>
				Snapshot Content
			</Popover>
		);
		expect(container).toMatchSnapshot();
	});
});
