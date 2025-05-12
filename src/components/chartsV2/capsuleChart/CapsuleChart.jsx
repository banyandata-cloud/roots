import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Skeleton } from './Skeleton';

// Register necessary components
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	annotationPlugin,
	ChartDataLabels
);

const CapsuleChart = (props) => {
	const {
		loading = false,
		fallback,
		seriesData = {},
		showLegends = false,
		tooltip,
		dataSetsOptions,
		chartOptions,
		xAxis,
		yAxis,
		extra,
		styles,
	} = props;

	if (loading || fallback) {
		return <Skeleton theme='dark' fallback={!loading && fallback} />;
	}

	// Prepare labels and data
	const labels = Object.keys(seriesData.chartData);
	const dataX1 = labels.map((label) => {
		return seriesData.chartData[label]?.x1 || 0;
	});
	const dataX2 = labels.map((label) => {
		return seriesData.chartData[label]?.x2 || 0;
	});

	// Chart data structure
	const [activeDatasets, setActiveDatasets] = useState([true, true]); // Track active datasets

	const data = {
		labels,
		datasets: [
			{
				label: seriesData?.metaData?.keyData?.x1,
				data: dataX1,
				backgroundColor: activeDatasets[0] ? 'green' : 'grey', // Change to grey if not active
				stack: 'Stack 0',
				borderRadius: 18,
				barThickness: 30,
			},
			{
				label: seriesData?.metaData?.keyData?.x2,
				data: dataX2.map((value) => {
					return -value;
				}), // Negate values to stack downwards
				backgroundColor: activeDatasets[1] ? 'red' : 'grey', // Change to grey if not active
				stack: 'Stack 0',
				borderRadius: 18,
				barThickness: 30,
			},
		],
		...dataSetsOptions,
	};

	// Chart options configuration
	const options = {
		indexAxis: 'x',
		plugins: {
			legend: {
				display: showLegends, // Conditionally display legends based on showLegends prop
				position: 'top',
				labels: {
					color: '#000',
					font: {
						family: 'Poppins',
					},
				},
				onClick: (e, legendItem) => {
					const index = legendItem.datasetIndex;
					const newActiveDatasets = [...activeDatasets];
					newActiveDatasets[index] = !newActiveDatasets[index]; // Toggle active state

					setActiveDatasets(newActiveDatasets); // Update state to trigger re-render
				},
			},
			tooltip: {
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
					...tooltip.bodyFont,
				},
				borderWidth: tooltip?.borderWidth ?? 1,
				borderColor: (context) => {
					const segmentColor = context?.tooltipItems[0]?.dataset?.backgroundColor;
					return segmentColor || 'black';
				},
				callbacks: {
					title: tooltip.displayTitle
						? (tooltipItems) => {
								return tooltipItems[0]?.label || '';
						  }
						: () => {
								return '';
						  },
					label: (tooltipItem) => {
						const datasetLabel = tooltipItem.dataset.label || '';
						const value = tooltipItem.raw;
						return `${datasetLabel}: ${value >= 0 ? value : -value}`;
					},
				},
				...tooltip,
			},
			annotation: {
				annotations: {
					horizontalLine: {
						type: 'line',
						yMin: 0,
						yMax: 0,
						borderColor: '#d5d5db',
						borderWidth: 1,
					},
				},
			},
			datalabels: {
				color: 'black',
				font: {
					size: 14,
					family: 'Poppins',
				},
				formatter: (value, context) => {
					if (context.datasetIndex === 0) {
						return `${value}%`; // Show the value for x1 with a percentage
					}
					if (context.datasetIndex === 1) {
						return context.chart.data.labels[context.dataIndex]; // Display the database name
					}
					return ''; // Don't show for other cases
				},
				anchor: (context) => {
					return context.datasetIndex === 0 ? 'end' : 'start';
				},
				align: (context) => {
					return context.datasetIndex === 0 ? 'end' : 'start';
				},
				offset: 5,
				padding: 5,
				shadowColor: 'black',
				shadowBlur: 18,
				shadowOffsetX: 4,
				shadowOffsetY: 4,
			},
		},
		scales: {
			x: {
				stacked: true,
				ticks: {
					display: true,
					color: '#000',
					padding: 5,
					font: {
						family: 'Poppins',
					},
				},
				grid: {
					display: false,
					drawBorder: false,
				},
				display: false,
				...xAxis,
			},
			y: {
				stacked: true,
				min: -200,
				max: 200,
				ticks: {
					display: false,
					font: {
						family: 'Poppins',
					},
				},
				grid: {
					display: false,
					drawBorder: false,
				},
				display: false,
				...yAxis,
			},
		},
		...chartOptions,
	};

	return (
		<div
			style={{
				position: 'relative',
				...styles,
			}}>
			<Bar data={data} options={options} plugins={[ChartDataLabels]} {...extra} />
		</div>
	);
};

export default CapsuleChart;
