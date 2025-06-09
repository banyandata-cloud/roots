/* eslint-disable no-restricted-globals */
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
import { Bar } from 'react-chartjs-2';
import { getColorGradient } from '../utils';
import { Skeleton } from './Skeleton'; // Assuming this is your custom loading component

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

const BaseBarChart = ({
	loading,
	seriesData,
	title,
	gridOptions,
	width = '100%',
	height = '100%',
	barThickness = 50,
	borderRadius = 5,
	xAxisTitle,
	yAxisTitle,
	tooltip,
	legends,
	chartOptions,
	chartDatasets,
	xAxis,
	yAxis,
	styles,
	vertical = true,
	stacked,
	extra,
	barColors,
}) => {
	if (loading) {
		return <Skeleton vertical={vertical} />;
	}

	// Mapping the data for Chart.js
	const labels = Object.keys(seriesData.chartData);

	const allKeys = new Set();

	Object.values(seriesData.chartData).forEach((data) => {
		Object.keys(data).forEach((key) => {
			allKeys.add(key);
		});
	});

	const barDatasets = Array.from(allKeys).map((key) => {
		return {
			label: key,
			backgroundColor: (ctx) => {
				const color = barColors?.[key];
				if (!color) return 'grey';

				if (color.startsWith('linear-gradient')) {
					return getColorGradient(ctx, color);
				}

				return color;
			},
			data: labels.map((label) => {
				return seriesData.chartData[label][key] !== undefined
					? seriesData.chartData[label][key]
					: null;
			}),
			borderRadius,
			barThickness,
			...chartDatasets,
		};
	});

	const datasets = stacked ? [...barDatasets, stacked] : [...barDatasets];

	const options = {
		responsive: true,
		maintainAspectRatio: false, // To allow custom height and width
		indexAxis: !vertical && 'y',
		plugins: {
			title: {
				display: true,
				font: {
					size: title?.textStyle?.fontSize || 12,
					family: 'Poppins',
				},
				align: 'start',
				padding: {
					left: title?.left || 0,
				},
			},
			tooltip: {
				borderWidth: tooltip?.borderWidth ?? 1,
				backgroundColor: 'rgba(255, 255, 255, 1)',
				bodySpacing: tooltip?.bodySpacing ?? 5,
				displayColors: tooltip?.displayColors ?? true,
				boxWidth: tooltip?.colorBoxWidth ?? 5,
				boxHeight: tooltip?.colorBoxHeight ?? 5,
				boxPadding: 5,
				usePointStyle: tooltip?.usePointStyle ?? true,
				titleColor: tooltip?.bodyFont?.titleColor ?? '#000',
				bodyColor: tooltip?.bodyFont?.color ?? '#000',
				bodyFont: {
					...tooltip?.bodyFont,
					family: 'Poppins',
				},
				...tooltip,
			},
			legend: {
				display: false,
				...legends,
			},
			// Enable the datalabels plugin
			datalabels: {
				anchor: 'end',
				align: 'top', // Align the labels above the bars
				color: 'black',
				font: {
					// weight: 'bold',
					size: 12,
					family: 'Poppins',
				},
				offset: 4, // Space between the bar and the label
				formatter: (value, context) => {
					return context.chart.data.labels[context.dataIndex];
				},
			},
			...chartOptions,
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
					font: {
						family: 'Poppins',
					},
				},
				title: {
					display: true,
					text: xAxisTitle,
					color: 'black',
					font: {
						family: 'Poppins',
					},
				},
				...xAxis,
			},
			y: {
				grid: {
					display: true,
					color: 'rgba(255, 255, 255, 0.2)',
				},
				ticks: {
					color: 'black',
					beginAtZero: true,
					font: {
						family: 'Poppins',
					},
				},
				title: {
					display: true,
					text: yAxisTitle,
					color: 'black',
					font: {
						family: 'Poppins',
					},
				},
				...yAxis,
			},
		},
	};

	return (
		<div
			style={{
				width: width || '100%', // Default to full width if not provided
				height: height || '100%',
				...styles,
			}}>
			<Bar
				data={{
					labels,
					datasets,
				}}
				options={options}
				{...extra}
			/>
		</div>
	);
};

export default BaseBarChart;
