import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../buttons';
import { ThemedContainer } from '../helpers';
import { Dropdownv2 as Dropdown, DropdownItemv2 as DropdownItem } from '../input';
import BaseModal from './BaseModal';

const meta: Meta<typeof BaseModal> = {
	title: 'Components/Modal',
	component: BaseModal,
	parameters: {
		options: {
			showToolbar: true,
		},
		docs: {
			description: {
				component:
					'The BaseModal component is a customizable modal used to display content, prompts, or forms in an overlay.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof BaseModal>;

/* -------------------------------------------------------------------------- */
/*                                    Stories                                 */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		const toggle = () => {
			setOpen((prev) => !prev);
		};

		return (
			<ThemedContainer theme='light'>
				<Button title='Open Modal' onClick={toggle} />

				<BaseModal
					title='Header'
					description='Description'
					open={open}
					toggle={toggle}
					footerProps={{
						actionTitle: 'Save Changes',
						cancelTitle: 'Dismiss',
						onAction: () => {
							console.log('action');
						},
						onDismiss: () => {
							console.log('dismiss');
						},
						toggle,
					}}>
					<p>Modal description: Pass the header and footer as a Component</p>

					<Dropdown label='Select Type 1'>
						<DropdownItem title='Item 1' value={1} />
						<DropdownItem title='Item 2' value={2} />
						<DropdownItem title='Item 3' value={3} />
					</Dropdown>
				</BaseModal>
			</ThemedContainer>
		);
	},
};
