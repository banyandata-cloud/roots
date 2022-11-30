import React from 'react';
import DisplayPicture from './DisplayPicture';

export default {
	title: 'Components/DisplayPicture',
	component: DisplayPicture,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the Chip',
	},
};

export const Template = (args) => {
	return (
		<div>
			<DisplayPicture
				{...args}
				name='Pradeep'
				url='https://pbs.twimg.com/profile_images/1525787669690990593/G2aafgTL_400x400.jpg'
			/>
		</div>
	);
};

export const SmallDp = Template.bind({});

SmallDp.args = {
	size: 'sm',
};

export const MediumDp = Template.bind({});

MediumDp.args = {
	size: 'md',
};
