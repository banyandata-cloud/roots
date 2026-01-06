import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import BaseButton from './BaseButton';

/**
 * --------------------------------------------
 * Meta configuration
 * --------------------------------------------
 */
const meta: Meta<typeof BaseButton> = {
	title: 'Components/Buttons/BaseButton',
	component: BaseButton,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'A button component used for user interactions',
	},
};

export default meta;

/**
 * --------------------------------------------
 * Types
 * --------------------------------------------
 */
type Story = StoryObj<typeof BaseButton>;

/**
 * --------------------------------------------
 * Shared render wrapper
 * (replaces MDX <Template />)
 * --------------------------------------------
 */
const renderWithTheme = (args: any) => (
	<ThemedContainer theme='light'>
		<BaseButton {...args} />
	</ThemedContainer>
);

/**
 * --------------------------------------------
 * Stories
 * --------------------------------------------
 */

/** Default Base Button */
export const Default: Story = {
	render: renderWithTheme,
	args: {
		title: 'Button Title',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'primary',
	},
};
