import { Heading, Source, Title, Subtitle } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../../components/docs';

const propsData = [
	{
		prop: 'title',
		type: 'ReactNode',
		description: 'Bold heading of the empty state.',
		default: '"No Data"',
	},
	{
		prop: 'description',
		type: 'ReactNode',
		description: 'Supporting text displayed below the title.',
		default: 'undefined',
	},
	{
		prop: 'icon',
		type: 'ReactNode',
		description: 'Optional illustration or icon rendered above the title.',
		default: 'undefined',
	},
	{
		prop: 'actionLabel',
		type: 'string',
		description: 'Label of the action button. Only shown when onAction is provided.',
		default: '"Retry"',
	},
	{
		prop: 'onAction',
		type: '() => void',
		description: 'Click handler of the action button. When omitted, no button is rendered.',
		default: 'undefined',
	},
	{
		prop: 'bordered',
		type: 'boolean',
		description: 'Renders the card surface (border, radius and padding).',
		default: 'true',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to apply to the root element.',
		default: '""',
	},
];

const EmptyStateDoc = () => (
	<>
		<Title />
		<Subtitle>
			EmptyState is displayed when there is no data to show or a request has failed. It
			supports a configurable title, description, icon and an optional action such as Retry.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=4098-5710&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/table/emptyState'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the EmptyState component.</p>
		<PropsTable data={propsData} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { EmptyState } from '@banyan_cloud/roots';

const MyComponent = () => (
  <EmptyState
    title='No Data'
    description="The issues service didn't respond."
    actionLabel='Retry'
    onAction={() => refetch()}
  />
);`}
		/>
	</>
);

export default EmptyStateDoc;
