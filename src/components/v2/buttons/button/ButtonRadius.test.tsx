import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button radius', () => {
	test('leaves the existing default radius class in place when none is specified', () => {
		render(<Button title='Action' />);

		expect(screen.getByRole('button')).toHaveClass('border-radius-default');
		expect(screen.getByRole('button')).not.toHaveClass('radius-default');
	});

	test('passes the round radius through and applies its style modifier', () => {
		render(<Button title='Action' radius='round' />);

		const button = screen.getByRole('button');
		expect(button).toHaveClass('border-radius-round');
		expect(button).toHaveClass('radius-round');
	});

	test('applies the pill modifier without a base-cell radius that would conflict', () => {
		render(<Button title='Action' radius='pill' />);

		const button = screen.getByRole('button');
		expect(button).toHaveClass('radius-pill');
		expect(button).toHaveClass('border-radius-default');
	});
});