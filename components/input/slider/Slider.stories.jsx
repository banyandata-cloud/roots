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

export const RangeSlider = Template.bind({});
RangeSlider.args = {
	label: 'Volume Control',
	min: 0,
	max: 100,
	step: 1,
	range: true,
	value: [25, 75],
};
