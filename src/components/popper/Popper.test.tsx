import { render, screen, cleanup } from '@testing-library/react';
import Popper from './Popper';

// Mocks
jest.mock('@floating-ui/react-dom-interactions', () => ({
	FloatingPortal: ({ children, id }: any) => {
		// Return a wrapper that stores the generated ID
		return (
			<div data-testid='portal' data-portal-id={id}>
				{children}
			</div>
		);
	},

	FloatingOverlay: ({ children, lockScroll, className }: any) => (
		<div data-testid='overlay' data-lockscroll={lockScroll} className={className}>
			{children}
		</div>
	),
}));

jest.mock('framer-motion', () => ({
	AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock('../../utils', () => ({
	classes: (...args: string[]) => args.filter(Boolean).join(' '),
}));

afterEach(() => cleanup());

// Happy path
describe('Popper Component — Rendering Behaviour', () => {
	test('does not render when open=false', () => {
		render(<Popper open={false}>Hello</Popper>);
		expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
		expect(screen.queryByText('Hello')).not.toBeInTheDocument();
	});

	test('renders children when open=true', () => {
		render(<Popper open={true}>Content</Popper>);
		expect(screen.getByText('Content')).toBeInTheDocument();
	});

	test('renders overlay when withOverlay=true', () => {
		render(<Popper open={true}>Content</Popper>);
		expect(screen.getByTestId('overlay')).toBeInTheDocument();
	});

	test('renders without overlay when withOverlay=false', () => {
		render(
			<Popper open={true} withOverlay={false} className='custom'>
				No Overlay
			</Popper>
		);

		expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
		expect(screen.getByText('No Overlay')).toBeInTheDocument();
	});
});

// Medium path
describe('Popper Component — Styling Behaviour', () => {
	test('applies transparent class when transparent=true', () => {
		render(<Popper open={true}>X</Popper>);
		expect(screen.getByTestId('overlay').className).toContain('transparent');
	});

	test('applies backdrop hide class when backdrop=false', () => {
		render(
			<Popper open={true} backdrop={false}>
				X
			</Popper>
		);

		expect(screen.getByTestId('overlay').className).toContain('hide-backdrop');
	});

	test('applies custom className', () => {
		render(
			<Popper open={true} className='my-class'>
				Test
			</Popper>
		);

		expect(screen.getByTestId('overlay').className).toContain('my-class');
	});

	test('locks scroll when lockScroll=true', () => {
		render(
			<Popper open={true} lockScroll={true}>
				Child
			</Popper>
		);

		expect(screen.getByTestId('overlay')).toHaveAttribute('data-lockscroll', 'true');
	});

	test('does NOT lock scroll when lockScroll=false', () => {
		render(
			<Popper open={true} lockScroll={false}>
				Child
			</Popper>
		);

		expect(screen.getByTestId('overlay')).toHaveAttribute('data-lockscroll', 'false');
	});
});

// Risky path
describe('Popper Component — Edge Case Behaviour', () => {
	test('generates unique portal ID using wrapperId prefix', () => {
		render(
			<Popper open={true} wrapperId='test-wrapper'>
				X
			</Popper>
		);

		const portal = screen.getByTestId('portal');
		const portalId = portal.getAttribute('data-portal-id');

		// Simulate real portal node creation
		const portalRoot = document.createElement('div');
		portalRoot.id = portalId!;
		document.body.appendChild(portalRoot);

		expect(portalRoot.id).toContain('test-wrapper');
	});

	test('cleans up portal element on unmount', () => {
		const { unmount } = render(<Popper open={true}>X</Popper>);

		const portal = screen.getByTestId('portal');
		const portalId = portal.getAttribute('data-portal-id');

		// Create fake portal root to test cleanup
		const portalRoot = document.createElement('div');
		portalRoot.id = portalId!;
		portalRoot.setAttribute('data-testid', 'portal-root');
		document.body.appendChild(portalRoot);

		expect(document.getElementById(portalId!)).toBeTruthy();

		unmount();

		expect(document.getElementById(portalId!)).toBeFalsy();
	});

	test('does not crash when children is null', () => {
		render(<Popper open={true}>{null}</Popper>);
		expect(screen.getByTestId('overlay')).toBeInTheDocument();
	});
});

//    Snapshot Rendering

describe('Popper Component — Snapshot Rendering', () => {
	test('matches snapshot when open with overlay', () => {
		const { container } = render(<Popper open={true}>Snapshot</Popper>);
		expect(container).toMatchSnapshot();
	});

	test('matches snapshot when open without overlay', () => {
		const { container } = render(
			<Popper open={true} withOverlay={false}>
				Snapshot2
			</Popper>
		);
		expect(container).toMatchSnapshot();
	});

	test('matches snapshot when closed', () => {
		const { container } = render(<Popper open={false}>Closed</Popper>);
		expect(container).toMatchSnapshot();
	});
});
