import { render, screen } from '@testing-library/react';
import Stepper from './Stepper';
import type { Step } from './types';

const steps: Step[] = [
	{ label: 'One', description: 'First', status: 'completed' },
	{ label: 'Two', description: 'Second', status: 'current' },
	{ label: 'Three', status: 'incomplete' },
];

const connectors = (container: HTMLElement) =>
	container.querySelectorAll(
		'[data-status].connector, span[aria-hidden="true"]:not([data-kind])'
	);

describe('Stepper', () => {
	it('renders labels and descriptions, marking the current step', () => {
		render(<Stepper steps={steps} />);
		expect(screen.getByText('Second')).toBeInTheDocument();
		expect(screen.getAllByRole('listitem')).toHaveLength(3);
		expect(screen.getByText('Two').closest('li')).toHaveAttribute('aria-current', 'step');
		expect(screen.getByText('One').closest('li')).not.toHaveAttribute('aria-current');
	});

	it('draws a connector between steps but not after the last one', () => {
		const { container } = render(<Stepper steps={steps} />);
		expect(connectors(container)).toHaveLength(2);
	});

	it('uses the step number, defaulting to the position', () => {
		render(
			<Stepper
				variant='noIcon'
				steps={[
					{ label: 'A', status: 'incomplete' },
					{ label: 'B', status: 'incomplete', step: 7 },
				]}
			/>
		);
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('7')).toBeInTheDocument();
	});

	it('exposes size, variant and orientation to the stylesheet', () => {
		const { container } = render(
			<Stepper steps={steps} size='md' variant='noIcon' orientation='vertical' />
		);
		const root = container.firstElementChild as HTMLElement;
		expect(root.dataset.size).toBe('md');
		expect(root.dataset.variant).toBe('noIcon');
		expect(root.dataset.orientation).toBe('vertical');
	});

	it('renders the progress bar without icons and always horizontally', () => {
		const { container } = render(
			<Stepper steps={steps} variant='progressBar' orientation='vertical' />
		);
		expect((container.firstElementChild as HTMLElement).dataset.orientation).toBe('horizontal');
		expect(container.querySelector('[data-kind]')).toBeNull();
		expect(connectors(container)).toHaveLength(0);
	});

	it('shows a check for completed steps in both icon kinds', () => {
		const { container, rerender } = render(<Stepper steps={steps} />);
		expect(container.querySelectorAll('svg')).toHaveLength(1);
		rerender(<Stepper steps={steps} variant='noIcon' />);
		expect(container.querySelectorAll('svg')).toHaveLength(1);
	});
});
