/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import type { ChartData, ChartEvent, ChartOptions, ScriptableContext } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import { useCallback, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { classes } from '../../../utils';
import styles from './BasePieChart.module.css';
import type { BasePieChartProps, LegendItem, TooltipCallbackContext } from './types';
// import { stripSampleData } from './BasePieChartData';
import { getColorGradient } from '../utils';

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

	const labels = seriesData?.metaData?.keyData
		? Object.keys(seriesData.chartData).map((key) => {
				return seriesData.metaData.keyData[key];
			})
		: [];

	const values = Object.keys(seriesData?.chartData ?? {}).map((key) => {
		return seriesData.chartData[key];
	});

	const legendColors = seriesOption
		? seriesOption.map((option) => {
				const color = option?.itemStyle?.color;
				if (typeof color !== 'string' || !color.startsWith('linear-gradient')) {
					return color;
				}
				const stops = color.match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
				return stops?.[0] || '#000';
			})
		: [];

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
				hoverOffset: (context: ScriptableContext<'pie'>) => {
					return hoveredIndex === context.dataIndex ? 30 : 0;
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
				...style,
			}}>
			<Pie
				data={data}
				options={{
					...options,
				}}
				plugins={[customLabel && centerTextPlugin].filter(Boolean)}
				{...extra}
			/>
			{legend?.icon && legend?.display && (
				<ul
					style={{
						...legend?.legendStyles,
					}}>
					{labels.map((label, index) => {
						const value = values[index];
						const color =
							hoveredIndex !== null && hoveredIndex !== index
								? '#D3D3D3'
								: excludedIndices.includes(index)
									? '#D3D3D3'
									: (legendColors[index] ?? '#000');

						return (
							<li
								key={index}
								style={{
									display: 'flex',
									alignItems: 'center',
									cursor: 'pointer',
								}}
								onClick={(e) => {
									handleLegendClick(e, {
										index,
									});
									handleHover(index);
								}}
								onMouseEnter={() => {
									handleHover(index);
								}}
								onMouseLeave={() => {
									setHoveredIndex(null);
									hoveredIndexRef.current = null;
								}}>
								{(legend?.circle ?? true) && (
									<svg width='15' height='15' viewBox='0 0 30 30' fill='none'>
										<circle
											cx='15'
											cy='15'
											r='12'
											stroke={color}
											strokeWidth='6'
										/>
									</svg>
								)}
								<div
									style={{
										marginLeft: 10,
									}}>
									{legend?.customLabels ? (
										legend?.customLabels({
											label,
											value,
											index,
											color,
										})
									) : (
										<div className={styles.legend}>
											<span
												style={{
													color: '#333',
												}}>
												{label}
											</span>
											<span
												style={{
													marginLeft: 10,
												}}>
												{value}
											</span>
										</div>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default BasePieChart;
