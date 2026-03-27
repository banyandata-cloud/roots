import { Heading, Source, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../docs';

const propsData = [
	{
		prop: 'headerData',
		type: 'TableColumn[]',
		description: 'Array of column config objects defining each column in the table body.',
		default: '[]',
	},
	{
		prop: 'tableData',
		type: 'Record<string, unknown>[]',
		description: 'The row data rendered in the table body, mapped against headerData by id.',
		default: '[]',
	},
	{
		prop: 'checkedRows',
		type: 'Record<string, unknown>[]',
		description: 'Currently checked rows. Managed externally via usePagination or useState.',
		default: '[]',
	},
	{
		prop: 'setCheckedRows',
		type: '(rows: Record<string, unknown>[]) => void',
		description: 'Setter to update the checked rows state.',
		default: '-',
	},
	{
		prop: 'uniqueKey',
		type: 'string',
		description:
			'The key in each row object used as a unique identifier for checkboxes and active row tracking.',
		default: '""',
	},
	{
		prop: 'rowHeight',
		type: "'md' | 'lg'",
		description: 'Controls the height of each row.',
		default: "'md'",
	},
	{
		prop: 'onRowClick',
		type: '(datum: Record<string, unknown>, setActiveId?: () => void) => void',
		description: 'Callback fired when a row is clicked. Receives the full row data.',
		default: 'undefined',
	},
	{
		prop: 'defaultActiveIndex',
		type: 'number',
		description: 'Index of the row that should be active by default.',
		default: 'undefined',
	},
	{
		prop: 'onCheck',
		type: '(checkedRows: Record<string, unknown>[]) => void',
		description:
			'Callback fired when row checkboxes are toggled. Enables checkbox column when provided.',
		default: 'undefined',
	},
	{
		prop: 'checkAsRadio',
		type: 'boolean',
		description: 'Restricts row selection to a single row at a time, like a radio button.',
		default: 'undefined',
	},
	{
		prop: 'disableCheck',
		type: '(datum: Record<string, unknown>) => boolean',
		description: 'Callback to conditionally disable the checkbox on specific rows.',
		default: 'undefined',
	},
	{
		prop: 'hideColumnLines',
		type: 'boolean',
		description: 'Hides the vertical divider lines between columns.',
		default: 'false',
	},
	{
		prop: 'expandable',
		type: '(params: { datum: Record<number, unknown>; index?: number }) => ReactElement',
		description: 'Render function for expandable row content.',
		default: 'undefined',
	},
	{
		prop: 'toggleDrawer',
		type: '(props: object) => void',
		description: 'Callback to open the side drawer for a row.',
		default: 'undefined',
	},
	{
		prop: 'customCells',
		type: 'CustomCells',
		description: 'Custom header or body cell renderers mapped by column id.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Custom CSS class name to apply additional styles to the table body.',
		default: 'undefined',
	},
];

const TableBodyDoc = () => (
	<>
		<Title />
		<Subtitle>
			TableBody renders the row data of a table. It handles row selection, checkboxes, active
			state, expandable rows, and drawer toggling. Always wrap it in a native table element
			and manage checkedRows state externally.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=798-1749&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/table/body'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the TableBody component.</p>
		<PropsTable data={propsData} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { TableBody } from '@banyan_cloud/roots';
import { useState } from 'react';

const MyComponent = () => {
  const [checkedRows, setCheckedRows] = useState([]);

  return (
    <table>
      <TableBody
        uniqueKey='id'
        headerData={[
          { id: 'name', title: 'Name', size: 'lg', flexible: true },
          { id: 'designation', title: 'Designation' },
          { id: 'age', title: 'Age', size: 'md' },
        ]}
        tableData={[
          { id: 1, name: 'Aryan Dixit', designation: 'UI Engineer', age: 27 },
          { id: 2, name: 'Pradeep Annadurai', designation: 'Manager', age: 24 },
        ]}
        checkedRows={checkedRows}
        setCheckedRows={setCheckedRows}
        onCheck={(rows) => console.log(rows)}
        onRowClick={(datum) => console.log(datum)}
        rowHeight='md'
      />
    </table>
  );
};`}
		/>
	</>
);

export default TableBodyDoc;
