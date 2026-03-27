import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../buttons';
import BaseTableDoc from '../baseTable/Story/BaseTableDoc';
import { TableCellV2 } from '../cell';
import BaseTable from './BaseTable';

const meta: Meta<typeof BaseTable> = {
	title: 'Components/v2/Table/BaseTable',
	component: BaseTable,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		options: { showToolbar: false },
		docs: {
			page: BaseTableDoc,
		},
	},
};

export default meta;

type Story = StoryObj<typeof BaseTable>;

const headerData = [
	{ title: 'Name', id: 'name', size: 'lg' as const, flexible: true },
	{ title: 'Gender', id: 'gender', size: 'md' as const },
	{ title: 'Age', id: 'age', size: 'md' as const },
	{ title: 'Designation', id: 'designation', fallbackValue: 'NA' },
	{ title: 'State', id: 'state', size: 'sm' as const },
];

const headerDataNoFallback = [
	{ title: 'Name', id: 'name', size: 'lg' as const, flexible: true },
	{ title: 'Gender', id: 'gender', size: 'md' as const },
	{ title: 'Age', id: 'age', size: 'md' as const },
	{ title: 'Designation', id: 'designation' },
	{ title: 'State', id: 'state', size: 'sm' as const },
];

const tableData = [
	{
		name: 'Aryan Dixit',
		gender: 'M',
		age: 27,
		designation: 'UI Engineer',
		state: 'Uttar Pradesh',
	},
	{ name: 'Jaidev Singh Bhui', gender: 'M', age: 23, designation: null, state: 'Delhi' },
	...[...Array(10).keys()].map((i) => ({
		name: `Pradeep Annadurai ${i}`,
		gender: 'M',
		age: 24,
		designation: 'UI Engineer',
		state: 'Tamil Nadu',
	})),
];

const customCells = {
	body: () => ({
		name: ({ datum, expandableProps, ...rest }: any) => (
			<TableCellV2
				{...rest}
				component3={
					!expandableProps?.disabled && (
						<Button
							{...expandableProps}
							title={expandableProps?._expanded ? 'Collapse' : 'Expand'}
							size='auto'
						/>
					)
				}
			/>
		),
	}),
};

export const Default: Story = {
	name: 'Default',
	args: {
		headerData,
		tableData,
		uniqueKey: 'name',
		toggleDrawer: () => {},
	},
};

export const Expandable: Story = {
	name: 'Expandable',
	args: {
		headerData: headerDataNoFallback,
		tableData: tableData.slice(0, 5),
		uniqueKey: 'name',
		customCells,
		toggleDrawer: () => {},
		expandable: ({ datum }: any) => (
			<div style={{ padding: '1rem', background: '#f9f9f9' }}>
				<strong>Details for:</strong> {datum.name} from {datum.state}
			</div>
		),
	},
};

export const Loading: Story = {
	name: 'Loading State',
	args: {
		headerData,
		tableData: [],
		loading: true,
		toggleDrawer: () => {},
	},
};
