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
		seriesData,
		tooltip,
		legend,
		xAxisLabelShow,
		yAxisLabelShow,
		xAxisLabel,
		yAxisLabel,
		axisLabelColor,
		stacked,
		smooth,
		style,
		className,
		theme,
		fallback,
		isLineChart,
		xAxisPosition,
	} = props;

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

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
			fill: !isLineChart,
			backgroundColor: isLineChart ? 'transparent' : lineColors[index % lineColors.length],
			borderColor: borderColors[index % borderColors.length],
			tension: smooth ? 0.4 : 0,
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
				position: legend?.position ?? 'bottom',
				labels: {
					color: axisLabelColor || COLORS.grey,
					boxWidth: 9, // Width for color box
					boxHeight: 9, // Height for color box
					borderRadius: 6, // Circular shape for legend color
					padding: 10, // Padding around legend items
					usePointStyle: true,
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
				color: axisLabelColor || COLORS.grey,
				font: {
					size: 16,
					weight: 'bold',
				},
			},
		},
		scales: {
			x: {
				display: xAxisLabelShow,
				position: xAxisPosition,
				title: {
					display: !!xAxisLabel,
					text: xAxisLabel,
					color: axisLabelColor || COLORS.grey,
					font: {
						size: 14,
					},
				},
				grid: {
					drawOnChartArea: false,
					display: false,
				},
				ticks: {
					color: axisLabelColor || COLORS.grey,
				},
			},
			y: {
				display: yAxisLabelShow,
				stacked,
				title: {
					display: !!yAxisLabel,
					text: yAxisLabel,
					color: axisLabelColor || COLORS.grey,
					font: {
						size: 14,
					},
				},
				grid: {
					display: false,
				},
				ticks: {
					color: axisLabelColor || COLORS.grey,
				},
			},
		},
		elements: {
			line: {
				tension: smooth ? 0.4 : 0,
			},
			point: {
				radius: 5, // Size of the diamond points
				hoverRadius: 7,
				pointStyle: 'rectRot', // Diamond shape for points
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
	seriesData: PropTypes.shape({
		metaData: PropTypes.shape({
			xAxisData: PropTypes.arrayOf(PropTypes.string),
		}),
		chartData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)),
	}),
	stacked: PropTypes.bool,
	xAxisLabelShow: PropTypes.bool,
	yAxisLabelShow: PropTypes.bool,
	xAxisLabel: PropTypes.string,
	yAxisLabel: PropTypes.string,
	axisLabelColor: PropTypes.string,
	smooth: PropTypes.bool,
	legend: PropTypes.shape({
		display: PropTypes.bool,
		position: PropTypes.string,
	}),
	tooltip: PropTypes.shape({
		enabled: PropTypes.bool,
		mode: PropTypes.string,
		intersect: PropTypes.bool,
	}),
	theme: PropTypes.oneOf(['dark', 'light']),
	// style: PropTypes.object,
	className: PropTypes.string,
	isLineChart: PropTypes.bool,
	xAxisPosition: PropTypes.string,
};

BaseAreaChart.defaultProps = {
	loading: false,
	fallback: false,
	seriesData: {},
	stacked: false,
	xAxisLabelShow: true,
	yAxisLabelShow: true,
	axisLabelColor: '',
	smooth: false,
	legend: {},
	tooltip: {},
	theme: 'light',
	// style: {},
	className: '',
	isLineChart: false,
	xAxisPosition: 'bottom',
};

export default BaseAreaChart;
