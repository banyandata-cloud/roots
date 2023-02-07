/* eslint-disable no-tabs */
import React from 'react';
import BaseAreaChart from './BaseAreaChart';

export default {
	title: 'ComponentsV2/Charts/AreaChart/BaseAreaChart',
	component: BaseAreaChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const datum1 = {
	chartData: {
		IAM: [5, 5, 1, 1, 5, 5],
		Networking: [4, 4, 1, 1, 4, 4],
		Compute: [3, 3, 1, 1, 3, 3],
		RDS: [2, 2, 1, 1, 2, 2],
		Storage: [1, 1, 1, 1, 1, 1],
	},
	metaData: {
		seriesData: {
			IAM: {
				Default: [377, 376, 377, 378, 379, 380],
				New_CTG: [143, 144, 145, 146, 147, 148],
			},
			Networking: {
				Default: [477, 476, 477, 478, 479, 480],
				New_CTG: [243, 244, 245, 246, 247, 248],
			},
			Compute: {
				Default: [577, 576, 577, 578, 579, 580],
				New_CTG: [343, 344, 345, 346, 347, 348],
			},
			RDS: {
				Default: [677, 676, 677, 678, 679, 680],
				New_CTG: [443, 444, 445, 446, 447, 448],
			},
			Storage: {
				Default: [777, 776, 777, 778, 779, 780],
				New_CTG: [543, 544, 545, 546, 547, 548],
			},
		},

		xAxisData: [1657893600, 1657897200, 1657900800, 1657904400, 1657908000, 1657911600],
	},
};

const Template = (args) => {
	const seriesData = {
		...datum1,
		metaData: {
			...datum1.metaData,
			xAxisData: datum1.metaData.xAxisData.map((key) => {
				const d = new Date(key * 1000);
				return `${d.getHours()}:${d.getMinutes()}`;
			}),
		},
	};
	return (
		<div
			style={{
				height: '100%',
			}}>
			<BaseAreaChart
				{...args}
				seriesData={seriesData}
				tooltip={{
					show: true,
					trigger: 'item',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985',
						},
					},
					triggerOn: 'mousemove',
				}}
			/>
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: true,
	legendShow: false,
	xAxisShow: true,
	smooth: false,
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	cursor: 'default',
	seriesOption: [
		{
			stackIndex: 1,
			color: 'green',
			symbol: 'circle',
			symbolSize: 10,
			label: {
				show: false,
			},
			lineStyle: {
				width: 4,
				type: 'solid',
				cap: 'butt',
				join: 'round',
			},
			areaStyle: {
				color: 'lightgreen',
				origin: 'auto',
				shadowBlur: 0,
				shadowColor: 'white',
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				opacity: 0.9,
			},
			emphasis: {
				focus: 'none',
			},
		},
		{
			stackIndex: 2,
			color: 'pink',
			symbol: 'rect',
			symbolSize: 10,
			label: {
				show: false,
			},
			lineStyle: {
				width: 5,
				type: 'dashed',
				cap: 'round',
				join: 'bevel',
			},
			areaStyle: {
				color: 'lightpink',
				origin: 'auto',
				shadowBlur: 0,
				shadowColor: 'white',
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				opacity: 0.9,
			},
			emphasis: {
				focus: 'self',
			},
		},
		{
			stackIndex: 3,
			color: 'orange',
			symbol: 'roundRect',
			symbolSize: 10,
			label: {
				show: false,
			},
			lineStyle: {
				width: 6,
				type: 'dotted',
				cap: 'square',
				join: 'miter',
			},
			areaStyle: {
				color: '#F4D696',
				origin: 'auto',
				shadowBlur: 0,
				shadowColor: 'white',
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				opacity: 0.9,
			},
			emphasis: {
				focus: 'series',
			},
		},
		{
			stackIndex: 4,
			color: 'red',
			symbol: 'roundRect',
			symbolSize: 10,
			label: {
				show: false,
			},
			lineStyle: {
				width: 6,
				type: 'dotted',
				cap: 'square',
				join: 'miter',
			},
			areaStyle: {
				color: '#fd9695',
				origin: 'auto',
				shadowBlur: 0,
				shadowColor: 'white',
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				opacity: 0.9,
				cursor: 'default',
			},
			emphasis: {
				focus: 'series',
			},
		},
		{
			stackIndex: 5,
			color: 'blue',
			symbol: 'roundRect',
			symbolSize: 10,
			label: {
				show: false,
			},
			lineStyle: {
				width: 6,
				type: 'dotted',
				cap: 'square',
				join: 'miter',
			},
			areaStyle: {
				color: 'lightblue',
				origin: 'auto',
				shadowBlur: 0,
				shadowColor: 'white',
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				opacity: 0.9,
			},
			emphasis: {
				focus: 'series',
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
