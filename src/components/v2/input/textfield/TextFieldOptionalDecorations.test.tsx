import { render, screen } from '@testing-library/react';
import TextField from './TextField';

jest.mock('../../utils', () => ({
	classes: (...args: string[]) => args.filter(Boolean).join(' '),
}));

jest.mock('../../buttons/button', () => ({
	Button: () => null,
}));

jest.mock('../../icons', () => ({
	HelpIcon: () => <span data-testid='help-icon' />,
}));

jest.mock('../../icons/error', () => ({
	ErrorIcon: () => null,
}));

jest.mock('../../icons/warning', () => ({
	WarningIcon: () => null,
}));

jest.mock('../../tooltip', () => ({
	Tooltip: ({ children }: any) => children,
}));

jest.mock('../dropdown', () => ({
	Dropdown: () => null,
}));

describe('TextField optional decorations', () => {
	test('omits helper text, required marker, and help icon by default', () => {
		render(<TextField label='Name' leadingIcon={false} />);

		expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
		expect(screen.queryByText('*')).not.toBeInTheDocument();
		expect(screen.queryByTestId('help-icon')).not.toBeInTheDocument();
	});

	test('renders helper text, required marker, and help icon when requested', () => {
		render(
			<TextField
				label='Name'
				leadingIcon={false}
				required
				helpIcon
				helperText='Use your full name'
			/>
		);

		expect(screen.getByText('Use your full name')).toBeInTheDocument();
		expect(screen.getByText('*')).toBeInTheDocument();
		expect(screen.getByTestId('help-icon')).toBeInTheDocument();
	});
});

describe('TextField label association', () => {
	test('links the label to the input using the provided id', () => {
		render(<TextField label='Email' id='email-field' leadingIcon={false} />);

		expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email-field');
	});

	test('links the label to the input with a generated id when none is provided', () => {
		render(<TextField label='Email' leadingIcon={false} />);

		expect(screen.getByLabelText('Email').id).not.toBe('');
	});
});
