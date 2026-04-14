import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../docs';

const tableRowPropsData = [
	{
		prop: 'datum',
		type: 'Record<string, unknown>',
		description: 'The data object representing the current row.',
		default: '-',
	},
	{
		prop: 'type',
		type: "'body' | 'header'",
		description: 'Determines if the row renders header cells (titles) or body cells (data).',
		default: "'body'",
	},
	{
		prop: '_index',
		type: 'number',
		description: 'The index of the row within the table data array.',
		default: 'undefined',
	},
	{
		prop: 'uniqueKey',
		type: 'string',
		description: 'The unique identifier key used to track selection and matching.',
		default: '""',
	},
	{
		prop: 'checkedRows',
		type: 'Record<string, unknown>[]',
		description: 'Array of currently selected row objects.',
		default: '[]',
	},
	{
		prop: 'setCheckedRows',
		type: '(rows: Record<string, unknown>[]) => void',
		description: 'Callback function to update the checked rows state.',
		default: '-',
	},
	{
		prop: 'expandable',
		type: '(params: { datum, index }) => ReactElement',
		description: 'Function that returns a component to be rendered when the row is expanded.',
		default: 'undefined',
	},
	{
		prop: 'checkAsRadio',
		type: 'boolean',
		description: 'If true, the selection behaves like a radio button (single selection).',
		default: 'false',
	},
	{
		prop: 'disableCheck',
		type: '(datum: Record<string, unknown>) => boolean',
		description: 'Function to determine if the checkbox/radio should be disabled for this row.',
		default: 'undefined',
	},
	{
		prop: 'rowHeight',
		type: "'md' | 'lg'",
		description: 'Sets the vertical sizing variant of the row.',
		default: "'md'",
	},
	{
		prop: 'onCheck',
		type: '(checkedRows: Record<string, unknown>[]) => void',
		description: 'Callback triggered when the selection state changes.',
		default: 'undefined',
	},
	{
		prop: 'onRowClick',
		type: '(datum: Record<string, unknown>) => void',
		description: 'Callback triggered when the row is clicked (disabled if onCheck is present).',
		default: 'undefined',
	},
	{
		prop: 'hideColumnLines',
		type: 'boolean',
		description: 'Hides vertical dividers between cells in this row.',
		default: 'false',
	},
	{
		prop: 'headerData',
		type: 'TableColumn[]',
		description: 'Column definitions used to map row data to the correct cells.',
		default: '[]',
	},
	{
		prop: 'customCells',
		type: 'CustomCells',
		description: 'Custom header or body cell renderers mapped by column id.',
		default: 'undefined',
	},
	{
		prop: 'toggleDrawer',
		type: '(props: object) => void',
		description: 'Callback to open the side drawer for this row.',
		default: 'undefined',
	},
];

const TableRowDoc = () => (
	<>
		<Title />
		<Subtitle>
			The TableRow component is the structural engine of the Table, responsible for mapping
			data to cells, managing row selection (Checkbox/Radio), and handling expandable content.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=798-1749&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/table/row'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the TableRow component.</p>
		<PropsTable data={tableRowPropsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used by the TableRow component.</p>

		<Subheading>SortType</Subheading>
		<Source language='tsx' code={`type SortType = 'asc' | 'desc' | 'default';`} />

		<Heading>Usage</Heading>

		<Subheading>Standard Data Row</Subheading>
		<p>A basic implementation of a data row with selection and custom height.</p>
		<Source
			language='tsx'
			code={`
import TableRow from './TableRow';

const MyRow = () => {
  const [checked, setChecked] = useState([]);
  
  return (
    <table>
      <tbody>
        <TableRow
          datum={{ id: '101', name: 'Aryan Dixit', role: 'Dev' }}
          uniqueKey="id"
          rowHeight="lg"
          headerData={[
            { id: 'name', title: 'User Name' },
            { id: 'role', title: 'Designation' }
          ]}
          checkedRows={checked}
          setCheckedRows={setChecked}
        />
      </tbody>
    </table>
  );
};
            `}
		/>
	</>
);

export default TableRowDoc;
