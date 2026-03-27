import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to apply to the checkbox.',
		default: '""',
	},
	{
		prop: 'size',
		type: "'sm' | 'md' | 'lg' | 'xlg'",
		description: 'Controls the size of the checkbox.',
		default: "'md'",
	},
	{
		prop: 'checked',
		type: 'boolean',
		description: 'Whether the checkbox is checked.',
		default: 'false',
	},
	{
		prop: 'defaultChecked',
		type: 'boolean',
		description: 'Specifies the initial checked state in uncontrolled mode.',
		default: 'undefined',
	},
	{
		prop: 'indeterminate',
		type: 'boolean',
		description: 'Whether the checkbox is in an indeterminate state (dash icon).',
		default: 'false',
	},
	{
		prop: 'disabled',
		type: 'boolean',
		description: 'Disables the checkbox, preventing any interaction.',
		default: 'false',
	},
	{
		prop: 'readOnly',
		type: 'boolean',
		description: 'Makes the checkbox read-only (grey background, no interaction).',
		default: 'false',
	},
	{
		prop: 'error',
		type: 'boolean',
		description: 'Applies an error visual style to the checkbox (red border/fill).',
		default: 'false',
	},
	{
		prop: 'warning',
		type: 'boolean',
		description:
			'Applies a warning visual style to the checkbox (orange message, blue fill when checked).',
		default: 'false',
	},
	{
		prop: 'label',
		type: 'ReactNode',
		description: 'Primary label text displayed next to the checkbox.',
		default: 'undefined',
	},
	{
		prop: 'subLabel',
		type: 'ReactNode',
		description: 'Secondary label text displayed below the primary label.',
		default: 'undefined',
	},
	{
		prop: 'errorMessage',
		type: 'ReactNode',
		description: 'Message displayed below the checkbox when error or warning is true.',
		default: 'undefined',
	},
	{
		prop: 'id',
		type: 'string',
		description: 'Optional id attribute applied to the checkbox input element.',
		default: 'undefined',
	},
	{
		prop: 'name',
		type: 'string',
		description: 'Optional name attribute applied to the checkbox input element.',
		default: 'undefined',
	},
	{
		prop: 'onChange',
		type: 'function',
		description: 'Callback fired when the checkbox value changes. Receives a ChangeEvent.',
		default: 'undefined',
	},
];

const CheckboxDoc = () => (
	<>
		<Title />
		<Subtitle>
			Checkbox allows users to select one or more options from a set. It supports controlled,
			read-only, disabled, indeterminate, error, and warning states across multiple sizes.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=134-426&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/checkbox'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Checkbox component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the Checkbox component props.</p>

		<Subheading>CheckboxSize</Subheading>
		<Source language='tsx' code={`type CheckboxSize = 'sm' | 'md' | 'lg' | 'xlg';`} />

		<Subheading>CheckboxState</Subheading>
		<Source
			language='tsx'
			code={`type CheckboxState = 'default' | 'hover' | 'focus' | 'disabled' | 'readOnly' | 'error' | 'warning';`}
		/>

		<Subheading>CheckboxValue</Subheading>
		<Source
			language='tsx'
			code={`type CheckboxValue = 'checked' | 'unchecked' | 'indeterminate';`}
		/>

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { Checkbox } from '@banyan_cloud/roots';

const MyComponent = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label='Remember me'
      subLabel='Stay signed in on this device.'
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};`}
		/>
	</>
);

export default CheckboxDoc;
