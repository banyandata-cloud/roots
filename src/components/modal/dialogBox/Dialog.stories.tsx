import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { ThemedContainer } from '../../helpers';
import DialogBox from './DialogBox';

const meta: Meta<typeof DialogBox> = {
	title: 'Components/Modal/DialogBox',
	component: DialogBox,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

export default meta;

type Story = StoryObj<typeof DialogBox>;

/**
 * -----------------------------
 * Simple DialogBox
 * -----------------------------
 */
export const SimpleDialogBox: Story = {
	name: 'Dialog',
	render: () => {
		const dialogRef = useRef<any>(null);

		const openDialog = () => {
			dialogRef.current?.dialog({
				title: 'Delete Row?',
				description: 'Are you sure you want to delete?',
				actionText: 'Done',
				cancelText: 'Cancel',
				variant: 'primary',
				onAction: () => {
					console.log('Action clicked');
				},
			});
		};

		return (
			<ThemedContainer theme='light'>
				<button type='button' onClick={openDialog} style={{ padding: 10 }}>
					Open Modal
				</button>
				<DialogBox ref={dialogRef} />
			</ThemedContainer>
		);
	},
};
