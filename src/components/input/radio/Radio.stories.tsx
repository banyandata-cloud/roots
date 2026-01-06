import type { Meta, StoryObj } from '@storybook/react';

import { ThemedContainer } from '../../helpers';
import Radio from './Radio';

const meta: Meta<typeof Radio> = {
	title: 'Components/Input/Radio',
	component: Radio,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Radio>;

/* ------------------------------------------------------------------ */
/* Default */
/* ------------------------------------------------------------------ */
export const Default: Story = {
	args: {
		label: 'Radio',
		position: 'left',
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<Radio {...args} />
		</ThemedContainer>
	),
};

/* ------------------------------------------------------------------ */
/* Disabled */
/* ------------------------------------------------------------------ */
export const Disabled: Story = {
	args: {
		label: 'Radio',
		disabled: true,
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<Radio {...args} />
		</ThemedContainer>
	),
};

/* ------------------------------------------------------------------ */
/* Controlled */
/* ------------------------------------------------------------------ */
export const Controlled: Story = {
	args: {
		label: 'Controlled Radio',
		checked: true,
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<Radio {...args} />
		</ThemedContainer>
	),
};

/* ------------------------------------------------------------------ */
/* Uncontrolled */
/* ------------------------------------------------------------------ */
export const Uncontrolled: Story = {
	args: {
		label: 'Uncontrolled Radio',
		defaultChecked: true,
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<Radio {...args} />
		</ThemedContainer>
	),
};

/* ------------------------------------------------------------------ */
/* Right Positioned */
/* ------------------------------------------------------------------ */
export const RightPositioned: Story = {
	args: {
		label: 'Radio',
		position: 'right',
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<Radio {...args} />
		</ThemedContainer>
	),
};

/* ------------------------------------------------------------------ */
/* Large Size */
/* ------------------------------------------------------------------ */
export const Large: Story = {
	args: {
		label: 'Large Radio',
		size: 'lg',
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<Radio {...args} />
		</ThemedContainer>
	),
};
