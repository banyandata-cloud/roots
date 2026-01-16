import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Link from './Link';

// HAPPY PATH

describe('Link — Basic Rendering', () => {
	test('renders link with provided text', () => {
		render(<Link>Simple Link</Link>);
		expect(screen.getByText('Simple Link')).toBeInTheDocument();
	});

	test('renders anchor element with link role when enabled', () => {
		render(<Link href='https://example.com'>Visit</Link>);
		const link = screen.getByRole('link', { name: 'Visit' });
		expect(link.tagName.toLowerCase()).toBe('a');
	});
});

// MEDIUM PATH

describe('Link — Prop-driven behavior', () => {
	test('applies size-based class when size prop is provided', () => {
		const { container } = render(<Link size='lg'>Large Link</Link>);
		expect(container.firstChild).toHaveClass('size-lg');
	});

	test('renders icon when withIcon prop is true', () => {
		render(<Link withIcon>Link with Icon</Link>);
		const icon = document.querySelector('svg');
		expect(icon).toBeInTheDocument();
	});

	test('triggers onClick handler when clicked', () => {
		const onClick = jest.fn();

		render(
			<Link href='#' onClick={onClick}>
				Clickable Link
			</Link>
		);

		fireEvent.click(screen.getByRole('link', { name: 'Clickable Link' }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test('passes target attribute correctly', () => {
		render(
			<Link href='https://example.com' target='_blank'>
				External Link
			</Link>
		);

		const link = screen.getByRole('link', { name: 'External Link' });
		expect(link).toHaveAttribute('target', '_blank');
	});
});

// RISKY PATH

describe('Link — Disabled and ref-related behavior', () => {
	test('prevents click and sets aria-disabled when disabled', () => {
		const onClick = jest.fn();

		render(
			<Link href='https://example.com' disabled onClick={onClick}>
				Disabled Link
			</Link>
		);

		const anchor = screen.getByText('Disabled Link').closest('a');
		expect(anchor).toBeInTheDocument();

		fireEvent.click(anchor!);

		expect(onClick).not.toHaveBeenCalled();
		expect(anchor).toHaveAttribute('aria-disabled', 'true');
	});

	test('removes disabled link from keyboard tab order', () => {
		render(<Link disabled>Non Focusable Link</Link>);

		const anchor = screen.getByText('Non Focusable Link').closest('a');
		expect(anchor).toHaveAttribute('tabindex', '-1');
	});

	test('forwards ref to anchor element', () => {
		const ref = React.createRef<HTMLAnchorElement>();

		render(
			<Link ref={ref} href='#'>
				Ref Link
			</Link>
		);

		expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
		expect(ref.current?.tagName.toLowerCase()).toBe('a');
	});
});

// SNAPSHOT TESTING

describe('Link — Snapshots', () => {
	test('matches default snapshot', () => {
		const { container } = render(<Link>Snapshot Link</Link>);
		expect(container).toMatchSnapshot();
	});

	test('matches snapshot with icon, size and disabled state', () => {
		const { container } = render(
			<Link size='lg' withIcon disabled className='custom-class'>
				Complex Link
			</Link>
		);

		expect(container).toMatchSnapshot();
	});
});
