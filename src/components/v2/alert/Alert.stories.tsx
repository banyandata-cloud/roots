import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { AlertIcon } from '../../../components/icons/AlertIcon';
import { ThemedContainer } from '../../helpers';
import Alert from './Alert';
import AlertDoc from './Story/AlertDoc';

const meta: Meta<typeof Alert> = {
	title: 'Components/v2/Alert',
	component: Alert,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: AlertDoc,
		},
		layout: 'padded',
		options: { showToolbar: true },
	},
	decorators: [
		(Story) => (
			<ThemedContainer theme='light'>
				<Story />
			</ThemedContainer>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Alert>;

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '48px',
};

const headingStyle = {
	fontSize: '14px',
	fontWeight: '600' as const,
	fontFamily: 'Jakarta, sans-serif',
	color: '#333',
	borderBottom: '1px solid #e0e0e0',
	paddingBottom: '8px',
	marginBottom: '24px',
};

const AlertTrigger = ({ config, alertProps = {} }: any) => {
	const alertRef = useRef<any>(null);
	const [alertFns, setAlertFns] = useState<any>({});

	useEffect(() => {
		if (alertRef.current) {
			setAlertFns({ alert: alertRef.current.alert });
		}
	}, []);

	return (
		<div>
			<button
				type='button'
				onClick={() => alertFns.alert?.(config)}
				style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px' }}>
				Alert
			</button>
			<Alert ref={alertRef} {...alertProps} />
		</div>
	);
};

export const AllAlerts: Story = {
	name: 'Variants',
	render: () => (
		<div style={sectionStyle}>
			<div>
				<p style={headingStyle}>Info Alert</p>
				<AlertTrigger
					config={{
						title: 'Information',
						description: 'Basic Info is Here',
						type: 'info',
					}}
				/>
			</div>
			<div>
				<p style={headingStyle}>Info Card Alert</p>
				<AlertTrigger
					config={{
						title: 'Information',
						description: 'Basic Info is Here',
						tag: '02:39:05 AM',
						type: 'info',
					}}
					alertProps={{ variant: 'card', theme: 'light' }}
				/>
			</div>
			<div>
				<p style={headingStyle}>Error Alert</p>
				<AlertTrigger
					config={{ title: 'Error', description: 'Basic Error', type: 'error' }}
				/>
			</div>
			<div>
				<p style={headingStyle}>Warning Alert</p>
				<AlertTrigger
					config={{ title: 'Warning', description: 'Basic Warning', type: 'warning' }}
				/>
			</div>
			<div>
				<p style={headingStyle}>Success Alert</p>
				<AlertTrigger
					config={{
						title: 'Success',
						description: 'Basic Success Desc.',
						type: 'success',
					}}
				/>
			</div>
			<div>
				<p style={headingStyle}>Danger Alert</p>
				<AlertTrigger
					config={{ title: 'Error', description: 'Error Description', type: 'danger' }}
				/>
			</div>
			<div>
				<p style={headingStyle}>Custom Icon Alert</p>
				<AlertTrigger
					config={{
						title: 'Custom Icon',
						description: 'This alert uses a custom icon component.',
						type: 'info',
						icon: (props: any) => <AlertIcon.Info {...props} />,
					}}
				/>
			</div>
		</div>
	),
};
