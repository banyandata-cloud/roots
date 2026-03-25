/// <reference types="jest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { InlineLoader } from './InlineLoader';

// HAPPY PATH
describe('InlineLoader — Basic Rendering', () => {
	test('safely renders the loading state', () => {
		render(<InlineLoader status="loading" />);
		expect(screen.getByTestId('inline-loader')).toBeInTheDocument();
	});

	test('safely renders the success state with text', () => {
		render(<InlineLoader status="success" text="Upload Complete" />);
		expect(screen.getByText('Upload Complete')).toBeInTheDocument();
	});

	test('safely renders the error state with text', () => {
		render(<InlineLoader status="error" text="Network Failure" />);
		expect(screen.getByText('Network Failure')).toBeInTheDocument();
	});
});

// SNAPSHOT TESTING
describe('InlineLoader — Snapshots', () => {
	test('matches loading snapshot', () => {
		const { container } = render(<InlineLoader status="loading" />);
		expect(container).toMatchSnapshot();
	});

	test('matches success snapshot', () => {
		const { container } = render(<InlineLoader status="success" text="Upload Complete" />);
		expect(container).toMatchSnapshot();
	});

	test('matches error snapshot', () => {
		const { container } = render(<InlineLoader status="error" text="Network Failure" />);
		expect(container).toMatchSnapshot();
	});
});
