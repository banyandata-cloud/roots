/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import { useCallback, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { classes } from '../../../utils';
import styles from './BasePieChart.module.css';
// import { stripSampleData } from './BasePieChartData';
import { getColorGradient } from '../utils';
import { Skeleton } from './Skeleton';

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const BasePieChart = (props) => {
	const {
		loading,
		title,
		tittleSize,
		seriesData,
		cursor,
		legend,
		style,
		className,
		theme,
		fallback,
		seriesOption,
		options: chartOptions,
		tooltip,
		width = '100%',
		height = '100%',
		customLabel,
		strip,
		doughnut = ['90%', '0%'],
		hoverBorderWidth,
		dataSetOptions,
		extra,
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
				backgroundColor: (ctx) => {
					return seriesOption
						? seriesOption.map((option, index) => {
								if (hoveredIndex !== null && hoveredIndex !== index) {
									return '#D3D3D3';
								}

								if (excludedIndices.includes(index)) {
									return '#D3D3D3';
								}

								const color = option?.itemStyle?.color;
								if (
									typeof color === 'string' &&
									color.startsWith('linear-gradient')
								) {
									return getColorGradient(ctx, color);
								}

								return color || '#000'; // Fallback solid color
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
									return '#D3D3D3';
								}

								return excludedIndices.includes(index)
									? '#D3D3D3'
									: defaultColors[index % defaultColors.length];
							});
				},

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
				hoverBorderWidth,
				hoverOffset: (context) => {
					const index = context.dataIndex;
					// Set hoverOffset to 30 for the hovered pie slice, whether from the legend or chart hover
					return hoveredIndex === index ? 30 : 0;
				},
				radius: doughnut?.[0] ?? '100%',
				cutout: doughnut?.[1] ?? '0%',
				...dataSetOptions,
			},
		],
	};

	const hoveredIndexRef = useRef(null);

	const handleHover = (index) => {
		hoveredIndexRef.current = index;
		setHoveredIndex(index);
	};

	const options = {
		responsive: chartOptions?.responsive ?? true,
		maintainAspectRatio: false,
		plugins: {
			datalabels: {
				display: false,
			},
			legend: legend?.icon
				? {
						display: false,
					}
				: {
						display: legend?.display ?? true,
						position: 'right',
						align: 'center',
						labels: {
							boxWidth: 10,
							padding: 10,
							// borderWidth: 0,
							// borderColor: 'white',
							color: (context) => {
								const { index } = context;
								return hoveredIndex !== null && hoveredIndex !== index
									? '#D3D3D3'
									: excludedIndices.includes(index)
										? '#D3D3D3'
										: 'black';
							},
							font: {
								family: 'Poppins',
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
							hoveredIndexRef.current = null;
						},
						...legend,
					},
			title: {
				display: !!title,
				text: title,
				padding: {
					top: 10,
					bottom: 10,
				},
				font: {
					family: 'Poppins',
					size: tittleSize ?? 16,
				},
			},
			tooltip: {
				borderWidth: tooltip?.borderWidth ?? 1,
				borderColor: (context) => {
					const index = context?.tooltipItems[0]?.dataIndex;
					const segmentColor = context?.tooltipItems[0]?.dataset?.borderColor[index];

					return segmentColor || 'black';
				},
				backgroundColor: 'rgba(255, 255, 255, 1)',
				callbacks: tooltip?.callbacks ?? {
					label: (context) => {
						const label = context.label || '';
						const value = context.raw;
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
				hoveredIndexRef.current = null;
			}
		},
		onLeave: () => {
			setHoveredIndex(null);
			hoveredIndexRef.current = null;
		},
		animations: {
			animateRotate: false,
			animateScale: false,
		},
		elements: {
			arc: {
				borderWidth: 0,
				hoverOffset: 30,
			},
		},
		layout: {
			padding: {
				top: 10,
				bottom: 10,
				left: 10,
				right: 10,
			},
		},
		...chartOptions,
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
			ctx.font = `${customLabel?.valueStyles?.fontStyle} ${customLabel?.valueStyles?.fontSize} Poppins`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = customLabel?.valueStyles?.color;

			// Calculate the center position of the chart
			const centerX = (left + right) / 2;
			const centerY = (top + bottom) / 2;

			// Render the center text
			ctx.fillText(`${customLabel?.id}`, centerX, centerY);

			// Render the compliance title with bottom margin
			const titleBottomMargin = customLabel.margin ?? 10; // Adjust this value for bottom margin
			const position = customLabel?.labelStyles?.position ?? 5;
			const titleYPosition = centerY + position; // Default title Y position
			ctx.font = `${customLabel?.labelStyles?.fontStyle} ${customLabel?.labelStyles?.fontSize} Poppins`; // Title font style
			ctx.fillStyle = `${customLabel?.labelStyles?.color}`; // Title text color (gray)
			ctx.fillText(`${customLabel?.title}`, centerX, titleYPosition + titleBottomMargin);

			// Render compliance strip if `complianceStrip` is true
			if (strip) {
				const stripRadius = strip?.stripSize ?? 35; // Radius for the outer ring
				const stripThickness = strip?.stripWidth ?? 7; // Thickness of the strip
				const compliancePercentage = customLabel?.value; // Set compliance percentage

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
					centerX - stripRadius,
					centerY - stripRadius,
					centerX + stripRadius,
					centerY + stripRadius
				);

				gradient.addColorStop(0, strip?.startColor ?? '#4CAF50'); // Start color
				gradient.addColorStop(1, strip?.endColor ?? '#FFC107'); // End color

				ctx.beginPath();
				ctx.arc(
					centerX,
					centerY,
					stripRadius + stripThickness,
					startAngle,
					complianceEndAngle
				);
				ctx.lineWidth = stripThickness;
				ctx.strokeStyle = gradient;
				ctx.stroke();

				// Draw the remaining section (grey color)
				ctx.beginPath();
				ctx.arc(
					centerX,
					centerY,
					stripRadius + stripThickness,
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

	const legendColors = seriesOption
		? seriesOption.map((option) => {
				const color = option?.itemStyle?.color;
				if (typeof color !== 'string' || !color.startsWith('linear-gradient')) {
					return color; // return as-is if not a gradient
				}

				const colorStops = color.match(/#(?:[0-9a-fA-F]{3}){1,2}/g);

				// Return the first color stop as fallback
				return colorStops?.[0] || '#000'; // Fallback to black
			})
		: [];

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
					setHoveredIndex(null); // Reset hover index on leave
					hoveredIndexRef.current = null;
					chart.update('none'); // Update the chart without animation
				};

				// Apply grey color dynamically based on the hovered state
				const isGreyedOut =
					hoveredIndexRef.current !== null && hoveredIndexRef.current !== index;
				const displayColor = isGreyedOut ? '#D3D3D3' : legendColors[index];

				const value = chart.data.datasets[0].data[index];

				li.innerHTML = `
					<svg width="15" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="15" cy="15" r="12" stroke="${displayColor}" stroke-width="6"/>
					</svg>
					
					<span style="margin-left: 10px;">
						<span>${label}</span>
						<span style="margin-left: 14px;">${value}</span>
					</span>
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
				hoveredIndexRef.current = null;
			}}
			style={{
				width,
				height: height === '100%' ? '90%' : height,
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
					customLabel && centerTextPlugin,
					legend?.icon && legend?.display && customLegendPlugin,
				].filter(Boolean)}
				{...extra}
			/>
			{legend?.icon && legend?.display && (
				<ul
					style={{
						...legend?.legendStyles,
					}}
					ref={legendRef}
				/>
			)}
		</div>
	);
};

export default BasePieChart;
