/* eslint-disable no-tabs */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BaseChartTooltip } from '../chartTooltip';
import BaseHorizontalBarChart from './BaseHorizontalBarChart';

export default {
	title: 'Components/Charts/HorizontalBarChart/BaseHorizontalBarChart',
	component: BaseHorizontalBarChart,
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
		controlsApplied: {
			'Audit, Logging and Monitering': {
				x1: 40,
			},
			Settings: {
				x1: 20,
			},
			Authorization: {
				x1: 20,
			},
			Authentication: {
				x1: 40,
			},
			'Patches and Plugins': {
				x1: 20,
			},
			'High Availability': {
				x1: 30,
			},
		},
		keyData: {
			x1: 'compliant',
			x2: 'nonCompliant',
			x3: 'validate',
		},
	},
};

const Template = (args) => {
	const onBarClick = (params) => {
		alert(`Click Event on ${params.name}`);
	};
	return (
		<div
			style={{
				height: '100%',
			}}>
			<BaseHorizontalBarChart
				{...args}
				onEvents={{
					click: onBarClick,
				}}
				tooltip={{
					trigger: 'item',
					formatter: (param) => {
						return ReactDOMServer.renderToString(
							<BaseChartTooltip
								params={param}
								body={{
									[param.name]:
									sampleData.metaData.controlsApplied[param.name].x1,
								}}
							/>
						);
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

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: false,
	gridOptions: {
		left: 10,
		right: 10,
		bottom: 50,
		top: 50,
	},
	xAxisShow: false,
	seriesData: sampleData,
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	barWidth: '50%',
	cursor: 'default',
	stacked: true,
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
