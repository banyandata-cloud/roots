import React, { useState } from 'react';
import BaseVerticalBarChart from '../charts/verticalBarChart/BaseVerticalBarChart';
import BaseWidget from './BaseWidget';
import { COLORS } from '../../styles';

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
	const [selectedValue, setSelectedValue] = useState('Option 1');
	return (
		<div
			style={{
				backgroundColor: COLORS['dark-grey'],
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
								selectedToggle: selectedValue,
								setSelectedToggle: (data) => {
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
						chartData:
							selectedValue === 'Option 1'
								? {
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
								  }
								: {
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
		</div>
	);
};

const ErrorStateTemplate = (args) => {
	const [dropValue, setDropValue] = useState(0);
	const [selectedValue, setSelectedValue] = useState('Option 1');
	return (
		<div
			style={{
				backgroundColor: COLORS['dark-grey'],
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
								selectedToggle: selectedValue,
								setSelectedToggle: (data) => {
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
						chartData: {},
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
		</div>
	);
};

export const Default = Template.bind({});
export const ErrorState = ErrorStateTemplate.bind({});

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
