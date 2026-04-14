import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemedContainer } from '../../helpers';
import TableBodyDoc from './Story/TableBodyDoc';
import TableBody from './TableBody';

const meta: Meta<typeof TableBody> = {
	title: 'Components/v2/Table/Body',
	component: TableBody,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: TableBodyDoc,
		},
		layout: 'padded',
		options: { showToolbar: false },
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<Story />
			</ThemedContainer>
		),
	],
};

export default meta;

type Story = StoryObj<typeof TableBody>;

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '48px',
};

const headingStyle = {
	fontSize: '14px',
	fontWeight: '600' as const,
	fontFamily: 'Jakarta, sans-serif',
	color: '#333',
	borderBottom: '1px solid #e0e0e0',
	paddingBottom: '8px',
	marginBottom: '24px',
};

const HEADER_DATA = [
	{ title: 'Name', id: 'name', size: 'lg' as const, flexible: true },
	{ title: 'Gender', id: 'gender', size: 'md' as const },
	{ title: 'Age', id: 'age', size: 'md' as const },
	{ title: 'Designation', id: 'designation' },
	{ title: 'State', id: 'state', size: 'sm' as const },
];

const TABLE_DATA = [
	{
		id: 1,
		name: 'Aryan Dixit',
		gender: 'M',
		age: 27,
		designation: 'UI Engineer',
		state: 'Uttar Pradesh',
	},
	{
		id: 2,
		name: 'Pradeep Annadurai',
		gender: 'M',
		age: 24,
		designation: 'UI Engineer',
		state: 'Tamil Nadu',
	},
	{
		id: 3,
		name: 'Sneha Sharma',
		gender: 'F',
		age: 26,
		designation: 'Product Designer',
		state: 'Maharashtra',
	},
	{
		id: 4,
		name: 'Rahul Verma',
		gender: 'M',
		age: 30,
		designation: 'Backend Engineer',
		state: 'Karnataka',
	},
];

const ControlledTableBody = (
	props: Omit<React.ComponentProps<typeof TableBody>, 'checkedRows' | 'setCheckedRows'>
) => {
	const [checkedRows, setCheckedRows] = useState<Record<string, unknown>[]>([]);
	return <TableBody {...props} checkedRows={checkedRows} setCheckedRows={setCheckedRows} />;
};

export const AllVariants: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Default</p>
				<table>
					<ControlledTableBody
						headerData={HEADER_DATA}
						tableData={TABLE_DATA}
						uniqueKey='id'
					/>
				</table>
			</div>

			<div>
				<p style={headingStyle}>With Checkboxes</p>
				<table>
					<ControlledTableBody
						headerData={HEADER_DATA}
						tableData={TABLE_DATA}
						uniqueKey='id'
						onCheck={(rows) => console.log('checked:', rows)}
					/>
				</table>
			</div>

			<div>
				<p style={headingStyle}>Radio Selection</p>
				<table>
					<ControlledTableBody
						headerData={HEADER_DATA}
						tableData={TABLE_DATA}
						uniqueKey='id'
						onCheck={(rows) => console.log('checked:', rows)}
						checkAsRadio
					/>
				</table>
			</div>

			<div>
				<p style={headingStyle}>Row Height - lg</p>
				<table>
					<ControlledTableBody
						headerData={HEADER_DATA}
						tableData={TABLE_DATA}
						uniqueKey='id'
						rowHeight='lg'
					/>
				</table>
			</div>

			<div>
				<p style={headingStyle}>Disabled Check on Specific Rows</p>
				<table>
					<ControlledTableBody
						headerData={HEADER_DATA}
						tableData={TABLE_DATA}
						uniqueKey='id'
						onCheck={(rows) => console.log('checked:', rows)}
						disableCheck={(datum) => datum.gender === 'F'}
					/>
				</table>
			</div>

			<div>
				<p style={headingStyle}>Default Active Row</p>
				<table>
					<ControlledTableBody
						headerData={HEADER_DATA}
						tableData={TABLE_DATA}
						uniqueKey='id'
						defaultActiveIndex={0}
						onRowClick={(datum) => console.log('clicked:', datum)}
					/>
				</table>
			</div>
		</div>
	),
};
