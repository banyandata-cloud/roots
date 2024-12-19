import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, ChartDataLabels);

const CapsulePolarChart = ({ loading = false, fallback, seriesData = {}, showLegends = false }) => {
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
				label: 'Compliant',
				data: compliantData,
				backgroundColor: 'rgba(0, 128, 0, 0.6)',
				borderColor: 'green',
				borderWidth: 1,
			},
			{
				label: 'Non-Compliant',
				data: nonCompliantData,
				backgroundColor: 'rgba(255, 0, 0, 0.6)',
				borderColor: 'red',
				borderWidth: 1,
			},
		],
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
				backgroundColor: 'rgba(255, 255, 255, 0.9)',
				titleColor: '#000',
				bodyColor: '#000',
				borderWidth: 0,
				borderColor: '#000',
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
				color: 'black',
				font: {
					size: 14,
				},
				anchor: 'end',
				align: 'end',
				offset: 10,
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
	};

	// Fallback or skeleton loader
	if (loading || fallback) {
		return <div>Loading...</div>; // Replace with a Skeleton component as needed
	}

	return (
		<div
			style={{
				width: '100%',
				height: '400px',
				padding: '0px',
			}}>
			<PolarArea data={chartData} options={options} plugins={[ChartDataLabels]} />
		</div>
	);
};

export default CapsulePolarChart;
