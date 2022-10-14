import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { toggleAlert } from '../../../redux/drawer/drawerActions';
import store from '../../../redux/store';
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
	const dispatch = useDispatch();
	const toggle = () => {
		dispatch(
			toggleAlert({
				open: true,
			})
		);
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
			<Alert {...args} />
		</div>
	);
};

const Template = (args) => {
	return (
		<Provider store={store}>
			<TemplateAlert {...args} />
		</Provider>
	);
};

export const Info = Template.bind({});

Info.args = {
	trigger: false,
	action: 'Action',
	showIcon: true,
	icon: null,
	title: 'Alert Title',
	close: true,
	description: 'This is a alter Description in single line',
	border: 'default',
	color: 'info',
	shadow: false,
};

Info.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=125%3A12168',
	},
};

export const Warning = Template.bind({});

Warning.args = {
	...Info.args,
	color: 'warning',
};

export const Success = Template.bind({});

Success.args = {
	...Info.args,
	color: 'success',
};

export const Danger = Template.bind({});

Danger.args = {
	...Info.args,
	color: 'danger',
};

export const CustomIcon = Template.bind({});

CustomIcon.args = {
	...Info.args,
	color: 'danger',
	icon: (props) => {
		return <AlertIcon.Info {...props} />;
	},
};
