import React from 'react';
import BaseVerticalChart from './BaseVerticalChart';

export default {
	title: 'ComponentsV2/Charts/VerticalChart/BaseVerticalChart',
	component: BaseVerticalChart,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	return (
		<div className=''>
			<BaseVerticalChart {...args} />
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Title',
	gridContainLabel: true,
	xAxisShow: false,
	yAxisId: 'yAxis',
	yAxisLabelShow: true,
	ySplitLineShow: true,
	yAxisLineShow: false,
	yAxisTickShow: false,
	yAxisType: 'value',
	seriesData: [
		{
			'Networking Services': 5,
			'IAM&Admin': 20,
			'Cloud SQL': 36,
			VPC: 10,
			'Compute Engine': 10,
			'Cloud Storage': 7,
			Networking: 17,
		},
	],
	barWidth: '50%',
	barColor: 'blue',
	showBarBackground: true,
	backgroudColor: 'whitesmoke',
	showLabel: true,
	labelColor: 'black',
	cursor: 'default',
};

Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/RYJl1iVewWzDeUQH494VQc/New-DB-Governance?node-id=0%3A1',
	},
};
