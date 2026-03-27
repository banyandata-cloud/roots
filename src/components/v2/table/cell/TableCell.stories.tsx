import type { Meta, StoryObj } from '@storybook/react';
import TableCellDoc from '../cell/Story/CellDoc';
import TableCell from './TableCell';

const meta: Meta<typeof TableCell> = {
	title: 'Components/v2/Table/Cell',
	component: TableCell,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		options: { showToolbar: false },
		docs: {
			page: TableCellDoc,
		},
	},
	decorators: [
		(Story) => (
			<div
				style={{
					background: '#ccc',
					height: '10rem',
					padding: '1rem',
					// Ensuring left alignment
					display: 'block',
				}}>
				<table style={{ borderCollapse: 'collapse' }}>
					<tbody>
						<tr>
							<Story />
						</tr>
					</tbody>
				</table>
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof TableCell>;

export const Default: Story = {
	name: 'Default',
	render: () => (
		<TableCell
			id='default'
			cellContent='Sample cell content'
			type='body'
			onSort={() => {}}
			sortValue={{}}
			rowHeight='md'
		/>
	),
};
