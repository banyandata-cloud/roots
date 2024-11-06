/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';
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
		seriesData,
		semiDoughnut,
		cursor,
		// legend,
		style,
		className,
		theme,
		fallback,
		seriesOption,
		customLegend,
	} = props;

	const [excludedIndices, setExcludedIndices] = useState([]);
	const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered legend index
	const legendRef = useRef(null); // Reference to hold the custom legend

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

	// Handle legend item click (exclude or un-exclude)
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

	// Data for the Pie Chart
	const data = {
		labels: seriesData?.metaData?.keyData
			? Object.keys(seriesData.chartData).map((key) => {
					return seriesData.metaData.keyData[key];
			  })
			: [],
		datasets: [
			{
				data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
					return seriesData?.chartData?.[key];
				}),
				backgroundColor: seriesOption
					? seriesOption.map((option, index) => {
							if (hoveredIndex !== null && hoveredIndex !== index) {
								return '#D3D3D3'; // Grey out others when hovering a legend item
							}
							return excludedIndices.includes(index)
								? '#D3D3D3' // Grey for excluded items
								: option.itemStyle.color; // Normal color for other slices
					  })
					: Object.keys(seriesData?.chartData ?? {}).map((_, index) => {
							const defaultColors = [
								'#FF6384',
								'#36A2EB',
								'#FFCE56',
								'#4BC0C0',
								'#9966FF',
								'#FF9F40',
							];
							if (hoveredIndex !== null && hoveredIndex !== index) {
								return '#D3D3D3'; // Grey out others when hovering a legend item
							}
							return excludedIndices.includes(index)
								? '#D3D3D3' // Grey for excluded items
								: defaultColors[index % defaultColors.length]; // Normal color for other slices
					  }),
				borderColor: seriesOption
					? seriesOption.map((option, index) => {
							return excludedIndices.includes(index)
								? '#D3D3D3' // Grey for excluded items
								: option.itemStyle.color; // Normal color for other borders
					  })
					: Object.keys(seriesData?.chartData ?? {}).map((_, index) => {
							const defaultColors = [
								'#FF6384',
								'#36A2EB',
								'#FFCE56',
								'#4BC0C0',
								'#9966FF',
								'#FF9F40',
							];
							return excludedIndices.includes(index)
								? '#D3D3D3' // Grey for excluded items
								: defaultColors[index % defaultColors.length]; // Normal color for other borders
					  }),
				hoverBorderWidth: 7,
				cutout: semiDoughnut ? '30%' : '0%',
				hoverOffset: (context) => {
					const index = context.dataIndex;
					// Set hoverOffset to 30 for the hovered pie slice, whether from the legend or chart hover
					return hoveredIndex === index ? 30 : 0;
				},
			},
		],
	};

	const handleHover = (index) => {
		setHoveredIndex(index);
	};

	const totalControlsValue = seriesData?.metaData?.totalControls?.x1 || 0;

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			datalabels: {
				display: false,
			},
			legend: customLegend
				? {
					display: false,
				} // Hide default legend if customLegend is true
				: {
						display: true,
						position: 'right',
						align: 'center',
						labels: {
							boxWidth: 10,
							padding: 10,
							borderWidth: 3,
							borderColor: 'white',
							color: (context) => {
								const { index } = context;
								return hoveredIndex !== null && hoveredIndex !== index
									? '#D3D3D3'
									: excludedIndices.includes(index)
									? '#D3D3D3'
									: 'black';
							},
						},
						onClick: (event, legendItem) => {
							handleLegendClick(event, legendItem);
							handleHover(legendItem.index); // Set hover on legend click
						},
						onHover: (event, legendItem) => {
							handleHover(legendItem.index);
						},
						onLeave: () => {
							setHoveredIndex(null);
						},
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
				borderWidth: 1,
				borderColor: (tooltipItem) => {
					return tooltipItem?.dataset?.borderColor[tooltipItem.dataIndex];
				},
				callbacks: {
					label: (context) => {
						const label = context.label || '';
						const value = context.raw;
						return `${label}: ${value}`;
					},
				},
				bodySpacing: 5,
				displayColors: true,
				usePointStyle: true,
			},
		},
		interaction: {
			mode: 'nearest',
			axis: 'x',
			intersect: true,
		},
		onHover: (event, chartElement) => {
			if (chartElement[0]) {
				const hoveredIndexx = chartElement[0].index;
				handleHover(hoveredIndexx);
			} else {
				setHoveredIndex(null);
			}
		},
		onLeave: () => {
			setHoveredIndex(null);
		},
		animations: {
			animateRotate: {
				duration: 500,
				easing: 'easeOutBounce',
			},
		},
		layout: {
			padding: {
				bottom: 20,
			},
		},
		elements: {
			arc: {
				borderWidth: 0,
				hoverOffset: 30,
			},
		},
	};

	const centerTextPlugin = {
		id: 'centerText',
		afterDatasetsDraw(chart) {
			const {
				ctx,
				chartArea: { left, right, top, bottom },
			} = chart;
			ctx.save();
			ctx.font = 'bold 23px Poppins'; // Font style and size
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'black'; // Text color

			// Calculate the center position of the doughnut
			const centerX = (left + right) / 2;
			const centerY = (top + bottom) / 2;

			// Render the totalControls value at the calculated center
			ctx.fillText(`${totalControlsValue}`, centerX, centerY);
			ctx.restore();
		},
	};

	const customLegendPlugin = {
		id: 'customLegend',
		afterUpdate(chart) {
			const ul = legendRef.current;
			while (ul?.firstChild) {
				ul.firstChild.remove();
			}

			chart.data.labels.forEach((label, index) => {
				const li = document.createElement('li');
				li.style.display = 'flex';
				li.style.alignItems = 'center';
				li.style.cursor = 'pointer';

				// Get the color for the current pie slice
				const sliceColor = chart.data.datasets[0].backgroundColor[index];

				// Handle click for excluding/un-excluding slices
				li.onclick = (event) => {
					const legendItem = {
						index,
					}; // Simulate legend item
					handleLegendClick(event, legendItem); // Handle click
					handleHover(index); // Set hover on legend click
					chart.update('none'); // Update the chart without animation
				};

				// Handle hover on the legend item
				li.onmouseenter = () => {
					handleHover(index); // Set hover on legend hover
					chart.update('none'); // Update the chart without animation
				};

				// Handle leave event to remove hover effect
				li.onmouseleave = () => {
					setHoveredIndex(null);
					chart.update('none');
				};

				// Apply grey color dynamically based on the hovered state
				const isGreyedOut = hoveredIndex !== null && hoveredIndex !== index;
				const displayColor = isGreyedOut ? '#D3D3D3' : sliceColor;

				li.innerHTML = `
				<svg width="15" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="15" cy="15" r="12" stroke="${displayColor}" stroke-width="6"/>
				</svg>
				<span style="margin-left: 10px;">${label}</span>
			`;

				ul.appendChild(li);
			});
		},
	};

	return (
		<div
			className={classes(styles.root, className)}
			onMouseLeave={() => {
				setHoveredIndex(null);
			}}
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				cursor,
				...style,
				width: '70%',
				height: '70%',
			}}>
			<Pie
				data={data}
				options={options}
				plugins={[centerTextPlugin, customLegend && customLegendPlugin].filter(Boolean)}
			/>
			{customLegend && (
				<ul
					ref={legendRef}
					style={{
						listStyle: 'none',
						padding: 0,
						width: '30%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}
				/>
			)}
		</div>
	);
};

BasePieChart.propTypes = {
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	title: PropTypes.string,
	seriesData: PropTypes.shape({
		chartData: PropTypes.object,
		metaData: PropTypes.object,
	}),
	semiDoughnut: PropTypes.bool,
	cursor: PropTypes.string,
	style: PropTypes.object,
	className: PropTypes.string,
	theme: PropTypes.string,
	seriesOption: PropTypes.array,
	customLegend: PropTypes.bool, // Add PropType for customLegend
};

export default BasePieChart;
