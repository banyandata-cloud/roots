import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';

const meta: Meta<typeof Link> = {
	title: 'Components/Link',
	component: Link,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Heading: Story = {
	render: (args) => <Link {...args}>This is just some sample text.</Link>,
};
