/// <reference types="jest" />
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import styles from './Tooltip.module.css';

// HAPPY PATH
describe('Tooltip — Basic Rendering', () => {
	test('safely renders the tooltip target component natively', () => {
		render(
			<Tooltip content="Tooltip attached" position="top">
				<div data-testid="tooltip-target">Hover Me</div>
			</Tooltip>
		);
		expect(screen.getByTestId('tooltip-target')).toBeInTheDocument();
	});
});

// SNAPSHOT TESTING
describe('Tooltip — Snapshots', () => {
	test('matches standard tooltip baseline snapshot', () => {
		const { container } = render(
			<Tooltip content="Tooltip attached" position="top">
				<div>Hover Me</div>
			</Tooltip>
		);
		expect(container).toMatchSnapshot();
	});

	test('matches interactive tooltip extended snapshot', () => {
		const { container } = render(
			<Tooltip content={<a href="#">Interactive Link</a>} position="right" interactive={true}>
				<button>Click Me</button>
			</Tooltip>
		);
		expect(container).toMatchSnapshot();
	});
});

describe('Tooltip — Pointer Position Variants', () => {
	test('applies start pointer positioning on top placement', async () => {
		render(
			<Tooltip content='Top Start Pointer' position='top' pointerPosition='start'>
				<button>Hover Top Start</button>
			</Tooltip>
		);

		fireEvent.focus(screen.getByRole('button', { name: 'Hover Top Start' }));

		const tooltip = await screen.findByRole('tooltip');
		const arrow = tooltip.querySelector(`.${styles.arrow}`);

		expect(arrow).toHaveStyle('left: 12px');
	});

	test('applies end pointer positioning on bottom placement', async () => {
		render(
			<Tooltip content='Bottom End Pointer' position='bottom' pointerPosition='end'>
				<button>Hover Bottom End</button>
			</Tooltip>
		);

		fireEvent.focus(screen.getByRole('button', { name: 'Hover Bottom End' }));

		const tooltip = await screen.findByRole('tooltip');
		const arrow = tooltip.querySelector(`.${styles.arrow}`);

		expect(arrow).toHaveStyle('left: calc(100% - 12px - 8px)');
	});
});
