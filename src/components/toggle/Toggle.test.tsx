import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from './Toggle';

// BUTTON MOCK FOR JEST
jest.mock('../buttons', () => {
	const ReactActual = jest.requireActual('react');

	return {
		Button: ReactActual.forwardRef((props: any, ref: any) => {
			const Left = props.leftComponent;
			const Right = props.rightComponent;

			return (
				<button
					ref={ref}
					data-testid={`btn-${props.title}`}
					disabled={props.disabled}
					onClick={props.onClick}
					className={props.className}>
					{Left && (typeof Left === 'function' ? <Left /> : Left)}
					{props.title}
					{Right && (typeof Right === 'function' ? <Right /> : Right)}
				</button>
			);
		}),
	};
});

// SLIDER LAYOUT MOCK
Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
	get() {
		return 10;
	},
});
Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
	get() {
		return 60;
	},
});

// Happy Path
describe('Toggle — Rendering and default behavior', () => {
	test('renders toggle options', () => {
		const opts = [
			{ value: 'One', title: 'One' },
			{ value: 'Two', title: 'Two' },
		];

		render(<Toggle options={opts} />);
		expect(screen.getByTestId('btn-One')).toBeInTheDocument();
		expect(screen.getByTestId('btn-Two')).toBeInTheDocument();
	});

	test('defaultValue selects correct uncontrolled option', () => {
		const opts = [
			{ value: 'A', title: 'A' },
			{ value: 'B', title: 'B' },
		];

		const { container } = render(<Toggle options={opts} defaultValue='B' smooth />);

		expect(container.innerHTML).toContain('active');
	});

	test('renders JSX inside leftComponent', () => {
		const opts = [
			{ value: 'A', title: 'A', leftComponent: <span data-testid='child'>Child</span> },
		];

		render(<Toggle options={opts} />);
		expect(screen.getByTestId('child')).toBeInTheDocument();
	});
});

// Medium Path
describe('Toggle — Controlled interactions', () => {
	test('clicking calls onChange in controlled mode', () => {
		const mock = jest.fn();
		const opts = [
			{ value: 'X', title: 'X' },
			{ value: 'Y', title: 'Y' },
		];

		render(<Toggle options={opts} value='X' onChange={mock} />);
		fireEvent.click(screen.getByTestId('btn-Y'));
		expect(mock).toHaveBeenCalledWith('Y');
	});

	test('multi-select toggles correctly', () => {
		const mock = jest.fn();
		const opts = [
			{ value: 'one', title: 'One' },
			{ value: 'two', title: 'Two' },
		];

		render(<Toggle options={opts} multi value={['one']} onChange={mock} />);
		fireEvent.click(screen.getByTestId('btn-Two'));
		expect(mock).toHaveBeenCalledWith(['one', 'two']);
	});

	test('renders leftComponent', () => {
		const opts = [{ value: 'A', title: 'A', leftComponent: <div data-testid='leftIcon' /> }];

		render(<Toggle options={opts} />);
		expect(screen.getByTestId('leftIcon')).toBeInTheDocument();
	});

	test('renders rightComponent', () => {
		const opts = [{ value: 'A', title: 'A', rightComponent: <div data-testid='rightIcon' /> }];

		render(<Toggle options={opts} />);
		expect(screen.getByTestId('rightIcon')).toBeInTheDocument();
	});

	test('slider moves', () => {
		const opts = [
			{ value: 'A', title: 'A' },
			{ value: 'B', title: 'B' },
		];

		const { container } = render(<Toggle options={opts} defaultValue='A' smooth />);
		const slider = container.querySelector("[class*='slider']") as HTMLElement;

		expect(slider.style.left).toBe('10px');
		expect(slider.style.width).toBe('60px');
	});
});

// Risky path
describe('Toggle — Disabled and multi-select edge cases', () => {
	test('disabled does NOT trigger click', () => {
		const mock = jest.fn();
		const opts = [
			{ value: 'A', title: 'A', disabled: true },
			{ value: 'B', title: 'B' },
		];

		render(<Toggle options={opts} value='A' onChange={mock} />);
		fireEvent.click(screen.getByTestId('btn-A'));
		expect(mock).not.toHaveBeenCalled();
	});

	test('multi removes item when clicked again', () => {
		const mock = jest.fn();
		const opts = [
			{ value: 'A', title: 'A' },
			{ value: 'B', title: 'B' },
		];

		render(<Toggle options={opts} multi value={['A', 'B']} onChange={mock} />);
		fireEvent.click(screen.getByTestId('btn-A'));
		expect(mock).toHaveBeenCalledWith(['B']);
	});
});

// SNAPSHOT TESTS
describe('Toggle — Snapshots', () => {
	test('default snapshot', () => {
		const opts = [
			{ value: 'A', title: 'A' },
			{ value: 'B', title: 'B' },
		];

		const { container } = render(<Toggle options={opts} smooth />);
		expect(container).toMatchSnapshot();
	});

	test('multi snapshot', () => {
		const opts = [
			{ value: 'A', title: 'A' },
			{ value: 'B', title: 'B' },
		];

		const { container } = render(<Toggle options={opts} multi value={['A']} smooth />);
		expect(container).toMatchSnapshot();
	});
});
