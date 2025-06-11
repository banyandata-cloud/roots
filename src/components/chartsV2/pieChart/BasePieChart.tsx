/* eslint-disable no-nested-ternary */
import type { ChartData, ChartEvent, ChartOptions, ScriptableContext } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import React, { useCallback, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { classes } from '../../../utils';
import styles from './BasePieChart.module.css';
import type { BasePieChartProps, LegendItem, TooltipCallbackContext } from './types';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const BasePieChart: React.FC<BasePieChartProps> = (props) => {
	const {
		title,
		tittleSize,
		seriesData,
		legend,
		style,
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
		className,
	} = props;
	const [excludedIndices, setExcludedIndices] = useState<number[]>([]);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const legendRef = useRef<HTMLDivElement>(null);

	const handleLegendClick = useCallback((_event: unknown, legendItem: LegendItem) => {
		const { index } = legendItem;
		setExcludedIndices((prev) => {
			return prev.includes(index)
				? prev.filter((i) => {
						return i !== index;
					})
				: [...prev, index];
		});
	}, []);

	let labels: string[] = [];

	if (seriesData.metaData?.keyData) {
		const { keyData } = seriesData.metaData;
		labels = Object.keys(seriesData.chartData).map((key) => {
			return keyData[key] ?? key;
		});
	} else {
		labels = [];
	}

	const data: ChartData<'pie'> = {
		labels,
		datasets: [
			{
				data: Object.values(seriesData.chartData),
				backgroundColor: seriesOption
					? seriesOption.map((opt, i) => {
							return hoveredIndex !== null && hoveredIndex !== i
								? '#D3D3D3'
								: excludedIndices.includes(i)
									? '#D3D3D3'
									: opt.itemStyle.color;
						})
					: Object.keys(seriesData.chartData).map((_, i) => {
							const defaultColors = [
								'#FF6384',
								'#36A2EB',
								'#FFCE56',
								'#4BC0C0',
								'#9966FF',
								'#FF9F40',
							];
							return hoveredIndex !== null && hoveredIndex !== i
								? '#D3D3D3'
								: excludedIndices.includes(i)
									? '#D3D3D3'
									: defaultColors[i % defaultColors.length];
						}),
				borderColor: seriesOption
					? seriesOption.map((opt, i) => {
							return excludedIndices.includes(i) ? '#D3D3D3' : opt.itemStyle.color;
						})
					: Object.keys(seriesData.chartData).map((_, i) => {
							const defaultColors = [
								'#FF6384',
								'#36A2EB',
								'#FFCE56',
								'#4BC0C0',
								'#9966FF',
								'#FF9F40',
							];
							return excludedIndices.includes(i)
								? '#D3D3D3'
								: defaultColors[i % defaultColors.length];
						}),
				hoverBorderWidth,
				hoverOffset: (context: ScriptableContext<'pie'>) => {
					return hoveredIndex === context.dataIndex ? 30 : 0;
				},
				radius: doughnut?.[0] ?? '100%',
				cutout: doughnut?.[1] ?? '0%',
				...dataSetOptions,
			},
		],
	};

	const handleHover = (index: number) => {
		setHoveredIndex(index);
	};

	const options: ChartOptions<'pie'> = {
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
							color: (ctx) => {
								const idx = ctx.index;
								return hoveredIndex !== null && hoveredIndex !== idx
									? '#D3D3D3'
									: excludedIndices.includes(idx)
										? '#D3D3D3'
										: 'black';
							},
							font: {
								family: 'Poppins',
							},
						},
						onClick: (event, legendItem: LegendItem) => {
							handleLegendClick(event, legendItem);
							if (legendItem.index !== undefined) {
								handleHover(legendItem.index);
							}
						},
						onHover: (_, legendItem) => {
							if (legendItem.index !== undefined) {
								handleHover(legendItem.index);
							}
						},
						onLeave: () => {
							setHoveredIndex(null);
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
				borderColor: (ctx) => {
					const index = ctx.tooltipItems?.[0]?.dataIndex;
					const color =
						ctx.tooltipItems?.[0]?.dataset?.borderColor?.[index] ?? 'transparent';
					return color || 'black';
				},
				backgroundColor: 'rgba(255, 255, 255, 1)',
				callbacks: tooltip?.callbacks ?? {
					label: (ctx: TooltipCallbackContext) => {
						return `${ctx.label}: ${ctx.raw}`;
					},
					title: tooltip?.displayTitle
						? (items: any[]) => {
								return items[0]?.label ?? '';
							}
						: () => {
								return '';
							},
				},
				bodySpacing: tooltip?.bodySpacing ?? 5,
				displayColors: tooltip?.displayColors ?? true,
				boxWidth: tooltip?.colorBoxWidth ?? 5,
				boxHeight: tooltip?.colorBoxHeight ?? 5,
				usePointStyle: tooltip?.usePointStyle ?? true,
				titleColor: tooltip?.bodyFont?.titleColor ?? '#000',
				bodyColor: tooltip?.bodyFont?.color ?? '#000',
				bodyFont: {
					...tooltip?.bodyFont,
				},
				...tooltip,
			},
		},
		interaction: {
			mode: 'nearest',
			axis: 'x',
			intersect: true,
		},
		onHover: (_: ChartEvent, chartElement) => {
			const index = chartElement[0]?.index;
			if (index !== undefined) {
				handleHover(index);
			} else {
				setHoveredIndex(null);
			}
		},
		onLeave: () => {
			setHoveredIndex(null);
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
			const titleBottomMargin = customLabel?.margin ?? 10; // Adjust this value for bottom margin
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
				const complianceAngle = (compliancePercentage ?? 0 / 100) * totalAngle;
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

				ul?.appendChild(li);
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
				height: height === '100%' ? '90%' : height,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
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
				{...(extra as object)}
			/>
			{legend?.icon && legend?.display && (
				<ul
					style={{
						...(legend?.legendStyles as React.CSSProperties),
					}}
					ref={legendRef}
				/>
			)}
		</div>
	);
};

export default BasePieChart;
