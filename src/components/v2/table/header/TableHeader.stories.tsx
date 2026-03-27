import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TableHeaderDoc from '../header/Story/TableHeaderDoc';
import TableHeader from './TableHeader';

const meta: Meta<typeof TableHeader> = {
	title: 'Components/v2/Table/Header', // Unique title
	component: TableHeader,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		options: { showToolbar: false },
		docs: {
			page: TableHeaderDoc,
		},
	},
};

export default meta;

type Story = StoryObj<typeof TableHeader>;

const DefaultStory = (args: React.ComponentProps<typeof TableHeader>) => {
	const [checkedRows, setCheckedRows] = useState<Record<string, unknown>[]>([]);
	return <TableHeader {...args} checkedRows={checkedRows} setCheckedRows={setCheckedRows} />;
};

export const Default: Story = {
	name: 'Default',
	render: (args) => <DefaultStory {...args} />,
	args: {
		headerData: [
			{ title: 'Name', id: 'name', size: 'lg' as const, sort: true, flexible: true },
			{
				title: 'Gender',
				id: 'gender',
				size: 'md' as const,
				sort: true,
				columnFilter: true,
				filterOptions: ['Option1', 'Option2'],
				flexible: true,
			},
			{ title: 'Age', id: 'age', size: 'md' as const, sort: true, flexible: true },
			{
				title: 'Designation',
				id: 'designation',
				sort: true,
				columnFilter: true,
				filterOptions: ['Option1', 'Option2'],
				flexible: true,
			},
			{ title: 'State', id: 'state', size: 'sm' as const, sort: true, flexible: true },
		],
		tableData: [
			{
				id: 1,
				name: 'Row 1',
				gender: 'Male',
				age: 25,
				designation: 'Engineer',
				state: 'Active',
			},
			{
				id: 2,
				name: 'Row 2',
				gender: 'Female',
				age: 30,
				designation: 'Manager',
				state: 'Active',
			},
			{
				id: 3,
				name: 'Row 3',
				gender: 'Male',
				age: 28,
				designation: 'Designer',
				state: 'Inactive',
			},
		],
		uniqueKey: 'id',
		onCheck: (rows: any) => {
			console.log('checked rows:', rows);
		},
		onSort: (id: any, direction: any) => {
			console.log(id, direction);
		},
	},
};
