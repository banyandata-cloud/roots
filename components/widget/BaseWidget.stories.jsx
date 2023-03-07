import React, { useState } from 'react';
import BaseVerticalBarChart from '../charts/verticalBarChart/BaseVerticalBarChart';
import BaseWidget from './BaseWidget';
import { ThemedContainer } from '../helpers';

export default {
	title: 'ComponentsV2/Widget/BaseWidget',
	component: BaseWidget,
	parameters: {
		options: {
			showToolbar: true,
		},
	},
};

const CHART_DATA = {
	1: {
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
	2: {
		'Networking Services': {
			x1: 33.33,
			x2: 66.66,
		},
		'IAM&Admin': {
			x1: 33.33,
			x2: 66.66,
		},
		'Cloud SQL': {
			x1: 33.33,
			x2: 66.66,
		},
		'VPC Network': {
			x1: 33.33,
			x2: 66.66,
		},
		'Compute Engine': {
			x1: 33.33,
			x2: 66.66,
		},
		'Cloud Storage': {
			x1: 33.33,
			x2: 66.66,
		},
	},
};

const Template = (args) => {
	const [dropValue, setDropValue] = useState(0);
	const [selectedValue, setSelectedValue] = useState('Option 1');
	return (
		<ThemedContainer
			style={{
				height: '100%',
				width: '100%',
			}}>
			<BaseWidget
				{...args}
				// eslint-disable-next-line react/destructuring-assignment
				options={args.options.map((option) => {
					// eslint-disable-next-line no-nested-ternary
					return option.id === 'toggle'
						? {
								...option,
								value: selectedValue,
								onChange: (data) => {
									setSelectedValue(data);
								},
						  }
						: option.id === 'dropdown'
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
					xAxisShow
					xAxisLabel={{
						show: true,
						rotate: 90,
						inside: true,
						color: 'white',
						verticalAlign: 'bottom',
						padding: [0, 0, 20, -5],
					}}
					barWidth='15%'
					seriesData={{
						chartData: selectedValue === 'Option 1' ? CHART_DATA[1] : CHART_DATA[2],
					}}
					seriesOption={[
						{
							stackIndex: 1,
							color: 'orange',
							showBackground: false,
							label: {
								color: 'white',
								show: false,
								formatter(param) {
									return param.name;
								},
							},
						},
						{
							stackIndex: 2,
							showBackground: false,
							color: 'blue',
							label: {
								show: true,
								color: 'white',
							},
						},
					]}
					errorHandle={() => {
						alert('This will call the API again');
					}}
					errorMessage='We are having trouble loading this content.'
				/>
			</BaseWidget>
		</ThemedContainer>
	);
};

const ErrorStateTemplate = (args) => {
	const [dropValue, setDropValue] = useState(0);
	const [selectedValue, setSelectedValue] = useState('Option 1');
	return (
		<ThemedContainer
			style={{
				height: '100%',
				width: '100%',
			}}>
			<BaseWidget
				{...args}
				// eslint-disable-next-line react/destructuring-assignment
				options={args.options.map((option) => {
					// eslint-disable-next-line no-nested-ternary
					return option.id === 'toggle'
						? {
								...option,
								value: selectedValue,
								onChange: (data) => {
									setSelectedValue(data);
								},
						  }
						: option.id === 'dropdown'
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
					// eslint-disable-next-line react/destructuring-assignment
					loading={args.loading}
					yAxisLabelShow
					ySplitLineShow
					xAxisShow
					xAxisLabel={{
						show: true,
						rotate: 90,
						inside: true,
						color: 'white',
						verticalAlign: 'bottom',
						padding: [0, 0, 20, -5],
					}}
					barWidth='15%'
					seriesData={{
						chartData: selectedValue === 'Option 1' ? {} : CHART_DATA[2],
					}}
					seriesOption={[
						{
							stackIndex: 1,
							color: 'orange',
							label: {
								color: 'white',
								show: false,
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
					errorHandle={() => {
						alert('This will call the API again');
					}}
					errorMessage='We are having trouble loading this content.'
				/>
			</BaseWidget>
		</ThemedContainer>
	);
};

export const Default = Template.bind({});
export const ErrorState = ErrorStateTemplate.bind({});
export const WithLoader = ErrorStateTemplate.bind({});

Default.args = {
	title: 'Widget Title - 7 Services',
	showBack: true,
	onBack: () => {
		alert('This will bring you back');
	},
	options: [
		{
			id: 'toggle',
			options: [
				{
					id: '1',
					leftCompoenent: '',
					rightCompoenent: '',
					title: 'Option 1',
					value: 'Option 1',
				},
				{
					id: '2',
					leftCompoenent: '',
					rightCompoenent: '',
					title: 'Option 2',
					value: 'Option 2',
				},
			],
		},
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
	errorMessage: 'We are having trouble loading the Data',
	errorHandle: () => {
		alert('This will Fetch API again');
	},
};

ErrorState.args = {
	...Default.args,
	errorMessage: 'We are having trouble loading the Data',
	errorHandle: () => {
		alert('This will Fetch API again');
	},
};

WithLoader.args = {
	...Default.args,
	loading: true,
};
