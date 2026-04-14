import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'paginationState',
		type: 'PaginationState',
		description: 'Current pagination state containing page, step, and total info.',
		default: '{ totalPages: null, currentPage: null, step: 30, totalData: null }',
	},
	{
		prop: 'paginationDispatch',
		type: 'Dispatch<PaginationAction>',
		description: 'Dispatch function returned by usePagination to update pagination state.',
		default: 'undefined',
	},
	{
		prop: 'loading',
		type: 'boolean',
		description: 'Hides the data count row while data is being fetched.',
		default: 'false',
	},
	{
		prop: 'dataLabel',
		type: 'string',
		description:
			'Label appended to the data count, e.g. "items" renders "Showing 1–30 from 100 items".',
		default: 'undefined',
	},
	{
		prop: 'floating',
		type: 'boolean',
		description: 'Applies a floating/elevated visual style to the pagination bar.',
		default: 'false',
	},
	{
		prop: 'onChange',
		type: '(args: { currentPage: number; step: number; totalPages: number | null }) => void',
		description: 'Callback fired whenever the current page or step changes.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Custom CSS class name to apply additional styles.',
		default: '""',
	},
];

const PaginationDoc = () => (
	<>
		<Title />
		<Subtitle>
			Pagination renders a controlled pagination bar with page navigation, rows-per-page
			selection, and an optional data count display. Use the usePagination hook to manage
			state externally.
		</Subtitle>
		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=868-420&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/pagination'
		/>
		<Heading>API</Heading>
		<p>Props accepted by the Pagination component.</p>
		<PropsTable data={propsData} />\<Heading>Custom Types</Heading>
		<p>Custom types used by the Pagination component.</p>
		<Subheading>PaginationState</Subheading>
		<Source
			language='tsx'
			code={`interface PaginationState {
    totalPages: number | null;
    currentPage: number | null;
    step: number;
    totalData: number | null;
}`}
		/>
		<Subheading>PaginationAction</Subheading>
		<Source
			language='tsx'
			code={`type PaginationAction =
    | { type: 'NEXT_PAGE' }
    | { type: 'PREV_PAGE' }
    | { type: 'SET_PAGE'; payload: number | undefined }
    | { type: 'SET_STEP'; payload: number }
    | { type: 'SET_TOTAL_PAGES'; payload: number | null }
    | { type: 'SET_TOTAL_DATA'; payload: number | null };`}
		/>
		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { Pagination, usePagination } from '@banyan_cloud/roots';

const MyComponent = () => {
	const [paginationState, paginationDispatch] = usePagination({
		totalPages: 100,
		currentPage: 1,
		step: 30,
		totalData: 3000,
	});

	return (
		<Pagination
			loading={false}
			dataLabel='items'
			paginationState={paginationState}
			paginationDispatch={paginationDispatch}
			onChange={({ currentPage, step, totalPages }) => {
				console.log(currentPage, step, totalPages);
			}}
		/>
	);
};`}
		/>
	</>
);

export default PaginationDoc;
