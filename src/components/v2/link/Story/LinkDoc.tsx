import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'children',
		type: 'ReactNode',
		description: 'The clickable content rendered inside the link.',
		default: 'undefined',
	},
	{
		prop: 'href',
		type: 'string',
		description: 'The URL the link points to.',
		default: '-',
	},
	{
		prop: 'target',
		type: "'_self' | '_blank' | '_parent' | '_top'",
		description: 'Specifies where to open the linked URL. Use _blank to open in a new tab.',
		default: "'_self'",
	},
	{
		prop: 'size',
		type: "'sm' | 'md' | 'lg'",
		description: 'Controls the font size and spacing of the link.',
		default: "'md'",
	},
	{
		prop: 'withIcon',
		type: 'boolean',
		description: 'Displays a trailing arrow icon next to the link label.',
		default: 'false',
	},
	{
		prop: 'disabled',
		type: 'boolean',
		description: 'Prevents navigation and interaction, and applies a muted visual style.',
		default: 'false',
	},
	{
		prop: 'onClick',
		type: 'function',
		description: 'Callback fired when the link is clicked.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Custom CSS class name to apply additional styles to the link.',
		default: '""',
	},
	{
		prop: 'attrs',
		type: 'React.AnchorHTMLAttributes<HTMLAnchorElement>',
		description:
			'Additional HTML attributes forwarded directly to the underlying anchor element.',
		default: 'undefined',
	},
];

const LinkDoc = () => (
	<>
		<Title />
		<Subtitle>
			Link renders a navigational anchor element with support for size variants, an optional
			trailing icon, disabled state, and configurable target behaviour.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=195-1157&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/link'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Link component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the Link component props.</p>

		<Subheading>LinkSize</Subheading>
		<Source language='tsx' code={`type LinkSize = 'sm' | 'md' | 'lg';`} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { Link } from '@banyan_cloud/roots';

const MyComponent = () => (
  <Link
    href='https://www.example.com'
    size='md'
    target='_blank'
    withIcon
  >
    Visit Documentation
  </Link>
);`}
		/>
	</>
);

export default LinkDoc;
