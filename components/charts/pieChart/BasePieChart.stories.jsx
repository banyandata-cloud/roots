import React from 'react';
import { ThemedContainer } from '../../helpers';
import BasePieChart from './BasePieChart';

export default {
	title: 'Components/Charts/PieChart/BasePieChart',
	component: BasePieChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};
const sampleData = {
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

const iconData = {
	chartData: {
		x1: 30,
		x2: 70,
	},
};

const iconColor = (data) => {
	if (data <= 30) {
		return 'green';
	}
	if (data < 70) {
		return 'yellow';
	}
	return 'red';
};

const Template = (args) => {
	return (
		<ThemedContainer
			{...args}
			style={{
				height: '100%',
			}}>
			<BasePieChart {...args} />
		</ThemedContainer>
	);
};

export const Default = Template.bind({});
export const PieIcon = Template.bind({});

Default.args = {
	title: 'Title',
	gridOptions: {
		height: '100%',
		width: '100%',
	},
	cursor: 'default',
	radius: ['30%', '60%'],
	center: ['50%', '50%'],
	seriesData: sampleData,
	semiDoughnut: false,
	startAngle: 90,
	tooltip: {
		trigger: 'item',
		formatter: (param) => {
			const index = Object.keys(sampleData.metaData.keyData).find((key) => {
				return sampleData.metaData.keyData[key] === param.name;
			});
			return `${param.marker} ${param.name} ${sampleData.metaData.controlsApplied[index].comp}/${sampleData.metaData.controlsApplied[index].count}`;
		},
	},
	itemStyle: {
		borderWidth: 5,
		borderColor: 'black',
		borderType: 'solid',
	},
	legend: {
		show: true,
		top: '80%',
		left: '30%',
		orient: 'vertical',
		selectedMode: true,
		// data: [
		// {
		// name: 'Compliant',
		// icon: 'circle',
		// textStyle: {
		// color: 'white',
		// fontSize: '20',
		// },
		// },
		// ],
		// formatter(name) {
		// return '214 Safe';
		// },
		// icon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
		// icon: '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		// <rect y="0.5" width="16" height="16" rx="4" fill="#FF626A"/>
		// eslint-disable-next-line max-len
		// <path d="M11.25 6.5L7 10.75L4.75 8.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		// </svg>
		// ',
	},
	seriesOption: [
		{
			stackIndex: 1,
			itemStyle: {
				color: '#0F62FE',
			},
			label: {
				show: true,
				fontSize: '20',
				color: 'black',
				fontWeight: 'bold',
				position: 'outside',
				formatter(d) {
					return d.name !== '' ? `${d.value}%\n${d.name}` : null;
				},
			},
		},
		{
			stackIndex: 2,
			itemStyle: {
				color: '#71EEFF',
			},
		},
		{
			stackIndex: 3,
			itemStyle: {
				color: '#67F990',
			},
			tooltip: {
				trigger: 'none',
			},
		},
	],
};

PieIcon.args = {
	title: 'Title',
	gridOptions: {
		height: '100%',
		width: '100%',
	},
	cursor: 'default',
	radius: ['30%', '60%'],
	seriesData: iconData,
	semiDoughnut: true,
	tooltip: {
		trigger: 'none',
	},
	itemStyle: {
		borderWidth: 5,
		borderColor: 'black',
		borderType: 'solid',
	},
	legend: {
		show: false,
	},
	seriesOption: [
		{
			stackIndex: 1,
			emphasis: {
				disabled: true,
			},
			itemStyle: {
				color: iconColor(iconData?.chartData?.x1),
			},
			label: {
				show: false,
			},
		},
		{
			stackIndex: 2,
			emphasis: {
				disabled: true,
			},
			itemStyle: {
				color: 'whitesmoke',
			},
			label: {
				show: false,
			},
		},
	],
};
