import React from 'react';
import Slider from './Slider';

export default {
	title: 'Components/Slider',
	component: Slider,
	argTypes: {
		onChange: {
			action: 'Volume Changed',
		},
	},
};

const Template = (args) => {
	return (
		<div
			style={{
				padding: '20px',
				maxWidth: '400px',
			}}>
			<Slider {...args} />
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	label: 'Volume Control',
	min: 0,
	max: 100,
};

export const DisableSlider = Template.bind({});
DisableSlider.args = {
	label: 'Volume Control',
	defaultChecked: true,
	min: 0,
	max: 10,
	step: 5,
	disabled: true,
};

export const UncontrolledSlider = Template.bind({});
UncontrolledSlider.args = {
	label: 'Volume Control',
	min: 0,
	max: 50,
	step: 5,
};

export const ControlledSlider = Template.bind({});
ControlledSlider.args = {
	label: 'Volume Control',
	minLabel: 'Low',
	medLabel: 'Medium',
	maxLabel: 'High',
	defaultChecked: true,
	min: 0,
	max: 10,
	step: 5,
};
