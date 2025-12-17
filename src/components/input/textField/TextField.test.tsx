import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';

//  TEST SETUP / CLEANUP

// Silence controlled/uncontrolled input warning caused by component internals
beforeAll(() => {
	jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
	(console.error as jest.Mock).mockRestore();
});

// HAPPY PATH
describe('TextField — Basic rendering and expected behavior', () => {
	test('renders input with label correctly', () => {
		render(<TextField label='Username' />);

		expect(screen.getByText('Username')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	test('calls onChange in controlled mode when value prop is provided', () => {
		const handleChange = jest.fn();

		render(<TextField label='Email' value='' onChange={handleChange} />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'test@example.com' } });

		expect(handleChange).toHaveBeenCalled();
	});
});

//  MEDIUM PATH
describe('TextField — Props, variants, and UI states', () => {
	test('toggles password visibility when toggle button is clicked', () => {
		render(<TextField label='Password' type='password' />);

		const input = screen.getByLabelText('Password');
		expect(input).toHaveAttribute('type', 'password');

		const toggleButton = screen.getByRole('button');
		fireEvent.click(toggleButton);

		expect(input).toHaveAttribute('type', 'text');
	});

	test('renders feedback indicator when feedback prop is provided', () => {
		const { container } = render(
			<TextField label='Password' type='password' feedback={{ error: 'Required field' }} />
		);

		// Feedback icon wrapper should be present
		const feedbackIcon = container.querySelector('span.error');
		expect(feedbackIcon).toBeInTheDocument();
	});
});

//  RISKY PATHs
describe('TextField — Edge cases and uncommon scenarios', () => {
	test('updates internal state in uncontrolled mode when onChange is not provided', () => {
		render(<TextField defaultValue='initial value' />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'updated value' } });

		expect(input).toHaveValue('updated value');
	});

	test('renders textarea element when type is set to textarea', () => {
		render(<TextField label='Description' type='textarea' />);

		const textarea = screen.getByRole('textbox');
		expect(textarea.tagName).toBe('TEXTAREA');
	});
});

//  SNAPSHOT TESTS
describe('TextField — Snapshot Tests (UI regression protection)', () => {
	test('matches snapshot for default text field', () => {
		const { container } = render(<TextField label='Name' />);
		expect(container).toMatchSnapshot();
	});

	test('matches snapshot for password field with feedback', () => {
		const { container } = render(
			<TextField label='Password' type='password' feedback={{ error: 'Invalid password' }} />
		);

		expect(container).toMatchSnapshot();
	});
});
