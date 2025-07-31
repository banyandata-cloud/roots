import type { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Tooltip,
} from 'chart.js';
import type { Context } from 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getColorGradient } from '../utils';
import type { BaseBarChartProps } from './types';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

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

	Object.values(seriesData.chartData).forEach((data) => {
		Object.keys(data).forEach((key) => {
			allKeys.add(key);
		});
	});

	const barDatasets: ChartDataset<'bar'>[] = Array.from(allKeys).map((key) => {
		return {
			label: key,
			backgroundColor: (ctx) => {
				const color = barColors?.[key];
				if (!color) return 'grey';

				if (color.startsWith('linear-gradient')) {
					return getColorGradient(ctx, color);
				}

				return color;
			},
			data: labels.map((label) => {
				return seriesData.chartData[label]?.[key] ?? null;
			}),
			borderRadius,
			barThickness,
			...chartDatasets,
		};
	});

	const datasets = stacked ? [...barDatasets, stacked] : [...barDatasets];

	const options: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: !vertical ? 'y' : 'x',
		plugins: {
			title: {
				display: true,
				align: 'start',
				padding: 0,
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
					...tooltip?.bodyFont,
					family: 'Poppins',
					...(typeof tooltip?.bodyFont === 'object' ? tooltip.bodyFont : {}),
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
				formatter: (_value: number, context: Context) => {
					const label = context.chart.data.labels?.[context.dataIndex];

					if (typeof label === 'string' || typeof label === 'number') {
						return String(label);
					}
					return '';
				},

				...chartOptions?.plugins?.datalabels,
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
						const label = labels[index];
						return label ? (seriesData.chartData[label]?.x1 ?? null) : null;
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
