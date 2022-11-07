import React from 'react';
import BaseVerticalStackedChart from './BaseVerticalStackedChart';

export default {
	title: 'ComponentsV2/Charts/VerticalStackedChart/BaseVerticalStackedChart',
	component: BaseVerticalStackedChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return <div className=''>
		<BaseVerticalStackedChart {...args} />
        </div>;
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: true,
	height: '80%',
	xAxisShow: false,
	seriesData: [
		{
			MySQL: {
				C: 30,
				NC: 20,
				V: 50,
			},
			PgSQL: {
				C: 20,
				NC: 50,
				V: 30,
			},
			ORACLE: {
				C: 70,
				NC: 30,
				V: 0,
			},
			Mongo: {
				C: 40,
				NC: 30,
				V: 30,
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
