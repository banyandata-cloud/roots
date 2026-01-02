import type { Meta, StoryObj } from '@storybook/react';
import TableBody from './TableBody';

const meta: Meta<typeof TableBody> = {
	title: 'Components/Table/Body',
	component: TableBody,
	parameters: {
		options: {
			showToolbar: false,
		},
		docs: {
			description: {
				component:
					'Just extends the Base Cell with the property of text overflow ellipsis.',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof TableBody>;

export const Default: Story = {
	args: {
		headerData: [
			{
				title: 'Name',
				id: 'name',
				size: 'lg',
				flexible: true,
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
		tableData: [
			{
				name: 'Aryan Dixit',
				gender: 'M',
				age: 27,
				designation: 'UI Engineer',
				state: 'Uttar Pradesh',
			},
			{
				name: 'Pradeep Annadurai',
				gender: 'M',
				age: 24,
				designation: 'UI Engineer',
				state: 'Tamil Nadu',
			},
		],
	},
};
