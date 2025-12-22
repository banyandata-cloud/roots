import type { Meta, StoryObj } from '@storybook/react';
import TableCell from './TableCell';

const meta: Meta<typeof TableCell> = {
	title: 'Components/Table/Cell',
	component: TableCell,
	parameters: {
		options: {
			showToolbar: false,
		},
		docs: {
			description: {
				component:
					'Just extends the Base Cell with the property of text overflow ellipsis. ' +
					'This component uses a combination of all Table elements such as Cell, Header, Column, and Row.',
			},
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
type Story = StoryObj<typeof TableCell>;

export const Default: Story = {
	args: {
		className: '',
		component1: 1,
		component2: 2,
		component3: 3,
	},
};
