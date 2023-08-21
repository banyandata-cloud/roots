import React from 'react';

import Step from './Step';

export default {
	title: 'Components/Stepper/Step',
	component: Step,
	parameters: {
		options: {
			options: {
				showToolbar: false,
			},
		},
		docs: {
			description: {
				component: 'The steps',
			},
		},
	},
};

const Template = (args) => {
	return (
		<div>
			<Step {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: null,
	description: null,
	active: false,
	completion: 1,
	error: false,
	index: 0,
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=266%3A49880',
	},
};
