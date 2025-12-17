import { createRef } from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import DialogBox from './DialogBox';

jest.mock('../BaseModal', () => {
	return ({ open, renderHeader, renderFooter, children }: any) => {
		return open ? (
			<div data-testid='modal'>
				<div data-testid='header'>{renderHeader}</div>
				<div data-testid='body'>{children}</div>
				<div data-testid='footer'>{renderFooter}</div>
			</div>
		) : null;
	};
});

const openDialog = async (ref: any, props: any) => {
	await act(async () => {
		ref.current.dialog(props);
	});
};

// Happy paths
describe('DialogBox — Basic Rendering', () => {
	test('renders title and description when dialog opens', async () => {
		const ref = createRef<any>();
		render(<DialogBox ref={ref} />);

		await openDialog(ref, { title: 'Test Title', description: 'Test Description' });

		await waitFor(() => {
			expect(screen.getByText('Test Title')).toBeInTheDocument();
			expect(screen.getByText('Test Description')).toBeInTheDocument();
		});
	});

	test('renders action and cancel buttons', async () => {
		const ref = createRef<any>();
		render(<DialogBox ref={ref} />);

		await openDialog(ref, {
			title: 'Delete',
			description: 'Confirm?',
			actionText: 'Done',
			cancelText: 'Cancel',
			onAction: jest.fn(),
		});

		await waitFor(() => {
			expect(screen.getByText('Done')).toBeInTheDocument();
			expect(screen.getByText('Cancel')).toBeInTheDocument();
		});
	});
});

// Medium paths

describe('DialogBox — User Interaction Behavior', () => {
	test('calls onAction when action button is clicked', async () => {
		const ref = createRef<any>();
		const onAction = jest.fn();

		render(<DialogBox ref={ref} />);

		await openDialog(ref, {
			title: 'Act',
			description: 'Test',
			actionText: 'Go',
			onAction,
		});

		await waitFor(() => {
			fireEvent.click(screen.getByText('Go'));
		});

		expect(onAction).toHaveBeenCalled();
	});

	test('calls onCancel when cancel button is clicked', async () => {
		const ref = createRef<any>();
		const onCancel = jest.fn();

		render(<DialogBox ref={ref} />);

		await openDialog(ref, {
			title: 'Cancel Test',
			description: 'Testing',
			cancelText: 'Dismiss',
			onCancel,
		});

		await waitFor(() => {
			fireEvent.click(screen.getByText('Dismiss'));
		});

		expect(onCancel).toHaveBeenCalled();
	});
});

// Risky paths
describe('DialogBox — Advanced Behavior Validation', () => {
	test('keeps dialog open when noDismiss is enabled', async () => {
		const ref = createRef<any>();
		render(<DialogBox ref={ref} />);

		await openDialog(ref, {
			title: 'No Dismiss',
			description: 'Testing',
			noDismiss: true,
		});

		await waitFor(() => {
			expect(screen.getByTestId('modal')).toBeInTheDocument();
		});
	});

	test('executes custom action and dismisses dialog', async () => {
		const CustomAction = ({ dismiss }: any) => <button onClick={dismiss}>Custom</button>;

		const ref = createRef<any>();
		render(<DialogBox ref={ref} />);

		await openDialog(ref, {
			title: 'Custom',
			description: 'Action',
			customAction: CustomAction,
		});

		await waitFor(() => {
			expect(screen.getByRole('button', { name: 'Custom' })).toBeInTheDocument();
		});

		fireEvent.click(screen.getByRole('button', { name: 'Custom' }));

		await waitFor(() => {
			expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
		});
	});
});

//Snapshot test
describe('DialogBox — Snapshot Testing', () => {
	test('matches snapshot structure', async () => {
		const ref = createRef<any>();
		const { asFragment } = render(<DialogBox ref={ref} />);

		await openDialog(ref, {
			title: 'Snap',
			description: 'Snapshot',
		});

		await waitFor(() => {
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
