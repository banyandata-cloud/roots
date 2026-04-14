import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'variant',
		type: "'h1' | 'h2' | 'b1' | 'b2' | 'b3'",
		description: 'Controls the typographic scale and semantic HTML element rendered.',
		default: "'b2'",
	},
	{
		prop: 'component',
		type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a'",
		description: 'Overrides the underlying HTML element rendered for the text.',
		default: "'span'",
	},
	{
		prop: 'stroke',
		type: "'light' | 'regular' | 'medium' | 'semibold' | 'bold'",
		description: 'Sets the font weight of the text.',
		default: "'regular'",
	},
	{
		prop: 'weight',
		type: '100 | 200 | 300 | 400 | 500 | 600',
		description: 'Applies a custom numeric font weight, overriding the stroke value.',
		default: 'undefined',
	},
	{
		prop: 'italic',
		type: 'boolean',
		description: 'Applies italic styling to the text.',
		default: 'false',
	},
	{
		prop: 'underline',
		type: 'boolean',
		description: 'Applies underline styling to the text.',
		default: 'false',
	},
	{
		prop: 'children',
		type: 'ReactNode',
		description: 'The content to be rendered inside the text element.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Custom CSS class name to apply additional styles to the text element.',
		default: 'undefined',
	},
	{
		prop: 'attrs',
		type: 'unknown',
		description: 'Additional HTML attributes passed directly to the underlying text element.',
		default: 'undefined',
	},
];

const CODE = `
import { Text } from '@banyan_cloud/roots';

const MyComponent = () => (
  <>
    <Text variant="h1" stroke="bold">Welcome back</Text>
    <Text variant="b1" stroke="regular">Here is a summary of your recent activity.</Text>
    <Text variant="b2" italic underline>Highlighted note</Text>
  </>
);
`;

const TextDoc = () => (
	<>
		<Title />
		<Subtitle>
			Text is a typography primitive for rendering consistent, scalable text across the UI. It
			supports heading and body variants with configurable weight, stroke, and style options.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=17-114&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/text'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Text component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used by the Text component.</p>

		<Subheading>TextVariant</Subheading>
		<Source language='tsx' code={`type TextVariant = 'h1' | 'h2' | 'b1' | 'b2' | 'b3';`} />

		<Subheading>TextStroke</Subheading>
		<Source
			language='tsx'
			code={`type TextStroke = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';`}
		/>

		<Subheading>TextFontWeight</Subheading>
		<Source language='tsx' code={`type TextFontWeight = 100 | 200 | 300 | 400 | 500 | 600;`} />

		<Subheading>TextComponentType</Subheading>
		<Source
			language='tsx'
			code={`type TextComponentType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a';`}
		/>

		<Heading>Usage</Heading>
		<Source language='tsx' code={CODE} />
	</>
);

export default TextDoc;
