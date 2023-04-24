import React, { useState } from 'react';
import { Button } from '../buttons';
import { Dropdown, DropdownItem } from '../input';
import BaseModal from './BaseModal';

export default {
	title: 'Components/Modal/BaseModal',
	component: BaseModal,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const TemplateModal = (args) => {
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen((prevState) => {
			return !prevState;
		});
	};

	return (
		<div>
			<Button onClick={toggle} title='Open Modal' />
			<BaseModal {...args} open={open} toggle={toggle}>
				<p>Modal description: Pass the header and footer as a Component</p>
				<Dropdown label='Select Type 1'>
					<DropdownItem title='Item 1' value={1} />
					<DropdownItem title='Item 2' value={2} />
					<DropdownItem title='Item 3' value={3} />
				</Dropdown>
			</BaseModal>
		</div>
	);
};

const Template = (args) => {
	return <TemplateModal {...args} />;
};

export const Default = Template.bind({});

Default.args = {
	renderHeader: 'Header',
	renderFooter: [
		<Button key='Footer1' title='Footer Button' variant='outlined' />,
		<Button key='Footer2' title='Footer Button' />,
	],
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
