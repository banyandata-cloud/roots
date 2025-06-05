/* eslint-disable max-len */
import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PolarArea } from 'react-chartjs-2';
import { getCenterHolePlugin } from './utils';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, ChartDataLabels);

const CapsulePolarChart = ({
	seriesData = {},
	showLegends = false,
	chartDataOptions,
	chartOptions,
	dataLabel,
	styles,
	donutProps,
	extra,
	dataSetoptions,
	tooltip,
}) => {
	const labels = Array.from(new Set(Object.keys(seriesData.chartData))); // Ensure unique labels

	const compliantData = [];
	const nonCompliantData = [];

	const minThreshold = 1;

	// Prepare the datasets
	labels.forEach((label) => {
		const x1 = seriesData.chartData[label]?.x1 || 0; // Compliant
		const x2 = seriesData.chartData[label]?.x2 || 0; // Non-Compliant

		// Ensure both values are above the minimum threshold
		compliantData.push(Math.max(x1, minThreshold));
		nonCompliantData.push(Math.max(x2, minThreshold));
	});

	// Chart.js configuration
	const chartData = {
		labels,
		datasets: [
			{
				// label: 'Compliant',
				data: compliantData,
				...chartDataOptions,
			},
			{
				label: 'Non-Compliant',
				data: nonCompliantData,
				backgroundColor: 'rgba(255, 0, 0, 0.6)',
				borderColor: '#fff',
				borderWidth: 2,
			},
		],
		...dataSetoptions,
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: showLegends,
				position: 'top',
				labels: {
					color: '#000',
				},
			},
			tooltip: {
				position: 'nearest', // Try to keep it near the point
				yAlign: 'top',
				callbacks: {
					label: (context) => {
						const label = context.label || '';
						const value = context.formattedValue || '';
						return `${label}: ${value}`;
					},
				},
				displayColors: false,
				padding: 10,
				bodyFont: {
					size: 14,
				},
				...tooltip,
			},
			datalabels: {
				display: (context) => {
					const { datasetIndex, dataIndex } = context;
					const compliantValue = compliantData[dataIndex];
					const nonCompliantValue = nonCompliantData[dataIndex];

					// Only display label for the larger value in the slice
					if (
						(datasetIndex === 0 && compliantValue >= nonCompliantValue) ||
						(datasetIndex === 1 && nonCompliantValue > compliantValue)
					) {
						return true;
					}
					return false;
				},
				formatter: (value, context) => {
					const label = context.chart.data.labels[context.dataIndex];
					return label;
				},
				borderColor: 'grey',
				borderWidth: 1,
				borderRadius: 4,
				color: 'black',
				font: {
					size: 14,
				},
				anchor: 'end',
				align: 'end',
				offset: 10,
				...dataLabel,
			},
		},
		scales: {
			r: {
				display: false, // Hides the radial scale
			},
		},
		layout: {
			padding: {
				top: 20, // Add padding on top
				right: 20, // Add padding on the right
				bottom: 20, // Add padding at the bottom
				left: 20, // Add padding on the left
			},
		},
		rotation: -Math.PI / 2, // Start from the top
		...chartOptions,
	};

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				padding: '0px',
				...styles,
			}}>
			<PolarArea
				data={chartData}
				options={options}
				plugins={[
					ChartDataLabels,
					...(donutProps ? [getCenterHolePlugin(donutProps)] : []),
				]}
				{...extra}
			/>
		</div>
	);
};

export default CapsulePolarChart;
