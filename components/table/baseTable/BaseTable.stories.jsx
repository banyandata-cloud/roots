import React from 'react';
import { Button } from '../../buttons';
import { TableColumn } from '../BaseTable.class';
import BaseTable from './BaseTable';

export default {
	title: 'Components/Table/BaseTable',
	component: BaseTable,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return (
		<div>
			<BaseTable {...args} />
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
			flexible: true,
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
		...[...Array(30).keys()].map(() => {
			return {
				name: 'Pradeep Annadurai',
				gender: 'M',
				age: 24,
				designation: 'UI Engineer',
				state: 'Tamil Nadu',
			};
		}),
	],
};

Default.parameters = {};

export const Expandable = Template.bind({});

Expandable.args = {
	...Default.args,
	expandable: () => {
		return <BaseTable {...Default.args} />;
	},
};

Expandable.parameters = {};
