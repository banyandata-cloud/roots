/* eslint-disable react/forbid-prop-types */
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { COLORS } from '../../../styles';
import { classes } from '../../../utils';
import styles from './BaseAreaChart.module.css';
import { Skeleton } from './Skeleton';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const BaseAreaChart = (props) => {
	const {
		loading,
		title,
		gridOptions,
		seriesData,
		tooltip,
		legend,
		xAxisLabelShow,
		yAxisLabelShow,
		xAxisLabel,
		yAxisLabel,
		axisLabelColor,
		stacked,
		cursor,
		smooth,
		// opacity,
		style,
		className,
		theme,
		fallback,
		isLineChart, // New prop to toggle between line chart and area chart
	} = props;

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

	// Define different colors for each dataset
	const lineColors = [
		'rgba(255, 99, 132, 0.5)',
		'rgba(54, 162, 235, 0.5)',
		'rgba(75, 192, 192, 0.5)',
		'rgba(153, 102, 255, 0.5)',
		'rgba(255, 159, 64, 0.5)',
	];

	const borderColors = [
		'rgba(255, 99, 132, 1)',
		'rgba(54, 162, 235, 1)',
		'rgba(75, 192, 192, 1)',
		'rgba(153, 102, 255, 1)',
		'rgba(255, 159, 64, 1)',
	];

	const chartData = {
		labels: seriesData?.metaData?.xAxisData ?? [],
		datasets: Object.keys(seriesData?.chartData ?? {}).map((key, index) => {
 return {
			label: key,
			data: seriesData?.chartData[key] ?? [],
			fill: !isLineChart, // Fill only if it's not a line chart
			backgroundColor: isLineChart
				? 'transparent' // No background color for a line chart
				: lineColors[index % lineColors.length], // Background color for area chart
			borderColor: borderColors[index % borderColors.length], // Border color matches the line color
			tension: smooth ? 0.4 : 0, // Controls smoothness of the line
			borderWidth: 2,
			pointRadius: 4,
			pointHoverRadius: 6,
			pointBackgroundColor: 'white',
			pointBorderColor: borderColors[index % borderColors.length],
			pointHoverBackgroundColor: borderColors[index % borderColors.length],
			pointHoverBorderColor: 'white',
		};
}),
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index',
			intersect: false,
		},
		plugins: {
			legend: {
				display: legend?.display ?? true,
				position: legend?.position ?? 'right',
				labels: {
					color: axisLabelColor !== '' ? axisLabelColor : COLORS.grey,
					boxWidth: 12, // Decreased width for the legend color box
					boxHeight: 12,
				},
			},
			tooltip: {
				enabled: tooltip?.enabled ?? true,
				mode: tooltip?.mode ?? 'nearest',
				intersect: tooltip?.intersect ?? false,
			},
			title: {
				display: !!title,
				text: title,
				color: axisLabelColor !== '' ? axisLabelColor : COLORS.grey,
				font: {
					size: 16,
					weight: 'bold',
				},
			},
		},
		scales: {
			x: {
				display: xAxisLabelShow ?? true,
				title: {
					display: !!xAxisLabel,
					text: xAxisLabel,
					color: axisLabelColor !== '' ? axisLabelColor : COLORS.grey,
					font: {
						size: 14,
					},
				},
				grid: {
					display: gridOptions?.xAxisGridShow ?? false,
				},
				ticks: {
					color: axisLabelColor !== '' ? axisLabelColor : COLORS.grey,
				},
			},
			y: {
				display: yAxisLabelShow ?? true,
				stacked,
				title: {
					display: !!yAxisLabel,
					text: yAxisLabel,
					color: axisLabelColor !== '' ? axisLabelColor : COLORS.grey,
					font: {
						size: 14,
					},
				},
				grid: {
					display: gridOptions?.yAxisGridShow ?? true,
				},
				ticks: {
					color: axisLabelColor !== '' ? axisLabelColor : COLORS.grey,
				},
			},
		},
		elements: {
			line: {
				tension: smooth ? 0.4 : 0,
			},
			point: {
				pointStyle: 'circle',
				cursor: cursor ?? 'default',
			},
		},
	};

	return (
		<div
className={classes(styles.root, className)}
style={{
 ...style, height: '300px',
}}>
			<Line data={chartData} options={chartOptions} />
		</div>
	);
};

BaseAreaChart.propTypes = {
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	title: PropTypes.string,
	gridOptions: PropTypes.object,
	seriesData: PropTypes.objectOf(PropTypes.shape),
	stacked: PropTypes.bool,
	xAxisLabelShow: PropTypes.bool,
	yAxisLabelShow: PropTypes.bool,
	xAxisLabel: PropTypes.string,
	yAxisLabel: PropTypes.string,
	axisLabelColor: PropTypes.string,
	cursor: PropTypes.string,
	smooth: PropTypes.bool,
	// opacity: PropTypes.number,
	legend: PropTypes.object,
	tooltip: PropTypes.object,
	theme: PropTypes.oneOf(['dark', 'light']),
	style: PropTypes.object,
	className: PropTypes.string,
	isLineChart: PropTypes.bool, // Added new prop for toggling between line chart and area chart
};

BaseAreaChart.defaultProps = {
	loading: false,
	fallback: false,
	gridOptions: {},
	seriesData: {},
	stacked: false,
	xAxisLabelShow: true,
	yAxisLabelShow: true,
	axisLabelColor: '',
	cursor: 'default',
	smooth: false,
	// opacity: 0.3,
	legend: {},
	tooltip: {},
	theme: 'light',
	style: {},
	className: '',
	isLineChart: false, // Default to false (area chart by default)
};

export default BaseAreaChart;
