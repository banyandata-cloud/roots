/* eslint-disable no-tabs */
import React from 'react';
import { COLORS } from '../../../styles';
import { ThemedContainer } from '../../helpers';
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
		<ThemedContainer
			{...args}
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
						// eslint-disable-next-line max-len
						return `${param.marker} ${param.name} ${
							sampleData.metaData.controlsApplied[param.name].x1
						}`;
					},
				}}
			/>
		</ThemedContainer>
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
