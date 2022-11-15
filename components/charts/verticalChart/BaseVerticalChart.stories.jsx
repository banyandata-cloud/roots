import React from 'react';
import BaseVerticalChart from './BaseVerticalChart';

export default {
	title: 'Components/Charts/VerticalChart/BaseVerticalChart',
	component: BaseVerticalChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return (
		<div
			style={{
				height: '100%',
			}}>
			<BaseVerticalChart {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: true,
	height: '80%',
	xAxisShow: false,
	seriesData: {
		chartData: {
			MySQL: {
				x1: 30,
				x2: 20,
				x3: 50,
			},
			PgSQL: {
				x1: 20,
				x2: 0,
				x3: 80,
			},
			ORACLE: {
				x1: 70,
				x2: 30,
				x3: 0,
			},
			Mongo: {
				x1: 40,
				x2: 30,
				x3: 30,
			},
		},
		metaData: {
			toolTip: {
				x1: 'red',
				x2: 'green',
			},
		},
	},
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
