/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import type { ChartData, ChartOptions } from 'chart.js';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { COLORS } from '../../../styles';
import { Skeleton } from './Skeleton'; // Assuming this is your custom loading component

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

interface ChartDataItem {
	[key: string]: number | null;
}

interface SeriesData {
	chartData: Record<string, ChartDataItem>;
}

interface FontOptions {
	size?: number;
	family?: string;
	weight?: string;
	color?: string;
	titleColor?: string;
}

interface TooltipConfig {
	borderWidth?: number;
	bodySpacing?: number;
	displayColors?: boolean;
	colorBoxWidth?: number;
	colorBoxHeight?: number;
	usePointStyle?: boolean;
	bodyFont?: FontOptions;
	titleColor?: string;
	bodyColor?: string;
	[key: string]: any;
}

interface TitleConfig {
	text?: string;
	left?: number;
	textStyle?: {
		fontSize?: number;
	};
}

interface GridOptions {
	gridContainLabel?: boolean;
}

interface AxisOptions {
	[key: string]: any;
}

interface BaseBarChartProps {
	loading?: boolean;
	seriesData: SeriesData;
	title?: TitleConfig;
	gridOptions?: GridOptions;
	width?: string | number;
	height?: string | number;
	barThickness?: number;
	borderRadius?: number;
	barColor1?: string;
	barColor2?: string;
	xAxisTitle?: string;
	yAxisTitle?: string;
	tooltip?: TooltipConfig;
	legends?: object;
	chartOptions?: ChartOptions<'bar'>;
	chartDatasets?: Partial<ChartDataset<'bar'>>;
	xAxis?: AxisOptions;
	yAxis?: AxisOptions;
	styles?: React.CSSProperties;
	vertical?: boolean;
	stacked?: ChartDataset<'bar'>;
	extra?: object;
}

const BaseBarChart: React.FC<BaseBarChartProps> = ({
	loading,
	seriesData,
	title,
	gridOptions,
	width = '100%',
	height = '100%',
	barThickness = 50,
	borderRadius = 5,
	barColor1,
	barColor2,
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
}) => {
	if (loading) {
		return <Skeleton vertical={vertical} />;
	}

	const labels = Object.keys(seriesData.chartData);
	const allKeys = new Set<string>();

	Object.values(seriesData.chartData).forEach((data) => {
		Object.keys(data).forEach((key) => {
			allKeys.add(key);
		});
	});

	const barDatasets: ChartDataset<'bar'>[] = Array.from(allKeys).map((key, index) => ({
		label: key,
		backgroundColor:
			key === 'x1'
				? barColor1 ?? COLORS.success
				: key === 'x2'
				? barColor2 ?? COLORS.error
				: COLORS.warning,
		data: labels.map((label) =>
			seriesData.chartData[label][key] !== undefined ? seriesData.chartData[label][key] : null
		),
		borderRadius,
		barThickness,
		...chartDatasets,
	}));

	const datasets = stacked ? [...barDatasets, stacked] : [...barDatasets];

	const options: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: !vertical ? 'y' : 'x',
		plugins: {
			title: {
				display: true,
				align: 'start',
				padding: {
					left: title?.left ?? 0,
				},
				font: {
					size: title?.textStyle?.fontSize ?? 12,
					family: 'Poppins',
				},
				text: title?.text,
			},
			tooltip: {
				borderWidth: tooltip?.borderWidth ?? 1,
				backgroundColor: 'rgba(255, 255, 255, 1)',
				bodySpacing: tooltip?.bodySpacing ?? 5,
				displayColors: tooltip?.displayColors ?? true,
				boxWidth: tooltip?.colorBoxWidth ?? 5,
				boxHeight: tooltip?.colorBoxHeight ?? 5,
				usePointStyle: tooltip?.usePointStyle ?? true,
				titleColor: tooltip?.titleColor ?? '#000',
				bodyColor: tooltip?.bodyFont?.color ?? '#000',
				bodyFont: {
					family: 'Poppins',
					...tooltip?.bodyFont,
				},
				...tooltip,
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
				formatter: (_value: number, context: any) => {
					return context.chart.data.labels[context.dataIndex];
				},
			},
			...chartOptions?.plugins,
		},
		scales: {
			x: {
				grid: {
					display: gridOptions?.gridContainLabel ?? true,
					color: 'rgba(255, 255, 255, 0.2)',
				},
				ticks: {
					color: 'black',
					callback: (_value: string | number, index: number) => {
						return seriesData.chartData[labels[index]]?.x1;
					},
					font: {
						family: 'Poppins',
					},
				},
				title: {
					display: true,
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
					beginAtZero: true,
					font: {
						family: 'Poppins',
					},
				},
				title: {
					display: true,
					text: yAxisTitle,
					color: 'black',
					font: {
						family: 'Poppins',
					},
				},
				...yAxis,
			},
		},
		...chartOptions,
	};

	const data: ChartData<'bar'> = {
		labels,
		datasets,
	};

	return (
		<div
			style={{
				width,
				height,
				...styles,
			}}>
			<Bar data={data} options={options} {...extra} />
		</div>
	);
};

export default BaseBarChart;
