import React from 'react';
import Switch from './Switch';

export default {
	title: 'Components/Input/Switch',
	component: Switch,
	parameters: {
		options: {
			options: {
				showToolbar: true,
			},
		},
		docs: {
			description: {
				component: 'A switch toggle component for enable/disable usage',
			},
		},
	},
};

export const Default = (args) => {
	return (
		<div>
			<Switch {...args} />
		</div>
	);
};

Default.args = {
	label: 'Switch',
	position: 'left',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=184-26946&t=zPtCnFXvFJxTDMtY-0',
	},
};
