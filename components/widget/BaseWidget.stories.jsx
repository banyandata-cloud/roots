import React, { useState } from 'react';
import BaseVerticalBarChart from '../charts/verticalBarChart/BaseVerticalBarChart';
import BaseWidget from './BaseWidget';
import { ThemedContainer } from '../helpers';
import Map from '../maps/Map/Map';

export default {
	title: 'Components/Widget/BaseWidget',
	component: BaseWidget,
	parameters: {
		options: {
			showToolbar: false,
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
			}}
			{...args}>
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
				/>
			</BaseWidget>
		</ThemedContainer>
	);
};

const WithFallbackTemplate = (args) => {
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
				/>
			</BaseWidget>
		</ThemedContainer>
	);
};

const WithNestedFallbackTemplate = (args) => {
	const [fallback, setFallback] = useState(false);
	return (
		<ThemedContainer
			style={{
				height: '100%',
				width: '100%',
			}}>
			<BaseWidget
				{...args}
				setFallback={setFallback}
				// eslint-disable-next-line react/destructuring-assignment
			>
				<div
					style={{
						width: '100%',
						height: '100%',
					}}>
					<BaseVerticalBarChart
						// eslint-disable-next-line react/destructuring-assignment
						loading={args.loading}
						fallback={fallback}
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
					/>
				</div>
			</BaseWidget>
		</ThemedContainer>
	);
};

const MapTemplate = (args) => {
	return (
		<ThemedContainer
			style={{
				height: '100%',
				width: '100%',
			}}>
			<BaseWidget {...args}>
				<Map
					// eslint-disable-next-line react/destructuring-assignment
					loading={args.loading}
					options={{
						style: {
							flexGrow: '1',
							height: '100%',
						},
						mapId: '20e2e511856fee45',
					}}
					chartData={[]}
				/>
			</BaseWidget>
		</ThemedContainer>
	);
};

export const Default = Template.bind({});
export const WithTitleOptions = Template.bind({});
export const WithFallback = WithFallbackTemplate.bind({});
export const WithNestedFallback = WithNestedFallbackTemplate.bind({});
export const WithLoader = WithFallbackTemplate.bind({});
export const WithMap = MapTemplate.bind({});

Default.args = {
	title: 'Widget Title',
	subtitle: '7 Services',
	showBack: true,
	onBack: () => {
		alert('This will bring you back');
	},
	onReload: () => {
		alert('Callback for fallback reload button');
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
			title: '',
			onClick: () => {
				alert('This will open the Modal or a new Page with Expanded chart');
			},
		},
		{
			id: 'datepicker',
			onApply: () => {
				alert('Apply Date Picker');
			},
			onClear: () => {
				alert('Clear Date Picker');
			},
			date: null,
		},
	],
};

WithTitleOptions.args = {
	...Default.args,
	titleOptions: 'Hello There',
};

WithFallback.args = {
	...Default.args,
};

WithNestedFallback.args = {
	...WithFallback.args,
};

WithLoader.args = {
	...Default.args,
	loading: true,
};

WithMap.args = {
	...WithFallback.args,
};
