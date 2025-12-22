import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ThemedContainer } from '../../helpers';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
	title: 'Components/Input/Switch',
	component: Switch,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Switch>;

/* ------------------------------------------------------------------ */
/* Default */
/* ------------------------------------------------------------------ */
export const Default: Story = {
	args: {
		label: 'Switch',
		position: 'left',
	},
	render: (args) => {
		const [checked, setChecked] = useState(false);

		return (
			<ThemedContainer theme='light'>
				<Switch {...args} checked={checked} onChange={(value) => setChecked(value)} />
			</ThemedContainer>
		);
	},
};

// Disabled
export const Disabled: Story = {
	args: {
		label: 'Switch',
		disabled: true,
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<Switch {...args} />
		</ThemedContainer>
	),
};
