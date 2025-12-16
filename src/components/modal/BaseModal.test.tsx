import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BaseModal from './BaseModal';

// Mock Popper because it handles portals
jest.mock('../popper', () => {
	return {
		Popper: ({ children, open }: any) =>
			open ? <div data-testid='popper'>{children}</div> : null,
	};
});

// Mock framer-motion animation wrappers
jest.mock('framer-motion', () => {
	return {
		motion: {
			div: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
			footer: ({ children, ...rest }: any) => <footer {...rest}>{children}</footer>,
		},
		AnimatePresence: ({ children }: any) => <>{children}</>,
	};
});

// Mock floating-ui for stable testing behavior
jest.mock('@floating-ui/react-dom-interactions', () => {
	return {
		useFloating: () => ({
			floating: jest.fn(),
			context: {},
		}),
		useDismiss: () => ({}),
		useInteractions: () => ({
			getFloatingProps: (props: any) => props,
		}),
		FloatingFocusManager: ({ children }: any) => <div>{children}</div>,
	};
});

//  HAPPY PATH
describe('BaseModal — Rendering (Happy Path)', () => {
	test('renders provided title and description when open', () => {
		render(<BaseModal open={true} title='Header Title' description='Header Description' />);

		expect(screen.getByText('Header Title')).toBeInTheDocument();
		expect(screen.getByText('Header Description')).toBeInTheDocument();
	});

	test('renders footer action and cancel buttons', () => {
		render(
			<BaseModal
				open={true}
				title='Sample'
				footerProps={{
					actionTitle: 'Save Changes',
					cancelTitle: 'Dismiss',
				}}
			/>
		);

		expect(screen.getByText('Save Changes')).toBeInTheDocument();
		expect(screen.getByText('Dismiss')).toBeInTheDocument();
	});
});

//   MEDIUM PATH TESTS
describe('BaseModal — User Interaction (Medium Path)', () => {
	test('executes onAction when action button is clicked', () => {
		const onAction = jest.fn();

		render(
			<BaseModal
				open={true}
				footerProps={{
					actionTitle: 'Save',
					onAction,
				}}
			/>
		);

		fireEvent.click(screen.getByText('Save'));
		expect(onAction).toHaveBeenCalled();
	});

	test('executes onDismiss when cancel button is clicked', () => {
		const onDismiss = jest.fn();
		const toggle = jest.fn();

		render(
			<BaseModal
				open={true}
				footerProps={{
					cancelTitle: 'Dismiss',
					onDismiss,
					toggle,
				}}
			/>
		);

		fireEvent.click(screen.getByText('Dismiss'));
		expect(onDismiss).toHaveBeenCalled();
		expect(toggle).toHaveBeenCalled();
	});
});

//  RISKY PATH TESTS

describe('BaseModal — Advanced Behavior (Risky Path)', () => {
	test('modal remains open when noDismiss is enabled', () => {
		const toggle = jest.fn();

		render(
			<BaseModal
				open={true}
				noDismiss={true}
				footerProps={{
					cancelTitle: 'Dismiss',
					onDismiss: jest.fn(),
				}}
				toggle={toggle}
			/>
		);

		fireEvent.click(screen.getByText('Dismiss'));

		expect(toggle).not.toHaveBeenCalled();
		expect(screen.getByText('Dismiss')).toBeInTheDocument();
	});

	test('renders custom header when provided', () => {
		render(<BaseModal open={true} renderHeader={<div>Custom Header</div>} />);

		expect(screen.getByText('Custom Header')).toBeInTheDocument();
	});
});

// Snapshot test

describe('BaseModal — Snapshot', () => {
	test('matches snapshot structure', () => {
		const { asFragment } = render(
			<BaseModal
				open={true}
				title='Snapshot Header'
				description='Snapshot Description'
				footerProps={{
					actionTitle: 'Save',
					cancelTitle: 'Cancel',
				}}
			/>
		);

		expect(asFragment()).toMatchSnapshot();
	});
});
