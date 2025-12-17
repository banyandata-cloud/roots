import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CodeSnippet from './CodeSnippet';

// Mock icons
jest.mock('../icons', () => ({
	CopyIcon: () => <div data-testid='copy-icon' />,
	TickIcon: () => <div data-testid='tick-icon' />,
}));

// Mock SyntaxHighlighter to simplify rendering
jest.mock('react-syntax-highlighter', () => ({
	Prism: ({ children }: any) => <pre>{children}</pre>,
}));

// HAPPY PATH TESTS
describe('CodeSnippet — Rendering & Basic Behaviour', () => {
	test('renders provided code text with required props', () => {
		render(
			<CodeSnippet
				code="console.log('hi')"
				copy={false}
				language='json'
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);

		expect(screen.getByText("console.log('hi')")).toBeInTheDocument();
	});

	test('shows Copy button when copy=true', () => {
		render(
			<CodeSnippet
				code='sample code'
				copy={true}
				language='json'
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);

		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	test('clicking copy writes to clipboard & shows tick icon', async () => {
		const mockWrite = jest.fn();
		Object.defineProperty(navigator, 'clipboard', {
			value: { writeText: mockWrite },
			writable: true,
		});

		render(
			<CodeSnippet
				code='hello world'
				copy={true}
				language='json'
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);

		const btn = screen.getByRole('button');

		await act(async () => {
			fireEvent.click(btn);
		});

		expect(mockWrite).toHaveBeenCalledWith('hello world');
		expect(screen.getByTestId('tick-icon')).toBeInTheDocument();
	});

	test('applies dark theme when theme="dark"', () => {
		render(
			<CodeSnippet
				code='dark-test'
				copy={false}
				language='json'
				showLineNumbers={false}
				theme='dark'
				className=''
			/>
		);

		expect(screen.getByText('dark-test')).toBeInTheDocument();
	});
});

// MEDIUM PATH TESTS
describe('CodeSnippet — Behaviour With Extended Props', () => {
	test('does NOT show copy button when copy=false (explicit props)', () => {
		render(
			<CodeSnippet
				code='test-code'
				copy={false}
				language='json'
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);

		expect(screen.queryByRole('button')).toBeNull();
	});

	test('renders syntax highlighter when showLineNumbers=true (explicit props)', () => {
		const { container } = render(
			<CodeSnippet
				code='line-test'
				copy={false}
				language='json'
				showLineNumbers={true}
				theme='light'
				className=''
			/>
		);

		// Mocked syntax highlighter renders <pre>
		expect(container.querySelector('pre')).toBeInTheDocument();
	});

	test('renders long code safely (explicit props)', () => {
		const longCode = 'A'.repeat(1000);

		render(
			<CodeSnippet
				code={longCode}
				copy={false}
				language='json'
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);

		expect(screen.getByText(longCode)).toBeInTheDocument();
	});
});

// RISKY PATH TESTS
// ------------------------------
describe('CodeSnippet — Edge Case Handling', () => {
	test('invalid language should NOT crash component', () => {
		render(
			<CodeSnippet
				code='lang-test'
				copy={false}
				language='unknown-language' // invalid
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);

		// Should still render the code
		expect(screen.getByText('lang-test')).toBeInTheDocument();
	});

	test('should NOT crash when a very long className is passed', () => {
		const longClass = 'x'.repeat(500);

		render(
			<CodeSnippet
				code='long-class'
				copy={false}
				language='json'
				showLineNumbers={false}
				theme='light'
				className={longClass}
			/>
		);

		expect(screen.getByText('long-class')).toBeInTheDocument();
	});

	test('should NOT crash when an empty language is passed', () => {
		render(
			<CodeSnippet
				code='empty-lang'
				copy={false}
				language=''
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);

		expect(screen.getByText('empty-lang')).toBeInTheDocument();
	});

	test('should NOT crash when code is not passed', () => {
		const { container } = render(
			<CodeSnippet
				code={undefined as unknown as string}
				copy={false}
				language='json'
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);

		expect(screen.getByText('{}')).toBeInTheDocument();

		// Component root should exist
		expect(container.firstChild).toBeTruthy();
	});
});

// Snapshot tests (add to CodeSnippet.test.tsx)
describe('CodeSnippet — Snapshot Rendering', () => {
	test('basic render snapshot', () => {
		const { container } = render(
			<CodeSnippet
				code="console.log('snap')"
				copy={false}
				language='json'
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);
		expect(container).toMatchSnapshot();
	});

	test('render with copy button snapshot', () => {
		const { container } = render(
			<CodeSnippet
				code='copy snap'
				copy={true}
				language='json'
				showLineNumbers={false}
				theme='light'
				className=''
			/>
		);
		expect(container).toMatchSnapshot();
	});
});
