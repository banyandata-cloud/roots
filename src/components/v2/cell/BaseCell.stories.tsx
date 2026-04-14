import type { Meta, StoryObj } from '@storybook/react';
import { BaseCell } from './BaseCell';
import BaseCellDoc from './Story/BaseCellDoc';

const meta: Meta<typeof BaseCell> = {
	title: 'Components/v2/BaseCell',
	component: BaseCell,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: BaseCellDoc,
		},
		layout: 'padded',
		options: { showToolbar: false },
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

export const Default: Story = {
	name: 'Default',
	args: {
		className: '',
		component1: <span>1</span>,
		component2: <span>2</span>,
		component3: <span>3</span>,
	},
};
