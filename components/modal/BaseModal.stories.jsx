import React, { useState } from 'react';
import BaseModal from './BaseModal';

export default {
	title: 'ComponentsV2/Modal/BaseModal',
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
			<button
				type='button'
				onClick={toggle}
				style={{
					padding: 10,
				}}>
				Open Modal
			</button>
			<BaseModal {...args} open={open} toggle={toggle}>
				<div>
					<p>Modal description: Pass the header and footer as a Component</p>
				</div>
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
	renderFooter: 'Footer',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
