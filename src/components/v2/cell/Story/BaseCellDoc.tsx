import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to apply to the cell.',
		default: '""',
	},
	{
		prop: 'size',
		type: "'xs' | 'sm' | 'md' | 'lg' | 'auto'",
		description: 'Size of the cell.',
		default: 'undefined',
	},
	{
		prop: 'flexible',
		type: 'boolean',
		description: 'If true, the cell will expand to fill available space.',
		default: 'false',
	},
	{
		prop: 'component1',
		type: 'ReactElement',
		description: 'An optional React element rendered on the left slot of the cell.',
		default: 'null',
	},
	{
		prop: 'component2',
		type: 'ReactElement | string',
		description:
			'An optional React element rendered in the center slot of the cell. Required when TComponent2 is true.',
		default: 'undefined',
	},
	{
		prop: 'component3',
		type: 'ReactElement',
		description: 'An optional React element rendered on the right slot of the cell.',
		default: 'null',
	},
	{
		prop: 'title',
		type: 'ReactElement | string',
		description: 'An optional title rendered inside the cell.',
		default: 'undefined',
	},
	{
		prop: 'RootDOM',
		type: "'div' | 'span' | 'button' | 'td'",
		description: 'The root DOM element type for the cell.',
		default: "'div'",
	},
	{
		prop: 'radius',
		type: "'none' | 'default' | 'round' | 'ellipse'",
		description: 'Border radius style for the cell.',
		default: "'default'",
	},
	{
		prop: 'attrs',
		type: 'ComponentProps<T>',
		description: 'Additional HTML attributes applied to the root element.',
		default: 'undefined',
	},
	{
		prop: 'dataTestId',
		type: 'string',
		description: 'Test id attribute applied to the root element for testing purposes.',
		default: 'undefined',
	},
];

const BaseCellDoc = () => (
	<>
		<Title />
		<Subtitle>
			BaseCell is a low-level layout primitive that provides three composable slots for
			building consistent cell-based UI patterns such as list items, table cells, and menu
			entries.
		</Subtitle>

		<LinkHeader githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/cell' />

		<Heading>API</Heading>
		<p>Props accepted by the BaseCell component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the BaseCell component props.</p>

		<Subheading>ElementSizeTypes</Subheading>
		<Source
			language='tsx'
			code={`type ElementSizeTypes = 'xs' | 'sm' | 'md' | 'lg' | 'auto';`}
		/>

		<Subheading>RootDOMTypes</Subheading>
		<Source language='tsx' code={`type RootDOMTypes = 'div' | 'span' | 'button' | 'td';`} />

		<Subheading>RadiusTypes</Subheading>
		<Source
			language='tsx'
			code={`type RadiusTypes = 'none' | 'default' | 'round' | 'ellipse';`}
		/>

		<Subheading>BaseCellComponentType</Subheading>
		<Source language='tsx' code={`type BaseCellComponentType = 'button' | 'div';`} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { BaseCell } from '@banyan_cloud/roots';

const MyComponent = () => (
  <BaseCell
    component1={<span>Left Content</span>}
    component2={<span>Center Content</span>}
    component3={<span>Right Content</span>}
    size='md'
    radius='default'
    RootDOM='div'
  />
);`}
		/>
	</>
);

export default BaseCellDoc;
