import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemedContainer } from '../helpers';
import { Dropdown } from '../input';
import BaseModal from './BaseModal';
import BaseModalDoc from './Story/BaseModalDoc';

const meta: Meta<typeof BaseModal> = {
	title: 'Components/v2/Modal/BaseModal',
	component: BaseModal,
	tags: ['autodocs'],
	parameters: {
		docs: {
			page: BaseModalDoc,
		},
		layout: 'padded',
		options: { showToolbar: true },
	},
};

export default meta;

type Story = StoryObj<typeof BaseModal>;

const DefaultStory = () => {
	const [open, setOpen] = useState(false);
	const [dropdownValue, setDropdownValue] = useState<string | undefined>(undefined);

	const toggle = () => {
		setOpen((prevState) => !prevState);
	};

	return (
		<ThemedContainer theme='light'>
			<>
				<button onClick={toggle}>Open Modal</button>

				<BaseModal
					title='Header'
					description='Description'
					footerProps={{
						actionTitle: 'Save Changes',
						cancelTitle: 'Dismiss',
						onAction: () => console.log('action'),
						onDismiss: () => console.log('dismiss'),
						toggle,
					}}
					open={open}
					toggle={toggle}
				>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
						<p>Modal description: Pass the header and footer as a Component</p>
						<Dropdown
							label='Select Type 1'
							placeholder='Select an item'
							value={dropdownValue}
							onChange={setDropdownValue}
							options={[
								{ value: '1', label: 'Item 1' },
								{ value: '2', label: 'Item 2' },
								{ value: '3', label: 'Item 3' },
							]}
						/>
					</div>
				</BaseModal>
			</>
		</ThemedContainer>
	);
};

export const Default: Story = {
	name: 'Default',
	render: () => <DefaultStory />,
};
