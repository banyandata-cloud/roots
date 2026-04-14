import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../docs';

const BASIC_USAGE_CODE = `
import { Breadcrumbs } from '@banyan_cloud/roots';
import type { BreadcrumbItem } from '@banyan_cloud/roots';

const crumbs: BreadcrumbItem[] = [
  {
    id: 'home',
    label: 'Home',
    onClick: () => console.log('Home clicked'),
  },
  {
    id: 'projects',
    label: 'Projects',
    onClick: () => console.log('Projects clicked'),
    dropdownOptions: [
      { label: 'Frontend', value: 'frontend', onClick: () => console.log('Frontend') },
      { label: 'Backend',  value: 'backend',  onClick: () => console.log('Backend')  },
    ],
  },
  {
    id: 'current',
    label: 'Frontend',
  },
];

const MyComponent = () => (
  <Breadcrumbs
    type="text"
    separator="chevron"
    crumbs={crumbs}
    activeIndex={crumbs.length - 1}
  />
);
`;

const propsData = [
	{
		prop: 'crumbs',
		type: 'BreadcrumbItem[]',
		description: `Array of breadcrumb items defining each crumb's id, label, href, onClick handler, disabled state, and optional dropdown options.`,
		default: '[]',
	},
	{
		prop: 'type',
		type: "'text' | 'text-with-line' | 'button'",
		description:
			'Controls the visual style of the breadcrumb items. text renders plain links, text-with-line adds a top and bottom highlight, and button renders each crumb as a button.',
		default: "'text'",
	},
	{
		prop: 'separator',
		type: "'chevron' | 'slash'",
		description: 'The separator icon rendered between each breadcrumb item.',
		default: "'chevron'",
	},
	{
		prop: 'activeIndex',
		type: 'number',
		description:
			'Index of the currently active crumb. Defaults to the last crumb when not provided.',
		default: 'crumbs.length - 1',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class applied to the breadcrumb container.',
		default: "''",
	},
];

const breadcrumbItemData = [
	{
		prop: 'id',
		type: 'string',
		description: 'Unique identifier for the crumb. Used as the React key and DOM element id.',
		default: 'undefined',
	},
	{
		prop: 'label',
		type: 'string | undefined',
		description: 'Display text for the breadcrumb item. Use "..." for an ellipsis crumb.',
		default: 'undefined',
	},
	{
		prop: 'href',
		type: 'string',
		description:
			'Optional href passed to the Link element rendered for the first (home) crumb in text variants.',
		default: 'undefined',
	},
	{
		prop: 'onClick',
		type: '() => void',
		description:
			'Callback fired when the crumb is clicked. Omit for the active/last crumb to prevent navigation.',
		default: 'undefined',
	},
	{
		prop: 'isDisabled',
		type: 'boolean',
		description:
			'When true, the crumb is rendered in a disabled state and ignores interactions.',
		default: 'false',
	},
	{
		prop: 'dropdownOptions',
		type: 'BreadcrumbDropdownOption[]',
		description:
			'When provided, the crumb renders a dropdown on click. Each option must have a label, value, and optional onClick.',
		default: 'undefined',
	},
];

const dropdownOptionData = [
	{
		prop: 'label',
		type: 'string',
		description: 'Display text shown inside the dropdown item.',
		default: 'undefined',
	},
	{
		prop: 'value',
		type: 'string',
		description: 'Unique value identifier for the dropdown option.',
		default: 'undefined',
	},
	{
		prop: 'onClick',
		type: '() => void',
		description: 'Callback fired when the dropdown option is selected.',
		default: 'undefined',
	},
];

const BreadcrumbDoc = () => (
	<>
		<Title />
		<Subtitle>
			Breadcrumbs help users understand and navigate the hierarchical structure of an
			application. The component supports three visual types, two separator styles, and
			per-crumb dropdowns for contextual navigation.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=1018-697&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/components/breadcrumbs'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Breadcrumbs component.</p>
		<PropsTable data={propsData} />

		<Subheading>BreadcrumbItem</Subheading>
		<p>
			Shape of each object in the <code>crumbs</code> array.
		</p>
		<PropsTable data={breadcrumbItemData} />

		<Subheading>BreadcrumbDropdownOption</Subheading>
		<p>
			Shape of each object in a crumb's <code>dropdownOptions</code> array.
		</p>
		<PropsTable data={dropdownOptionData} />

		<Heading>Custom Types</Heading>
		<p>Custom types exported by the Breadcrumbs component.</p>

		<Subheading>BreadcrumbType</Subheading>
		<Source
			language='tsx'
			code={`type BreadcrumbType = 'text' | 'text-with-line' | 'button';`}
		/>

		<Subheading>BreadcrumbSeparator</Subheading>
		<Source language='tsx' code={`type BreadcrumbSeparator = 'chevron' | 'slash';`} />

		<Subheading>BreadcrumbItem</Subheading>
		<Source
			language='tsx'
			code={`interface BreadcrumbItem {
  id: string;
  label: string | undefined;
  href?: string | undefined;
  onClick?: () => void | undefined;
  isDisabled?: boolean | undefined;
  dropdownOptions?: BreadcrumbDropdownOption[] | undefined;
}`}
		/>

		<Subheading>BreadcrumbDropdownOption</Subheading>
		<Source
			language='tsx'
			code={`interface BreadcrumbDropdownOption {
  label: string;
  value: string;
  onClick?: () => void | undefined;
}`}
		/>

		<Heading>Usage</Heading>
		<p>Basic usage with static crumbs.</p>
		<Source language='tsx' code={BASIC_USAGE_CODE} />
	</>
);

export default BreadcrumbDoc;
