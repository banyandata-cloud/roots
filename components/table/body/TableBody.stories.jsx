import React from 'react';
import { TableColumn } from '../BaseTable.class';
import TableBody from './TableBody';

export default {
	title: 'Components/Table/Body',
	component: TableBody,
	parameters: {
		options: {
			showToolbar: false,
		},
		componentSubtitle: 'Just extends the Base Cell with the property of text overflow ellipsis',
	},
};

const Template = (args) => {
	return (
		<div>
			<TableBody {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	headerData: [
		new TableColumn({
			title: 'Name',
			id: 'name',
			size: 'lg',
		}),
		new TableColumn({
			title: 'Gender',
			id: 'gender',
			size: 'sm',
		}),
		new TableColumn({
			title: 'Age',
			id: 'age',
			size: 'sm',
		}),
		new TableColumn({
			title: 'Designation',
			id: 'designation',
		}),
		new TableColumn({
			title: 'State',
			id: 'state',
			size: 'sm',
		}),
	],
	tableData: [
		{
			name: 'Jaidev Singh Bhui',
			gender: 'M',
			age: 23,
			designation: 'UI Engineer',
			state: 'Delhi',
		},
		{
			name: 'Pradeep Annadurai',
			gender: 'M',
			age: 24,
			designation: 'UI Engineer',
			state: 'Tamil Nadu',
		},
	],
};

Default.parameters = {};
