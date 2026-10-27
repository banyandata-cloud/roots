import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../docs';

const propsData = [
	{
		prop: 'variant',
		type: 'TextVariant',
		description:
			'Figma text style: heading-xxlarge to heading-xxsmall, body-large, body, body-small, metric-large/medium/small or code. Sets the font size and line-height.',
		default: "'body'",
	},
	{
		prop: 'component',
		type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a'",
		description: 'Overrides the underlying HTML element rendered for the text.',
		default: "'span'",
	},
	{
		prop: 'stroke',
		type: "'regular' | 'medium' | 'semibold' | 'bold'",
		description:
			"Overrides the font weight of the variant. Without it the variant's default weight is used (regular, or bold for metric).",
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
import { Text } from '@banyandata-cloud/roots';

const MyComponent = () => (
  <>
    <Text variant="heading-xxlarge" stroke="bold">Welcome back</Text>
    <Text variant="body-large">Here is a summary of your recent activity.</Text>
    <Text italic underline>Highlighted note</Text>
  </>
);
`;

const TextDoc = () => (
	<>
		<Title />
		<Subtitle>
			Text is a typography primitive for rendering consistent, scalable text across the UI. It
			supports the Figma heading, body, metric and code text styles with a configurable
			weight.
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
		<Source
			language='tsx'
			code={`type TextVariant =
  | 'heading-xxlarge' // 32 / 36
  | 'heading-xlarge' // 28 / 32
  | 'heading-large' // 24 / 28
  | 'heading-medium' // 20 / 24
  | 'heading-small' // 16 / 20
  | 'heading-xsmall' // 14 / 20
  | 'heading-xxsmall' // 12 / 16
  | 'body-large' // 16 / 24
  | 'body' // 14 / 20
  | 'body-small' // 12 / 16
  | 'metric-large' // 28 / 32, bold only
  | 'metric-medium' // 24 / 28, bold only
  | 'metric-small' // 16 / 20, bold only
  | 'code'; // 12 / 20, regular only`}
		/>

		<Subheading>TextStroke</Subheading>
		<Source
			language='tsx'
			code={`type TextStroke = 'regular' | 'medium' | 'semibold' | 'bold';`}
		/>

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
