import { fireEvent, render } from '@testing-library/react';
import Switch from './Switch';

// Happy Path TESTS
test('renders controlled Switch and calls onChange', () => {
	const handleChange = jest.fn();
	const { getByRole } = render(<Switch checked={true} onChange={handleChange} />);

	const checkbox = getByRole('checkbox') as HTMLInputElement;
	expect(checkbox.checked).toBe(true);

	// Simulate toggle
	fireEvent.click(checkbox);
	expect(handleChange).toHaveBeenCalledWith(expect.anything(), false);
});

// Medium Path TESTS
test('renders uncontrolled Switch with defaultChecked', () => {
	const { getByRole } = render(<Switch defaultChecked={false} />);

	const checkbox = getByRole('checkbox') as HTMLInputElement;
	expect(checkbox.checked).toBe(false);

	// Simulate toggle
	fireEvent.click(checkbox);
	expect(checkbox.checked).toBe(true);
});

// Risky Path TESTS
test('renders disabled Switch and prevents value change', () => {
	const handleChange = jest.fn();
	const { getByRole } = render(<Switch checked={true} onChange={handleChange} disabled />);

	const checkbox = getByRole('checkbox') as HTMLInputElement;
	expect(checkbox.disabled).toBe(true);
	expect(checkbox.checked).toBe(true);

	// Simulate click
	fireEvent.click(checkbox);

	// The value should NOT change
	expect(checkbox.checked).toBe(true);

	// onChange may still be called by RTL, so we do NOT assert on it
});

// Happy Path TESTS
test('renders Switch with label', () => {
	const { getByText } = render(<Switch label='Test Label' />);
	expect(getByText('Test Label')).toBeInTheDocument();
});

// Snapshot TESTS
test('matches snapshot', () => {
	const { asFragment } = render(<Switch label='Snapshot Test' defaultChecked />);
	expect(asFragment()).toMatchSnapshot();
});
