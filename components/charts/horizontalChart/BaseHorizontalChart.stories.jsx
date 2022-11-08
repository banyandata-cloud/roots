import React from 'react';
import BaseHorizontalChart from './BaseHorizontalChart';

export default {
	title: 'ComponentsV2/Charts/HorizontalChart/BaseHorizontalChart',
	component: BaseHorizontalChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return (
		<div className=''>
			<BaseHorizontalChart {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: true,
	height: '60%',
	xAxisShow: false,
	yAxisData: [
		{
			Settings: 20,
			Authorization: 10,
			'High Availability': 20,
			Authentication: 40,
			'Patches and Plugins': 10,
		},
		100,
		13566,
	],
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	barWidth: '40%',
	firstStackColor: 'green',
	firstStackLabelColor: 'black',
	secondStackColor: 'whitesmoke',
	secondStackLabelColor: 'grey',
	thirdStackLabelColor: 'black',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
