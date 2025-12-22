import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../buttons';
import { TableCellV2 } from '../cell';
import BaseTable from './BaseTable';

const meta: Meta<typeof BaseTable> = {
	title: 'Components/Table/BaseTable',
	component: BaseTable,
	parameters: {
		options: { showToolbar: false },
	},
};

export default meta;
type Story = StoryObj<typeof BaseTable>;

/* ---------------- Default ---------------- */

export const Default: Story = {
	args: {
		headerData: [
			{ title: 'Name', id: 'name', size: 'lg', flexible: true },
			{ title: 'Gender', id: 'gender', size: 'sm' },
			{ title: 'Age', id: 'age', size: 'sm' },
			{ title: 'Designation', id: 'designation', fallbackValue: 'NA' },
			{ title: 'State', id: 'state', size: 'sm' },
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
				name: 'Jaidev Singh Bhui',
				gender: 'M',
				age: 23,
				designation: null,
				state: 'Delhi',
			},
			...Array.from({ length: 30 }).map(() => ({
				name: 'Pradeep Annadurai',
				gender: 'M',
				age: 24,
				designation: 'UI Engineer',
				state: 'Tamil Nadu',
			})),
		],
	},
};

/* ---------------- Expandable ---------------- */

export const Expandable: Story = {
	args: {
		...Default.args,
		expandable: () => (
			<BaseTable headerData={Default.args!.headerData} tableData={Default.args!.tableData} />
		),
		customCells: {
			body: () => ({
				name: ({ expandableProps, ...rest }: any) => (
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
		},
	},
};

/* ---------------- Conditional Expandable ---------------- */

export const ConditionalExpandable: Story = {
	args: {
		...Default.args,
		expandable: ({ index }: { index: number }) => {
			if (index < 3) return null;

			return (
				<BaseTable
					headerData={Default.args!.headerData}
					tableData={Default.args!.tableData}
				/>
			);
		},
		customCells: Expandable.args!.customCells,
	},
};
