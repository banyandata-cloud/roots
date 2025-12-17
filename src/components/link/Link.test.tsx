import { render, screen, fireEvent } from '@testing-library/react';
import Link from './Link';

const baseProps: any = {
	variant: 'b2',
	stroke: 'regular',
	weight: 'regular',
	italic: false,
	href: '#',
	target: '_self',
	attrs: {},
	className: '',
	underline: 'none',
	onClick: () => {},
};

//  HAPPY TESTS
describe('Link — Core Rendering', () => {
	test('renders child element correctly', () => {
		render(
			<Link {...baseProps}>
				<span>Link Child</span>
			</Link>
		);

		expect(screen.getByText('Link Child')).toBeInTheDocument();
	});

	test('uses default underline class', () => {
		render(
			<Link {...baseProps}>
				<span>Default Underline</span>
			</Link>
		);

		const link = screen.getByRole('link'); // FIXED

		expect(link.className).toContain('underline-none');
	});
});

//  MEDIUM TESTS
describe('Link — Style & Appearance', () => {
	test('applies underline variant correctly', () => {
		render(
			<Link {...baseProps} underline='hover'>
				<span>Hover Style</span>
			</Link>
		);

		const link = screen.getByRole('link'); // FIXED

		expect(link.className).toContain('underline-hover');
	});

	test('applies custom className', () => {
		render(
			<Link {...baseProps} className='custom-class'>
				<span>Custom Class</span>
			</Link>
		);

		const link = screen.getByRole('link'); // FIXED

		expect(link.className).toContain('custom-class');
	});
});

//  RISKY TESTS
describe('Link — Behavior & Interaction', () => {
	test('calls onClick handler', () => {
		const handleClick = jest.fn();

		render(
			<Link {...baseProps} onClick={handleClick}>
				<span>Click Me</span>
			</Link>
		);

		fireEvent.click(screen.getByText('Click Me'));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test('applies href correctly', () => {
		render(
			<Link {...baseProps} href='/dashboard'>
				<span>Dashboard</span>
			</Link>
		);

		const link = screen.getByRole('link'); // FIXED

		expect(link.getAttribute('href')).toBe('/dashboard');
	});
});

//  SNAPSHOT TESTS

describe('Link — Snapshot Tests', () => {
	test('matches default snapshot', () => {
		const { container } = render(
			<Link {...baseProps}>
				<span>Snapshot Default</span>
			</Link>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	test('matches underline="always" snapshot', () => {
		const { container } = render(
			<Link {...baseProps} underline='always'>
				<span>Snapshot Always</span>
			</Link>
		);

		expect(container.firstChild).toMatchSnapshot();
	});
});
