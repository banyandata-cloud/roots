import React from 'react';
import { COLORS } from '../../../styles';
import { ThemedContainer } from '../../helpers';
import NestedPieChart from './NestedPieChart';

export default {
	title: 'Components/Charts/PieChart/NestedPieChart',
	component: NestedPieChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};
const sampleData = {
	chartData: {
		x1: 75,
	},
	metaData: {
		controlsApplied: {
			x1: {
				comp: 1,
				count: 3,
			},
		},
		keyData: {
			x1: 'high',
		},
	},
};

const sampleData2 = {
	chartData: {
		x1: 30,
		x2: 25,
		x3: 45,
	},
	metaData: {
		controlsApplied: {
			x1: {
				comp: 1,
				count: 3,
			},
			x2: {
				comp: 2,
				count: 6,
			},
			x3: {
				comp: 3,
				count: 9,
			},
		},
		keyData: {
			x1: 'high',
			x2: 'medium',
			x3: 'low',
		},
		totalControls: {
			x1: 786,
		},
	},
};

const Template = (args) => {
	return (
		<ThemedContainer
			{...args}
			style={{
				height: '100%',
			}}>
			<NestedPieChart {...args} />
		</ThemedContainer>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridOptions: {
		height: '100%',
		width: '100%',
	},
	cursor: 'default',
	legend: {
		show: false,
	},
	tooltip: {
		trigger: 'none',
	},
	pieSeries: [
		{
			complete: 100,
			radius: ['30%', '50%'],
			center: ['50%', '50%'],
			seriesData: sampleData,
			startAngle: 90,
			legend: {
				show: false,
			},
			seriesOption: [
				{
					stackIndex: 1,
					itemStyle: {
						color: COLORS.grey,
					},
				},
			],
		},
		{
			radius: ['60%', '80%'],
			center: ['50%', '50%'],
			seriesData: sampleData2,
			startAngle: 90,
			legend: {
				show: false,
			},
			seriesOption: [
				{
					stackIndex: 1,
					itemStyle: {
						color: '#0F62FE',
						borderWidth: 15,
						borderRadius: 500,
						borderColor: COLORS['dark-grey'],
						borderType: 'solid',
					},
				},
				{
					stackIndex: 2,
					itemStyle: {
						color: '#71EEFF',
						borderWidth: 15,
						borderRadius: 500,
						borderColor: COLORS['dark-grey'],
						borderType: 'solid',
					},
				},
				{
					stackIndex: 3,
					itemStyle: {
						color: '#67F990',
						borderWidth: 15,
						borderRadius: 500,
						borderColor: COLORS['dark-grey'],
						borderType: 'solid',
					},
					tooltip: {
						trigger: 'none',
					},
				},
			],
		},
	],
};
