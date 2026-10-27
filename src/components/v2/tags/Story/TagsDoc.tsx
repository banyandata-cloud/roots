import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/blocks';
import { LinkHeader, PropsTable } from '../../docs';

const BASIC_USAGE_CODE = `
import { Tags } from '@banyandata-cloud/roots';

const MyComponent = () => (
  <Tags
    size="md"
    label="Label"
  />
);
`;

const CLOSABLE_USAGE_CODE = `
<Tags size="md" label="Label" closable />
`;

const INDICATOR_USAGE_CODE = `
<Tags size="md" label="Active" indicator indicatorType="success" />
<Tags size="md" label="Pending" indicator indicatorType="warning" />
<Tags size="md" label="Failed" indicator indicatorType="error" />
`;

const CHECKBOX_USAGE_CODE = `
<Tags size="md" label="Label" checkbox />
<Tags size="md" label="Label" checkbox closable />
<Tags size="md" label="Label" checkbox count={5} />
<Tags size="md" label="Label" checkbox indicator indicatorType="warning" count={5} />
`;

const ICON_USAGE_CODE = `
<Tags size="md" label="Label" icon={<MyIcon />} />
<Tags size="md" label="Label" icon={<MyIcon />} closable />
<Tags size="md" label="Label" icon={<MyIcon />} count={5} />
`;

const TEXT_FIELD_USAGE_CODE = `
const MyComponent = () => {
  const [value, setValue] = React.useState('');

  return (
    <Tags
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
		prop: 'size',
		type: "'sm' | 'md' | 'lg'",
		description: 'Height, paddings, gaps and text size.',
		default: "'sm'",
	},
	{
		prop: 'closable',
		type: 'boolean',
		description: 'Shows the close button.',
		default: 'false',
	},
	{
		prop: 'onClose',
		type: '() => void',
		description: 'Called when the close button is clicked.',
		default: 'undefined',
	},
	{
		prop: 'checkbox',
		type: 'boolean',
		description: 'Leading checkbox sized to the tag.',
		default: 'false',
	},
	{
		prop: 'checked / defaultChecked',
		type: 'boolean',
		description: 'Controlled / initial state of the checkbox.',
		default: 'undefined',
	},
	{
		prop: 'onCheckedChange',
		type: '(checked: boolean) => void',
		description: 'Called when the checkbox changes.',
		default: 'undefined',
	},
	{
		prop: 'indicator',
		type: 'boolean',
		description: 'Leading status dot. Can follow a checkbox.',
		default: 'false',
	},
	{
		prop: 'indicatorType',
		type: "'success' | 'warning' | 'error'",
		description: 'Colour of the status dot.',
		default: "'success'",
	},
	{
		prop: 'icon',
		type: 'ReactNode',
		description: 'Leading 16px icon slot.',
		default: 'undefined',
	},
	{
		prop: 'count',
		type: 'number',
		description: 'Count chip shown after the label.',
		default: 'undefined',
	},
	{
		prop: 'searchTag',
		type: 'boolean',
		description: 'Muted label only, e.g. "Label:".',
		default: 'false',
	},
	{
		prop: 'textField',
		type: 'boolean',
		description: 'Muted label followed by an editable value and a close button.',
		default: 'false',
	},
	{
		prop: 'inputValue',
		type: 'string',
		description: 'Controlled value of the text field.',
		default: 'undefined',
	},
	{
		prop: 'defaultInputValue',
		type: 'string',
		description: 'Initial value of the text field when uncontrolled.',
		default: "''",
	},
	{
		prop: 'inputPlaceholder',
		type: 'string',
		description: 'Placeholder of the empty text field.',
		default: "''",
	},
	{
		prop: 'readOnly',
		type: 'boolean',
		description: 'Shows the text field value without editing.',
		default: 'false',
	},
	{
		prop: 'onInputChange',
		type: '(value: string, event: ChangeEvent<HTMLInputElement>) => void',
		description: 'Called when the text field value changes.',
		default: 'undefined',
	},
	{
		prop: 'onInputBlur',
		type: '() => void',
		description: 'Called when the text field loses focus.',
		default: 'undefined',
	},
	{
		prop: 'onInputEnter',
		type: '() => void',
		description: 'Called on Enter or Tab inside the text field.',
		default: 'undefined',
	},
	{
		prop: 'onInputClear',
		type: '() => void',
		description:
			'Called when the close button is clicked or Backspace is pressed on an empty text field.',
		default: 'undefined',
	},
	{
		prop: 'onClick',
		type: '() => void',
		description: 'Called when the tag is clicked.',
		default: 'undefined',
	},
];

const TagDoc = () => (
	<>
		<Title />
		<Subtitle>
			Tag is a lightweight label component used to categorize, highlight, or filter content.
			It composes a leading checkbox, status dot or icon with a label, count chip, close
			button or inline text field, in three sizes.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=1730-3914&m=dev'
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

		<Subheading>With icon</Subheading>
		<Source language='tsx' code={ICON_USAGE_CODE} />

		<Subheading>Text field (controlled)</Subheading>
		<Source language='tsx' code={TEXT_FIELD_USAGE_CODE} />
	</>
);

export default TagDoc;
