import React from 'react';
import Skeleton from './Skeleton';

export default {
	title: 'Components/Skeleton',
	component: Skeleton,
	parameters: {
		options: {
			showToolbar: true,
		},
		componentSubtitle: 'Description of the  button',
	},
};

const Template = (args) => {
	return (
		<div>
			<Skeleton {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {};
