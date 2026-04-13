import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const BASIC_USAGE_CODE = `
import { Badge } from '@banyan_cloud/roots';

const MyComponent = () => (
  <Badge
    size="md"
    variant="pill"
    label="Label"
  />
);
`;

const CLOSER_USAGE_CODE = `
<Badge size="md" variant="pill" label="Label" onClose={() => handleRemove()} />
<Badge size="md" variant="badge" label="Label" onClose={() => handleRemove()} />
<Badge size="md" variant="modern" label="Label" onClose={() => handleRemove()} />
`;

const DOT_USAGE_CODE = `
<Badge size="md" variant="pill" label="Label" dot />
<Badge size="md" variant="pill" label="Label" dot dotColor="#ff0000" />
`;

const ARROW_USAGE_CODE = `
// Trailing right arrow
<Badge size="md" variant="pill" label="Label" arrow />
<Badge size="md" variant="pill" label="Label" arrow arrowColor="#0070f3" />

// Leading up arrow
<Badge size="md" variant="pill" label="Label" upArrow />
<Badge size="md" variant="pill" label="Label" upArrow upArrowColor="#0070f3" />
`;

const PLUS_USAGE_CODE = `
// Plus icon only - omit label for equal padding
<Badge size="sm" variant="pill" plus />
<Badge size="md" variant="badge" plus plusColor="#0070f3" />
<Badge size="lg" variant="modern" plus />
`;

const VARIANT_USAGE_CODE = `
<Badge size="md" variant="pill" label="Pill" />
<Badge size="md" variant="badge" label="Badge" />
<Badge size="md" variant="modern" label="Modern" />
`;

const propsData = [
	{
		prop: 'label',
		type: 'string',
		description: 'Text displayed inside the badge.',
		default: "'Label'",
	},
	{
		prop: 'variant',
		type: "'pill' | 'badge' | 'modern'",
		description:
			'Visual style of the badge. Controls background, border-color, border-radius and text color only - never layout.',
		default: "'pill'",
	},
	{
		prop: 'size',
		type: "'sm' | 'md' | 'lg'",
		description:
			'Controls padding, gap, and font-size. Layout metrics are identical across all variants for a given size.',
		default: "'sm'",
	},
	{
		prop: 'onClose',
		type: '(e: React.MouseEvent) => void',
		description: 'Renders a size-matched close button inside the badge when provided.',
		default: 'undefined',
	},
	{
		prop: 'dot',
		type: 'boolean',
		description:
			'Renders a leading dot indicator. Reduces left padding to maintain optical balance.',
		default: 'false',
	},
	{
		prop: 'dotColor',
		type: 'string',
		description: 'Color of the dot indicator.',
		default: "'#717680'",
	},
	{
		prop: 'arrow',
		type: 'boolean',
		description:
			'Renders a trailing right-arrow icon. Reduces right padding to maintain optical balance.',
		default: 'false',
	},
	{
		prop: 'arrowColor',
		type: 'string',
		description: 'Color of the trailing right-arrow icon.',
		default: "'#717680'",
	},
	{
		prop: 'upArrow',
		type: 'boolean',
		description:
			'Renders a leading up-arrow icon. Reduces left padding to maintain optical balance.',
		default: 'false',
	},
	{
		prop: 'upArrowColor',
		type: 'string',
		description: 'Color of the leading up-arrow icon.',
		default: "'#717680'",
	},
	{
		prop: 'plus',
		type: 'boolean',
		description:
			'Renders a leading plus icon. The label prop should be omitted in this mode - the badge collapses to equal padding on all sides.',
		default: 'false',
	},
	{
		prop: 'plusColor',
		type: 'string',
		description: 'Color of the plus icon.',
		default: "'#717680'",
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class name to apply to the root element.',
		default: 'undefined',
	},
];

const BadgeDoc = () => (
	<>
		<Title />
		<Subtitle>
			Badge is a compact label component used to categorize, highlight, or tag content. It
			supports three variants - <code>pill</code>, <code>badge</code>, and <code>modern</code>{' '}
			- and three sizes - <code>sm</code>, <code>md</code>, and <code>lg</code>. All variants
			share an identical layout system; only visual properties (background, border, color,
			border-radius) differ between them.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=1617-10929&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/components/v2/badges'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Badge component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used by the Badge component.</p>

		<Subheading>BadgeVariant</Subheading>
		<Source language='tsx' code={`type BadgeVariant = 'pill' | 'badge' | 'modern';`} />

		<Subheading>BadgeSize</Subheading>
		<Source language='tsx' code={`type BadgeSize = 'sm' | 'md' | 'lg';`} />

		<Heading>Usage</Heading>

		<Subheading>Basic</Subheading>
		<Source language='tsx' code={BASIC_USAGE_CODE} />

		<Subheading>Variants</Subheading>
		<Source language='tsx' code={VARIANT_USAGE_CODE} />

		<Subheading>With close button</Subheading>
		<Source language='tsx' code={CLOSER_USAGE_CODE} />

		<Subheading>With dot indicator</Subheading>
		<Source language='tsx' code={DOT_USAGE_CODE} />

		<Subheading>With arrow</Subheading>
		<Source language='tsx' code={ARROW_USAGE_CODE} />

		<Subheading>Plus icon only</Subheading>
		<Source language='tsx' code={PLUS_USAGE_CODE} />
	</>
);

export default BadgeDoc;
