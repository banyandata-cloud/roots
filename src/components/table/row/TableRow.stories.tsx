import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../buttons';
import Text from '../../text/Text';
import { TableCellV2 } from '../cell';
import TableRow from './TableRow';

const meta: Meta<typeof TableRow> = {
	title: 'Components/Table/Row',
	component: TableRow,
	parameters: {
		options: {
			showToolbar: false,
		},
	},
};

export default meta;

type Story = StoryObj<typeof TableRow>;

/* ----------------------------------
 * Default
 * ---------------------------------- */

export const Default: Story = {
	args: {
		datum: {
			name: 'Aryan Dixit',
			age: 27,
			designation: null,
			state: 'UP',
		},
		onRowClick: (datum, setActiveId) => {
			console.log(datum, setActiveId);
		},
		headerData: [
			{
				title: 'Name',
				id: 'name',
				size: 'lg',
			},
			{
				title: 'Age',
				id: 'age',
				size: 'sm',
			},
			{
				title: 'Designation',
				id: 'designation',
				fallbackValue: 'Fallback',
			},
			{
				title: 'State',
				id: 'state',
				size: 'sm',
			},
		],
	},
};

/* ----------------------------------
 * Expandable
 * ---------------------------------- */

export const Expandable: Story = {
	args: {
		datum: {
			name: 'Aryan Dixit',
			age: 27,
			designation: 'UI Engineer',
			state: 'UP',
		},
		onRowClick: (datum, setActiveId) => {
			console.log(datum, setActiveId);
		},
		headerData: [
			{
				title: 'Name',
				id: 'name',
				size: 'lg',
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
		expandable: ({ datum }) => {
			return <Text variant='h2'>Welcome {datum.name}!</Text>;
		},
		customCells: {
			body: () => ({
				name: ({ datum, expandableProps, ...rest }) => (
					<TableCellV2
						{...rest}
						component3={
							<Button
								{...expandableProps}
								title={expandableProps?._expanded ? 'Collapse' : 'Expand'}
								size='auto'
							/>
						}
					/>
				),
			}),
		},
	},
};
