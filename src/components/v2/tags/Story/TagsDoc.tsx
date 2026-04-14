import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const BASIC_USAGE_CODE = `
import { Tag } from '@banyan_cloud/roots';

const MyComponent = () => (
  <Tag
    size="md"
    label="Label"
  />
);
`;

const CLOSABLE_USAGE_CODE = `
<Tag size="md" label="Label" closable />
`;

const INDICATOR_USAGE_CODE = `
<Tag size="md" label="Active" indicator indicatorType="success" />
<Tag size="md" label="Pending" indicator indicatorType="warning" />
<Tag size="md" label="Failed" indicator indicatorType="error" />
`;

const CHECKBOX_USAGE_CODE = `
<Tag size="md" label="Label" checkbox />
<Tag size="md" label="Label" checkboxCloser />
<Tag size="md" label="Label" checkboxCount count={5} />
`;

const LOGO_USAGE_CODE = `
<Tag size="md" label="Label" logo />
<Tag size="md" label="Label" logo closable />
<Tag size="md" label="Label" logo count={5} />
`;

const TEXT_FIELD_USAGE_CODE = `
const MyComponent = () => {
  const [value, setValue] = React.useState('');

  return (
    <Tag
      size="md"
      label="Label:"
      textField
      inputValue={value}
      onInputChange={(val) => setValue(val)}
      onInputEnter={() => console.log('Enter pressed')}
      onInputClear={() => setValue('')}
      closable
    />
  );
};
`;

const propsData = [
	{
		prop: 'label',
		type: 'string',
		description: 'Text displayed inside the tag.',
		default: "'Label'",
	},
	{
		prop: 'closable',
		type: 'boolean',
		description: 'Renders a size-matched close (×) icon inside the tag.',
		default: 'false',
	},
	{
		prop: 'checkbox',
		type: 'boolean',
		description: 'Renders a size-matched checkbox inside the tag.',
		default: 'false',
	},
	{
		prop: 'size',
		type: "'sm' | 'md' | 'lg'",
		description: 'Controls the size of the tag - height, padding, and font size.',
		default: "'sm'",
	},
	{
		prop: 'indicator',
		type: 'boolean',
		description:
			'Renders a coloured status dot inside the tag. Combine with indicatorType to control the colour.',
		default: 'false',
	},
	{
		prop: 'indicatorType',
		type: "'success' | 'warning' | 'error'",
		description:
			'Controls the colour of the indicator dot. Only relevant when indicator is true.',
		default: "'success'",
	},
	{
		prop: 'count',
		type: 'number',
		description:
			'When provided, renders a count badge inside the tag. Works with onlyCount, logo, checkboxCount, checkboxLogoCount, checkboxIndicatorCount, and indicator variants.',
		default: 'undefined',
	},
	{
		prop: 'onlyCount',
		type: 'boolean',
		description: 'Renders the label alongside a count badge. No indicator or checkbox.',
		default: 'false',
	},
	{
		prop: 'checkboxCloser',
		type: 'boolean',
		description: 'Renders a checkbox, the label, and a close icon.',
		default: 'false',
	},
	{
		prop: 'checkboxCount',
		type: 'boolean',
		description: 'Renders a checkbox, the label, and a count badge. Requires count prop.',
		default: 'false',
	},
	{
		prop: 'checkboxIndicator',
		type: 'boolean',
		description: 'Renders a checkbox and a coloured status dot alongside the label.',
		default: 'false',
	},
	{
		prop: 'checkboxIndicatorClosable',
		type: 'boolean',
		description: 'Renders a checkbox, a coloured status dot, the label, and a close icon.',
		default: 'false',
	},
	{
		prop: 'checkboxIndicatorCount',
		type: 'boolean',
		description:
			'Renders a checkbox, a coloured status dot, the label, and a count badge. Requires count prop.',
		default: 'false',
	},
	{
		prop: 'logo',
		type: 'boolean',
		description: 'Renders a logo icon alongside the label.',
		default: 'false',
	},
	{
		prop: 'checkboxLogo',
		type: 'boolean',
		description: 'Renders a checkbox, a logo, and the label.',
		default: 'false',
	},
	{
		prop: 'checkboxLogoClosable',
		type: 'boolean',
		description: 'Renders a checkbox, a logo, the label, and a close icon.',
		default: 'false',
	},
	{
		prop: 'checkboxLogoCount',
		type: 'boolean',
		description:
			'Renders a checkbox, a logo, the label, and a count badge. Requires count prop.',
		default: 'false',
	},
	{
		prop: 'textField',
		type: 'boolean',
		description:
			'Renders the tag in text field mode - shows a label prefix and an inline editable input.',
		default: 'false',
	},
	{
		prop: 'inputValue',
		type: 'string',
		description:
			'Controlled value for the text field input. When provided, the component operates in controlled mode.',
		default: 'undefined',
	},
	{
		prop: 'defaultInputValue',
		type: 'string',
		description: 'Initial value for the text field input in uncontrolled mode.',
		default: "''",
	},
	{
		prop: 'inputPlaceholder',
		type: 'string',
		description: 'Placeholder text shown inside the text field input when it is empty.',
		default: "''",
	},
	{
		prop: 'readOnly',
		type: 'boolean',
		description: 'Makes the text field input non-editable while still displaying its value.',
		default: 'false',
	},
	{
		prop: 'onInputChange',
		type: '(value: string, event: React.ChangeEvent<HTMLInputElement>) => void',
		description: 'Callback fired when the text field input value changes.',
		default: 'undefined',
	},
	{
		prop: 'onInputBlur',
		type: '() => void',
		description: 'Callback fired when the text field input loses focus.',
		default: 'undefined',
	},
	{
		prop: 'onInputEnter',
		type: '() => void',
		description: 'Callback fired when Enter or Tab is pressed inside the text field input.',
		default: 'undefined',
	},
	{
		prop: 'onInputClear',
		type: '() => void',
		description:
			'Callback fired when the close icon is clicked or Backspace is pressed on an empty text field input.',
		default: 'undefined',
	},
	{
		prop: 'onClick',
		type: '() => void',
		description:
			'Callback fired when the tag is clicked. Primarily used in readOnly text field mode.',
		default: 'undefined',
	},
];

const TagDoc = () => (
	<>
		<Title />
		<Subtitle>
			Tag is a lightweight label component used to categorize, highlight, or filter content.
			It supports a wide range of compositions - checkboxes, indicators, logos, count badges,
			close buttons, and inline text fields - across three sizes.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=1049-71&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/tags'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Tag component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used by the Tag component.</p>

		<Subheading>TagSize</Subheading>
		<Source language='tsx' code={`type TagSize = 'sm' | 'md' | 'lg';`} />

		<Subheading>IndicatorType</Subheading>
		<Source language='tsx' code={`type IndicatorType = 'success' | 'warning' | 'error';`} />

		<Heading>Usage</Heading>

		<Subheading>Basic</Subheading>
		<Source language='tsx' code={BASIC_USAGE_CODE} />

		<Subheading>With close button</Subheading>
		<Source language='tsx' code={CLOSABLE_USAGE_CODE} />

		<Subheading>With indicator</Subheading>
		<Source language='tsx' code={INDICATOR_USAGE_CODE} />

		<Subheading>With checkbox</Subheading>
		<Source language='tsx' code={CHECKBOX_USAGE_CODE} />

		<Subheading>With logo</Subheading>
		<Source language='tsx' code={LOGO_USAGE_CODE} />

		<Subheading>Text field (controlled)</Subheading>
		<Source language='tsx' code={TEXT_FIELD_USAGE_CODE} />
	</>
);

export default TagDoc;
