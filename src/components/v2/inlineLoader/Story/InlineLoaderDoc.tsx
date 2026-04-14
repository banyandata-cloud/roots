import { Heading, Source, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'status',
		type: "'loading' | 'success' | 'error'",
		description: 'Required. Determines the visual icon and animation state of the loader.',
		default: '—',
	},
	{
		prop: 'text',
		type: 'string',
		description: 'Optional label appended to the right side of the status icon.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to apply to the root element.',
		default: "''",
	},
];

const InlineLoaderDoc = () => (
	<>
		<Title />
		<Subtitle>
			A versatile inline loading component designed to indicate processing, success, or error
			states seamlessly inside highly dense layouts like buttons or small forms. It is
			completely context-agnostic and inherits text color dynamically.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=190-457&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/components/v2/inlineLoader'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the InlineLoader component.</p>
		<PropsTable data={propsData} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { InlineLoader } from '@banyan_cloud/roots/v2';

// Loading state
<InlineLoader status='loading' />
<InlineLoader status='loading' text='Logging' />

// Success state
<InlineLoader status='success' />
<InlineLoader status='success' text='Finished' />

// Error state
<InlineLoader status='error' />
<InlineLoader status='error' text='Error' />`}
		/>
	</>
);

export default InlineLoaderDoc;
