import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../../components/docs';

const propsData = [
	{
		prop: 'className',
		type: 'string',
		description: 'Additional CSS class names to apply to the dialog box.',
		default: '""',
	},
	{
		prop: 'size',
		type: "'sm' | 'md'",
		description: 'Controls the size of the dialog box.',
		default: "'md'",
	},
];

const dialogOpenOptionsData = [
	{
		prop: 'title',
		type: 'string',
		description: 'Title displayed in the dialog header.',
		default: 'null',
	},
	{
		prop: 'description',
		type: 'string',
		description: 'Description displayed below the title.',
		default: 'null',
	},
	{
		prop: 'actionText',
		type: 'string',
		description: 'Label for the primary action button.',
		default: 'undefined',
	},
	{
		prop: 'cancelText',
		type: 'string',
		description: 'Label for the cancel button.',
		default: 'undefined',
	},
	{
		prop: 'variant',
		type: 'ButtonColors',
		description: 'Visual color variant applied to the primary action button.',
		default: 'undefined',
	},
	{
		prop: 'onAction',
		type: 'DialogActionCallback',
		description:
			'Callback fired when the primary action button is clicked. Receives dismiss and setNoDismissEnabled handlers.',
		default: 'null',
	},
	{
		prop: 'onCancel',
		type: 'function',
		description: 'Callback fired when the cancel button is clicked.',
		default: 'null',
	},
	{
		prop: 'size',
		type: "'sm' | 'md'",
		description: 'Overrides the size of the dialog for this specific instance.',
		default: 'undefined',
	},
	{
		prop: 'customAction',
		type: 'ComponentType<DialogActionHandlers>',
		description: 'Custom component to replace the default action button.',
		default: 'null',
	},
	{
		prop: 'body',
		type: 'ComponentType',
		description: 'Custom component to replace the default dialog body.',
		default: 'null',
	},
	{
		prop: 'hideCancel',
		type: 'boolean',
		description: 'If true, hides the cancel button.',
		default: 'false',
	},
	{
		prop: 'noDismiss',
		type: 'boolean',
		description: 'If true, clicking outside the dialog will not close it.',
		default: 'false',
	},
	{
		prop: 'hideCrossDismiss',
		type: 'boolean',
		description: 'If true, hides the close (cross) button in the dialog header.',
		default: 'false',
	},
];

const DialogBoxDoc = () => (
	<>
		<Title />
		<Subtitle>
			DialogBox is an imperative modal primitive triggered via a React ref. It supports
			confirmation flows, custom actions, custom body content, and dismissal behaviour.
		</Subtitle>

		<LinkHeader
			figmaLink='https://www.figma.com/design/IfmLQrA0AAZVYwt6vRxqCe/Design-System--26?node-id=711-1582&p=f&m=dev'
			githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/modal/dialogBox'
		/>

		<Heading>API</Heading>
		<p>Props accepted by the DialogBox component.</p>
		<PropsTable data={propsData} />

		<Subheading>DialogOpenOptions</Subheading>
		<p>
			Configuration object passed to <code>dialogRef.current.dialog()</code> to trigger and
			configure a dialog instance.
		</p>
		<PropsTable data={dialogOpenOptionsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the DialogBox component props.</p>

		<Subheading>DialogSize</Subheading>
		<Source language='tsx' code={`type DialogSize = 'sm' | 'md';`} />

		<Subheading>DialogActionHandlers</Subheading>
		<Source
			language='tsx'
			code={`interface DialogActionHandlers {
  dismiss: () => void;
  setNoDismissEnabled?: (enabled: boolean) => void;
}`}
		/>

		<Subheading>DialogActionCallback</Subheading>
		<Source
			language='tsx'
			code={`type DialogActionCallback = (handlers: DialogActionHandlers) => void;`}
		/>

		<Subheading>DialogBoxHandle</Subheading>
		<Source
			language='tsx'
			code={`interface DialogBoxHandle {
  dialog: (options: DialogOpenOptions) => void;
}`}
		/>

		<Heading>Usage</Heading>
		<Source
			language='tsx'
			code={`import { useRef } from 'react';
import { DialogBox } from '@banyan_cloud/roots';
import type { DialogBoxHandle } from '@banyan_cloud/roots';

const MyComponent = () => {
  const dialogRef = useRef<DialogBoxHandle>(null);

  const openDialog = () => {
    dialogRef.current?.dialog({
      title: 'Delete Row?',
      description: 'Are you sure you want to delete?',
      actionText: 'Done',
      cancelText: 'Cancel',
      variant: 'primary',
      onAction: ({ dismiss }) => {
        console.log('action confirmed');
        dismiss();
      },
    });
  };

  return (
    <>
      <button type='button' onClick={openDialog}>Open Dialog</button>
      <DialogBox ref={dialogRef} />
    </>
  );
};`}
		/>
	</>
);

export default DialogBoxDoc;
