import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ThemedContainer } from '../../helpers';
import Slider from './Slider';

const meta: Meta<typeof Slider> = {
	title: 'Components/Input/Slider',
	component: Slider,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Slider>;

/* ------------------------------------------------------------------ */
/* Default */
/* ------------------------------------------------------------------ */
export const Default: Story = {
	args: {
		label: 'label',
		min: 0,
		max: 100,
	},
	render: (args) => {
		const [value, setValue] = useState(0);

		return (
			<ThemedContainer theme='light'>
				<Slider {...args} value={value} onChange={(_, v) => setValue(v)} />
			</ThemedContainer>
		);
	},
};

/* ------------------------------------------------------------------ */
/* Range */
/* ------------------------------------------------------------------ */
export const Range: Story = {
	args: {
		label: 'label',
		node1: 20,
		node2: 70,
		min: 0,
		max: 100,
		range: true,
	},
	render: (args) => {
		const [value, setValue] = useState<[number, number]>([args.node1 ?? 20, args.node2 ?? 70]);

		return (
			<ThemedContainer theme='light'>
				<Slider
					{...args}
					value={value}
					onChange={(_, v) => {
						setValue(v);
						console.log(v);
					}}
				/>
			</ThemedContainer>
		);
	},
};

/* ------------------------------------------------------------------ */
/* Disabled */
/* ------------------------------------------------------------------ */
export const Disabled: Story = {
	args: {
		min: 20,
		max: 70,
		disabled: true,
	},
	render: (args) => {
		const [value, setValue] = useState(20);

		return (
			<ThemedContainer theme='light'>
				<Slider {...args} value={value} onChange={(_, v) => setValue(v)} />
			</ThemedContainer>
		);
	},
};
