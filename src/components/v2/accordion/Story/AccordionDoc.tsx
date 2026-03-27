import { Heading, Source, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../docs';

const CODE = `
import { useState } from 'react';
import { Accordion } from '@banyandata-cloud/roots';

const MyComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      open={open}
      onToggle={(current) => setOpen(!current)}
      title="General Settings"
      description="Manage your account preferences and security."
    >
      <div>This is the internal content of the accordion.</div>
    </Accordion>
  );
};
`;

const propsData = [
	{
		prop: 'open',
		type: 'boolean',
		description: 'This Key decides whether to open Accordion or not.',
		default: 'false',
	},
	{
		prop: 'defaultOpen',
		type: 'boolean',
		description: 'This Key decides whether Accordion is open by default or not.',
		default: 'false',
	},
	{
		prop: 'description',
		type: 'string',
		description: 'Optional Key to give a description to the Component.',
		default: '""',
	},
	{
		prop: 'onToggle',
		type: 'function',
		description: 'A Callback function that captures when Accordion state is changed.',
		default: 'null',
	},
	{
		prop: 'onClick',
		type: 'function',
		description: 'A Callback function that captures when Accordion is clicked.',
		default: 'null',
	},
	{
		prop: 'onExpand',
		type: 'function',
		description: 'A Callback function that captures when Accordion is Expanded.',
		default: 'null',
	},
	{
		prop: 'leftComponent',
		type: 'Node',
		description: 'This Component displays another component on the Left Side of Accordion.',
		default: 'CaretIcon',
	},
	{
		prop: 'rightComponent',
		type: 'Node',
		description: 'This Component displays another component on the Right Side of Accordion.',
		default: 'CaretIcon',
	},
	{
		prop: 'title',
		type: 'Node',
		description: 'This Component shows the main Titular value of Accordion.',
		default: 'CaretIcon',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Key to change style through external className.',
		default: '""',
	},
	{
		prop: 'disabled',
		type: 'boolean',
		description: 'Disables the accordion, preventing any interaction.',
		default: 'false',
	},
];

const AccordionDoc = () => (
	<>
		<Title />
		<Subtitle>
			Interactive expandable content panels used to organize complex information by allowing
			users to expand or collapse sections.
		</Subtitle>
		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=144-45&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/aerials/tree/main/src/components/v2/Accordion/Accordion.tsx'
		/>
		<Heading>API</Heading>
		<p>
			Main props for the Accordion component for rendering and customizing the interactive
			panels.
		</p>
		<PropsTable data={propsData} />

		<Heading>Usage</Heading>
		<Source language='tsx' code={CODE} />
	</>
);

export default AccordionDoc;
