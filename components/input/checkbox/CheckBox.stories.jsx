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

export const Intermediate = Template.bind({});
Intermediate.args = {
	...Default.args,
	intermediate: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	...Default.args,
	disabled: true,
};
