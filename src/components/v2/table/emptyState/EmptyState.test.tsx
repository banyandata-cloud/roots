import { fireEvent, render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
	test('renders default title', () => {
		render(<EmptyState />);
		expect(screen.getByText('No Data')).toBeInTheDocument();
	});

	test('renders custom title and description', () => {
		render(<EmptyState title='Nothing here' description='Try again later.' />);
		expect(screen.getByText('Nothing here')).toBeInTheDocument();
		expect(screen.getByText('Try again later.')).toBeInTheDocument();
	});

	test('does not render the action without onAction', () => {
		render(<EmptyState />);
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	test('renders default Retry label and fires onAction', () => {
		const onAction = jest.fn();
		render(<EmptyState onAction={onAction} />);
		fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
		expect(onAction).toHaveBeenCalledTimes(1);
	});

	test('renders custom action label', () => {
		render(<EmptyState actionLabel='Reload' onAction={() => {}} />);
		expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
	});
});
