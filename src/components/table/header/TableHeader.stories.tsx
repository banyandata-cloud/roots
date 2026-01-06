import type { Meta, StoryObj } from '@storybook/react';
import TableHeader from './TableHeader';

const meta: Meta<typeof TableHeader> = {
	title: 'Components/Table/Header',
	component: TableHeader,
	parameters: {
		options: {
			showToolbar: false,
		},
		docs: {
			description: {
				component:
					'Container of Table Header. Extends the Base Cell with text overflow ellipsis ' +
					'and supports sorting, expansion, custom cells, and row interactions.',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof TableHeader>;

export const Default: Story = {
	args: {
		headerData: [
			{
				title: 'Name',
				id: 'name',
				size: 'lg',
			},
			{
				title: 'Gender',
				id: 'gender',
				size: 'sm',
			},
			{
				title: 'Age',
				id: 'age',
				size: 'sm',
			},
			{
				title: 'Designation',
				id: 'designation',
			},
			{
				title: 'State',
				id: 'state',
				size: 'sm',
			},
		],
	},
};
