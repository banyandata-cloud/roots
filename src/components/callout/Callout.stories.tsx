import type { Meta, StoryObj } from '@storybook/react';
import { ThemedContainer } from '../helpers';
import Callout from './Callout';

const meta: Meta<typeof Callout> = {
	title: 'Components/Callout',
	component: Callout,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<div style={{ width: '50%' }}>
					<Story />
				</div>
			</ThemedContainer>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Callout>;

/* ----------------------------------
 * Info
 * ---------------------------------- */

export const Info: Story = {
	args: {
		title: 'Information',
		description: 'Basic Info Basic Info Basic Info Basic Info Basic Info',
		type: 'info',
	},
};

/* ----------------------------------
 * Error
 * ---------------------------------- */

export const Error: Story = {
	args: {
		title: 'Error',
		description: 'Basic Error',
		type: 'error',
	},
};

/* ----------------------------------
 * Warning
 * ---------------------------------- */

export const Warning: Story = {
	args: {
		title: 'Warning',
		description: 'Basic Warning',
		type: 'warning',
	},
};

/* ----------------------------------
 * Success
 * ---------------------------------- */

export const Success: Story = {
	args: {
		title: 'Success',
		description: 'Basic Success',
		type: 'success',
	},
};

/* ----------------------------------
 * Danger
 * ---------------------------------- */

export const Danger: Story = {
	args: {
		title: 'Danger',
		description: 'Basic Danger',
		type: 'danger',
	},
};
