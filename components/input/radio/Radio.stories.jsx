import React from 'react';

import Radio from './Radio';

export default {
	title: 'Components/Input/Radio',
	component: Radio,
	parameters: {
		options: {
			showToolbar: false,
		},
		componentSubtitle: 'Description of the Checkbox',
	},
};

const Template = (args) => {
	return <Radio {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	label: 'Radio',
	position: 'left',
};
Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library',
	},
};
