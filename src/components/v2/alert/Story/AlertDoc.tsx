import { Heading, Source, Subheading, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { LinkHeader, PropsTable } from '../../../../components/docs';

const CODE = `
import { useRef } from 'react';
import { Alert } from '@banyan_cloud/roots';

const MyComponent = () => {
  const alertRef = useRef<AlertHandle>(null);

  const showAlert = () => {
    alertRef.current?.alert({
      title: 'Success Message',
      description: 'Your changes have been saved successfully.',
      type: 'success',
    });
  };

  return (
    <>
      <button onClick={showAlert}>Trigger Alert</button>
      <Alert ref={alertRef} />
    </>
  );
};
`;

const propsData = [
	{
		prop: 'showIcon',
		type: 'boolean',
		description: 'Determines whether to display an icon in the alert.',
		default: 'true',
	},
	{
		prop: 'shadow',
		type: 'boolean',
		description: 'Determines whether to show a shadow around the alert.',
		default: 'false',
	},
	{
		prop: 'position',
		type: "'bottom-right' | 'bottom-center' | 'top-right' | 'top-center'",
		description: 'Position of the alert on the screen.',
		default: "'bottom-center'",
	},
	{
		prop: 'animation',
		type: 'boolean',
		description: 'Enables or disables the entrance animation of the alert.',
		default: 'true',
	},
	{
		prop: 'variant',
		type: "'inline' | 'card'",
		description: 'Visual variant of the alert.',
		default: "'card'",
	},
	{
		prop: 'theme',
		type: "'light' | 'dark'",
		description: 'Color theme of the alert.',
		default: "'light'",
	},
	{
		prop: 'className',
		type: 'string',
		description: 'Key to change style through external className.',
		default: '""',
	},
];

const AlertDoc = () => (
	<>
		<Title />
		<Subtitle>
			Alerts provide contextual feedback messages for typical user actions with various
			intensities. They are triggered imperatively using a React Ref.
		</Subtitle>

		<LinkHeader githubLink='https://github.com/banyandata-cloud/roots/tree/main/src/components/v2/alert' />

		<Heading>API</Heading>
		<p>Main props passed to the Alert component.</p>
		<PropsTable data={propsData} />

		<Heading>Custom Types</Heading>
		<p>Custom types for the Alert component props.</p>

		<Subheading>AlertConfig</Subheading>
		<p>
			Configuration object passed to <code>alertRef.current.alert()</code> to trigger and
			configure an individual alert instance.
		</p>
		<Source
			language='tsx'
			code={`
type AlertType = 'info' | 'error' | 'warning' | 'success' | 'danger';
type AlertPosition = 'bottom-right' | 'bottom-center' | 'top-right' | 'top-center';

interface AlertConfig {
  title: string | null | undefined;
  description: string | null | undefined;
  type: AlertType;
  tag?: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  action?: ComponentType;
  position?: AlertPosition | null | undefined;
  onClose?: () => void;
  autoDismiss?: boolean;
  dismissTime?: number;
}
`}
		/>

		<Heading>Usage</Heading>
		<Source language='tsx' code={CODE} />
	</>
);

export default AlertDoc;
