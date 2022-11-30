import React, { useState } from 'react';
import Dialog from './Dialog';

export default {
	title: 'Components/Modal/Dialog',
	component: Dialog,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const TemplateDialog = (args) => {
	const [open, setOpen] = useState(false);

	const toggle = (show) => {
		setOpen((prevState) => {
			if (show != null) {
				return show;
			}
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
			<Dialog
				{...args}
				open={open}
				onCancel={() => {
					setOpen(false);
				}}>
				<div>
					<p>Modal description: Pass the header and footer as a Component</p>
				</div>
			</Dialog>
		</div>
	);
};

const Template = (args) => {
	return <TemplateDialog {...args} />;
};

export const Default = Template.bind({});

Default.args = {
	heading: 'Delete Row?',
	description: 'Are you sure you want to delete',
	action: 'Delete',
	variant: 'danger',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
