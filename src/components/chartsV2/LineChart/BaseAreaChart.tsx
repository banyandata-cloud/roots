import {
	CategoryScale,
	type ChartData,
	Chart as ChartJS,
	type ChartOptions,
	type Color,
	Filler,
	Legend,
	type LegendItem,
	LinearScale,
	LineElement,
	PointElement,
	type PointStyle,
	Scale,
	type Scriptable,
	type ScriptableContext,
	type ScriptableTooltipContext,
	Title,
	Tooltip,
	type TooltipCallbacks,
	type TooltipItem,
} from 'chart.js';
import React, { useCallback, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { COLORS } from '../../../styles';
import { getColorGradient } from '../utils';
import styles from './BaseAreaChart.module.css';

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

interface ChartDataType {
	metaData: {
		xAxisData: string[];
	};
	chartData: Record<string, number[]>;
}

interface TooltipConfig {
	bodySpacing?: number;
	displayColors?: boolean;
	colorBoxWidth?: number;
	colorBoxHeight?: number;
	usePointStyle?: boolean;
	displayTitle?: boolean;
	bodyFont?: Record<string, string>;
	titleColor?: string;
	bodyColor?: string;
	borderWidth?: number;
	callbacks?: Partial<TooltipCallbacks<'line'>>;
}

type PointStyleOption = Scriptable<PointStyle, ScriptableContext<'line'>>;

interface ChartOptionsProps {
	pointStyle?: PointStyleOption;
	pointRadius?: number;
	pointHoverRadius?: number;
	borderWidth?: number;
	// Add more props as needed
}

interface ChartProps {
	title?: string;
	seriesData: ChartDataType;
	tooltip?: TooltipConfig;
	legend?: {
		display?: boolean;
		position?: 'top' | 'left' | 'bottom' | 'right';
		icon?: boolean;
		legendStyles?: React.CSSProperties;
		circle?: boolean;
		customLabels?: (args: {
			label: string;
			index: number;
			color: string;
		}) => React.ReactElement;
	};
	xAxisLabelShow?: boolean;
	yAxisLabelShow?: boolean;
	xAxisLabel?: string;
	yAxisLabel?: string;
	axisLabelColor?: string;
	stacked?: boolean;
	smooth?: boolean;
	theme?: string;
	isLineChart?: boolean;
	xAxisPosition?: 'top' | 'bottom';
	xSplitLineShow?: boolean;
	xAxisLineShow?: boolean;
	axisSplitColor?: string;
	cursor?: string;
	xAxis?: Record<string, string>;
	yAxis?: Record<string, string>;
	width?: string | number;
	height?: string | number;
	chartOptions?: Partial<ChartOptions<'line'>>;
	chartOptionsProps?: Partial<ChartOptions<'line'>>;
	extra?: Record<string, string>;
	dataSetOptions?: Partial<ChartData<'line'>>;
	lineColors?: string[];
	borderColors?: string[];
	style?: React.CSSProperties;
	hoverEffect?: boolean;
}

const BaseAreaChart: React.FC<ChartProps> = (props): React.ReactElement => {
	const {
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
		isLineChart,
		xAxisPosition,
		xSplitLineShow,
		xAxisLineShow,
		axisSplitColor,
		cursor,
		yAxis,
		xAxis,
		width,
		height,
		chartOptionsProps: chartOptionsOverrideProps,
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
		extra,
		dataSetOptions,
		hoverEffect = false,
	} = props;

	const [excludedIndices, setExcludedIndices] = useState<number[]>([]);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const handleLegendClick = useCallback((_event: unknown, legendItem: LegendItem) => {
		const { index } = legendItem;
		setExcludedIndices((prevIndices) => {
			const newIndices = [...prevIndices];
			if (index !== undefined) {
				if (newIndices.includes(index)) {
					newIndices.splice(newIndices.indexOf(index), 1); // Un-exclude
				} else {
					newIndices.push(index); // Exclude
				}
			}
			return newIndices;
		});
	}, []);

	const chartOptionsProps: ChartOptionsProps = {
		pointStyle: 'rectRot',
		pointRadius: 4,
		pointHoverRadius: 6,
		borderWidth: 2,
		...chartOptionsOverrideProps,
	};

	const labels = Object.keys(seriesData.chartData).map((key) => {
		return key;
	});

	const chartData: ChartData<'line'> = {
		labels: seriesData.metaData.xAxisData,
		datasets: Object.keys(seriesData.chartData).map((key, index) => {
			const isHovered = !hoverEffect || hoveredIndex === null || hoveredIndex === index;

			const backgroundColor = (ctx: ScriptableContext<'line'>): string | CanvasGradient => {
				if (isLineChart) return 'transparent';

				if (hoveredIndex !== null && hoveredIndex !== index) {
					return 'rgba(211, 211, 211, 0.2)';
				}

				if (excludedIndices.includes(index)) {
					return 'transparent';
				}

				const color = lineColors[index];

				if (typeof color === 'string' && color.startsWith('linear-gradient')) {
					return getColorGradient(ctx, color);
				}

				return color ?? '#000';
			};

			return {
				label: key,
				data: seriesData.chartData[key] ?? [],
				fill: !isLineChart,
				backgroundColor,
				borderColor: (() => {
					if (excludedIndices.includes(index)) return 'transparent';
					if (isHovered) return borderColors[index % borderColors.length];
					return 'rgba(211, 211, 211, 0.3)';
				})(),

				pointBackgroundColor: (() => {
					if (excludedIndices.includes(index)) return 'transparent';
					if (isHovered) return borderColors[index % borderColors.length];
					return 'rgba(211, 211, 211, 0.3)';
				})(),

				tension: smooth ? 0.4 : 0,
				pointStyle: chartOptionsProps.pointStyle ?? 'rectRot',
				pointRadius: chartOptionsProps.pointRadius ?? 4,
				pointHoverRadius: chartOptionsProps.pointHoverRadius ?? 6,
				borderWidth: chartOptionsProps.borderWidth ?? 2,
				datalabels: {
					display: false,
				},
			};
		}),
		...dataSetOptions,
	};

	const hoveredIndexRef = useRef<number | null>(null);

	const handleHover = (index: number) => {
		if (!hoverEffect) return;
		hoveredIndexRef.current = index;
		setHoveredIndex(index);
	};

	const legendColors = lineColors.map((option) => {
		const color = option;
		if (typeof color !== 'string' || !color.startsWith('linear-gradient')) {
			return color;
		}
		const stops = color.match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
		return stops?.[0] ?? '#000';
	});

	const chartOptions: ChartOptions<'line'> = {
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
							color: axisLabelColor ?? COLORS.grey,
							boxWidth: 9,
							boxHeight: 9,
							borderRadius: 50,
							padding: 10,
							usePointStyle: true,
							font: {
								family: 'Poppins',
							},
						},
						onClick: (event, legendItem) => {
							handleLegendClick(event, legendItem);
							if (typeof legendItem.index === 'number') {
								handleHover(legendItem.index);
							}
						},

						onHover: (_, legendItem) => {
							if (typeof legendItem.index === 'number') {
								handleHover(legendItem.index);
							}
						},
						onLeave: () => {
							if (!hoverEffect) return;
							setHoveredIndex(null);
							hoveredIndexRef.current = null;
						},
						...legend,
					},
			tooltip: {
				borderWidth: tooltip?.borderWidth ?? 1,
				borderColor: (ctx: ScriptableTooltipContext<'line'>): Color => {
					const tooltipItem = ctx.tooltip.dataPoints[0];
					const color = tooltipItem?.dataset.backgroundColor;

					// Ensure it's a string; fallback to 'black'
					if (typeof color === 'string') return color;
					if (Array.isArray(color) && typeof color[0] === 'string') return color[0];
					return 'black';
				},
				backgroundColor: 'rgba(255, 255, 255, 1)',
				callbacks: tooltip?.callbacks ?? {
					label: (context: TooltipItem<'line'>) => {
						const label = context.dataset.label ?? '';
						const value = context.formattedValue;
						return `${label}: ${value}`;
					},
					title: tooltip?.displayTitle
						? (tooltipItems: TooltipItem<'line'>[]) => {
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
					...(tooltip?.bodyFont ?? {}),
				},
				...tooltip,
			},
			title: {
				display: !!title,
				text: title,
				color: axisLabelColor ?? COLORS.grey,
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
				stacked,
				title: {
					display: !!xAxisLabel,
					text: xAxisLabel,
					color: axisLabelColor ?? COLORS.grey,
					font: {
						size: 14,
						family: 'Poppins',
					},
				},
				grid: {
					display: xSplitLineShow,
					color: axisSplitColor,
					lineWidth: 1,
					tickLength: 30,
				},
				ticks: {
					color: axisLabelColor ?? COLORS.grey,
					stepSize: 100,
					font: {
						family: 'Poppins',
					},
				},
				border: {
					display: !!xAxisLineShow,
					color: 'rgba(0, 0, 0, 0)',
					width: xAxisLineShow ? 1 : 0,
				},
				...xAxis,
			},
			y: {
				display: yAxisLabelShow,
				stacked,
				title: {
					display: !!yAxisLabel,
					text: yAxisLabel,
					color: axisLabelColor ?? COLORS.grey,
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
					color: axisLabelColor ?? COLORS.grey,
					stepSize: 100,
					font: {
						family: 'Poppins',
					},
					callback:
						typeof yAxis?.callback === 'function'
							? yAxis.callback
							: function defaultTickCallback(
									this: Scale,
									tickValue: string | number
								): string | number {
									return tickValue;
								},
				},
				...yAxis,
			},
		},
		elements: {
			line: {
				tension: smooth ? 0.4 : 0,
			},
			point: {
				radius: 0,
			},
		},
		...(cursor
			? {
					cursor,
				}
			: {}),
		...chartOptionsProps,
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
			<Line data={chartData} options={chartOptions} {...extra} />
			{legend?.icon && legend.display && (
				<ul
					style={{
						...legend.legendStyles,
					}}>
					{labels.map((label, index) => {
						const color = (() => {
							if (hoveredIndex !== null && hoveredIndex !== index) return '#D3D3D3';
							if (excludedIndices.includes(index)) return '#D3D3D3';
							return legendColors[index] ?? '#000';
						})();

						return (
							<div
								role='button'
								tabIndex={0}
								key={label}
								style={{
									display: 'flex',
									alignItems: 'center',
									cursor: 'pointer',
								}}
								onClick={(e) => {
									handleLegendClick(e, {
										index,
										text: label,
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
										</div>
									)}
								</div>
							</div>
						);
					})}
				</ul>
			)}{' '}
		</div>
	);
};

export default BaseAreaChart;
