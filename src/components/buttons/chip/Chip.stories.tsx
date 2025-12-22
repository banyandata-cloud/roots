import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../../helpers';
import { ArrowIcon, CalenderIcon, CopyIcon } from '../../icons';
import Chip from './Chip';

const meta: Meta<typeof Chip> = {
	title: 'Components/Buttons/Chip',
	component: Chip,
	parameters: {
		options: {
			showToolbar: true,
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

type Story = StoryObj<typeof Chip>;

/* ----------------------------------
 * Default
 * ---------------------------------- */

export const Default: Story = {
	args: {
		title: 'Chip Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'default',
	},
};

/* ----------------------------------
 * With Left Icon
 * ---------------------------------- */

export const WithLeftIcon: Story = {
	args: {
		title: 'Chip Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'default',
		leftComponent: () => <CopyIcon color='#ffffff' />,
	},
};

/* ----------------------------------
 * With Right Icon
 * ---------------------------------- */

export const WithRightIcon: Story = {
	args: {
		title: 'Chip Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'default',
		rightComponent: () => <CopyIcon color='#ffffff' />,
	},
};

/* ----------------------------------
 * With Both Side Icons
 * ---------------------------------- */

export const WithBothSideIcons: Story = {
	args: {
		title: 'Chip Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'default',
		leftComponent: () => <CopyIcon color='#ffffff' />,
		rightComponent: () => <ArrowIcon color='#ffffff' />,
	},
};

/* ----------------------------------
 * With Only Icon
 * ---------------------------------- */

export const WithOnlyIcon: Story = {
	args: {
		title: '',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'default',
		leftComponent: () => <CalenderIcon color='#ffffff' />,
	},
};

/* ----------------------------------
 * Disabled
 * ---------------------------------- */

export const Disabled: Story = {
	args: {
		title: 'Chip Name',
		variant: 'contained',
		size: 'md',
		radius: 'default',
		color: 'secondary',
		disabled: true,
		leftComponent: () => <CopyIcon color='#ffffff' />,
	},
};
