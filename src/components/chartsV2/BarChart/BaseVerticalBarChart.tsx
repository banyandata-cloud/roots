import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Tooltip,
	type ChartDataset,
	type ChartOptions,
	type LegendOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getColorGradient } from '../utils';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

interface ChartDataItem {
	x1?: string;
	[key: string]: string | number | undefined;
}

interface SeriesData {
	chartData: Record<string, ChartDataItem>;
}

interface TitleStyle {
	textStyle?: {
		fontSize?: number;
	};
	left?: number;
	paddingTop?: number;
}

interface CustomTooltipFont {
	titleColor?: string;
	color?: string;
	family?: string;
	size?: number;
	weight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number;
}

interface TooltipConfig {
	borderWidth?: number;
	bodySpacing?: number;
	displayColors?: boolean;
	colorBoxWidth?: number;
	colorBoxHeight?: number;
	usePointStyle?: boolean;
	bodyFont?: CustomTooltipFont;
	titleColor?: string;
	bodyColor?: string;
	color?: string;
}

interface GridOptions {
	gridContainLabel?: boolean;
}

interface BaseBarChartProps {
	loading: boolean;
	seriesData: SeriesData;
	title?: TitleStyle;
	gridOptions?: GridOptions;
	width?: string | number;
	height?: string | number;
	barThickness?: number;
	borderRadius?: number;
	xAxisTitle?: string;
	yAxisTitle?: string;
	tooltip?: TooltipConfig;
	legends?: Partial<LegendOptions<'bar'>>;
	chartOptions?: Partial<ChartOptions<'bar'>['plugins']>;
	chartDatasets?: Partial<ChartDataset<'bar'>>;
	xAxis?: Partial<ChartOptions<'bar'>['scales']>;
	yAxis?: Partial<ChartOptions<'bar'>['scales']>;
	styles?: React.CSSProperties;
	vertical?: boolean;
	stacked?: ChartDataset<'bar'>;
	extra?: Record<string, unknown>;
	barColors?: Record<string, string>;
}

function isCustomTooltipFont(font: unknown): font is CustomTooltipFont {
	return (
		font !== null &&
		typeof font === 'object' &&
		'family' in font &&
		'size' in font &&
		'weight' in font
	);
}

const BaseBarChart: React.FC<BaseBarChartProps> = ({
	seriesData,
	title,
	gridOptions,
	width = '100%',
	height = '100%',
	barThickness = 50,
	borderRadius = 5,
	xAxisTitle,
	yAxisTitle,
	tooltip,
	legends,
	chartOptions,
	chartDatasets,
	xAxis,
	yAxis,
	styles,
	vertical = true,
	stacked,
	extra,
	barColors,
}) => {
	const labels = Object.keys(seriesData.chartData);

	const allKeys = new Set<string>();
	Object.values(seriesData.chartData).forEach((item) => {
		Object.keys(item).forEach((key) => {
			allKeys.add(key);
		});
	});

	const barDatasets: ChartDataset<'bar'>[] = Array.from(allKeys).map((key) => {
		const backgroundColor = (ctx: CanvasRenderingContext2D): string => {
			const color = barColors?.[key];
			if (!color) return 'grey';

			return color.startsWith('linear-gradient')
				? (getColorGradient(ctx, color) as string)
				: color;
		};

		const data = labels.map((label) => {
			const value = seriesData.chartData[label]?.[key];
			return typeof value === 'number' ? value : null;
		});

		return {
			label: key,
			backgroundColor,
			data,
			borderRadius,
			barThickness,
			...chartDatasets,
		} as ChartDataset<'bar'>;
	});

	const datasets = stacked ? [...barDatasets, stacked] : [...barDatasets];

	const bodyFont: CustomTooltipFont = isCustomTooltipFont(tooltip?.bodyFont)
		? {
				size: typeof tooltip.bodyFont.size === 'number' ? tooltip.bodyFont.size : 12,
				weight: tooltip.bodyFont.weight ?? 'normal',
				family: tooltip.bodyFont.family ?? 'Poppins',
			}
		: {
				size: 12,
				weight: 'normal',
				family: 'Poppins',
			};

	const options: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: vertical ? 'x' : 'y',
		plugins: {
			title: {
				display: true,
				font: {
					size: title?.textStyle?.fontSize ?? 12,
					family: 'Poppins',
				},
				align: 'start',
				padding: {
					top: title?.paddingTop ?? 0,
				},
			},
			tooltip: {
				...(tooltip ?? {}),
				borderWidth: tooltip?.borderWidth ?? 1,
				backgroundColor: 'rgba(255, 255, 255, 1)',
				bodySpacing: tooltip?.bodySpacing ?? 5,
				displayColors: tooltip?.displayColors ?? true,
				boxWidth: tooltip?.colorBoxWidth ?? 5,
				boxHeight: tooltip?.colorBoxHeight ?? 5,
				boxPadding: 5,
				usePointStyle: tooltip?.usePointStyle ?? true,
				titleColor: tooltip?.bodyFont?.titleColor ?? '#000',
				bodyColor: tooltip?.bodyFont?.color ?? '#000',
				bodyFont,
			},
			legend: {
				display: false,
				...legends,
			},
			datalabels: {
				anchor: 'end',
				align: 'top',
				color: 'black',
				font: {
					size: 12,
					family: 'Poppins',
				},
				offset: 4,
				formatter: (_value, context) => {
					const index = context.dataIndex;
					const label = labels[index];
					return typeof label === 'string' ? label : '';
				},
			},
			...chartOptions,
		},
		scales: {
			x: {
				grid: {
					display: gridOptions?.gridContainLabel ?? true,
					color: 'rgba(255, 255, 255, 0.2)',
				},
				ticks: {
					color: 'black',
					callback: (_val, index) => {
						const label = labels[index];
						return typeof label === 'string'
							? (seriesData.chartData[label]?.x1 ?? '')
							: '';
					},
					font: {
						family: 'Poppins',
					},
				},
				title: {
					display: Boolean(xAxisTitle),
					text: xAxisTitle,
					color: 'black',
					font: {
						family: 'Poppins',
					},
				},
				...xAxis,
			},
			y: {
				grid: {
					display: true,
					color: 'rgba(255, 255, 255, 0.2)',
				},
				ticks: {
					color: 'black',
					font: {
						family: 'Poppins',
					},
				},
				title: {
					display: Boolean(yAxisTitle),
					text: yAxisTitle,
					color: 'black',
					font: {
						family: 'Poppins',
					},
				},
				...yAxis,
			},
		},
	};

	return (
		<div
			style={{
				width,
				height,
				...styles,
			}}>
			<Bar
				data={{
					labels,
					datasets,
				}}
				options={options}
				{...extra}
			/>
		</div>
	);
};

export default BaseBarChart;
