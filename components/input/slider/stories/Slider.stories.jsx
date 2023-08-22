import React from 'react';
import Slider from '../Slider';

export default {
	title: 'Components/Slider',
	component: Slider,
	parameters: {
		options: {
			options: {
				showToolbar: false,
			},
		},
		docs: {
			description: {
				component:
					'Slider Input to select range of inputs or single value from the pre-defined range of values.',
			},
		},
	},
};

export const DefaultSlider = (args) => {
	return (
		<div
			style={{
				width: 400,
			}}>
			<Slider {...args} />
		</div>
	);
};

DefaultSlider.args = {
	placeholder: 'Select Date',
	label: 'Single Date Picker',
};

DefaultSlider.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/e9opoAtQHBo4vFd6u0Co98/Component-Library?node-id=151%3A18732',
	},
};
