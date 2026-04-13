import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../buttons';
import Text from '../../text/Text';
import { TableCellV2 } from '../cell';
import TableRowDoc from '../row/Story/RowDoc';
import TableRow from './TableRow';

const meta: Meta<typeof TableRow> = {
	title: 'Components/v2/Table/Row',
	component: TableRow,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		options: { showToolbar: false },
		docs: {
			page: TableRowDoc,
		},
	},
};

export default meta;

type Story = StoryObj<typeof TableRow>;

const headingStyle = {
	fontSize: '14px',
	fontWeight: 600,
	color: '#6B7280',
	textTransform: 'uppercase' as const,
	letterSpacing: '0.05em',
	margin: '0 0 8px 0',
};

const sectionWrapperStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '24px',
};

const RowWithState = (args: React.ComponentProps<typeof TableRow>) => {
	const [checkedRows, setCheckedRows] = useState<Record<string, unknown>[]>([]);
	return <TableRow {...args} checkedRows={checkedRows} setCheckedRows={setCheckedRows} />;
};

const AllVariants = (args: React.ComponentProps<typeof TableRow>) => {
	return (
		<div style={sectionWrapperStyle}>
			<div>
				<p style={headingStyle}>Default</p>
				<RowWithState
					{...args}
					datum={{
						id: 1,
						name: 'Aryan Dixit',
						age: 27,
						designation: null,
						state: 'UP',
					}}
					uniqueKey='id'
					onCheck={(rows: any) => console.log('checked rows', rows)}
					onRowClick={(datum: any) => console.log(datum)}
					headerData={[
						{ title: 'Name', id: 'name', size: 'lg' as const },
						{ title: 'Age', id: 'age', size: 'sm' as const },
						{ title: 'Designation', id: 'designation', fallbackValue: 'Fallback' },
						{ title: 'State', id: 'state', size: 'sm' as const },
					]}
				/>
			</div>

			<div>
				<p style={headingStyle}>Expandable</p>
				<RowWithState
					{...args}
					datum={{
						id: 2,
						name: 'Aryan Dixit',
						age: 27,
						designation: 'UI Engineer',
						state: 'UP',
					}}
					uniqueKey='id'
					onCheck={(rows: any) => console.log('checked rows', rows)}
					onRowClick={(datum: any) => console.log(datum)}
					headerData={[
						{ title: 'Name', id: 'name', size: 'lg' as const },
						{ title: 'Age', id: 'age', size: 'sm' as const },
						{ title: 'Designation', id: 'designation' },
						{ title: 'State', id: 'state', size: 'sm' as const },
					]}
					expandable={({ datum }: any) => <Text variant='h2'>Welcome {datum.name}!</Text>}
					customCells={{
						body: () => ({
							name: ({ datum, expandableProps, ...rest }: any) => (
								<TableCellV2
									{...rest}
									component3={
										<Button
											{...expandableProps}
											title={
												expandableProps?._expanded ? 'Collapse' : 'Expand'
											}
											size='auto'
										/>
									}
								/>
							),
						}),
					}}
				/>
			</div>
		</div>
	);
};

export const All: Story = {
	name: 'All Variants',
	render: (args) => <AllVariants {...args} />,
	args: {},
};
