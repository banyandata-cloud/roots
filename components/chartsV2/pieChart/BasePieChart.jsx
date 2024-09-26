/* eslint-disable react/forbid-prop-types */
import React, { useState, useCallback } from 'react';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { classes } from '../../../utils';
import styles from './BasePieChart.module.css';
import { Skeleton } from './Skeleton';

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const BasePieChart = (props) => {
	const {
		loading,
		title,
		tooltip,
		seriesData,
		semiDoughnut,
		cursor,
		itemStyle,
		legend,
		style,
		className,
		theme,
		fallback,
	} = props;

	const [excludedIndices, setExcludedIndices] = useState([]);

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

	const handleLegendClick = useCallback((event, legendItem) => {
		const { index } = legendItem;
		setExcludedIndices((prevIndices) => {
			const newIndices = [...prevIndices];
			if (newIndices.includes(index)) {
				newIndices.splice(newIndices.indexOf(index), 1); // Un-exclude
			} else {
				newIndices.push(index); // Exclude
			}
			return newIndices;
		});
	}, []);

	const data = {
		labels: seriesData?.metaData?.keyData
			? Object.keys(seriesData.chartData).map((key) => {
					return seriesData.metaData.keyData[key];
			  })
			: [],
		datasets: [
			{
				data: Object.keys(seriesData?.chartData ?? {}).map((key, index) => {
					return excludedIndices.includes(index) ? null : seriesData?.chartData?.[key];
				}),
				backgroundColor: Object.keys(seriesData?.chartData ?? {}).map((_, index) => {
					if (excludedIndices.includes(index)) {
						return '#D3D3D3'; // Grey color for removed items
					}
					const colors = [
						'#FF6384',
						'#36A2EB',
						'#FFCE56',
						'#4BC0C0',
						'#9966FF',
						'#FF9F40',
					]; // Add more colors as needed
					return colors[index % colors.length]; // Cycle through colors array
				}),
				borderColor: Object.keys(seriesData?.chartData ?? {}).map((_, index) => {
					if (excludedIndices.includes(index)) {
						return '#D3D3D3'; // Grey border for removed items
					}
					return itemStyle?.borderColor || 'white'; // Default border color
				}),
				borderWidth: 2, // Set thinner border for the slices
				hoverOffset: 10, // Increase size of the pie slice on hover
				cutout: semiDoughnut ? '50%' : '0%', // Control if it's semi-doughnut
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: legend?.display ?? true,
				position: 'right', // Position the legend to the right of the chart
				align: 'center', // Vertically center the legend
				labels: {
					boxWidth: 10, // Decrease the size of the color box
					padding: 10, // Adjust padding between legend items
				},
				onClick: handleLegendClick, // Add custom click handler
			},
			title: {
				display: !!title,
				text: title,
				padding: {
					top: 10,
					bottom: 10,
				},
				font: {
					size: 16,
				},
			},
			tooltip: {
				borderWidth: 1, // Set the border width
				borderColor: (tooltipItem) => {
					// Tooltip border color will match the color of the pie slice
					return tooltipItem?.dataset?.borderColor[tooltipItem.dataIndex];
				},
				callbacks: {
					label: (context) => {
						const label = context.label || '';
						const value = context.raw;
						return `${label}: ${value}`; // Show data on a single line
					},
				},
				bodySpacing: 5, // Increase spacing between tooltip items
				displayColors: true, // Show the color box next to the tooltip item
				usePointStyle: true, // Use point style (circle) for the tooltip color marker
			},
		},
		layout: {
			padding: {
				right: 10, // Reduce padding between the chart and the legend
			},
		},
		interaction: {
			mode: 'nearest',
			axis: 'x',
			intersect: false,
		},
		animations: {
			// Add hover effect to increase pie slice size
			animateRotate: {
				duration: 500,
				easing: 'easeOutBounce',
			},
		},
	};

	return (
		<div
			className={classes(styles.root, className)}
			style={{
				cursor,
				...style,
				width: '70%', // Decrease the width of the chart container
				height: '70%', // Decrease the height of the chart container
			}}>
			<Pie data={data} options={options} />
		</div>
	);
};

BasePieChart.propTypes = {
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	title: PropTypes.string,
	tooltip: PropTypes.object,
	seriesData: PropTypes.shape({
		chartData: PropTypes.object,
		metaData: PropTypes.object,
	}),
	semiDoughnut: PropTypes.bool,
	cursor: PropTypes.string,
	itemStyle: PropTypes.object,
	legend: PropTypes.object,
	style: PropTypes.object,
	className: PropTypes.string,
	theme: PropTypes.oneOf(['light', 'dark']),
};

BasePieChart.defaultProps = {
	loading: false,
	fallback: false,
	title: '',
	tooltip: {},
	seriesData: {},
	semiDoughnut: true,
	cursor: 'default',
	itemStyle: {
		borderColor: 'white',
		borderWidth: 5,
		backgroundColor: 'rgba(0, 123, 255, 0.6)', // Default background color
	},
	legend: {
		display: true,
		position: 'right',
	},
	style: {
		width: '70%',
		height: '70%',
	},
	className: '',
	theme: 'dark',
};

export default BasePieChart;
