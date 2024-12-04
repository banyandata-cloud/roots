import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PolarArea } from 'react-chartjs-2';
import { Skeleton } from './Skeleton';

// Register required components for Polar Area Chart
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const CapsulePolarChart = (props) => {
	const { loading = false, fallback, seriesData = {}, showLegends = false } = props;

	const labels = Object.keys(seriesData.chartData);

	let compliantData = [];
	let nonCompliantData = [];
	let totalData = []; // This will store the sum of compliant and non-compliant data

	const minThreshold = 1; // Minimum value to display the slice

	labels.forEach((label) => {
		const x1 = seriesData.chartData[label]?.x1 || 0; // Compliant value
		const x2 = seriesData.chartData[label]?.x2 || 0; // Non-compliant value

		// Ensure both values are above the minimum threshold
		const compliant = Math.max(x1, minThreshold);
		const nonCompliant = Math.max(x2, minThreshold);

		// Store the compliant, non-compliant, and combined data
		compliantData.push(compliant);
		nonCompliantData.push(nonCompliant);
		totalData.push(compliant + nonCompliant); // Sum of both datasets
	});

	// Sort data by total value, keeping compliant green and non-compliant red
	const sortedData = labels
		.map((label, index) => {
			return {
				label,
				compliant: compliantData[index],
				nonCompliant: nonCompliantData[index],
				total: totalData[index],
			};
		})
		.sort((a, b) => {
			return b.total - a.total;
		}); // Sort descending by total value

	// Extract sorted labels and data
	const sortedLabels = sortedData.map((item) => {
		return item.label;
	});
	compliantData = sortedData.map((item) => {
		return item.compliant;
	});
	nonCompliantData = sortedData.map((item) => {
		return item.nonCompliant;
	});
	totalData = sortedData.map((item) => {
		return item.total;
	});

	// If loading or fallback, show skeleton
	if (loading || fallback) {
		return <Skeleton theme='dark' fallback={!loading && fallback} />;
	}

	// Polar chart data with two datasets: compliant and non-compliant percentages
	const chartData = {
		labels: sortedLabels,
		datasets: [
			{
				data: compliantData.map((compliant, index) => {
					return (compliant / totalData[index]) * 100;
				}),
				backgroundColor: 'green', // Green for compliant
				borderWidth: 1,
				label: 'Compliant', // Label for compliant data
				zIndex: 0, // Ensure this dataset is below non-compliant
			},
			{
				data: nonCompliantData.map((nonCompliant, index) => {
					return (nonCompliant / totalData[index]) * 100;
				}), // Percentage of non-compliant
				backgroundColor: 'rgba(255, 0, 0, 0.8)', // Semi-transparent red
				borderWidth: 1, // Increase border width to make slices more visible
				label: 'Non-Compliant', // Label for non-compliant data
				zIndex: 1, // Ensure this dataset is on top
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
				enabled: true,
				backgroundColor: 'rgba(255, 255, 255, 1)',
				titleColor: '#000',
				bodyColor: '#000',
				borderWidth: 0.5,
				borderColor: 'black',
			},
			datalabels: {
				display: true,
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
		rotation: -Math.PI / 2,
	};

	return (
		<div
			style={{
				width: '50%',
				height: '350px',
				margin: '2rem',
			}}>
			<PolarArea data={chartData} options={options} plugins={[ChartDataLabels]} />
		</div>
	);
};

export default CapsulePolarChart;
