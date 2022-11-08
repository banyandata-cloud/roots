import React from 'react';
import BaseHorizontalStackedChart from './BaseHorizontalStackedChart';

export default {
	title: 'ComponentsV2/Charts/HorizontalStackedChart/BaseHorizontalStackedChart',
	component: BaseHorizontalStackedChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return (
		<div className=''>
			<BaseHorizontalStackedChart {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: true,
	height: '60%',
	xAxisShow: false,
	seriesData: [
		{
			'Audit, Logging and Monitering': {
				C: 40,
				NC: 60,
				V: 0,
			},
			Settings: {
				C: 20,
				NC: 10,
				V: 70,
			},
			Authorization: {
				C: 20,
				NC: 40,
				V: 40,
			},
			Authentication: {
				C: 40,
				NC: 60,
				V: 0,
			},
			'Patches and Plugins': {
				C: 20,
				NC: 0,
				V: 80,
			},
			'High Availability': {
				C: 30,
				NC: 0,
				V: 70,
			},
		},
	],
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	barWidth: '50%',
	barLabel: true,
	firstStackColor: 'green',
	firstStackLabelColor: 'black',
	secondStackColor: 'red',
	secondStackLabelColor: 'black',
	thirdStackColor: 'gold',
	thirdStackLabelColor: 'black',
	cursor: 'default',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
