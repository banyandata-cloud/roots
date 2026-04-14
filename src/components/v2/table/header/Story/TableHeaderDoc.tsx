import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../docs';

const tableHeaderPropsData = [
	{
		prop: 'headerData',
		type: 'TableColumn[]',
		description: 'Configuration for each column (title, sortable, filters, etc.).',
		default: '[]',
	},
	{
		prop: 'tableData',
		type: 'Record<string, unknown>[]',
		description: 'The dataset used to calculate bulk selection (Select All) logic.',
		default: '[]',
	},
	{
		prop: 'checkedRows',
		type: 'Record<string, unknown>[]',
		description:
			'Currently selected rows to determine if the header checkbox is checked or indeterminate.',
		default: '[]',
	},
	{
		prop: 'setCheckedRows',
		type: '(rows: Record<string, unknown>[]) => void',
		description: 'Setter function to update the global checked state.',
		default: '-',
	},
	{
		prop: 'onSort',
		type: '(id: string, direction: SortType) => void',
		description: 'Callback triggered when a sortable column title is clicked.',
		default: 'undefined',
	},
	{
		prop: 'sortValue',
		type: 'Record<string, SortType>',
		description: 'Controlled sort state mapped by column ID.',
		default: 'undefined',
	},
	{
		prop: 'uniqueKey',
		type: 'string',
		description: 'The key used to identify unique rows for bulk selection calculations.',
		default: '""',
	},
];

const TableHeaderDoc = () => (
	<>
		<Title />
		<Subtitle>
			The TableHeader component wraps the <code>thead</code> element and utilizes{' '}
			<code>TableRow</code>
			with <code>type="header"</code> to render column titles, sorting icons, and bulk
			selection controls.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=798-1749&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/table/header'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the TableHeader component.</p>
		<PropsTable data={tableHeaderPropsData} />

		<Heading>Usage</Heading>
		<Subheading>Sorting and Filtering</Subheading>
		<p>
			The header automatically renders sort icons and filter dropdowns if the{' '}
			<code>headerData</code>
			objects have <code>sort: true</code> or <code>columnFilter: true</code>.
		</p>
		<Source
			language='tsx'
			code={`
import TableHeader from './TableHeader';

const Example = () => {
  const [checked, setChecked] = useState([]);
  
  return (
    <table>
      <TableHeader
        headerData={[
          { id: 'name', title: 'Name', sort: true },
          { id: 'status', title: 'Status', columnFilter: true, filterOptions: ['Active', 'Paused'] }
        ]}
        tableData={myData}
        checkedRows={checked}
        setCheckedRows={setChecked}
        onSort={(id, dir) => console.log(id, dir)}
        uniqueKey="id"
      />
    </table>
  );
};
            `}
		/>

		<Heading>Bulk Selection Logic</Heading>
		<p>
			The <code>TableHeader</code> provides a high-level checkbox that manages the entire
			table state:
		</p>
		<ul>
			<li>
				<strong>Unchecked:</strong> No rows (or only some rows) are selected.
			</li>
			<li>
				<strong>Indeterminate:</strong> Some rows are selected, but not all.
			</li>
			<li>
				<strong>Checked:</strong> All selectable rows in the current <code>tableData</code>{' '}
				are present in <code>checkedRows</code>.
			</li>
		</ul>
		<p>
			Note: <code>disableCheck</code> is respected; disabled rows are excluded from the
			"Select All" calculation.
		</p>
	</>
);

export default TableHeaderDoc;
