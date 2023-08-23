import React from 'react';
import BaseButton from './BaseButton';

export default {
	title: 'Components/Buttons/BaseButton',
	component: BaseButton,
	argTypes: {
		className: '',
		component1: 1,
		component2: 2,
		component3: 3,
	},
	parameters: {
		options: {
			showToolbar: false,
		},
		componentSubtitle: 'Description of the  button',
	},
};

const Template = (args) => {
	return (
		<div>
			<BaseButton {...args} />
		</div>
	);
};

export const Filled = Template.bind({});

Filled.args = {
	title: 'Button Title',
	variant: 'contained',
	size: 'md',
	radius: 'default',
	color: 'primary',
};
