/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin
import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { COLORS } from '../../../styles';
import { Skeleton } from './Skeleton'; // Assuming this is your custom loading component

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

const BaseVerticalBarChart = ({
	loading,
	seriesData,
	title,
	gridOptions,
	width,
	height,
	barThickness = 50,
	borderRadius = 5,
	barColor1,
	barColor2,
	xAxisTitle,
	yAxisTitle,
	dataLabels,
}) => {
	if (loading) {
		return <Skeleton />;
	}

	// Mapping the data for Chart.js
	const labels = Object.keys(seriesData.chartData);

	const datasets = Object.keys(seriesData.metaData.keyData)
		.filter((key) => {
			// Include only keys that have data in seriesData.chartData
			return labels.some((label) => {
				return seriesData.chartData[label][key] !== undefined;
			});
		})
		.map((key) => {
			return {
				label: seriesData.metaData.keyData[key],
				backgroundColor:
					key === 'x1'
						? barColor1 ?? COLORS.success
						: key === 'x2'
						? barColor2 ?? COLORS.error
						: COLORS.warning,
				data: labels.map((label) => {
					// Only include data if it's defined
					return seriesData.chartData[label][key] !== undefined
						? seriesData.chartData[label][key]
						: null;
				}),
				borderRadius,
				barThickness,
			};
		});

	const options = {
		responsive: true,
		maintainAspectRatio: false, // To allow custom height and width
		plugins: {
			title: {
				display: true,
				font: {
					size: title?.textStyle?.fontSize || 12,
				},
				align: 'start',
				padding: {
					left: title?.left || 0,
				},
			},
			tooltip: {
				callbacks: {
					label: (tooltipItem) => {
						const label = seriesData.metaData.controlsApplied[tooltipItem.label]?.x1;
						return `${tooltipItem.dataset.label}: ${label}`;
					},
				},
			},
			legend: {
				display: false,
			},
			// Enable the datalabels plugin
			datalabels: {
				...dataLabels,
				anchor: 'end',
				align: 'top', // Align the labels above the bars
				color: 'black',
				font: {
					// weight: 'bold',
					size: 12,
				},
				offset: 4, // Space between the bar and the label
				formatter: (value, context) => {
					return context.chart.data.labels[context.dataIndex];
				},
			},
		},
		scales: {
			x: {
				grid: {
					display: gridOptions?.gridContainLabel || true,
					color: 'rgba(255, 255, 255, 0.2)',
				},
				ticks: {
					color: 'black',
					callback: (value, index) => {
						return seriesData.chartData[labels[index]]?.x1;
					},
				},
				title: {
					display: true,
					text: xAxisTitle,
					color: 'black',
				},
			},
			y: {
				grid: {
					display: true,
					color: 'rgba(255, 255, 255, 0.2)',
				},
				ticks: {
					color: 'black',
					beginAtZero: true,
				},
				title: {
					display: true,
					text: yAxisTitle,
					color: 'black',
				},
			},
		},
	};

	return (
		<div
			style={{
				width: width || '100%', // Default to full width if not provided
				height: height || '100%', // Default to full height if not provided
			}}>
			<Bar
				data={{
					labels,
					datasets,
				}}
				options={options}
			/>
		</div>
	);
};

BaseVerticalBarChart.propTypes = {
	loading: PropTypes.bool,
	seriesData: PropTypes.shape({
		chartData: PropTypes.object.isRequired,
		metaData: PropTypes.object.isRequired,
	}).isRequired,
	title: PropTypes.shape({
		text: PropTypes.string,
		textStyle: PropTypes.shape({
			fontSize: PropTypes.number,
		}),
		left: PropTypes.number,
	}),
	gridOptions: PropTypes.object,
	width: PropTypes.string, // Width of the chart container
	height: PropTypes.string, // Height of the chart container
};

BaseVerticalBarChart.defaultProps = {
	loading: false,
	title: {
		textStyle: {
			fontSize: 12,
		},
		left: 0,
	},
	gridOptions: {
		gridContainLabel: true,
	},
	width: '100%',
	height: '100%',
};

export default BaseVerticalBarChart;
