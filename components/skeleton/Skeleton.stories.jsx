import React from 'react';
import { ThemedContainer } from '../helpers';
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
		<ThemedContainer {...args}>
			<Skeleton {...args} />
		</ThemedContainer>
	);
};

export const Default = Template.bind({});

Default.args = {};
