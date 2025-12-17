import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from './Text';

//  HAPPY PATH —
describe('Text — Basic Rendering', () => {
	test('renders children correctly', () => {
		render(<Text>This is sample text</Text>);
		expect(screen.getByText('This is sample text')).toBeInTheDocument();
	});

	test('uses span as default component', () => {
		render(<Text>Default</Text>);
		const elem = screen.getByText('Default');
		expect(elem.tagName.toLowerCase()).toBe('span');
	});
});

//  MEDIUM PATH
describe('Text — Prop-driven behavior', () => {
	test('renders as h1 when component="h1"', () => {
		render(<Text component='h1'>Heading</Text>);
		expect(screen.getByText('Heading').tagName.toLowerCase()).toBe('h1');
	});

	test('applies italic style', () => {
		render(<Text italic>Italic text</Text>);
		expect(screen.getByText('Italic text')).toHaveStyle({ fontStyle: 'italic' });
	});

	test('applies underline style', () => {
		render(<Text underline>Underlined</Text>);
		expect(screen.getByText('Underlined')).toHaveStyle({ textDecoration: 'underline' });
	});

	test('applies font weight', () => {
		render(<Text weight={500}>Weighted</Text>);
		expect(screen.getByText('Weighted')).toHaveStyle({ fontWeight: '500' });
	});

	test('applies variant class', () => {
		render(<Text variant='h1'>Header text</Text>);
		expect(screen.getByText('Header text').className).toContain('h1');
	});

	test('applies stroke class', () => {
		render(<Text stroke='semibold'>Stroke test</Text>);
		expect(screen.getByText('Stroke test').className).toContain('semibold-stroke');
	});

	test('applies external className', () => {
		render(<Text className='my-custom'>Styled</Text>);
		expect(screen.getByText('Styled').className).toContain('my-custom');
	});

	test('supports attrs prop', () => {
		render(<Text attrs={{ 'data-id': '123' }}>Attr test</Text>);
		expect(screen.getByText('Attr test')).toHaveAttribute('data-id', '123');
	});
});

//  RISKY PATH
describe('Text — Ref-related behavior', () => {
	test('forwards ref to DOM element', () => {
		const ref = React.createRef<React.RefObject<HTMLElement>>();

		render(<Text ref={ref}>Ref content</Text>);

		// Runtime: ref.current = HTMLElement
		expect(ref.current).toBeInstanceOf(HTMLElement);

		const dom = ref.current as unknown as HTMLElement;

		expect(dom.tagName.toLowerCase()).toBe('span');
		expect(dom.textContent).toBe('Ref content');

		// Runtime: nested .current does NOT exist
		expect((ref.current as any).current).toBeUndefined();
	});
});

//  SNAPSHOT TESTING
describe('Text — Snapshots', () => {
	test('matches default snapshot', () => {
		const { container } = render(<Text>Snapshot text</Text>);
		expect(container).toMatchSnapshot();
	});

	test('matches snapshot with multiple props', () => {
		const { container } = render(
			<Text
				variant='h2'
				component='p'
				stroke='bold'
				italic
				underline
				weight={600}
				className='extra'
				attrs={{ role: 'note' }}>
				Complex text
			</Text>
		);

		expect(container).toMatchSnapshot();
	});
});
