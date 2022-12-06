import React from 'react';
import { COLORS } from '../../../styles';
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
		MySql: {
			x1: 313.33,
			x2: 22.22,
			x3: 44.44,
		},
		PgSql: {
			x1: 39.53,
			x2: 46.51,
			x3: 13.95,
		},
		Oracle: {
			x1: 6.53,
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
			color: COLORS.success,
			backgroundStyle: {
				color: 'transparent',
			},
			label: {
				show: true,
				formatter(param) {
					return param.name;
				},
			},
		},
		{
			stackIndex: 2,
			color: COLORS.error,
			backgroundStyle: {
				color: 'transparent',
			},
			label: {
				show: false,
			},
		},
		{
			stackIndex: 3,
			color: COLORS.warning,
			backgroundStyle: {
				color: 'transparent',
			},
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
