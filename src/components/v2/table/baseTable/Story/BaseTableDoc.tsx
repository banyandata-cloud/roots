import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../docs';

const baseTablePropsData = [
	{
		prop: 'tableData',
		type: 'Record<string, unknown>[]',
		description: 'The main dataset to render in the table rows.',
		default: '[]',
	},
	{
		prop: 'headerData',
		type: 'TableColumn[]',
		description: 'Column definitions including titles, sizes, and fallback values.',
		default: '[]',
	},
	{
		prop: 'loading',
		type: 'boolean',
		description: 'Toggles the Skeleton loader view.',
		default: 'false',
	},
	{
		prop: 'expandable',
		type: '(params) => ReactElement',
		description: 'Function to render sub-rows or nested tables upon expansion.',
		default: 'undefined',
	},
	{
		prop: 'emptyPlaceholder',
		type: 'ReactNode',
		description: 'Custom UI to display when tableData is empty.',
		default: '<NoDataPlaceholder />',
	},
	{
		prop: 'checkAsRadio',
		type: 'boolean',
		description: 'Limits selection to a single row at a time.',
		default: 'false',
	},
	{
		prop: 'uniqueKey',
		type: 'string',
		description: 'Required for tracking selection state across re-renders.',
		default: '""',
	},
];

const BaseTableDoc = () => (
	<>
		<Title />
		<Subtitle>
			BaseTable is the primary entry point for the Table system. It handles the structural
			layout, conditional rendering for empty/loading states, and synchronizes selection state
			between the Header and Body.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=798-1749&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/table/base'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the BaseTable component.</p>
		<PropsTable data={baseTablePropsData} />

		<Heading>Usage</Heading>

		<Subheading>Basic Implementation</Subheading>
		<p>A standard data table with a unique key for selection tracking.</p>
		<Source
			language='tsx'
			code={`
<BaseTable
  uniqueKey="id"
  headerData={columns}
  tableData={rows}
  onCheck={(checked) => console.log(checked)}
/>
            `}
		/>

		<Subheading>Nested/Expandable Tables</Subheading>
		<p>
			You can nest <code>BaseTable</code> instances within the <code>expandable</code> prop to
			create hierarchical data views.
		</p>
		<Source
			language='tsx'
			code={`
<BaseTable
  headerData={parentCols}
  tableData={parentData}
  expandable={({ datum }) => (
    <div style={{ padding: '20px' }}>
      <BaseTable 
        headerData={childCols} 
        tableData={datum.children} 
      />
    </div>
  )}
/>
            `}
		/>

		<Heading>Key Features</Heading>
		<ul>
			<li>
				<strong>Skeleton Loading:</strong> Automatically swaps the table for a skeleton view
				when <code>loading</code> is true.
			</li>
			<li>
				<strong>Selection Sync:</strong> Manages an internal <code>checkedRows</code> state
				that is updated by both row clicks and the "Select All" header toggle.
			</li>
			<li>
				<strong>Empty States:</strong> Renders a centered placeholder if{' '}
				<code>tableData</code> is empty or null.
			</li>
		</ul>
	</>
);

export default BaseTableDoc;
