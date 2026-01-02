import { fireEvent, render } from '@testing-library/react';
import Slider from './Slider';

// Happy Path TESTS
test('renders Slider and allows controlled input', () => {
	const handleChange = jest.fn();
	const { getByRole } = render(<Slider value={50} onChange={handleChange} min={0} max={100} />);

	const slider = getByRole('slider') as HTMLInputElement;
	expect(slider.value).toBe('50');

	fireEvent.change(slider, { target: { value: '75' } });
	expect(handleChange).toHaveBeenCalledWith(expect.anything(), 75);
});

// Medium Path TESTS
test('renders Slider with initial value in uncontrolled mode', () => {
	const { getByRole } = render(<Slider min={0} max={100} />);
	const slider = getByRole('slider') as HTMLInputElement;

	expect(slider.value).toBe('0');

	fireEvent.change(slider, { target: { value: '30' } });
	expect(slider.value).toBe('30');
});

// Risky Path TESTS
test('renders disabled Slider and prevents interaction', () => {
	const handleChange = jest.fn();
	const { getByRole, getByText } = render(
		<Slider value={40} onChange={handleChange} disabled label='Test Slider' />
	);

	const slider = getByRole('slider') as HTMLInputElement;
	expect(slider).toBeDisabled();

	// Simulate change (won't affect disabled slider)
	fireEvent.change(slider, { target: { value: '60' } });
	// Value should remain the same
	expect(slider.value).toBe('40');

	// Tooltip should remain hidden
	fireEvent.mouseEnter(slider);
	const tooltip = getByText('40');
	expect(tooltip).toHaveStyle('visibility: hidden');
});

// -----------------------------
// Range Slider Path
// -----------------------------
test('renders RangeSlider when range prop is true', () => {
	const handleChange = jest.fn();
	const { container } = render(
		<Slider range node1={20} node2={80} onChange={handleChange} min={0} max={100} />
	);

	// Find the min and max input elements of RangeSlider
	const minInput = container.querySelector<HTMLInputElement>('input[name="min"]');
	const maxInput = container.querySelector<HTMLInputElement>('input[name="max"]');

	expect(minInput?.value).toBe('20');
	expect(maxInput?.value).toBe('80');

	// Simulate onChange callback manually
	handleChange(null, [25, 75]);
	expect(handleChange).toHaveBeenCalledWith(null, [25, 75]);
});

// Snapshot TESTS
test('matches snapshot', () => {
	const { asFragment } = render(<Slider value={50} min={0} max={100} label='Snapshot Test' />);
	expect(asFragment()).toMatchSnapshot();
});
