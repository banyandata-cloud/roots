import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../../components/docs';

const propsData = [
	{
		prop: 'label',
		type: 'ReactNode',
		description: 'Text label associated with the Toggle input.',
		default: 'undefined',
	},
	{
		prop: 'checked',
		type: 'boolean',
		description: 'Controls whether the toggle is checked in controlled mode.',
		default: 'undefined',
	},
	{
		prop: 'defaultChecked',
		type: 'boolean',
		description: 'Specifies the initial checked state in uncontrolled mode.',
		default: 'undefined',
	},
	{
		prop: 'size',
		type: "'l' | 's'",
		description: 'Controls the size of the toggle.',
		default: "'s'",
	},
	{
		prop: 'disabled',
		type: 'boolean',
		description: 'Disables the toggle, preventing any interaction.',
		default: 'false',
	},
	{
		prop: 'readonly',
		type: 'boolean',
		description: 'Makes the toggle non-interactive while keeping it visually active.',
		default: 'false',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to apply to the toggle.',
		default: '""',
	},
	{
		prop: 'onChange',
		type: 'function',
		description:
			'Callback fired when the toggle state changes. Receives the change event and the new boolean value.',
		default: 'undefined',
	},
];

const ToggleDoc = () => (
	<>
		<Title />
		<Subtitle>
			Toggle allows users to switch between two states - on and off. It supports size
			variants, default checked, disabled, and read-only states.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=908-2577&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/input/toggle'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Toggle component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the Toggle component props.</p>

		<Subheading>Size</Subheading>
		<Source language='tsx' code={`type Size = 'l' | 's';`} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { Toggle } from '@banyan_cloud/roots';

const MyComponent = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      label='Enable notifications'
      size='l'
      checked={checked}
      onChange={(event, value) => setChecked(value)}
    />
  );
};`}
		/>
	</>
);

export default ToggleDoc;
