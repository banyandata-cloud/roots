import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemedContainer } from '../../helpers';
import { Dropdownv2 as Dropdown, DropdownItemv2 as DropdownItem } from '../../input';
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
	const [dropdownValue, setDropdownValue] = useState<any>(null);

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
					toggle={toggle}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
						<p>Modal description: Pass the header and footer as a Component</p>
						<Dropdown
							label='Select Type 1'
							value={dropdownValue}
							onChange={(val: any) => setDropdownValue(val)}>
							<DropdownItem title='Item 1' value={1} />
							<DropdownItem title='Item 2' value={2} />
							<DropdownItem title='Item 3' value={3} />
						</Dropdown>
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
