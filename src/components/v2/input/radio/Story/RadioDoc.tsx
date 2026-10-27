import { Heading, Source, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../docs';

const propsData = [
	{
		prop: 'label',
		type: 'ReactNode',
		description: 'Text label associated with the radio input.',
		default: 'undefined',
	},
	{
		prop: 'checked',
		type: 'boolean',
		description: 'Controls whether the radio button is selected.',
		default: 'false',
	},
	{
		prop: 'defaultChecked',
		type: 'boolean',
		description: 'Specifies the initial checked state in uncontrolled mode.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to apply to the radio container.',
		default: '""',
	},
	{
		prop: 'disabled',
		type: 'boolean',
		description: 'Disables the radio input completely.',
		default: 'false',
	},
	{
		prop: 'readOnly',
		type: 'boolean',
		description: 'Makes the radio non-interactive without full disabled greying.',
		default: 'false',
	},
	{
		prop: 'error',
		type: 'string',
		description:
			'Shows an error message with a red status icon below the radio and colours the radio red. Takes precedence over warning.',
		default: 'undefined',
	},
	{
		prop: 'warning',
		type: 'string',
		description: 'Shows a warning message with an orange status icon below the radio.',
		default: 'undefined',
	},
	{
		prop: 'name',
		type: 'string',
		description: 'Native input name. Radios sharing a name deselect each other.',
		default: 'undefined',
	},
	{
		prop: 'value',
		type: 'string',
		description: 'Native input value.',
		default: 'undefined',
	},
	{
		prop: 'id',
		type: 'string',
		description: 'Id of the input element.',
		default: 'undefined',
	},
	{
		prop: 'onChange',
		type: 'function',
		description:
			'Callback fired when the radio gets selected, in controlled and uncontrolled mode. Receives the change event and the new boolean value. Not fired when readOnly.',
		default: 'undefined',
	},
];

const RadioDoc = () => (
	<>
		<Title />
		<Subtitle>
			Radio allows users to select a single option from a set. It supports focused, read-only,
			disabled, error, and warning states.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=899-2405&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/input/radio'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Radio component.</p>
		<PropsTable data={propsData} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { Radio } from '@banyandata-cloud/roots';

const MyComponent = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Radio
      label='Enable notifications'
      checked={checked}
      onChange={(event, value) => setChecked(value)}
    />
  );
};`}
		/>
	</>
);

export default RadioDoc;
