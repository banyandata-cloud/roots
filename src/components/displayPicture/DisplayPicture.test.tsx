import { render, screen } from '@testing-library/react';
import DisplayPicture from './DisplayPicture';

// Mock utils
jest.mock('../../utils', () => ({
	classes: (...args: string[]) => args.filter(Boolean).join(' '),
	getInitialsOfName: (name: string) => (name ? name.slice(0, 2).toUpperCase() : ''),
}));

//   HAPPY PATH TESTS
describe('DisplayPicture – Rendering Behaviour', () => {
	test('renders image when URL is provided', () => {
		render(
			<DisplayPicture
				name='Pradeep'
				url='https://image-url.com/pic.jpg'
				size='sm'
				className=''
			/>
		);

		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('src', 'https://image-url.com/pic.jpg');
		expect(img).toHaveAttribute('alt', 'Pradeep');
	});

	test('renders initials when no URL is provided', () => {
		render(<DisplayPicture name='John Doe' url='' size='sm' className='' />);

		expect(screen.getByText('JO')).toBeInTheDocument();
	});
});

//    MEDIUM PATH TESTS
describe('DisplayPicture – Styling Behaviour', () => {
	test('applies correct size class based on size prop', () => {
		const { container } = render(<DisplayPicture name='Test' url='' size='md' className='' />);

		expect(container.firstChild).toHaveClass('md');
	});

	test('applies custom className', () => {
		const { container } = render(
			<DisplayPicture name='Test' url='' size='sm' className='custom-class' />
		);

		expect(container.firstChild).toHaveClass('custom-class');
	});
});

//    RISKY PATH TESTS
describe('DisplayPicture – Edge Case Behaviour', () => {
	test('should NOT crash when name is empty', () => {
		const { container } = render(<DisplayPicture name='' url='' size='sm' className='' />);

		// dp-name-container must exist
		const nameContainer = container.querySelector('[data-elem="dp-name-container"]');
		expect(nameContainer).toBeInTheDocument();

		// dp-name must exist
		const nameSpan = container.querySelector('[data-elem="dp-name"]');
		expect(nameSpan).toBeInTheDocument();

		// since name="", initials should also be ""
		expect(nameSpan?.textContent).toBe('');
	});

	test('should NOT crash when url is empty string', () => {
		render(<DisplayPicture name='Alex' url='' size='sm' className='' />);

		expect(screen.getByText('AL')).toBeInTheDocument();
	});
});

//    SNAPSHOT TESTS
describe('CodeSnippet — Snapshot Rendering', () => {
	test('snapshot without URL', () => {
		const { container } = render(
			<DisplayPicture name='Snapshot User' url='' size='sm' className='' />
		);

		expect(container).toMatchSnapshot();
	});

	test('snapshot with image URL', () => {
		const { container } = render(
			<DisplayPicture
				name='Pic User'
				url='https://image.com/photo.png'
				size='md'
				className=''
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
