import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';

// HAPPY PATH
describe('TextField — Basic Rendering', () => {
	test('renders input with label and placeholder', () => {
		render(<TextField label='Username' placeholder='Enter username' />);

		expect(screen.getByText('Username')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
	});

	test('renders textarea when type="textarea"', () => {
		render(<TextField label='Description' type='textarea' />);

		const textarea = screen.getByRole('textbox');
		expect(textarea.tagName.toLowerCase()).toBe('textarea');
	});
});

// MEDIUM PATH
describe('TextField — Prop-driven behavior', () => {
	test('calls onChange in controlled mode', () => {
		const onChange = jest.fn();

		render(<TextField label='Email' value='' onChange={onChange} placeholder='email' />);

		const input = screen.getByPlaceholderText('email');
		fireEvent.change(input, { target: { value: 'test@mail.com' } });

		expect(onChange).toHaveBeenCalled();
		expect(onChange).toHaveBeenCalledWith(expect.any(Object), 'test@mail.com');
	});

	test('updates value internally in uncontrolled mode', () => {
		render(<TextField label='Name' defaultValue='John' placeholder='name' />);

		const input = screen.getByPlaceholderText('name') as HTMLInputElement;
		expect(input.value).toBe('John');

		fireEvent.change(input, { target: { value: 'Doe' } });
		expect(input.value).toBe('Doe');
	});

	test('renders left and right components', () => {
		const Left = () => <span data-testid='left-icon'>L</span>;
		const Right = () => <span data-testid='right-icon'>R</span>;

		render(<TextField label='Icons' LeftComponent={Left} RightComponent={Right} />);

		expect(screen.getByTestId('left-icon')).toBeInTheDocument();
		expect(screen.getByTestId('right-icon')).toBeInTheDocument();
	});

	test('shows helper text', () => {
		render(<TextField label='Password' helperText='Must be at least 8 characters' />);

		expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
	});
});

// RISKY PATH
describe('TextField — Risky paths', () => {
	test('renders error feedback icon when error feedback is provided', () => {
		render(<TextField label='Password' feedback={{ error: 'Invalid password' }} />);

		const input = screen.getByRole('textbox');

		expect(input.className).toContain('error');
	});

	test('renders character count for textarea with maxLength', () => {
		render(<TextField label='Bio' type='textarea' defaultValue='Hello' maxLength={10} />);

		expect(screen.getByText('5/10')).toBeInTheDocument();
	});

	test('renders input element with forwarded ref without crashing', () => {
		const ref = React.createRef<HTMLInputElement>();

		render(<TextField ref={ref} label='Ref test' />);

		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();
	});

	test('does not render right component when disabled', () => {
		const Right = () => <span data-testid='right-icon'>R</span>;

		render(<TextField label='Disabled' RightComponent={Right} disabled />);

		expect(screen.queryByTestId('right-icon')).toBeNull();
	});
});

// SNAPSHOT TESTING
describe('TextField — Snapshots', () => {
	test('matches default snapshot', () => {
		const { container } = render(<TextField label='Snapshot' placeholder='snapshot' />);

		expect(container).toMatchSnapshot();
	});

	test('matches snapshot with complex props', () => {
		const Left = () => <span>L</span>;

		const { container } = render(
			<TextField
				label='Complex'
				type='textarea'
				size='lg'
				border='none'
				maxLength={50}
				helperText='Helper'
				feedback={{ info: 'Some info' }}
				LeftComponent={Left}
				readOnly
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
