import type { Meta, StoryObj } from '@storybook/react';
import { BaseCell } from './BaseCell';

const meta: Meta<typeof BaseCell> = {
	title: 'Components/BaseCell',
	component: BaseCell,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
	decorators: [
		(Story) => (
			<div
				style={{
					background: '#ccc',
					height: '10rem',
					padding: '1rem',
				}}>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof BaseCell>;

/* ----------------------------------
 * Default
 * ---------------------------------- */

export const Default: Story = {
	args: {
		className: '',
		component1: 1,
		component2: 2,
		component3: 3,
	},
};
