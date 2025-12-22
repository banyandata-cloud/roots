import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import { ArrowIcon, CopyIcon } from '../../icons';
import Button from './Button';

const meta: Meta<typeof Button> = {
	title: 'Components/Buttons/Button',
	component: Button,
	parameters: {
		options: {
			showToolbar: true,
		},
		docs: {
			description: {
				component: `
A versatile and customizable button component designed for enabling interactive user experiences
with configurable appearance and behavior.

**Design:** https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library  
**Source:** https://github.com/banyandata-cloud/roots/tree/main/components/buttons/button
				`,
			},
		},
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<Story />
			</ThemedContainer>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Outlined: Story = {
	name: 'Button - Outlined',
	args: {
		title: 'Button Name',
		variant: 'outlined',
		size: 'md',
		radius: 'default',
		color: 'primary',
	},
};

export const Contained: Story = {
	name: 'Button - Contained',
	args: {
		title: 'Button Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'success',
	},
};

export const WithLeftIcon: Story = {
	name: 'With left icon',
	args: {
		title: 'Button Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'primary',
		leftComponent: () => <ArrowIcon height='24' width='24' color='#ffffff' />,
	},
};

export const WithRightIcon: Story = {
	name: 'With right icon',
	args: {
		title: 'Button Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'primary',
		rightComponent: () => <CopyIcon active height='12' width='12' color='#ffffff' />,
	},
};

export const WithBothIcons: Story = {
	name: 'With both side icon',
	args: {
		title: 'Button Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'primary',
		leftComponent: () => <ArrowIcon height='24' width='24' color='#ffffff' />,
		rightComponent: () => <CopyIcon active height='12' width='12' color='#ffffff' />,
	},
};

export const IconOnly: Story = {
	name: 'With only icon',
	args: {
		title: '',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'primary',
		leftComponent: () => <ArrowIcon height='24' width='24' color='#ffffff' />,
	},
};

export const Disabled: Story = {
	name: 'Disabled',
	args: {
		title: 'Button Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'primary',
		disabled: true,
	},
};
