import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { HelpIcon } from '../icons';
import { ThemedContainer } from '../helpers';
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
				style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px' }}
			>
				Alert
			</button>
			<Alert ref={alertRef} {...alertProps} />
		</div>
	);
};

const TYPES = ['success', 'info', 'error', 'warning'] as const;

const ActionLink = () => <span>Link</span>;

const typeTitle = (type: string) => type.charAt(0).toUpperCase() + type.slice(1);

export const Inline: Story = {
	render: () => (
		<div style={sectionStyle}>
			{TYPES.map((type) => (
				<div key={type}>
					<p style={headingStyle}>{typeTitle(type)} Inline Alert</p>
					<AlertTrigger
						config={{
							title: 'Server instance location changed',
							description: 'Server instance location changed',
							type,
							action: ActionLink,
							autoDismiss: false,
						}}
						alertProps={{ variant: 'inline' }}
					/>
				</div>
			))}
		</div>
	),
};

export const Card: Story = {
	render: () => (
		<div style={sectionStyle}>
			{TYPES.map((type) => (
				<div key={type}>
					<p style={headingStyle}>{typeTitle(type)} Card Alert</p>
					<AlertTrigger
						config={{
							title: 'Server instance location changed',
							description: 'The server instance is successfully running.',
							type,
							action: ActionLink,
							autoDismiss: false,
						}}
						alertProps={{ variant: 'card' }}
					/>
				</div>
			))}
			<div>
				<p style={headingStyle}>Card Alert with timestamp</p>
				<AlertTrigger
					config={{
						title: 'Server instance location changed',
						description: 'The server instance is successfully running.',
						tag: '02:39:05 AM',
						type: 'info',
						autoDismiss: false,
					}}
					alertProps={{ variant: 'card' }}
				/>
			</div>
			<div>
				<p style={headingStyle}>Custom Icon Alert</p>
				<AlertTrigger
					config={{
						title: 'Custom Icon',
						description: 'This alert uses a custom icon component.',
						type: 'info',
						icon: HelpIcon,
						autoDismiss: false,
					}}
					alertProps={{ variant: 'card' }}
				/>
			</div>
		</div>
	),
};
