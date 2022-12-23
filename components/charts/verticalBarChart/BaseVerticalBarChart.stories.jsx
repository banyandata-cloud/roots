/* eslint-disable no-tabs */
import React, { useState } from 'react';
import BaseVerticalBarChart from './BaseVerticalBarChart';
import { COLORS } from '../../../styles';

export default {
	title: 'Components/Charts/VerticalBarChart/BaseVerticalBarChart',
	component: BaseVerticalBarChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const sampleData = {
	chartData: {
		MySql: {
			x1: 33.33,
			x2: 22.22,
			x3: 44.44,
		},
		PgSql: {
			x1: 39.53,
			x2: 46.51,
			x3: 13.95,
		},
		Oracle: {
			x1: 46.53,
			x2: 13.51,
			x3: 39.95,
		},
	},
	metaData: {
		controlsApplied: {
			MySql: {
				x1: 18,
			},
			PgSql: {
				x1: 43,
			},
			Oracle: {
				x1: 46,
			},
		},
		keyData: {
			x1: 'compliant',
			x2: 'nonCompliant',
			x3: 'validate',
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
			<BaseVerticalBarChart
				{...args}
				seriesData={sampleData}
				tooltip={{
					trigger: 'item',
					formatter: (param) => {
						return `${param.marker} ${param.name} ${
							sampleData.metaData.controlsApplied[param.name].x1
						}`;
					},
				}}
				// legend={{
				// 	show: true,
				// 	top: '20',
				// 	right: '30%',
				// 	orient: 'vertical',
				// 	selectedMode: true,
				// 	itemGap: 20,
				// 	icon: 'rect',
				// 	data: Object.keys(sampleData.metaData.keyData).map((key) => {
				// 		return sampleData?.metaData?.keyData?.[key];
				// 	}),
				// }}
				// seriesName={(index) => {
				// 	return sampleData?.metaData?.keyData?.[`x${index + 1}`];
				// }}
			/>
		</div>
	);
};

const InteractiveTemplate = (args) => {
	const [interactData, setInteractData] = useState({
		chartData: {
			MySql: {
				x1: 33.33,
				x2: 22.22,
				x3: 44.44,
			},
			PgSql: {
				x1: 39.53,
				x2: 46.51,
				x3: 13.95,
			},
			Oracle: {
				x1: 46.53,
				x2: 13.51,
				x3: 39.95,
			},
		},
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
				x2: 'nonCompliant',
				x3: 'validate',
			},
			totalControls: {
				x1: 61,
			},
		},
	});
	const [seriesOptionData, setSeriesOptionData] = useState([
		{
			stackIndex: 1,
			color: 'green',
			label: {
				show: false,
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
				show: true,
			},
		},
	]);
	const onBarClick = (params) => {
		const newSample = {
			...interactData,
			chartData: Object.keys(interactData.chartData[params.name]).reduce((acc, key) => {
				acc[interactData.metaData.keyData[key]] = {
					x1: interactData.chartData[params.name][key],
				};
				return acc;
			}, {}),
		};
		setInteractData(newSample);
		setSeriesOptionData([
			{
				stackIndex: 1,
				color: 'violet',
				barColor: ['green', 'red', 'gold'],
				label: {
					show: true,
				},
			},
		]);
	};
	return (
		<div
			style={{
				height: '100%',
			}}>
			<BaseVerticalBarChart
				{...args}
				seriesData={interactData}
				seriesOption={seriesOptionData}
				onEvents={{
					click: onBarClick,
				}}
			/>
		</div>
	);
};

export const Default = Template.bind({});
export const Interact = InteractiveTemplate.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: true,
	gridOptions: {
		left: 0,
		right: 0,
		bottom: 0,
		top: 15,
	},
	xAxisShow: true,
	xAxisLabel: {
		show: true,
		rotate: 90,
		inside: true,
		verticalAlign: 'bottom',
		padding: [0, 0, 90, 0],
	},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	axisColor: 'grey',
	splitType: 'dashed',
	barWidth: '50%',
	cursor: 'default',
	stacked: true,
	seriesOption: [
		{
			stackIndex: 1,
			color: COLORS.success,
			label: {
				show: false,
			},
		},
		{
			stackIndex: 2,
			color: COLORS.error,
			label: {
				show: false,
			},
		},
		{
			stackIndex: 3,
			color: COLORS.warning,
			label: {
				show: true,
				formatter(param) {
					return sampleData.metaData.controlsApplied[param.name].x1;
				},
			},
		},
	],
};

Interact.args = {
	title: 'Title',
	gridContainLabel: true,
	gridOptions: {
		left: 0,
		right: 0,
		bottom: 0,
		top: 5,
	},
	xAxisShow: true,
	xAxisLabel: {
		rotate: 90,
		inside: true,
		verticalAlign: 'bottom',
		padding: [0, 0, 90, 0],
	},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	axisColor: 'grey',
	barWidth: '50%',
	cursor: 'default',
	stacked: true,
};
