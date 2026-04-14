import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../docs';

const propsData = [
	{
		prop: 'label',
		type: 'string',
		description: 'Label text displayed above the input field.',
		default: 'undefined',
	},
	{
		prop: 'placeholder',
		type: 'string',
		description: 'Placeholder text shown when input is empty.',
		default: "'Optional placeholder text'",
	},
	{
		prop: 'helperText',
		type: 'string',
		description: 'Helper text displayed below the input field.',
		default: "'Helper text'",
	},
	{
		prop: 'value',
		type: 'string',
		description: 'Controlled value of the input field.',
		default: 'undefined',
	},
	{
		prop: 'defaultValue',
		type: 'string',
		description: 'Initial value of the input field in uncontrolled mode.',
		default: 'undefined',
	},
	{
		prop: 'state',
		type: "'default' | 'filled' | 'active-typing' | 'filled-focus' | 'error-focus' | 'error-filled' | 'warning' | 'disable'",
		description: 'Current visual state of the input field.',
		default: "'default'",
	},
	{
		prop: 'size',
		type: "'sm' | 'md'",
		description: 'Size variant of the input field.',
		default: "'sm'",
	},
	{
		prop: 'type',
		type: "'default' | 'leading-text' | 'trailing-button' | 'leading-dropdown' | 'trailing-dropdown'",
		description: 'Structural variant of the input field.',
		default: "'default'",
	},
	{
		prop: 'required',
		type: 'boolean',
		description: 'Shows a required asterisk (*) after the label.',
		default: 'true',
	},
	{
		prop: 'disabled',
		type: 'boolean',
		description: 'Disables the input field, preventing any interaction.',
		default: 'false',
	},
	{
		prop: 'leadingIcon',
		type: 'boolean',
		description: 'Whether to show a leading icon inside the input field.',
		default: 'true',
	},
	{
		prop: 'leadingIconComponent',
		type: 'React.ComponentType',
		description: 'Icon component rendered as the leading icon.',
		default: 'undefined',
	},
	{
		prop: 'leadingText',
		type: 'string',
		description:
			'Text displayed at the beginning of the input. Replaces leadingIcon when present.',
		default: 'undefined',
	},
	{
		prop: 'trailingButton',
		type: 'boolean',
		description: 'Whether to show a trailing button attached to the input.',
		default: 'undefined',
	},
	{
		prop: 'trailingButtonText',
		type: 'string',
		description: 'Label text for the trailing button.',
		default: "'Copy'",
	},
	{
		prop: 'trailingButtonIcon',
		type: 'boolean',
		description: 'Whether to show an icon inside the trailing button.',
		default: 'undefined',
	},
	{
		prop: 'trailingButtonIconComponent',
		type: 'React.ComponentType',
		description: 'Icon component rendered inside the trailing button.',
		default: 'undefined',
	},
	{
		prop: 'trailingButtonOnClick',
		type: 'function',
		description: 'Callback fired when the trailing button is clicked.',
		default: 'undefined',
	},
	{
		prop: 'helpIcon',
		type: 'boolean',
		description: 'Shows a help icon with a tooltip on the right side of the label.',
		default: 'true',
	},
	{
		prop: 'helpText',
		type: 'string',
		description: 'Tooltip content displayed when hovering over the help icon.',
		default: 'undefined',
	},
	{
		prop: 'rightIcon',
		type: 'React.ComponentType',
		description: 'Icon component rendered on the right side of the input field.',
		default: 'undefined',
	},
	{
		prop: 'leadingDropdown',
		type: 'boolean',
		description: 'Whether to show a dropdown at the leading side of the input.',
		default: 'undefined',
	},
	{
		prop: 'leadingDropdownOptions',
		type: 'DropdownOption[]',
		description: 'Options array for the leading dropdown.',
		default: '[]',
	},
	{
		prop: 'leadingDropdownValue',
		type: 'string',
		description: 'Controlled value for the leading dropdown.',
		default: 'undefined',
	},
	{
		prop: 'leadingDropdownDefaultValue',
		type: 'string',
		description: 'Initial value for the leading dropdown in uncontrolled mode.',
		default: 'undefined',
	},
	{
		prop: 'leadingDropdownPlaceholder',
		type: 'string',
		description: 'Placeholder text for the leading dropdown.',
		default: "'Select'",
	},
	{
		prop: 'trailingDropdown',
		type: 'boolean',
		description: 'Whether to show a dropdown at the trailing side of the input.',
		default: 'undefined',
	},
	{
		prop: 'trailingDropdownOptions',
		type: 'DropdownOption[]',
		description: 'Options array for the trailing dropdown.',
		default: '[]',
	},
	{
		prop: 'trailingDropdownValue',
		type: 'string',
		description: 'Controlled value for the trailing dropdown.',
		default: 'undefined',
	},
	{
		prop: 'trailingDropdownDefaultValue',
		type: 'string',
		description: 'Initial value for the trailing dropdown in uncontrolled mode.',
		default: 'undefined',
	},
	{
		prop: 'trailingDropdownPlaceholder',
		type: 'string',
		description: 'Placeholder text for the trailing dropdown.',
		default: "'Select'",
	},
	{
		prop: 'onChange',
		type: 'function',
		description: 'Callback fired when the input value changes. Receives a ChangeEvent.',
		default: 'undefined',
	},
	{
		prop: 'onFocus',
		type: 'function',
		description: 'Callback fired when the input gains focus. Receives a FocusEvent.',
		default: 'undefined',
	},
	{
		prop: 'onBlur',
		type: 'function',
		description: 'Callback fired when the input loses focus. Receives a FocusEvent.',
		default: 'undefined',
	},
	{
		prop: 'onLeadingDropdownChange',
		type: 'function',
		description:
			'Callback fired when the leading dropdown value changes. Receives the selected string value.',
		default: 'undefined',
	},
	{
		prop: 'onTrailingDropdownChange',
		type: 'function',
		description:
			'Callback fired when the trailing dropdown value changes. Receives the selected string value.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to apply to the root element.',
		default: "''",
	},
	{
		prop: 'id',
		type: 'string',
		description: 'Optional id attribute applied to the input element.',
		default: 'undefined',
	},
	{
		prop: 'name',
		type: 'string',
		description: 'Optional name attribute applied to the input element.',
		default: 'undefined',
	},
	{
		prop: 'autoComplete',
		type: 'string',
		description: 'Optional autoComplete attribute applied to the input element.',
		default: 'undefined',
	},
	{
		prop: 'autoFocus',
		type: 'boolean',
		description: 'Whether the input should automatically receive focus on mount.',
		default: 'undefined',
	},
	{
		prop: 'readOnly',
		type: 'boolean',
		description: 'Makes the input read-only, preventing user edits.',
		default: 'undefined',
	},
	{
		prop: 'unstyled',
		type: 'boolean',
		description:
			'Renders a plain unstyled input element, bypassing all wrapper markup and styles.',
		default: 'false',
	},
];

const TextFieldDoc = () => (
	<>
		<Title />
		<Subtitle>
			TextField is a versatile text input component supporting multiple structural variants
			(leading icon, leading text, trailing button, leading dropdown, trailing dropdown) and
			visual states (default, active-typing, filled, error, warning, disabled).
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=101-711&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/input/textfield'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the TextField component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used by the TextField component props.</p>

		<Subheading>DropdownOption</Subheading>
		<Source
			language='tsx'
			code={`interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ComponentType<any>;
}`}
		/>

		<Subheading>TextFieldState</Subheading>
		<Source
			language='tsx'
			code={`type TextFieldState =
  | 'default'
  | 'filled'
  | 'active-typing'
  | 'filled-focus'
  | 'error-focus'
  | 'error-filled'
  | 'warning'
  | 'disable';`}
		/>

		<Subheading>TextFieldType</Subheading>
		<Source
			language='tsx'
			code={`type TextFieldType =
  | 'default'
  | 'leading-text'
  | 'trailing-button'
  | 'leading-dropdown'
  | 'trailing-dropdown';`}
		/>

		<Subheading>TextFieldSize</Subheading>
		<Source language='tsx' code={`type TextFieldSize = 'sm' | 'md';`} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { TextField } from '@banyan_cloud/roots';

// Default variant with leading icon
const MyForm = () => {
  const [email, setEmail] = useState('');

  return (
    <TextField
      label='Email Address'
      placeholder='Enter Email Address'
      helperText='We will never share your email.'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      leadingIcon
      leadingIconComponent={EmailIcon}
      helpIcon
    />
  );
};

// Leading text variant
const UrlInput = () => (
  <TextField
    label='Website'
    placeholder='Enter website URL'
    helperText='Include your full website address.'
    leadingText='https://'
    type='leading-text'
  />
);

// Trailing button variant
const CopyableInput = () => (
  <TextField
    label='API Key'
    value='sk-abc123'
    type='trailing-button'
    trailingButton
    trailingButtonText='Copy'
    trailingButtonIcon
    trailingButtonIconComponent={CopyIcon}
    trailingButtonOnClick={() => navigator.clipboard.writeText('sk-abc123')}
  />
);

// Leading dropdown variant (e.g. phone with country code)
const PhoneInput = () => (
  <TextField
    label='Phone Number'
    placeholder='Enter Phone Number'
    type='leading-dropdown'
    leadingDropdown
    leadingDropdownOptions={[
      { value: 'us', label: 'US' },
      { value: 'in', label: 'IN' },
    ]}
    leadingDropdownDefaultValue='us'
  />
);

// Trailing dropdown variant (e.g. amount with currency)
const AmountInput = () => (
  <TextField
    label='Amount'
    placeholder='Enter amount'
    type='trailing-dropdown'
    trailingDropdown
    trailingDropdownOptions={[
      { value: 'USD', label: 'USD' },
      { value: 'EUR', label: 'EUR' },
      { value: 'INR', label: 'INR' },
    ]}
    trailingDropdownDefaultValue='USD'
  />
);`}
		/>
	</>
);

export default TextFieldDoc;
