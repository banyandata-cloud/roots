import React, { useState } from 'react';
import { AlertIcon } from '../icons';
import Alert from './Alert';

export default {
	title: 'ComponentsV2/Alert/Alert',
	component: Alert,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const TemplateAlert = (args) => {
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
				Alert
			</button>
			<Alert {...args} toggle={toggle} open={open} />
		</div>
	);
};

const Template = (args) => {
	return <TemplateAlert {...args} />;
};

export const Info = Template.bind({});

Info.args = {
	title: 'Information',
};

Info.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=125%3A12168',
	},
};

export const Warning = Template.bind({});

Warning.args = {
	title: 'Warning',
	color: 'warning',
};

export const Success = Template.bind({});

Success.args = {
	title: 'Success',
	color: 'success',
};

export const Danger = Template.bind({});

Danger.args = {
	title: 'Danger',
	color: 'danger',
};

export const CustomIcon = Template.bind({});

CustomIcon.args = {
	color: 'danger',
	icon: (props) => {
		return <AlertIcon.Info {...props} />;
	},
};
