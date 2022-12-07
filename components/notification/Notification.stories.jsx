import React, { useState } from 'react';
import Notification from './Notification';

export default {
	title: 'Components/Notification',
	component: Notification,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the  Notification component',
	},
};

const Template = (args) => {
	const [selectedToggle, setSelectedToggle] = useState('');

	return (
		<div>
			<Notification
				{...args}
				selectedToggle={selectedToggle}
				setSelectedToggle={setSelectedToggle}
			/>
		</div>
	);
};

export const Default = Template.bind({});

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=120%3A8220',
	},
};

export const Disabled = Template.bind({});

Default.args = {
	selectedToggle: '',
	setSelectedToggle: '',
};
