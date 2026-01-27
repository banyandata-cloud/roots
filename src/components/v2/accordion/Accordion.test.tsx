import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';

// HAPPY PATH
describe('Accordion — Basic Rendering', () => {
	test('renders accordion with title', () => {
		render(
			<Accordion title='Accordion Title'>
				<div>Content</div>
			</Accordion>
		);

		expect(screen.getByText('Accordion Title')).toBeInTheDocument();
	});

	test('does not render body content by default when closed', () => {
		render(
			<Accordion title='Closed Accordion'>
				<div data-testid='accordion-body'>Hidden Content</div>
			</Accordion>
		);

		expect(screen.queryByTestId('accordion-body')).not.toBeInTheDocument();
	});
});

// MEDIUM PATH
describe('Accordion — Prop-driven behavior', () => {
	test('opens accordion when defaultOpen is true', () => {
		render(
			<Accordion title='Open Accordion' defaultOpen>
				<div data-testid='accordion-body'>Visible Content</div>
			</Accordion>
		);

		expect(screen.getByTestId('accordion-body')).toBeInTheDocument();
	});

	test('toggles accordion open state when clicked in uncontrolled mode', () => {
		render(
			<Accordion title='Toggle Accordion'>
				<div data-testid='accordion-body'>Toggled Content</div>
			</Accordion>
		);

		const headerButton = screen.getByRole('button');

		fireEvent.click(headerButton);
		expect(screen.getByTestId('accordion-body')).toBeInTheDocument();

		fireEvent.click(headerButton);
		expect(screen.queryByTestId('accordion-body')).not.toBeInTheDocument();
	});

	test('renders description when provided', () => {
		render(
			<Accordion title='With Description' defaultOpen description='Accordion description'>
				<div>Content</div>
			</Accordion>
		);

		expect(screen.getByText('Accordion description')).toBeInTheDocument();
	});
});

// RISKY PATH
describe('Accordion — Controlled and edge-case behavior', () => {
	test('respects controlled open prop', () => {
		const { rerender } = render(
			<Accordion title='Controlled Accordion' open={false}>
				<div data-testid='accordion-body'>Controlled Content</div>
			</Accordion>
		);

		expect(screen.queryByTestId('accordion-body')).not.toBeInTheDocument();

		rerender(
			<Accordion title='Controlled Accordion' open>
				<div data-testid='accordion-body'>Controlled Content</div>
			</Accordion>
		);

		expect(screen.getByTestId('accordion-body')).toBeInTheDocument();
	});

	test('calls onToggle when clicked in controlled mode', () => {
		const onToggle = jest.fn();

		render(
			<Accordion title='Controlled Toggle' open={false} onToggle={onToggle}>
				<div>Content</div>
			</Accordion>
		);

		fireEvent.click(screen.getByRole('button'));
		expect(onToggle).toHaveBeenCalledWith(false);
	});

	test('is disabled when disabled prop is true', () => {
		render(
			<Accordion title='Disabled Accordion' disabled>
				<div>Content</div>
			</Accordion>
		);

		const headerButton = screen.getByRole('button');
		expect(headerButton).toBeDisabled();
	});
});

// SNAPSHOT TESTING
describe('Accordion — Snapshots', () => {
	test('matches default snapshot', () => {
		const { container } = render(
			<Accordion title='Snapshot Accordion'>
				<div>Snapshot Content</div>
			</Accordion>
		);

		expect(container).toMatchSnapshot();
	});

	test('matches snapshot when open with description and expand button', () => {
		const onExpand = jest.fn();

		const { container } = render(
			<Accordion
				title='Complex Accordion'
				defaultOpen
				description='Detailed description'
				onExpand={onExpand}
				className='extra-class'>
				<div>Complex Content</div>
			</Accordion>
		);

		expect(container).toMatchSnapshot();
	});
});
