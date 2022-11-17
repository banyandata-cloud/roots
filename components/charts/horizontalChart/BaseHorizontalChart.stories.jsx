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

const sampleData = {
	chartData: {
		'Audit, Logging and Monitering': {
			x1: 40,
			x2: 60,
			x3: 0,
		},
		Settings: {
			x1: 20,
			x2: 10,
			x3: 70,
		},
		Authorization: {
			x1: 20,
			x2: 40,
			x3: 40,
		},
		Authentication: {
			x1: 40,
			x2: 60,
			x3: 0,
		},
		'Patches and Plugins': {
			x1: 20,
			x2: 0,
			x3: 80,
		},
		'High Availability': {
			x1: 30,
			x2: 0,
			x3: 70,
		},
	},
	metaData: {
		toolTip: {
			x1: 'red',
			x2: 'green',
			x3: 'gold',
		},
	},
};

const Template = (args) => {
	return (
		<div
			style={{
				height: '100%',
			}}>
			<BaseHorizontalChart {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: false,
	height: '60%',
	xAxisShow: false,
	seriesData: sampleData,
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	barWidth: '50%',
	cursor: 'default',
	seriesOption: [
		{
			stackIndex: 1,
			color: 'green',
			label: {
				show: true,
				position: [0, -14],
				formatter(param) {
					return param.name;
				},
			},
		},
	],
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
