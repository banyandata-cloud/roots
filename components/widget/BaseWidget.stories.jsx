import React, { useState } from 'react';
import BaseVerticalBarChart from '../charts/verticalBarChart/BaseVerticalBarChart';
import BaseWidget from './BaseWidget';
import colors from '../../styles/_index.scss';

export default {
	title: 'ComponentsV2/Widget/BaseWidget',
	component: BaseWidget,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const Template = (args) => {
	const [dropValue, setDropValue] = useState(0);
	return (
		<div
			style={{
				backgroundColor: colors['dark-grey'],
				height: '100%',
				width: '100%',
			}}>
			<BaseWidget
				{...args}
				// eslint-disable-next-line react/destructuring-assignment
				options={args.options.map((option) => {
					return option.id === 'dropdown'
						? {
								...option,
								value: dropValue,
								onChange: (event) => {
									setDropValue(event.target.value);
								},
						  }
						: option;
				})}>
				<BaseVerticalBarChart
					yAxisLabelShow
					ySplitLineShow
					barWidth='15%'
					seriesData={{
						chartData: {
							'Networking Services': {
								x1: 66.66,
								x2: 33.33,
							},
							'IAM&Admin': {
								x1: 66.66,
								x2: 33.33,
							},
							'Cloud SQL': {
								x1: 66.66,
								x2: 33.33,
							},
							'VPC Network': {
								x1: 66.66,
								x2: 33.33,
							},
							'Compute Engine': {
								x1: 66.66,
								x2: 33.33,
							},
							'Cloud Storage': {
								x1: 66.66,
								x2: 33.33,
							},
						},
					}}
					seriesOption={[
						{
							stackIndex: 1,
							color: 'orange',
							label: {
								color: 'white',
								show: true,
								formatter(param) {
									return param.name;
								},
							},
						},
						{
							stackIndex: 2,
							color: 'blue',
							label: {
								show: false,
							},
						},
					]}
				/>
			</BaseWidget>
		</div>
	);
};

export const Default = Template.bind({});

Default.args = {
	title: 'Widget Title',
	value: '7 Services',
	options: [
		{
			id: 'dropdown',
			placeholder: 'Region',
			selectOption: [
				{
					title: 'India',
					value: '1',
				},
				{
					title: 'USA',
					value: '2',
				},
				{
					title: 'UAE',
					value: '3',
				},
				{
					title: 'UK',
					value: '4',
				},
			],
			onChange: (cb, data) => {
				cb(data);
			},
		},
		{
			id: 'expand',
			title: 'Expand',
			onClick: () => {
				alert('This will open the Modal or a new Page with Expanded chart');
			},
		},
	],
};
