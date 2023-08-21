import React from 'react';
import { BaseCell } from './BaseCell';

export default {
	title: 'Components/BaseCell',
	component: BaseCell,
	parameters: {
		options: {
			showToolbar: false,
		},
		componentSubtitle: 'Description of the BaseCell',
	},
};

const Template = (args) => {
	return (
		<div
			style={{
				background: '#ccc',
				height: '10rem',
				padding: '1rem',
			}}>
			<BaseCell {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	className: '',
	component1: 1,
	component2: 2,
	component3: 3,
};

Default.parameters = {};
