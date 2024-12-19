/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
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
		tittleSize,
		seriesData,
		semiDoughnut,
		cursor,
		legend,
		style,
		className,
		theme,
		fallback,
		seriesOption,
		customLegend,
		options: chartOptions,
		tooltip,
		width = '100%',
		height = '100%',
		customLabel,
		complianceStrip, // New prop for compliance circle
		complianceStripRadius = 35,
		compliance,
		complianceStripColors,
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
				cutout: semiDoughnut ? '30%' : complianceStrip ? '40%' : '0%',
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
	const totalPercentage = seriesData?.metaData?.totalPercentage?.x1 || 0;

	const options = {
		...chartOptions,
		responsive: chartOptions?.responsive ?? true,
		maintainAspectRatio: chartOptions?.maintainAspectRatio ?? false,
		plugins: {
			datalabels: {
				display: false,
			},
			legend: customLegend
				? {
						display: false,
				  }
				: {
						...legend,
						display: legend?.display ?? true,
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
					size: tittleSize ?? 16,
				},
			},
			tooltip: {
				...tooltip,
				borderWidth: tooltip?.borderWidth ?? 1,
				borderColor:
					tooltip?.borderColor ??
					((tooltipItem) => {
						return tooltipItem?.dataset?.borderColor[tooltipItem.dataIndex];
					}),
				callbacks: tooltip?.callbacks ?? {
					label: (context) => {
						const label = context.label || '';
						const value = context.raw;
						return `${label}: ${value}`;
					},
				},
				bodySpacing: tooltip?.bodySpacing ?? 5,
				displayColors: tooltip?.displayColors ?? true,
				usePointStyle: tooltip?.usePointStyle ?? true,
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

			// Center text styling and positioning
			ctx.font = `${customLabel?.fontStyle} ${customLabel?.fontSize} Poppins`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = customLabel?.textColor;

			// Calculate the center position of the chart
			const centerX = (left + right) / 2;
			const centerY = (top + bottom) / 2;

			// Render the center text
			ctx.fillText(`${totalControlsValue}`, centerX, centerY);

			const titleOffset = 20; // Adjust this value to control spacing below the totalControlsValue
			ctx.font = `${compliance?.fontStyle} ${compliance?.fontSize} Poppins`; // Title font style
			ctx.fillStyle = `${compliance?.textColor}`; // Title text color (gray)
			ctx.fillText(`${compliance?.title}`, centerX, centerY + titleOffset);

			// Render compliance strip if `complianceStrip` is true
			if (complianceStrip) {
				const radius = complianceStripRadius; // Radius for the outer ring
				const stripThickness = 8; // Thickness of the strip
				const compliancePercentage = totalPercentage; // Set compliance percentage

				// Fixed start and end angles
				const startAngle = (130 * Math.PI) / 180; // Convert degrees to radians
				const endAngle = (55 * Math.PI) / 180; // Convert degrees to radians

				// Total angle of the arc (adjusting for crossing 360 degrees)
				let totalAngle = endAngle - startAngle;
				if (totalAngle < 0) {
					totalAngle += 2 * Math.PI; // Ensure positive value for angles crossing 360
				}

				// Calculate the compliance angle based on the percentage
				const complianceAngle = (compliancePercentage / 100) * totalAngle;
				const complianceEndAngle = startAngle + complianceAngle;

				// Set line join for rounded edges
				ctx.lineJoin = 'round';

				// Draw the compliance strip (colored section)
				const gradient = ctx.createLinearGradient(
					centerX - radius,
					centerY - radius,
					centerX + radius,
					centerY + radius
				);

				gradient.addColorStop(0, complianceStripColors?.start ?? '#4CAF50'); // Start color
				gradient.addColorStop(1, complianceStripColors?.end ?? '#FFC107'); // End color

				ctx.beginPath();
				ctx.arc(centerX, centerY, radius + stripThickness, startAngle, complianceEndAngle);
				ctx.lineWidth = stripThickness;
				ctx.strokeStyle = gradient;
				ctx.stroke();

				// Draw the remaining section (grey color)
				ctx.beginPath();
				ctx.arc(
					centerX,
					centerY,
					radius + stripThickness,
					complianceEndAngle,
					startAngle + totalAngle
				);
				ctx.lineWidth = stripThickness;
				ctx.strokeStyle = '#B7CADB'; // Grey color
				ctx.stroke();
			}

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
				width,
				height,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				cursor,
				...style,
			}}>
			<Pie
				data={data}
				options={{
					...options,
				}}
				plugins={[
					customLabel?.display && centerTextPlugin,
					customLegend && customLegendPlugin,
				].filter(Boolean)}
			/>
			{customLegend && <ul ref={legendRef} />}
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
