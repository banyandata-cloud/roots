import type { Meta, StoryObj } from '@storybook/react';

import { ThemedContainer } from '../../helpers';
import RichEditor from './RichEditor';

const meta: Meta<typeof RichEditor> = {
	title: 'Components/Input/RichEditor',
	component: RichEditor,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;

type Story = StoryObj<typeof RichEditor>;

/* ------------------------------------------------------------------ */
/* Default */
/* ------------------------------------------------------------------ */
export const Default: Story = {
	args: {},
	render: (args) => (
		<ThemedContainer theme='light'>
			<RichEditor {...args} defaultContent='' />
		</ThemedContainer>
	),
};

/* ------------------------------------------------------------------ */
/* Disabled */
/* ------------------------------------------------------------------ */
export const Disabled: Story = {
	args: {
		disabled: true,
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<RichEditor {...args} defaultContent='' />
		</ThemedContainer>
	),
};

/* ------------------------------------------------------------------ */
/* With Placeholder */
/* ------------------------------------------------------------------ */
export const WithPlaceholder: Story = {
	args: {
		placeholder: 'Start typing here...',
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<RichEditor {...args} defaultContent='' />
		</ThemedContainer>
	),
};
