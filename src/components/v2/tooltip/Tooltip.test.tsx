/// <reference types="jest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

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
