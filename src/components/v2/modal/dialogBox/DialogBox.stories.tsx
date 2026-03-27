import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { ThemedContainer } from '../../../helpers';
import DialogBoxDoc from '../../modal/dialogBox/Story/DialogDoc';
import DialogBox from './DialogBox';
import type { DialogBoxHandle } from './types';

const meta: Meta<typeof DialogBox> = {
	title: 'Components/v2/Modal/DialogBox',
	component: DialogBox,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: DialogBoxDoc,
		},
		layout: 'padded',
		options: { showToolbar: true },
	},
};

export default meta;

type Story = StoryObj<typeof DialogBox>;

const DialogStory = () => {
	const dialogRef = useRef<DialogBoxHandle>(null);

	const toggle = () => {
		dialogRef.current?.dialog({
			title: 'Delete Row?',
			description: 'Are you sure you want to delete?',
			actionText: 'Done',
			cancelText: 'Cancel',
			variant: 'primary',
			onAction: ({ dismiss }: { dismiss: () => void }) => {
				console.log('action confirmed');
				dismiss();
			},
		});
	};

	return (
		<ThemedContainer theme='light'>
			<>
				<button
					type='button'
					onClick={toggle}
					style={{
						padding: 10,
					}}>
					Open Modal
				</button>
				<DialogBox ref={dialogRef} />
			</>
		</ThemedContainer>
	);
};

export const Dialog: Story = {
	name: 'Dialog',
	render: () => <DialogStory />,
};
