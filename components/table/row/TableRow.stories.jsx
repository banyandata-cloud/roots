import React from 'react';
import TableRow from './TableRow';
import { TableColumn } from '../BaseTable.class';
import { Button } from '../../buttons';
import { TableCell } from '../cell';
import Text from '../../text/Text';

export default {
	title: 'Components/Table/Row',
	component: TableRow,
	parameters: {
		options: {
			showToolbar: false,
		},
		componentSubtitle: 'Container for table rows of table body',
	},
};

const Template = (args) => {
	return (
		<div>
			<TableRow {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	datum: {
		name: 'Jaidev Singh Bhui',
		age: 23,
		designation: 'UI Engineer',
		state: 'Delhi',
	},
	onRowClick: (datum, setActiveId) => {
		console.log(datum, setActiveId);
	},
	headerData: [
		new TableColumn({
			title: 'Name',
			id: 'name',
			size: 'lg',
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

export const Expandable = Template.bind({});

Expandable.args = {
	...Default.args,
	expandable: ({ datum }) => {
		return <Text variant='h2'>Welcome {datum.name}!</Text>;
	},
	customCells: {
		body: () => {
			return {
				name: ({ datum, expandableProps, ...rest }) => {
					return (
						<TableCell
							{...rest}
							component3={
								<Button
									{...expandableProps}
									// eslint-disable-next-line no-underscore-dangle
									title={expandableProps._expanded ? 'Collapse' : 'Expand'}
									size='auto'
								/>
							}
						/>
					);
				},
			};
		},
	},
};

Expandable.parameters = {};
