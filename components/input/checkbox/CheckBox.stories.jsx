import React from 'react';

import CheckBox from './CheckBox';

export default {
	title: 'Components/Input/CheckBox',
	component: CheckBox,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the Checkbox',
	},
};

const Template = (args) => {
	return (
		<div>
			<CheckBox {...args} />
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	label: 'Checkbox',
	position: 'right',
	size: 'sm',
};
Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=173%3A25103',
	},
};
