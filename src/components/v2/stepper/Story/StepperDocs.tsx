import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const BASIC_USAGE_CODE = `
import { Stepper } from '@banyan_cloud/roots';

const steps: Step[] = [
  { label: 'Your details', description: 'Please provide your name and email', status: 'completed' },
  { label: 'Company info', description: 'A few details about your company', status: 'current' },
  { label: 'Review', description: 'Review and submit your details', status: 'incomplete' },
];

const MyComponent = () => (
  <Stepper
    size="sm"
    variant="icon"
    orientation="horizontal"
    steps={steps}
  />
);
`;

const propsData = [
	{
		prop: 'steps',
		type: 'Step[]',
		description:
			'Array of step objects defining label, description, status, and optional step number.',
		default: 'undefined',
	},
	{
		prop: 'size',
		type: "'sm' | 'md'",
		description: 'Controls the size of the stepper indicators and text.',
		default: "'sm'",
	},
	{
		prop: 'variant',
		type: "'icon' | 'noIcon' | 'progressBar'",
		description:
			'Determines the visual style of each step indicator. Use icon for check/status icons, noIcon for numbered steps, and progressBar for a continuous bar.',
		default: "'icon'",
	},
	{
		prop: 'orientation',
		type: "'horizontal' | 'vertical'",
		description: 'Sets the layout direction of the stepper.',
		default: "'horizontal'",
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Custom CSS class name to apply additional styles.',
		default: 'undefined',
	},
	{
		prop: 'style',
		type: 'CSSProperties',
		description: 'Inline styles applied directly to the stepper element.',
		default: 'undefined',
	},
];

const stepTypeData = [
	{
		prop: 'label',
		type: 'string',
		description: 'The main heading text for the step.',
		default: 'undefined',
	},
	{
		prop: 'description',
		type: 'string',
		description: 'Supporting text shown below the label.',
		default: 'undefined',
	},
	{
		prop: 'status',
		type: "'incomplete' | 'current' | 'completed'",
		description: 'The current state of the step, which controls its visual appearance.',
		default: "'incomplete'",
	},
	{
		prop: 'step',
		type: 'number',
		description:
			'The step number displayed inside the indicator. Required when using the noIcon variant.',
		default: 'undefined',
	},
];

const StepperDoc = () => (
	<>
		<Title />
		<Subtitle>
			Stepper guides users through a multi-step process by showing progress across sequential
			stages. It supports icon, number, and progress bar variants in both horizontal and
			vertical orientations.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=2037-1012&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/stepper'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the Stepper component.</p>
		<PropsTable data={propsData} />

		<Subheading>Step Type</Subheading>
		<p>
			Shape of each object in the <code>steps</code> array.
		</p>
		<PropsTable data={stepTypeData} />

		<Heading>Custom Types</Heading>
		<p>Custom types used by the Stepper component.</p>

		<Subheading>Orientation</Subheading>
		<Source language='tsx' code={`type Orientation = 'horizontal' | 'vertical';`} />

		<Subheading>StepStatus</Subheading>
		<Source language='tsx' code={`type StepStatus = 'incomplete' | 'current' | 'completed';`} />

		<Subheading>StepperSize</Subheading>
		<Source language='tsx' code={`type StepperSize = 'sm' | 'md';`} />

		<Subheading>StepperVariant</Subheading>
		<Source language='tsx' code={`type StepperVariant = 'icon' | 'noIcon' | 'progressBar';`} />

		<Heading>Usage</Heading>
		<Source language='tsx' code={BASIC_USAGE_CODE} />
	</>
);

export default StepperDoc;
