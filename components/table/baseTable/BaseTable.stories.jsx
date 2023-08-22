import React from 'react';
import { TableColumn } from '../BaseTable.class';
import BaseTable from './BaseTable';
import { TableCell } from '../cell';
import { Button } from '../../buttons';

export default {
	title: 'Components/Table/BaseTable',
	component: BaseTable,
	parameters: {
		options: {
			showToolbar: false,
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
	customCells: {
		body: () => {
			return {
				name: ({ datum, expandableProps, ...rest }) => {
					return (
						<TableCell
							{...rest}
							component3={
								!expandableProps.disabled && (
									<Button
										{...expandableProps}
										// eslint-disable-next-line no-underscore-dangle
										title={expandableProps._expanded ? 'Collapse' : 'Expand'}
										size='auto'
									/>
								)
							}
						/>
					);
				},
			};
		},
	},
};

Expandable.parameters = {};

export const ConditionalExpand = Template.bind({});

ConditionalExpand.args = {
	...Expandable.args,
	expandable: ({ index }) => {
		if (index < 3) {
			return null;
		}
		return <BaseTable {...Default.args} />;
	},
};
