import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../docs';

const propsData = [
	{
		prop: 'headerData',
		type: 'TableColumn[]',
		description: 'Array of column config objects defining each column in the table.',
		default: '[]',
	},
	{
		prop: 'tableData',
		type: 'Record<string, unknown>[]',
		description: 'The row data rendered in the table, mapped against headerData by id.',
		default: '[]',
	},
	{
		prop: 'uniqueKey',
		type: 'string',
		description:
			'The key in each row object used as a unique identifier for checkboxes and active row tracking.',
		default: '""',
	},
	{
		prop: 'customCells',
		type: 'CustomCells',
		description: 'Custom header or body cell renderers mapped by column id.',
		default: 'undefined',
	},
	{
		prop: 'paginationData',
		type: 'PaginationData | null',
		description: 'Pagination config. When provided, renders a pagination bar below the table.',
		default: 'null',
	},
	{
		prop: 'loading',
		type: 'boolean',
		description: 'Shows a loading state while data is being fetched.',
		default: 'false',
	},
	{
		prop: 'onIntersection',
		type: '(isVisible: boolean) => void',
		description:
			'Callback fired when the last row enters the viewport. Use for infinite scroll.',
		default: 'undefined',
	},
	{
		prop: 'isFloating',
		type: 'boolean',
		description: 'Enables the floating pagination bar style when the last row is not visible.',
		default: 'false',
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
		prop: 'tableHeader',
		type: '(props: { toggleDrawer? }) => ReactNode',
		description:
			'Renders a custom toolbar above the table. Receives toggleDrawer for opening the row drawer.',
		default: 'undefined',
	},
	{
		prop: 'tableInfo',
		type: '{ title?: string; description?: string }',
		description: 'Title and description displayed in the table toolbar.',
		default: 'undefined',
	},
	{
		prop: 'tableDrawerProps',
		type: 'TableDrawerProps | ((data) => TableDrawerProps)',
		description:
			'Config for the side drawer that opens on row interaction. Accepts a static object or a function receiving row data.',
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
		prop: 'defaultCheckedRows',
		type: 'Record<string, unknown>[]',
		description: 'Rows that are checked by default on mount.',
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
		prop: 'emptyPlaceholder',
		type: 'ComponentType',
		description: 'Custom component rendered when tableData is empty.',
		default: 'undefined',
	},
	{
		prop: 'dataLabel',
		type: 'string',
		description: 'Label appended to the pagination data count, e.g. "employees".',
		default: 'undefined',
	},
	{
		prop: 'searchProps',
		type: 'SearchProps',
		description: 'Config for the search input rendered in the toolbar.',
		default: 'undefined',
	},
	{
		prop: 'filtersCount',
		type: 'number',
		description: 'Number of active filters displayed as a badge in the toolbar.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Custom CSS class name to apply additional styles to the table container.',
		default: 'undefined',
	},
];

const columnTypeData = [
	{
		prop: 'id',
		type: 'string',
		description:
			'Key used to map the column to its corresponding field in each row data object.',
		default: '-',
	},
	{
		prop: 'title',
		type: 'string',
		description: 'Label displayed in the column header.',
		default: '-',
	},
	{
		prop: 'size',
		type: "'sm' | 'md' | 'lg'",
		description: 'Sets the default width of the column.',
		default: 'undefined',
	},
	{
		prop: 'flexible',
		type: 'boolean',
		description: 'Allows the column to grow and fill available space.',
		default: 'false',
	},
	{
		prop: 'sort',
		type: 'boolean',
		description:
			'Enables sorting on this column. Triggers onSort callback when the header is clicked.',
		default: 'false',
	},
	{
		prop: 'multiLine',
		type: 'boolean',
		description: 'Enables text wrapping so long cell content spans multiple lines.',
		default: 'false',
	},
	{
		prop: 'sticky',
		type: "'left' | 'right'",
		description:
			'Pins the column to the left or right edge of the table when scrolling horizontally.',
		default: 'undefined',
	},
	{
		prop: 'columnFilter',
		type: 'boolean',
		description: 'Enables a column-level filter dropdown.',
		default: 'false',
	},
	{
		prop: 'filterOptions',
		type: 'string[]',
		description: 'List of options shown in the column filter dropdown.',
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
		prop: 'html',
		type: 'boolean',
		description: 'Renders the cell value as raw HTML using dangerouslySetInnerHTML.',
		default: 'false',
	},
	{
		prop: 'json',
		type: 'boolean',
		description: 'Renders the cell value as formatted JSON.',
		default: 'false',
	},
	{
		prop: 'fallbackValue',
		type: 'string',
		description: 'Value displayed when the cell data is empty or undefined.',
		default: 'undefined',
	},
	{
		prop: 'style',
		type: 'CSSProperties',
		description: 'Inline styles applied to each cell in the column.',
		default: 'undefined',
	},
	{
		prop: 'formatter',
		type: '(value: string, index?: number, datum?: Record<string, unknown>) => string',
		description:
			'Custom render function for cell content. Receives the cell value, row index, and full row data.',
		default: 'undefined',
	},
];

const tableCellPropsData = [
	{
		prop: 'id',
		type: 'string',
		description: 'Column id this cell belongs to.',
		default: '-',
	},
	{
		prop: 'type',
		type: "'header' | 'body'",
		description: 'Determines whether this cell is rendered in the header or body.',
		default: "'body'",
	},
	{
		prop: 'cellContent',
		type: 'ReactNode | Record<string, unknown>',
		description: 'The content rendered inside the cell.',
		default: 'undefined',
	},
	{
		prop: 'cellTitle',
		type: 'string',
		description: 'Tooltip or title attribute for the cell.',
		default: 'undefined',
	},
	{
		prop: 'datum',
		type: 'Record<string, unknown>',
		description: 'The full row data object for this cell.',
		default: 'undefined',
	},
	{
		prop: 'sticky',
		type: "'left' | 'right'",
		description: 'Pins the cell to the left or right edge during horizontal scroll.',
		default: 'undefined',
	},
	{
		prop: 'sort',
		type: 'boolean',
		description: 'Enables sorting interaction on this header cell.',
		default: 'false',
	},
	{
		prop: 'html',
		type: 'boolean',
		description: 'Renders cell content as raw HTML.',
		default: 'false',
	},
	{
		prop: 'multiLine',
		type: 'boolean',
		description: 'Enables text wrapping for long cell content.',
		default: 'false',
	},
	{
		prop: 'columnFilter',
		type: 'boolean',
		description: 'Enables a filter dropdown on this header cell.',
		default: 'false',
	},
	{
		prop: 'filterOptions',
		type: 'string[]',
		description: 'Options shown in the column filter dropdown.',
		default: 'undefined',
	},
	{
		prop: 'filterValue',
		type: 'string[]',
		description: 'Controlled value for the column filter.',
		default: 'undefined',
	},
	{
		prop: 'onFilter',
		type: '(id: string, selected: string[]) => void',
		description: 'Callback fired when a filter selection changes.',
		default: 'undefined',
	},
	{
		prop: 'hideColumnLines',
		type: 'boolean',
		description: 'Hides the vertical divider line on this cell.',
		default: 'false',
	},
	{
		prop: 'expandableProps',
		type: 'Record<string, unknown> | function',
		description: 'Props passed to the expandable row toggle.',
		default: 'undefined',
	},
	{
		prop: 'toggleDrawer',
		type: '(index: number, standalone: boolean) => void',
		description: 'Callback to open the row drawer from within a cell.',
		default: 'null',
	},
	{
		prop: 'style',
		type: 'CSSProperties',
		description: 'Inline styles applied to the cell.',
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
];

const tableBodyPropsData = [
	{
		prop: 'expandable',
		type: '(params: { datum, index }) => ReactElement',
		description:
			'Render function for the expandable row content shown below a row when expanded.',
		default: 'undefined',
	},
	{
		prop: 'checkedRows',
		type: 'Record<string, unknown>[]',
		description: 'Currently checked rows managed externally.',
		default: '[]',
	},
	{
		prop: 'setCheckedRows',
		type: '(rows: Record<string, unknown>[]) => void',
		description: 'Setter to update the checked rows state.',
		default: 'undefined',
	},
	{
		prop: 'toggleDrawer',
		type: '(props: object) => void',
		description: 'Callback to open the row drawer.',
		default: 'undefined',
	},
];

const paginationDataTypeData = [
	{
		prop: 'page',
		type: 'number',
		description: 'The current active page number.',
		default: '-',
	},
	{
		prop: 'pageSize',
		type: 'number',
		description: 'Number of rows displayed per page.',
		default: '-',
	},
	{
		prop: 'totalItems',
		type: 'number',
		description: 'Total number of items across all pages.',
		default: '-',
	},
	{
		prop: 'onPageChange',
		type: '(page: number) => void',
		description: 'Callback fired when the page changes.',
		default: '-',
	},
	{
		prop: 'onPageSizeChange',
		type: '(size: number) => void',
		description: 'Callback fired when the page size changes.',
		default: 'undefined',
	},
];

const searchPropsTypeData = [
	{
		prop: 'onSearch',
		type: '(value: string) => void',
		description: 'Callback fired when the search input value changes.',
		default: 'undefined',
	},
	{
		prop: 'placeholder',
		type: 'string',
		description: 'Placeholder text for the search input.',
		default: 'undefined',
	},
	{
		prop: 'onClear',
		type: '() => void',
		description: 'Callback fired when the search input is cleared.',
		default: 'undefined',
	},
];

const TableDoc = () => (
	<>
		<Title />
		<Subtitle>
			Table renders structured data in rows and columns with support for sorting, column
			filters, checkboxes, sticky columns, infinite scroll, row drawers, and a fully
			customisable toolbar.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=798-1749&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/table'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Table component.</p>
		<PropsTable data={propsData} />

		<Subheading>TableColumn</Subheading>
		<p>
			Shape of each object in the <code>headerData</code> array.
		</p>
		<PropsTable data={columnTypeData} />

		<Subheading>TableCellProps</Subheading>
		<p>
			Props available on each individual cell, used when providing <code>customCells</code>{' '}
			renderers.
		</p>
		<PropsTable data={tableCellPropsData} />

		<Subheading>TableBodyProps</Subheading>
		<p>
			Additional props available at the table body level, extending <code>TableProps</code>.
		</p>
		<PropsTable data={tableBodyPropsData} />

		<Subheading>PaginationData</Subheading>
		<p>
			Shape of the <code>paginationData</code> prop.
		</p>
		<PropsTable data={paginationDataTypeData} />

		<Subheading>SearchProps</Subheading>
		<p>
			Shape of the <code>searchProps</code> prop.
		</p>
		<PropsTable data={searchPropsTypeData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used across the Table component and its sub-components.</p>

		<Subheading>RowHeight</Subheading>
		<Source language='tsx' code={`type RowHeight = 'md' | 'lg';`} />

		<Subheading>CellSize</Subheading>
		<Source language='tsx' code={`type CellSize = 'sm' | 'md' | 'lg';`} />

		<Subheading>SortType</Subheading>
		<Source language='tsx' code={`type SortType = 'asc' | 'desc' | 'default';`} />

		<Subheading>StickyType</Subheading>
		<Source language='tsx' code={`type StickyType = 'right' | 'left';`} />

		<Subheading>MetaColumnIDs</Subheading>
		<Source language='tsx' code={`type MetaColumnIDs = '__checkbox' | '__action';`} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { Table } from '@banyan_cloud/roots';

const MyComponent = () => (
  <Table
    uniqueKey='id'
    headerData={[
      { id: 'name', title: 'Name', size: 'md', flexible: true, sort: true },
      { id: 'designation', title: 'Designation', sort: true },
      { id: 'age', title: 'Age', size: 'md' },
    ]}
    tableData={[
      { id: 1, name: 'Aryan Dixit', designation: 'UI Engineer', age: 27 },
      { id: 2, name: 'Pradeep Annadurai', designation: 'Manager', age: 24 },
    ]}
    onRowClick={(datum) => console.log(datum)}
    onSort={(id, direction) => console.log(id, direction)}
    dataLabel='employees'
  />
);`}
		/>
	</>
);

export default TableDoc;
