/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
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
import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { COLORS } from '../../../styles';
// import { classes } from '../../../utils';
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
		// className,
		theme,
		fallback,
		isLineChart,
		xAxisPosition,
		// gridOptions,
		// seriesOption,
		xSplitLineShow,
		xAxisLineShow,
		// xAxisTickShow,
		axisSplitColor,
		cursor,
		yAxis,
		xAxis,
		width,
		height,
		chartOptionsProps,
		lineColors = [
			'rgba(255, 99, 132, 0.5)',
			'rgba(54, 162, 235, 0.5)',
			'rgba(75, 192, 192, 0.5)',
			'rgba(153, 102, 255, 0.5)',
			'rgba(255, 159, 64, 0.5)',
		],
		borderColors = [
			'rgba(255, 99, 132, 1)',
			'rgba(54, 162, 235, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
			'rgba(255, 159, 64, 1)',
		],
		style,
	} = props;

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

	const legendRef = useRef(null);

	const [hiddenDatasets, setHiddenDatasets] = useState([]);

	const toggleDatasetVisibility = (index, chart) => {
		setHiddenDatasets((prevHidden) => {
			const newHidden = prevHidden.includes(index)
				? prevHidden.filter((i) => {
						return i !== index;
				  })
				: [...prevHidden, index];

			// Update the chart visibility
			chart.data.datasets[index].hidden = newHidden.includes(index);
			chart.update();

			return newHidden;
		});
	};

	const customLegendPlugin = {
		id: 'customLegend',
		afterUpdate(chart) {
			// Clear existing legend items
			const ul = legendRef.current;
			while (ul?.firstChild) {
				ul.firstChild.remove();
			}

			// Loop through the datasets and create legend items
			chart.data.datasets.forEach((dataset, index) => {
				const li = document.createElement('li');
				li.style.display = 'flex';
				li.style.alignItems = 'center';
				li.style.cursor = 'pointer';
				li.style.opacity = hiddenDatasets.includes(index) ? '0.5' : '1';
				li.style.margin = '5px 10px';
				li.style.maxWidth = '120px';
				li.style.whiteSpace = 'nowrap';
				li.style.overflow = 'hidden';
				li.style.textOverflow = 'ellipsis';

				const textColor = hiddenDatasets.includes(index) ? 'grey' : 'inherit';
				const circleColor = hiddenDatasets.includes(index)
					? 'grey'
					: dataset.backgroundColor;

				li.onclick = () => {
					// Toggle visibility of the dataset
					toggleDatasetVisibility(index, chart);

					// Apply grey-out effect on click
					if (li.style.color === 'grey') {
						li.style.color = 'inherit';
					} else {
						li.style.color = 'grey';
					}

					const circle = li.querySelector('circle');
					if (circle) {
						if (circle.getAttribute('stroke') === 'grey') {
							circle.setAttribute('stroke', dataset.backgroundColor);
						} else {
							circle.setAttribute('stroke', 'grey');
						}
					}
				};

				li.innerHTML = `
					<svg width="15" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="15" cy="15" r="12" stroke="${circleColor}" stroke-width="6"/>
					</svg>
				<span style="margin-left: 10px; color: ${textColor};">${dataset.label}</span>
				`;

				ul?.appendChild(li);
			});
		},
	};

	const chartData = {
		labels: seriesData?.metaData?.xAxisData ?? [],
		datasets: Object.keys(seriesData?.chartData ?? {}).map((key, index) => {
			return {
				label: key,
				data: seriesData?.chartData[key] ?? [],
				fill: !isLineChart,
				backgroundColor: isLineChart
					? 'transparent'
					: lineColors[index % lineColors.length],
				borderColor: borderColors[index % borderColors.length],
				tension: smooth ? 0.4 : 0,
				borderWidth: chartOptionsProps?.borderWidth ?? 2,
				pointRadius: chartOptionsProps?.pointRadius ?? 4,
				pointHoverRadius: chartOptionsProps?.pointHoverRadius ?? 6,
				pointBackgroundColor: borderColors[index % borderColors.length],
				pointStyle: chartOptionsProps?.pointStyle ?? 'rectRot',
				datalabels: {
					display: false, // Disable data labels on points
				},
			};
		}),
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: legend?.icon
				? {
						display: false,
				  }
				: {
						display: legend?.display ?? true,
						position: legend?.position ?? 'bottom',
						labels: {
							color: axisLabelColor || COLORS.grey,
							boxWidth: 9, // Adjust width for a circular appearance
							boxHeight: 9, // Adjust height for a circular appearance
							borderRadius: 50, // Ensure the shape is circular
							padding: 10, // Padding around legend items
							usePointStyle: true, // Use circular point style for legends
							font: {
								family: 'Poppins',
							},
						},
						...legend,
				  },
			tooltip: {
				borderWidth: tooltip?.borderWidth ?? 1,
				borderColor: (context) => {
					const segmentColor = context?.tooltipItems[0]?.dataset?.backgroundColor;

					return segmentColor || 'black';
				},
				backgroundColor: 'rgba(255, 255, 255, 1)',
				callbacks: tooltip?.callbacks ?? {
					label: (context) => {
						const label = context?.dataset?.label || '';
						const value = context?.formattedValue;
						return `${label}: ${value}`;
					},
					title: tooltip.displayTitle
						? (tooltipItems) => {
								return tooltipItems[0]?.label || '';
						  }
						: () => {
								return '';
						  },
				},
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
				...tooltip,
			},
			title: {
				display: !!title,
				text: title,
				color: axisLabelColor || COLORS.grey,
				font: {
					size: 16,
					weight: 'bold',
					family: 'Poppins',
				},
			},
		},
		scales: {
			x: {
				display: xAxisLabelShow,
				position: xAxisPosition,
				stacked, // Stack bars if applicable
				title: {
					display: !!xAxisLabel,
					text: xAxisLabel,
					color: axisLabelColor || COLORS.grey,
					font: {
						size: 14,
						family: 'Poppins',
					},
				},
				grid: {
					display: xSplitLineShow,
					color: axisSplitColor,
					lineWidth: 1,
					drawOnChartArea: true,
					drawBorder: false, // Disable drawing grid lines on the border to allow full-length lines
					tickLength: 30, // Adjust this value to control the length of the grid lines
				},
				ticks: {
					color: axisLabelColor || COLORS.grey,
					font: {
						family: 'Poppins',
					},
					stepSize: 100,
				},
				borderColor: xAxisLineShow ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0)',
				borderWidth: xAxisLineShow ? 1 : 0,
				...xAxis,
			},
			y: {
				display: yAxisLabelShow, // Whether to display y-axis labels
				stacked, // Stack bars if applicable
				title: {
					display: !!yAxisLabel, // Display y-axis title if set
					text: yAxisLabel,
					color: axisLabelColor || COLORS.grey,
					font: {
						size: 14,
						family: 'Poppins',
					},
				},
				grid: {
					display: true,
					color: axisSplitColor,
				},
				ticks: {
					color: axisLabelColor || COLORS.grey,
					stepSize: 100,
					font: {
						family: 'Poppins',
					},
					callback:
						yAxis?.callback ??
						((value) => {
							return value;
						}),
				},
				...yAxis,
			},
		},

		elements: {
			display: false,
			line: {
				tension: smooth ? 0.4 : 0,
			},
			point: {
				display: false,
				radius: 0,
			},
		},
		cursor: cursor ?? 'default',
		...chartOptionsProps,
	};

	const legendStyle = {
		display: 'flex',
		listStyle: 'none',
		padding: '0px',
		...legend?.legendStyles,
	};

	return (
		<div
			style={{
				width: width ?? '100%',
				height: height ?? '300px',
				display: 'flex',
				alignItems: 'center',
				...style,
			}}>
			<Line data={chartData} options={chartOptions} plugins={[customLegendPlugin]} />

			{legend?.icon && legend?.display && <ul ref={legendRef} style={legendStyle} />}
		</div>
	);
};

export default BaseAreaChart;
