import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../buttons';
import Text from '../../text/Text';
import { TableCellV2 } from '../cell';
import TableRowDoc from '../row/Story/RowDoc'; // Import the doc file we created
import TableRow from './TableRow';

const meta: Meta<typeof TableRow> = {
	title: 'Components/v2/Table/Row',
	component: TableRow,
	tags: ['autodocs'], // 1. This enables the "Docs" entry in the sidebar
	parameters: {
		layout: 'padded',
		options: { showToolbar: false },
		docs: {
			page: TableRowDoc, // 2. This links your custom documentation component
		},
	},
};

export default meta;

type Story = StoryObj<typeof TableRow>;

const DefaultStory = (args: React.ComponentProps<typeof TableRow>) => {
	const [checkedRows, setCheckedRows] = useState<Record<string, unknown>[]>([]);
	return <TableRow {...args} checkedRows={checkedRows} setCheckedRows={setCheckedRows} />;
};

export const Default: Story = {
	name: 'Default',
	render: (args) => <DefaultStory {...args} />,
	args: {
		datum: {
			id: 1,
			name: 'Aryan Dixit',
			age: 27,
			designation: null,
			state: 'UP',
		},
		uniqueKey: 'id',
		onCheck: (rows: any) => {
			console.log('checked rows', rows);
		},
		onRowClick: (datum: any) => {
			console.log(datum);
		},
		headerData: [
			{ title: 'Name', id: 'name', size: 'lg' as const },
			{ title: 'Age', id: 'age', size: 'sm' as const },
			{ title: 'Designation', id: 'designation', fallbackValue: 'Fallback' },
			{ title: 'State', id: 'state', size: 'sm' as const },
		],
	},
};

export const Expandable: Story = {
	name: 'Expandable',
	render: (args) => <DefaultStory {...args} />,
	args: {
		datum: {
			id: 2,
			name: 'Aryan Dixit',
			age: 27,
			designation: 'UI Engineer',
			state: 'UP',
		},
		uniqueKey: 'id',
		onCheck: (rows: any) => {
			console.log('checked rows', rows);
		},
		onRowClick: (datum: any) => {
			console.log(datum);
		},
		headerData: [
			{ title: 'Name', id: 'name', size: 'lg' as const },
			{ title: 'Age', id: 'age', size: 'sm' as const },
			{ title: 'Designation', id: 'designation' },
			{ title: 'State', id: 'state', size: 'sm' as const },
		],
		expandable: ({ datum }: any) => {
			return <Text variant='h2'>Welcome {datum.name}!</Text>;
		},
		customCells: {
			body: () => {
				return {
					name: ({ datum, expandableProps, ...rest }: any) => {
						return (
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
						);
					},
				};
			},
		},
	},
};
