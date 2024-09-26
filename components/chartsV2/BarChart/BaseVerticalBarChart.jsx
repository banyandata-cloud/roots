/* eslint-disable react/forbid-prop-types */
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { COLORS } from '../../../styles';
import { Skeleton } from './Skeleton'; // Assuming this is your custom loading component

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BaseVerticalBarChart = ({ loading, seriesData, title, gridOptions }) => {
	if (loading) {
		return <Skeleton />;
	}

	// Mapping the data for Chart.js
	const labels = Object.keys(seriesData.chartData);
	const data = {
		labels,
		datasets: [
			{
				label: seriesData.metaData.keyData.x1, // Compliant data
				backgroundColor: COLORS.success,
				data: labels.map((label) => { return seriesData.chartData[label].x1; }),
				borderRadius: 12,
			},
			{
				label: seriesData.metaData.keyData.x2, // Non-Compliant data
				backgroundColor: COLORS.error,
				data: labels.map((label) => { return seriesData.chartData[label].x2; }),
			},
			{
				label: seriesData.metaData.keyData.x3, // Validate data
				backgroundColor: COLORS.warning,
				data: labels.map((label) => { return seriesData.chartData[label].x3; }),
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				// text: title?.text || 'Chart Title',
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
			// Remove or comment out the legend configuration to hide the legend
			legend: {
			  display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: gridOptions?.gridContainLabel || true,
					color: 'rgba(255, 255, 255, 0.2)',
				},
				ticks: {
					color: 'white',
				},
				title: {
					display: true,
					text: 'Databases',
					color: 'white',
				},
			},
			y: {
				grid: {
					display: true,
					color: 'rgba(255, 255, 255, 0.2)',
				},
				ticks: {
					color: 'white',
				},
				title: {
					display: true,
					text: 'Values',
					color: 'white',
				},
			},
		},
	};

	return (
		<div style={{
 width: '100%', height: '100%',
}}>
			<Bar data={data} options={options} />
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
	// tooltip: PropTypes.object,
};

BaseVerticalBarChart.defaultProps = {
	loading: false,
	title: {
		// text: 'Chart Title',
		textStyle: {
			fontSize: 12,
		},
		left: 0,
	},
	gridOptions: {
		gridContainLabel: true,
	},
	// tooltip: {},
};

export default BaseVerticalBarChart;
