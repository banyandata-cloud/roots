import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta: Meta<typeof Text> = {
	title: 'Components/Text',
	component: Text,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof Text>;

/* ---------------------------------- */
/* Shared render                       */
/* ---------------------------------- */

const renderText = (args: any) => <Text {...args}>This is just some sample text.</Text>;

/* ---------------------------------- */
/* Stories                             */
/* ---------------------------------- */

export const Header: Story = {
	args: {
		variant: 'h1',
		stroke: 'semibold',
	},
	render: renderText,
};

export const Body: Story = {
	args: {},
	render: renderText,
};
