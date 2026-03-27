import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'variant',
		type: "'text' | 'circle' | 'rounded' | 'ellipse'",
		description: 'Controls the shape of the skeleton loader.',
		default: "'text'",
	},
	{
		prop: 'theme',
		type: "'light' | 'dark'",
		description: 'Sets the color theme of the skeleton.',
		default: "'dark'",
	},
	{
		prop: 'width',
		type: 'number | string',
		description: 'Width of the skeleton. Accepts any valid CSS width value.',
		default: "'100%'",
	},
	{
		prop: 'height',
		type: 'number | string',
		description: 'Height of the skeleton. Accepts any valid CSS height value.',
		default: 'undefined',
	},
	{
		prop: 'noAnimation',
		type: 'boolean',
		description: 'Disables the shimmer animation when set to true.',
		default: 'false',
	},
	{
		prop: 'style',
		type: 'CSSProperties',
		description: 'Inline styles applied directly to the skeleton element.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Custom CSS class name to apply additional styles.',
		default: 'undefined',
	},
];

const SkeletonDoc = () => (
	<>
		<Title />
		<Subtitle>
			Skeleton renders a placeholder loading element with support for multiple shape variants,
			light and dark themes, and an optional shimmer animation.
		</Subtitle>

		<LinkHeader
			figmaLink=''
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/skeleton'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Skeleton component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used by the Skeleton component.</p>

		<Subheading>SkeletonVariant</Subheading>
		<Source
			language='tsx'
			code={`type SkeletonVariant = 'text' | 'circle' | 'rounded' | 'ellipse';`}
		/>

		<Subheading>SkeletonTheme</Subheading>
		<Source language='tsx' code={`type SkeletonTheme = 'light' | 'dark';`} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { Skeleton } from '@banyan_cloud/roots';

const MyComponent = () => (
	<>
		<Skeleton variant='text' width='100%' height={20} />
		<Skeleton variant='circle' width={48} height={48} />
		<Skeleton variant='rounded' width={200} height={100} />
		<Skeleton variant='ellipse' width={120} height={60} theme='light' />
		<Skeleton variant='text' width='80%' height={16} noAnimation />
	</>
);`}
		/>
	</>
);

export default SkeletonDoc;
