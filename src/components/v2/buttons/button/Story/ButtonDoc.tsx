import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../../components/docs';

const propsData = [
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to be applied to the button.',
		default: '""',
	},
	{
		prop: 'title',
		type: 'string | ReactElement',
		description:
			'The text to be displayed within the button. When omitted with only leftComponent provided, renders as a square icon-only button.',
		default: '""',
	},
	{
		prop: 'leftComponent',
		type: 'ComponentType',
		description:
			'Component to render as the left icon. Receives className for sizing. When used alone without title, renders the button as icon-only.',
		default: 'undefined',
	},
	{
		prop: 'rightComponent',
		type: 'ComponentType',
		description: 'Component to render as the right icon. Receives className for sizing.',
		default: 'undefined',
	},
	{
		prop: 'variant',
		type: "'primary' | 'secondary' | 'Soft' | 'outlined' | 'ghost'",
		description: 'For applying visual style to the button.',
		default: "'primary'",
	},
	{
		prop: 'size',
		type: "'xs' | 'sm' | 'md' | 'lg' | 'auto'",
		description: 'The size of the button, affecting its dimensions.',
		default: "'sm'",
	},
	{
		prop: 'textSize',
		type: "'sm' | 'md'",
		description: 'Controls the font size of the button label independently of the button size.',
		default: "'sm'",
	},
	{
		prop: 'disabled',
		type: 'boolean',
		description: 'If true, the button is disabled and cannot be interacted with.',
		default: 'false',
	},
	{
		prop: 'id',
		type: 'string',
		description: 'Optional id attribute applied to the button element.',
		default: 'undefined',
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
];

const ButtonDoc = () => (
	<>
		<Title />
		<Subtitle>
			Button triggers an action or event. It supports five visual variants, four sizes,
			optional leading and trailing icons, and a disabled state.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=14-3&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/buttons/button'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Button component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the Button component props.</p>

		<Subheading>ButtonVariant</Subheading>
		<Source
			language='tsx'
			code={`type ButtonVariant = 'primary' | 'secondary' | 'Soft' | 'outlined' | 'ghost';`}
		/>

		<Subheading>ButtonSize</Subheading>
		<Source language='tsx' code={`type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'auto';`} />

		<Subheading>ButtonTextSize</Subheading>
		<Source language='tsx' code={`type ButtonTextSize = 'sm' | 'md';`} />

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { Button } from '@banyan_cloud/roots';

const MyComponent = () => (
  <Button
    title='Send Email'
    variant='primary'
    size='md'
    leftComponent={MailIcon}
    rightComponent={ArrowIcon}
    onClick={(event) => console.log('clicked', event)}
  />
);`}
		/>
	</>
);

export default ButtonDoc;
