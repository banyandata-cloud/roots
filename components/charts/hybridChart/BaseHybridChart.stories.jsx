/* eslint-disable no-tabs */
import React from 'react';
import BaseHybridChart from './BaseHybridChart';

export default {
	title: 'Components/Charts/HybridChart/BaseHybridChart',
	component: BaseHybridChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const sampleData = {
	chartData: [
		{
			type: 'bar',
			data: {
				MySql: {
					x1: 22.22,
				},
				PgSql: {
					x1: 46.51,
				},
				Oracle: {
					x1: 13.51,
				},
			},
		},
		{
			type: 'line',
			data: {
				dbPerformance: [20, 40, 10],
			},
		},
		{
			type: 'line',
			data: {
				newPerformance: [30, 10, 20],
			},
		},
	],
	metaData: {
		controlsApplied: {
			MySql: {
				x1: 18,
			},
			PgSql: {
				x1: 43,
			},
		},
		keyData: {
			x1: 'compliant',
		},
		totalControls: {
			x1: 61,
		},
	},
};

const Template = (args) => {
	return (
		<div
			style={{
				height: '100%',
			}}>
			<BaseHybridChart {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: true,
	height: '80%',
	xAxisShow: false,
	seriesData: sampleData,
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	axisColor: 'grey',
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
		{
			stackIndex: 2,
			color: 'red',
			label: {
				show: false,
			},
		},
		{
			stackIndex: 3,
			color: 'gold',
			label: {
				show: false,
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
