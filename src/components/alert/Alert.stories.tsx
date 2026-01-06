import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import { ThemedContainer } from '../helpers';
import { AlertIcon } from '../icons';
import Alert from './Alert';

const meta: Meta<typeof Alert> = {
	title: 'Components/Alert',
	component: Alert,
	parameters: {
		options: { showToolbar: true },
	},
};

export default meta;

type Story = StoryObj<typeof Alert>;

// --------------------------------------------------------------------------
// Helper Hook
// --------------------------------------------------------------------------

function useAlertController() {
	const alertRef = useRef<any>(null);
	const [api, setApi] = useState<any>(null);

	useEffect(() => {
		if (alertRef.current) {
			setApi({
				alert: alertRef.current.alert,
			});
		}
	}, []);

	return { alertRef, api };
}

// --------------------------------------------------------------------------
// Stories
// --------------------------------------------------------------------------

export const Info: Story = {
	render: () => {
		const { alertRef, api } = useAlertController();

		const toggle = () => {
			api?.alert({
				title: 'Information',
				description: 'Basic Info is Here',
				type: 'info',
			});
		};

		return (
			<ThemedContainer theme='light'>
				<button type='button' onClick={toggle} style={{ padding: 10 }}>
					Alert
				</button>
				<Alert ref={alertRef} />
			</ThemedContainer>
		);
	},
};

export const Error: Story = {
	render: () => {
		const { alertRef, api } = useAlertController();

		const toggle = () => {
			api?.alert({
				title: 'Error',
				description: 'Basic Error',
				type: 'error',
			});
		};

		return (
			<ThemedContainer theme='light'>
				<button type='button' onClick={toggle} style={{ padding: 10 }}>
					Alert
				</button>
				<Alert ref={alertRef} />
			</ThemedContainer>
		);
	},
};

export const Warning: Story = {
	render: () => {
		const { alertRef, api } = useAlertController();

		const toggle = () => {
			api?.alert({
				title: 'Warning',
				description: 'Basic Warning',
				type: 'warning',
			});
		};

		return (
			<ThemedContainer theme='light'>
				<button type='button' onClick={toggle} style={{ padding: 10 }}>
					Alert
				</button>
				<Alert ref={alertRef} />
			</ThemedContainer>
		);
	},
};

export const Success: Story = {
	render: () => {
		const { alertRef, api } = useAlertController();

		const toggle = () => {
			api?.alert({
				title: 'Success',
				description: 'Basic Success Desc.',
				type: 'success',
			});
		};

		return (
			<ThemedContainer theme='light'>
				<button type='button' onClick={toggle} style={{ padding: 10 }}>
					Alert
				</button>
				<Alert ref={alertRef} />
			</ThemedContainer>
		);
	},
};

export const Danger: Story = {
	render: () => {
		const { alertRef, api } = useAlertController();

		const toggle = () => {
			api?.alert({
				title: 'Error',
				description: 'Error Description',
				type: 'danger',
			});
		};

		return (
			<ThemedContainer theme='light'>
				<button type='button' onClick={toggle} style={{ padding: 10 }}>
					Alert
				</button>
				<Alert ref={alertRef} />
			</ThemedContainer>
		);
	},
};

export const CustomIcon: Story = {
	render: () => {
		const { alertRef, api } = useAlertController();

		const toggle = () => {
			api?.alert({
				title: 'Error',
				description: 'Error Desc.',
				type: 'info',
				icon: (props: any) => <AlertIcon.Info {...props} />,
			});
		};

		return (
			<ThemedContainer theme='light'>
				<button type='button' onClick={toggle} style={{ padding: 10 }}>
					Alert
				</button>
				<Alert ref={alertRef} />
			</ThemedContainer>
		);
	},
};
