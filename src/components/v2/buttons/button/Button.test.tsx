import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

// HAPPY PATH

describe('Button — Basic Rendering', () => {
	test('renders button with title', () => {
		render(<Button title='Click me' />);
		expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
	});

	test('uses submit as default button type', () => {
		render(<Button title='Submit' />);
		const button = screen.getByRole('button', { name: 'Submit' });
		expect(button).toHaveAttribute('type', 'submit');
	});
});

// MEDIUM PATH
describe('Button — Prop-driven behavior', () => {
	test('applies variant class', () => {
		render(<Button title='Secondary' variant='secondary' />);
		const button = screen.getByRole('button', { name: 'Secondary' });
		expect(button.className).toContain('secondary');
	});

	test('applies size and text size classes', () => {
		render(<Button title='Sized' size='md' textSize='md' />);
		const button = screen.getByRole('button', { name: 'Sized' });
		expect(button.className).toContain('size-md');
		expect(button.className).toContain('text-16');
	});

	test('renders right component when provided', () => {
		const RightIcon = () => <span data-testid='right-icon'>→</span>;

		render(<Button title='With Icon' rightComponent={RightIcon} />);

		expect(screen.getByTestId('right-icon')).toBeInTheDocument();
	});

	test('triggers onClick handler when clicked', () => {
		const onClick = jest.fn();

		render(<Button title='Clickable' onClick={onClick} />);
		fireEvent.click(screen.getByRole('button', { name: 'Clickable' }));

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test('is disabled when disabled prop is true', () => {
		render(<Button title='Disabled' disabled />);
		const button = screen.getByRole('button', { name: 'Disabled' });

		expect(button).toBeDisabled();
	});
});

// RISKY PATH
describe('Button — Ref-related behavior', () => {
	test('forwards ref to button element', () => {
		const ref = React.createRef<HTMLButtonElement>();

		render(<Button ref={ref} title='Ref Button' />);

		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
		expect(ref.current?.tagName.toLowerCase()).toBe('button');
		expect(ref.current?.textContent).toContain('Ref Button');
	});

	test('respects explicit button type', () => {
		render(<Button title='Reset' type='reset' />);
		const button = screen.getByRole('button', { name: 'Reset' });

		expect(button).toHaveAttribute('type', 'reset');
	});
});

// SNAPSHOT TESTING
describe('Button — Snapshots', () => {
	test('matches default snapshot', () => {
		const { container } = render(<Button title='Snapshot Button' />);
		expect(container).toMatchSnapshot();
	});

	test('matches snapshot with multiple props', () => {
		const RightIcon = () => <span>→</span>;

		const { container } = render(
			<Button
				title='Complex Button'
				variant='outlined'
				size='lg'
				textSize='md'
				disabled
				className='extra-class'
				rightComponent={RightIcon}
				type='button'
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
