import { render } from '@testing-library/react';
import Skeleton from './Skeleton';

// HAPPY PATH TESTS
describe('Skeleton — Rendering & Basic Behaviour', () => {
	test('renders skeleton element with default width', () => {
		const { container } = render(
			<Skeleton variant='text' theme='dark' style={{}} noAnimation={false} />
		);

		const skeleton = container.querySelector('[data-elem="skeleton"]');
		expect(skeleton).toBeInTheDocument();
		expect(skeleton).toHaveStyle({ width: '100%' });
	});

	test('applies height and width styles when provided', () => {
		const { container } = render(
			<Skeleton
				height={20}
				width={200}
				variant='text'
				theme='dark'
				style={{}}
				noAnimation={false}
			/>
		);

		const skeleton = container.querySelector('[data-elem="skeleton"]');
		expect(skeleton).toHaveStyle({
			height: '20px',
			width: '200px',
		});
	});
});

// MEDIUM PATH TESTS
describe('Skeleton — Behaviour With Optional Props', () => {
	test('applies correct variant class', () => {
		const { container } = render(
			<Skeleton variant='circle' theme='dark' style={{}} noAnimation={false} />
		);

		const skeleton = container.querySelector('[data-elem="skeleton"]');
		expect(skeleton?.className).toContain('circle');
	});

	test('applies correct theme class', () => {
		const { container } = render(
			<Skeleton variant='text' theme='light' style={{}} noAnimation={false} />
		);

		const skeleton = container.querySelector('[data-elem="skeleton"]');
		expect(skeleton?.className).toContain('light-theme');
	});

	test('removes animation class when noAnimation=true', () => {
		const { container } = render(
			<Skeleton variant='text' theme='dark' style={{}} noAnimation />
		);

		const skeleton = container.querySelector('[data-elem="skeleton"]');
		expect(skeleton?.className).not.toContain('animated');
	});

	test('applies custom className when provided', () => {
		const { container } = render(
			<Skeleton
				variant='text'
				theme='dark'
				style={{}}
				noAnimation={false}
				className='custom-class'
			/>
		);

		const skeleton = container.querySelector('[data-elem="skeleton"]');
		expect(skeleton?.className).toContain('custom-class');
	});
});

// RISKY PATH TESTS
describe('Skeleton — Edge Case Handling', () => {
	test('should NOT crash when height and width are strings', () => {
		const { container } = render(
			<Skeleton
				height='2rem'
				width='50%'
				variant='rounded'
				theme='dark'
				style={{}}
				noAnimation={false}
			/>
		);

		const skeleton = container.querySelector('[data-elem="skeleton"]');
		expect(skeleton).toHaveStyle({
			height: '2rem',
			width: '50%',
		});
	});

	test('merges inline styles correctly', () => {
		const { container } = render(
			<Skeleton
				variant='ellipse'
				theme='dark'
				style={{ backgroundColor: 'red' }}
				noAnimation={false}
			/>
		);

		const skeleton = container.querySelector('[data-elem="skeleton"]') as HTMLElement;
		expect(skeleton.style.backgroundColor).toBe('red');
	});
});

// SNAPSHOT TESTS
describe('Skeleton — Snapshot Rendering', () => {
	test('default skeleton snapshot', () => {
		const { container } = render(
			<Skeleton variant='text' theme='dark' style={{}} noAnimation={false} />
		);

		expect(container).toMatchSnapshot();
	});

	test('circle skeleton without animation snapshot', () => {
		const { container } = render(
			<Skeleton variant='circle' theme='light' style={{}} noAnimation />
		);

		expect(container).toMatchSnapshot();
	});
});
