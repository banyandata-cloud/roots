import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button radius', () => {
	test('applies no radius modifier when none is specified', () => {
		render(<Button title='Action' />);

		expect(screen.getByRole('button').className).not.toMatch(/radius/);
	});

	test('passes the round radius through and applies its style modifier', () => {
		render(<Button title='Action' radius='round' />);

		expect(screen.getByRole('button')).toHaveClass('radius-round');
	});

	test('applies the pill modifier', () => {
		render(<Button title='Action' radius='pill' />);

		expect(screen.getByRole('button')).toHaveClass('radius-pill');
	});
});