import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../../components/docs';

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
		prop: 'position',
		type: "'left' | 'right'",
		description: 'Position of the radio icon relative to the label.',
		default: "'left'",
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
		description: 'Shows a red badge icon with a black error message below the radio.',
		default: 'undefined',
	},
	{
		prop: 'warning',
		type: 'string',
		description: 'Shows a yellow badge icon with a black warning message below the radio.',
		default: 'undefined',
	},
	{
		prop: 'focused',
		type: 'boolean',
		description: 'Forces the focus visual state.',
		default: 'false',
	},
	{
		prop: 'onChange',
		type: 'function',
		description:
			'Callback fired when the radio state changes. Receives the change event and the new boolean value.',
		default: 'undefined',
	},
];

const RadioDoc = () => (
	<>
		<Title />
		<Subtitle>
			Radio allows users to select a single option from a set. It supports focused, read-only,
			disabled, error, and warning states with configurable label positioning.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=899-2405&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/input/radio'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Radio component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the Radio component props.</p>

		<Subheading>Position</Subheading>
		<Source language='tsx' code={`type Position = 'left' | 'right';`} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { Radio } from '@banyan_cloud/roots';

const MyComponent = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Radio
      label='Enable notifications'
      checked={checked}
      onChange={(event, value) => setChecked(value)}
      position='left'
    />
  );
};`}
		/>
	</>
);

export default RadioDoc;
