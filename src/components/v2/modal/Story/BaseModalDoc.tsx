import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const propsData = [
	{
		prop: 'open',
		type: 'boolean',
		description: 'Controls whether the modal is open or closed.',
		default: 'false',
	},
	{
		prop: 'title',
		type: 'string',
		description: 'Title displayed in the modal header.',
		default: 'undefined',
	},
	{
		prop: 'description',
		type: 'string',
		description: 'Description displayed below the title in the modal header.',
		default: 'undefined',
	},
	{
		prop: 'children',
		type: 'ReactNode',
		description: 'Content rendered inside the modal body.',
		default: 'undefined',
	},
	{
		prop: 'toggle',
		type: 'function',
		description: 'Callback to open or close the modal. Receives an optional boolean.',
		default: 'undefined',
	},
	{
		prop: 'footerProps',
		type: 'ModalFooterProps',
		description: 'Configuration object for the default modal footer.',
		default: 'undefined',
	},
	{
		prop: 'renderHeader',
		type: 'ReactNode | function',
		description: 'Custom header component or render function to override the default header.',
		default: 'undefined',
	},
	{
		prop: 'renderFooter',
		type: 'ReactNode | function',
		description: 'Custom footer component or render function to override the default footer.',
		default: 'undefined',
	},
	{
		prop: 'noDismiss',
		type: 'boolean',
		description: 'If true, clicking outside the modal will not close it.',
		default: 'false',
	},
	{
		prop: 'hideCrossDismiss',
		type: 'boolean',
		description: 'If true, hides the close (cross) button in the modal header.',
		default: 'false',
	},
	{
		prop: 'animation',
		type: 'boolean',
		description: 'Enables or disables the modal entrance and exit animation.',
		default: 'true',
	},
	{
		prop: 'animationProperties',
		type: 'Record<string, object>',
		description: 'Custom framer-motion animation properties to override the default animation.',
		default: 'undefined',
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to apply to the modal root.',
		default: '""',
	},
	{
		prop: 'popperClassName',
		type: 'string',
		description: 'Additional CSS class names to apply to the modal popper overlay.',
		default: '""',
	},
];

const modalFooterPropsData = [
	{
		prop: 'actionTitle',
		type: 'string',
		description: 'Label for the primary action button.',
		default: 'undefined',
	},
	{
		prop: 'cancelTitle',
		type: 'string',
		description: 'Label for the cancel button.',
		default: 'undefined',
	},
	{
		prop: 'onAction',
		type: 'function',
		description: 'Callback fired when the primary action button is clicked.',
		default: 'undefined',
	},
	{
		prop: 'onDismiss',
		type: 'function',
		description: 'Callback fired when the cancel button is clicked.',
		default: 'undefined',
	},
	{
		prop: 'toggle',
		type: 'function',
		description: 'Callback to toggle the modal open or closed.',
		default: 'undefined',
	},
	{
		prop: 'loading',
		type: 'boolean',
		description: 'If true, shows a loading state on the primary action button.',
		default: 'false',
	},
	{
		prop: 'disabled',
		type: '{ action?: boolean; cancel?: boolean }',
		description: 'Disables the action or cancel button individually.',
		default: '{}',
	},
];

const BaseModalDoc = () => (
	<>
		<Title />
		<Subtitle>
			BaseModal is a composable modal primitive that supports controlled open state, custom
			headers and footers, dismissal behaviour, and framer-motion animations.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=711-1582&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/modal'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the BaseModal component.</p>
		<PropsTable data={propsData} />

		<Subheading>ModalFooterProps</Subheading>
		<p>
			Configuration object passed to the <code>footerProps</code> prop to configure the
			default modal footer.
		</p>
		<PropsTable data={modalFooterPropsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the BaseModal component props.</p>

		<Subheading>FooterProps</Subheading>
		<Source
			language='tsx'
			code={`import type { MotionProps } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

type FooterProps = ComponentPropsWithoutRef<'footer'> & MotionProps;`}
		/>

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { useState } from 'react';
import { BaseModal } from '@banyan_cloud/roots';

const MyComponent = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <>
      <button onClick={toggle}>Open Modal</button>
      <BaseModal
        open={open}
        toggle={toggle}
        title='Header'
        description='Description'
        footerProps={{
          actionTitle: 'Save Changes',
          cancelTitle: 'Dismiss',
          onAction: () => console.log('action'),
          onDismiss: () => console.log('dismiss'),
          toggle,
        }}
      >
        <p>Modal body content goes here.</p>
      </BaseModal>
    </>
  );
};`}
		/>
	</>
);

export default BaseModalDoc;
