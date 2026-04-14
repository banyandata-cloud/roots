import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../../components/docs';

const propsData = [
	{
		prop: 'title',
		type: 'ReactElement | string',
		description: 'The text or element to be displayed within the button.',
		default: '""',
	},
	{
		prop: 'id',
		type: 'string',
		description: 'Optional id attribute applied to the button element.',
		default: 'undefined',
	},
	{
		prop: 'disabled',
		type: 'boolean',
		description: 'If true, the button is disabled and cannot be interacted with.',
		default: 'false',
	},
	{
		prop: 'type',
		type: "'button' | 'submit' | 'reset'",
		description: 'The type of the button.',
		default: "'button'",
	},
	{
		prop: 'onClick',
		type: 'function',
		description: 'Callback function executed when the button is clicked.',
		default: 'undefined',
	},
	{
		prop: 'blurOnClick',
		type: 'boolean',
		description: 'If true, the button will lose focus after being clicked.',
		default: 'true',
	},
	{
		prop: 'variant',
		type: "'contained' | 'outlined' | 'text'",
		description: 'For applying visual style to the button.',
		default: "'contained'",
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to be applied to the BaseButton component.',
		default: '""',
	},
];

const BaseButtonDoc = () => (
	<>
		<Title />
		<Subtitle>
			BaseButton is the foundational button primitive. It provides core interaction behaviour
			and visual variants that higher-level button components build upon.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=14-3&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/buttons/basebutton'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the BaseButton component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the BaseButton component props.</p>

		<Subheading>ButtonType</Subheading>
		<Source language='tsx' code={`type ButtonType = 'button' | 'submit' | 'reset';`} />

		<Subheading>ButtonVariant</Subheading>
		<Source language='tsx' code={`type ButtonVariant = 'contained' | 'outlined' | 'text';`} />

		<Subheading>disabled</Subheading>
		<p>Prevents interaction and applies a muted visual style. Works across all variants.</p>
		<Source
			language='tsx'
			code={`<BaseButton title='Verb + noun' variant='contained' disabled />`}
		/>

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { BaseButton } from '@banyan_cloud/roots';

const MyComponent = () => (
  <BaseButton
    title='Submit'
    variant='contained'
    onClick={(event) => console.log('clicked')}
  />
);`}
		/>
	</>
);

export default BaseButtonDoc;
