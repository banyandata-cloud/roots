import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import { ArrowIcon, CopyIcon } from '../../icons';
import TextFieldv2 from './TextField';

const meta: Meta<typeof TextFieldv2> = {
	title: 'Components/Input/TextField',
	component: TextFieldv2,
	parameters: {
		options: { showToolbar: true },
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
type Story = StoryObj<typeof TextFieldv2>;

export const Default: Story = {
	args: {
		label: 'Enter Password',
		type: 'password',
		feedback: {
			error: 'ERROR',
		},
		size: 'md',
	},
};

export const WithRightIcon: Story = {
	args: {
		label: 'Label',
		placeholder: 'Type Here...',
		type: 'email',
		size: 'md',
		RightComponent: () => <ArrowIcon active height='12' width='12' color='#0aa6ee' />,
	},
};

export const WithLeftIcon: Story = {
	args: {
		label: 'Label',
		placeholder: 'Type Here...',
		type: 'text',
		size: 'md',
		LeftComponent: () => <CopyIcon height='18' width='18' color='#0aa6ee' />,
	},
};

export const WithBothSideIcons: Story = {
	args: {
		label: 'Label',
		placeholder: 'Type Here...',
		type: 'text',
		size: 'md',
		LeftComponent: () => <CopyIcon height='18' width='18' color='#0aa6ee' />,
		RightComponent: () => <ArrowIcon active height='12' width='12' color='#0aa6ee' />,
	},
};

export const WithRightIconLabel: Story = {
	args: {
		label: 'Label',
		placeholder: 'Type Here...',
		type: 'text',
		size: 'md',
		LeftComponent: () => <CopyIcon height='18' width='18' color='#0aa6ee' />,
		RightComponent: () => (
			<>
				<span>Label</span>
				<ArrowIcon active height='12' width='12' color='#0aa6ee' />
			</>
		),
	},
};

export const WithFieldIcon: Story = {
	args: {
		label: 'Label',
		placeholder: 'Type Here...',
		type: 'text',
		size: 'md',
		LeftComponent: () => <CopyIcon height='18' width='18' color='#0aa6ee' />,
		RightComponent: () => <ArrowIcon active height='12' width='12' color='#0aa6ee' />,
		rightIconLabel: 'Label',
		fieldIcon: () => <ArrowIcon active height='12' width='12' color='#0aa6ee' />,
		fieldInfo: 'Some Text',
	},
};
