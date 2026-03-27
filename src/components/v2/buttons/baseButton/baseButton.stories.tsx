import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../../helpers';
import BaseButton from './BaseButton';
import BaseButtonDoc from './Story/BaseButtonDoc';

const meta: Meta<typeof BaseButton> = {
	title: 'Components/v2/Buttons/Base Button',
	component: BaseButton,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: BaseButtonDoc,
		},
		layout: 'padded',
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

type Story = StoryObj<typeof BaseButton>;

export const DefaultBaseButton: Story = {
	name: 'Default Base Button',
	args: {
		title: 'Button Title',
		variant: 'contained',
	},
};
