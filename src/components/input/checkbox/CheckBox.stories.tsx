import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import CheckBox from './CheckBox';

/* -------------------------------------------------------------------------- */
/*                                    Meta                                    */
/* -------------------------------------------------------------------------- */

const meta: Meta<typeof CheckBox> = {
	title: 'Components/Input/CheckBox',
	component: CheckBox,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
	args: {
		label: 'Checkbox',
		position: 'right',
		size: 'sm',
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<CheckBox {...args} />
		</ThemedContainer>
	),
};

export const Intermediate: Story = {
	args: {
		label: 'Checkbox',
		position: 'right',
		size: 'sm',
		intermediate: true,
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<CheckBox {...args} />
		</ThemedContainer>
	),
};

export const Disabled: Story = {
	args: {
		label: 'Checkbox',
		position: 'right',
		size: 'sm',
		disabled: true,
	},
	render: (args) => (
		<ThemedContainer theme='light'>
			<CheckBox {...args} />
		</ThemedContainer>
	),
};
