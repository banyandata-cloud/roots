/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import {
	ArcElement,
	Chart as ChartJS,
	Legend,
	Title,
	Tooltip,
	type ActiveElement,
	type ChartEvent,
	type ChartOptions,
	type LegendItem,
	type Plugin,
} from 'chart.js';
import React, { useCallback, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { classes } from '../../../utils';
import { getColorGradient } from '../utils';
import styles from './BasePieChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface MetaData {
	keyData: Record<string, string>;
}

interface SeriesData {
	chartData: Record<string, string>;
	metaData?: MetaData;
}

interface SeriesOption {
	itemStyle: {
		color: string;
	};
}

interface CustomLabelStyles {
	fontSize: string;
	fontStyle: string;
	color: string;
	position?: number;
}

interface CustomLabel {
	id: string;
	title: string;
	value: number;
	margin?: number;
	valueStyles: CustomLabelStyles;
	labelStyles: CustomLabelStyles;
}

interface StripConfig {
	stripSize?: number;
	stripWidth?: number;
	startColor?: string;
	endColor?: string;
}

interface TooltipCallbacks {
	label?: (context: { label: string; raw: number }) => string;
	title?: (
		tooltipItems: {
			label?: string;
		}[]
	) => string;
}

interface CustomTooltipConfig {
	borderWidth?: number;
	bodySpacing?: number;
	displayColors?: boolean;
	colorBoxWidth?: number;
	colorBoxHeight?: number;
	usePointStyle?: boolean;
	displayTitle?: boolean;
	callbacks?: TooltipCallbacks;
	bodyFont?: {
		titleColor?: string;
		color?: string;
		[key: string]: unknown;
	};
}

interface LegendConfig {
	display?: boolean;
	icon?: boolean;
	circle?: boolean;
	legendStyles?: Record<string, string>;
	customLabels?: (params: {
		label: string;
		value: number;
		index: number;
		color: string;
	}) => React.ReactNode;
	[key: string]: unknown;
}

interface BasePieChartProps {
	loading: boolean;
	title?: string;
	tittleSize?: number;
	seriesData: SeriesData;
	cursor?: string;
	legend?: LegendConfig;
	style?: React.CSSProperties;
	className?: string;
	theme?: string;
	fallback?: boolean;
	seriesOption?: SeriesOption[];
	options?: Partial<ChartOptions<'pie'>>;
	tooltip?: CustomTooltipConfig;
	width?: string | number;
	height?: string | number;
	customLabel?: CustomLabel;
	strip?: StripConfig;
	doughnut?: [string, string];
	hoverBorderWidth?: number;
	dataSetOptions?: Record<string, unknown>;
	extra?: Record<string, unknown>;
}

const BasePieChart: React.FC<BasePieChartProps> = (props) => {
	const {
		title,
		tittleSize,
		seriesData,
		cursor,
		legend,
		style,
		className,
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

	const [excludedIndices, setExcludedIndices] = useState<number[]>([]);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const legendRef = useRef<HTMLUListElement>(null);

	// Handle legend item click (exclude or un-exclude)
	const handleLegendClick = useCallback(
		(event: React.MouseEvent | MouseEvent, legendItem: { index: number }) => {
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
		},
		[]
	);

	const labels = seriesData.metaData?.keyData
		? Object.keys(seriesData.chartData).map((key) => {
				return seriesData.metaData?.keyData[key] ?? key;
			})
		: [];

	const values = Object.keys(seriesData.chartData).map((key) => {
		return seriesData.chartData[key];
	});

	const legendColors = seriesOption
		? seriesOption.map((option) => {
				const {
					itemStyle: { color },
				} = option;
				if (typeof color !== 'string' || !color.startsWith('linear-gradient')) {
					return color;
				}
				const stops = color.match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
				return stops?.[0] ?? '#000';
			})
		: [];

	// Data for the Pie Chart
	const data = {
		labels: seriesData.metaData?.keyData
			? Object.keys(seriesData.chartData).map((key) => {
					return seriesData.metaData?.keyData[key] ?? key;
				})
			: [],
		datasets: [
			{
				data: Object.keys(seriesData.chartData).map((key) => {
					return seriesData.chartData[key];
				}),
				backgroundColor: (ctx: { canvas: HTMLCanvasElement }) => {
					return seriesOption
						? seriesOption.map((option, index) => {
								if (hoveredIndex !== null && hoveredIndex !== index) {
									return '#D3D3D3';
								}

								if (excludedIndices.includes(index)) {
									return '#D3D3D3';
								}

								const {
									itemStyle: { color },
								} = option;
								if (
									typeof color === 'string' &&
									color.startsWith('linear-gradient')
								) {
									return getColorGradient(ctx, color) as string;
								}

								return color || '#000'; // Fallback solid color
							})
						: Object.keys(seriesData.chartData).map((_, index) => {
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
					: Object.keys(seriesData.chartData).map((_, index) => {
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
				hoverOffset: (context: { dataIndex: number }) => {
					const index = context.dataIndex;
					// Set hoverOffset to 30 for the hovered pie slice, whether from the legend or chart hover
					return hoveredIndex === index ? 30 : 0;
				},
				radius: doughnut[0],
				cutout: doughnut[1],
				...dataSetOptions,
			},
		],
	};

	const hoveredIndexRef = useRef<number | null>(null);

	const handleHover = (index: number) => {
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
							color: (context: { index: number }) => {
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
						onClick: (event: ChartEvent, legendItem: LegendItem) => {
							handleLegendClick(
								event.native as MouseEvent,
								legendItem as { index: number }
							);
							handleHover((legendItem as { index: number }).index);
						},
						onHover: (event: ChartEvent, legendItem: LegendItem) => {
							handleHover((legendItem as { index: number }).index);
						},
						onLeave: () => {
							setHoveredIndex(null);
							hoveredIndexRef.current = null;
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
					family: 'Poppins',
					size: tittleSize ?? 16,
				},
			},
			tooltip: {
				borderWidth: tooltip?.borderWidth ?? 1,
				borderColor: (context: {
					tooltipItems: { dataIndex: number; dataset: { borderColor: string[] } }[];
				}) => {
					const index = context.tooltipItems[0]?.dataIndex;
					if (typeof index !== 'number') return 'black';

					const segmentColor = context.tooltipItems[0]?.dataset.borderColor[index];
					return typeof segmentColor === 'string' ? segmentColor : 'black';
				},
				backgroundColor: 'rgba(255, 255, 255, 1)',
				callbacks: tooltip?.callbacks ?? {
					label: (context: { label: string; raw: number }) => {
						const label = context.label || '';
						const value = context.raw;
						return `${label}: ${String(value)}`;
					},
					title: tooltip?.displayTitle
						? (tooltipItems: { label?: string }[]) => {
								return tooltipItems[0]?.label ?? '';
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
					family: tooltip?.bodyFont?.family ?? 'Poppins',
					size: tooltip?.bodyFont?.size,
					weight: tooltip?.bodyFont?.weight as
						| 'normal'
						| 'bold'
						| 'lighter'
						| 'bolder'
						| undefined,
				},
			},
		},
		interaction: {
			mode: 'nearest',
			axis: 'x',
			intersect: true,
		},
		onHover: (event: ChartEvent, chartElement: ActiveElement[]) => {
			if (chartElement[0]) {
				const hoveredIndexx = (chartElement[0] as { index: number }).index;
				handleHover(hoveredIndexx);
			} else {
				setHoveredIndex(null);
				hoveredIndexRef.current = null;
			}
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

	const centerTextPlugin: Plugin<'pie'> = {
		id: 'centerText',
		afterDatasetsDraw(chart) {
			if (!customLabel) return;

			const {
				ctx,
				chartArea: { left, right, top, bottom },
			} = chart;

			ctx.save();

			// Center text styling and positioning
			const valueStyle = `${customLabel.valueStyles.fontStyle || 'normal'} ${customLabel.valueStyles.fontSize || '16px'}`;
			ctx.font = `${valueStyle} Poppins`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = customLabel.valueStyles.color;

			// Calculate the center position of the chart
			const centerX = (left + right) / 2;
			const centerY = (top + bottom) / 2;

			// Render the center text
			ctx.fillText(customLabel.id || '', centerX, centerY);

			// Render the compliance title with bottom margin
			const titleBottomMargin = customLabel.margin ?? 10;
			const position = customLabel.labelStyles.position ?? 5;
			const titleYPosition = centerY + position;
			ctx.font = `${customLabel.labelStyles.fontStyle} ${customLabel.labelStyles.fontSize} Poppins`;
			ctx.fillStyle = customLabel.labelStyles.color || 'black';
			ctx.fillText(customLabel.title || '', centerX, titleYPosition + titleBottomMargin);

			// Render compliance strip if `strip` is true
			if (strip) {
				const stripRadius = strip.stripSize ?? 35;
				const stripThickness = strip.stripWidth ?? 7;
				const compliancePercentage = customLabel.value;

				// Fixed start and end angles
				const startAngle = (130 * Math.PI) / 180;
				const endAngle = (55 * Math.PI) / 180;

				// Total angle of the arc (adjusting for crossing 360 degrees)
				let totalAngle = endAngle - startAngle;
				if (totalAngle < 0) {
					totalAngle += 2 * Math.PI;
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

				gradient.addColorStop(0, strip.startColor ?? '#4CAF50');
				gradient.addColorStop(1, strip.endColor ?? '#FFC107');

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
				ctx.strokeStyle = '#B7CADB';
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
				cursor,
				...style,
			}}>
			<Pie
				data={data}
				options={{
					...options,
				}}
				plugins={[customLabel && centerTextPlugin].filter(
					(plugin): plugin is Plugin<'pie', Record<string, unknown>> => {
						return Boolean(plugin);
					}
				)}
				{...extra}
			/>
			{legend?.icon && legend.display && (
				<ul
					ref={legendRef}
					style={{
						...legend.legendStyles,
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
							// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
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
								{(legend.circle ?? true) && (
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
									{legend.customLabels ? (
										legend.customLabels({
											label,
											value: typeof value === 'number' ? value : 0,
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
