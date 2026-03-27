import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../docs';

const tableCellPropsData = [
	{
		prop: 'id',
		type: 'string',
		description: 'Unique identifier for the column, used for sorting and filtering keys.',
		default: '—',
	},
	{
		prop: 'type',
		type: "'header' | 'body'",
		description:
			'Determines the visual style and whether action icons (sort/filter) are rendered.',
		default: "'body'",
	},
	{
		prop: 'cellContent',
		type: 'ReactNode',
		description: 'The main data or component to be displayed within the cell.',
		default: 'undefined',
	},
	{
		prop: 'sort',
		type: 'boolean',
		description: 'Enables sorting interaction. Only applicable if type is "header".',
		default: 'false',
	},
	{
		prop: 'columnFilter',
		type: 'boolean',
		description: 'Enables the filter dropdown icon. Only applicable if type is "header".',
		default: 'false',
	},
	{
		prop: 'filterOptions',
		type: 'string[]',
		description: 'List of strings to display as checkboxes in the filter dropdown.',
		default: '[]',
	},
	{
		prop: 'html',
		type: 'boolean',
		description: 'If true, renders cellContent using dangerouslySetInnerHTML.',
		default: 'false',
	},
	{
		prop: 'sticky',
		type: "'left' | 'right'",
		description: 'Pins the cell to the side during horizontal scrolling.',
		default: 'undefined',
	},
	{
		prop: 'multiLine',
		type: 'boolean',
		description: 'Allows text to wrap into multiple lines instead of truncating.',
		default: 'false',
	},
	{
		prop: 'cellTitle',
		type: 'string',
		description: 'Tooltip or title attribute for the cell.',
		default: 'undefined',
	},
	{
		prop: 'style',
		type: 'CSSProperties',
		description: 'Inline styles applied to the cell.',
		default: 'undefined',
	},
	{
		prop: 'datum',
		type: 'Record<string, unknown>',
		description: 'The full row data object for this cell.',
		default: 'undefined',
	},
	{
		prop: 'filterValue',
		type: 'string[]',
		description: 'Controlled value for the column filter dropdown.',
		default: 'undefined',
	},
	{
		prop: 'onFilter',
		type: '(id: string, selected: string[]) => void',
		description: 'Callback fired when a column filter selection changes.',
		default: 'undefined',
	},
	{
		prop: 'hideColumnLines',
		type: 'boolean',
		description: 'Hides the vertical divider line on this cell.',
		default: 'undefined',
	},
	{
		prop: 'toggleDrawer',
		type: '(index: number, standalone: boolean) => void',
		description: 'Callback to open the row drawer from within a cell.',
		default: 'undefined',
	},
	{
		prop: 'expandableProps',
		type: 'Record<string, unknown> | function',
		description: 'Props passed to the expandable row toggle.',
		default: 'undefined',
	},
	{
		prop: 'tabIndex',
		type: 'number',
		description: 'Tab index for keyboard navigation on the cell.',
		default: 'undefined',
	},
	{
		prop: '_index',
		type: 'number',
		description: 'Row index of this cell, used internally.',
		default: 'undefined',
	},
	{
		prop: 'onSort',
		type: '(columnId: string, direction: SortType) => void',
		description: 'Callback fired when a sortable column header is clicked.',
		default: 'undefined',
	},
	{
		prop: 'sortValue',
		type: 'Record<string, SortType>',
		description: 'Controlled sort state mapped by column id.',
		default: 'undefined',
	},
	{
		prop: 'rowHeight',
		type: "'md' | 'lg'",
		description: 'Controls the height of each row.',
		default: 'undefined',
	},
];

const TableCellDoc = () => (
	<>
		<Title />
		<Subtitle>
			The TableCell component is the most granular building block of the Table. It handles
			content rendering (string, HTML, or React Nodes) and provides header-specific
			interactions like sorting and filtering.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/kywa4kIXJcp4Wl8BBbljZN/Components?node-id=TableCell'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/table/cell'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the TableCell component.</p>
		<PropsTable data={tableCellPropsData} />
		<Heading>Custom Types</Heading>
		<p>Custom types used by the TableCell component.</p>

		<Subheading>SortType</Subheading>
		<Source language='tsx' code={`type SortType = 'asc' | 'desc' | 'default';`} />

		<Subheading>MetaColumnIDs</Subheading>
		<Source language='tsx' code={`type MetaColumnIDs = '__checkbox' | '__action';`} />

		<Heading>Usage</Heading>

		<Subheading>Header with Actions</Subheading>
		<p>
			When a cell is defined as a header, it can include sorting and filtering logic. The sort
			state cycles through: <code>default</code> → <code>asc</code> → <code>desc</code>.
		</p>
		<Source
			language='tsx'
			code={`
<TableCell
  id="status"
  type="header"
  cellContent="Status"
  sort={true}
  columnFilter={true}
  filterOptions={['Active', 'Inactive', 'Pending']}
  onSort={(id, nextState) => handleSort(id, nextState)}
  onFilter={(id, selected) => handleFilter(id, selected)}
/>
            `}
		/>

		<Subheading>Rich Content and HTML</Subheading>
		<p>Cells can render complex React elements or raw HTML strings.</p>
		<Source
			language='tsx'
			code={`
/* React Element */
<TableCell cellContent={<Badge variant="success">Completed</Badge>} />

/* HTML String */
<TableCell 
  html 
  cellContent="<strong>High</strong> Priority" 
/>
            `}
		/>

		<Heading>Internal Components</Heading>
		<p>
			The cell uses <code>BaseCell</code> as its foundation and injects specific components:
		</p>
		<ul>
			<li>
				<strong>component1:</strong> Usually reserved for checkboxes (managed by TableRow).
			</li>
			<li>
				<strong>component2:</strong> The main <code>cellContent</code> wrapped in a span.
			</li>
			<li>
				<strong>component3:</strong> The action group (Sort/Filter buttons) for headers.
			</li>
		</ul>
	</>
);

export default TableCellDoc;
