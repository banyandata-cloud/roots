import {
	CategoryScale,
	type ChartData,
	type ChartDataset,
	Chart as ChartJS,
	type Chart as ChartJSInstance,
	type ChartOptions,
	type Color,
	Filler,
	Legend,
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
import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { COLORS } from '../../../styles';

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
		// chartOptionsProps,
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
	} = props;

	const chartOptionsProps: ChartOptionsProps = {
		pointStyle: 'rectRot',
		pointRadius: 4,
		pointHoverRadius: 6,
		borderWidth: 2,
	};

	const legendRef = useRef<HTMLUListElement | null>(null);
	const [hiddenDatasets, setHiddenDatasets] = useState<number[]>([]);

	const toggleDatasetVisibility = (index: number, chart: ChartJSInstance<'line'>) => {
		setHiddenDatasets((prevHidden) => {
			const newHidden = prevHidden.includes(index)
				? prevHidden.filter((i) => {
						return i !== index;
					})
				: [...prevHidden, index];

			const dataset = chart.data.datasets[index];
			if (dataset) {
				dataset.hidden = newHidden.includes(index);
			}
			chart.update();
			return newHidden;
		});
	};

	const customLegendPlugin = {
		id: 'customLegend',
		afterUpdate(chart: ChartJSInstance<'line'>) {
			const ul = legendRef.current;
			while (ul?.firstChild) {
				ul.firstChild.remove();
			}

			chart.data.datasets.forEach((dataset: ChartDataset<'line'>, index: number) => {
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
				const bgColor = dataset.backgroundColor;
				const circleColor = typeof bgColor === 'string' ? bgColor : 'grey';

				const labelText = typeof dataset.label === 'string' ? dataset.label : '';

				li.onclick = () => {
					toggleDatasetVisibility(index, chart);
					li.style.color = li.style.color === 'grey' ? 'inherit' : 'grey';

					function resolveStrokeColor(
						color: ChartDataset<'line'>['backgroundColor']
					): string {
						if (typeof color === 'string') return color;

						if (Array.isArray(color)) {
							const firstColor = color[0] as unknown;
							if (typeof firstColor === 'string') return firstColor;
							if (
								firstColor !== null &&
								typeof firstColor === 'object' &&
								'toString' in firstColor &&
								typeof (firstColor as { toString: unknown }).toString === 'function'
							) {
								return (firstColor as { toString: () => string }).toString();
							}
						}

						if (
							typeof color === 'object' &&
							'toString' in color &&
							typeof (color as { toString: unknown }).toString === 'function'
						) {
							return (color as { toString: () => string }).toString();
						}

						return 'grey';
					}

					const circle = li.querySelector('circle');
					if (circle) {
						const stroke = circle.getAttribute('stroke');
						const resolvedColor = resolveStrokeColor(dataset.backgroundColor);
						circle.setAttribute('stroke', stroke === 'grey' ? resolvedColor : 'grey');
					}
				};

				li.innerHTML = `
					<svg width="15" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="15" cy="15" r="12" stroke="${circleColor}" stroke-width="6"/>
					</svg>
				<span style="margin-left: 10px; color: ${textColor};">${labelText}</span>
				`;

				ul?.appendChild(li);
			});
		},
	};

	const chartData: ChartData<'line'> = {
		labels: seriesData.metaData.xAxisData,
		datasets: Object.keys(seriesData.chartData).map((key, index) => {
			return {
				label: key,
				data: seriesData.chartData[key] ?? [],
				fill: !isLineChart,
				backgroundColor: isLineChart
					? 'transparent'
					: lineColors[index % lineColors.length],
				borderColor: borderColors[index % borderColors.length],
				tension: smooth ? 0.4 : 0,
				pointStyle: chartOptionsProps.pointStyle ?? 'rectRot',
				pointRadius: chartOptionsProps.pointRadius ?? 4,
				pointHoverRadius: chartOptionsProps.pointHoverRadius ?? 6,
				borderWidth: chartOptionsProps.borderWidth ?? 2,
				pointBackgroundColor: borderColors[index % borderColors.length],
				datalabels: {
					display: false, // Disable data labels on points
				},
			};
		}),
		...dataSetOptions,
	};

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

	const legendStyle: React.CSSProperties = {
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
			<Line
				data={chartData}
				options={chartOptions}
				plugins={[customLegendPlugin]}
				{...extra}
			/>
			{legend?.icon && legend.display && <ul ref={legendRef} style={legendStyle} />}
		</div>
	);
};

export default BaseAreaChart;
