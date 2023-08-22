import React from 'react';
import { TableColumn } from '../BaseTable.class';
import TableHeader from './TableHeader';

export default {
	title: 'Components/Table/Header',
	component: TableHeader,
	parameters: {
		options: {
			showToolbar: false,
		},
		componentSubtitle: 'Container of Table Header',
	},
};

const Template = (args) => {
	return (
		<div>
			<TableHeader {...args} />
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
};

Default.parameters = {};
