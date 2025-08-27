/* eslint-disable no-nested-ternary */
import {
	BarElement,
	CategoryScale,
	type ChartData,
	type ChartEvent,
	Chart as ChartJS,
	type ChartOptions,
	Legend,
	type LegendItem,
	LinearScale,
	Title,
	Tooltip,
	type TooltipItem,
	type TooltipModel,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels, { type Context as DataLabelContext } from 'chartjs-plugin-datalabels';
import React, { type FC, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	annotationPlugin,
	ChartDataLabels
);

interface SeriesData {
	chartData: Record<string, { x1: number; x2: number }>;
	metaData?: { keyData?: { x1: string; x2: string } };
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
}

interface CapsuleChartProps {
	seriesData: SeriesData;
	showLegends?: boolean;
	tooltip?: TooltipConfig;
	chartOptions?: Partial<ChartOptions<'bar'>>;
	extra?: Record<string, string>;
	dataSetsOptions?: Partial<ChartData<'bar'>>;
	xAxis?: Record<string, string>;
	yAxis?: Record<string, string>;
	styles?: React.CSSProperties;
}

const CapsuleChart: FC<CapsuleChartProps> = ({
	seriesData,
	showLegends,
	tooltip = {},
	dataSetsOptions = {},
	chartOptions = {},
	xAxis = {},
	yAxis = {},
	extra = {},
	styles = {},
}): React.ReactElement => {
	const [active, setActive] = useState<[boolean, boolean]>([true, true]);

	const labels = Object.keys(seriesData.chartData);
	const dataX1 = labels.map((l) => {
		return seriesData.chartData[l]?.x1;
	});
	const dataX2 = labels.map((l) => {
		return seriesData.chartData[l]?.x2;
	});

	const data: ChartData<'bar'> = {
		labels,
		datasets: [
			{
				label: seriesData.metaData?.keyData?.x1,
				data: dataX1.map((v = 0) => {
					return v;
				}),
				backgroundColor: active[0] ? 'green' : 'grey',
				stack: 'Stack 0',
				borderRadius: 18,
				barThickness: 30,
			},
			{
				label: seriesData.metaData?.keyData?.x2,
				data: dataX2.map((v = 0) => {
					return -v;
				}),
				backgroundColor: active[1] ? 'red' : 'grey',
				stack: 'Stack 0',
				borderRadius: 18,
				barThickness: 30,
			},
		],
		...dataSetsOptions,
	};

	const options: ChartOptions<'bar'> = {
		indexAxis: 'x',
		plugins: {
			legend: {
				display: showLegends,
				position: 'top',
				labels: {
					color: '#000',
					font: {
						family: 'Poppins',
					},
				},
				onClick(this: unknown, _event: ChartEvent, legendItem: LegendItem) {
					const i = legendItem.datasetIndex ?? 0;
					setActive(([a0, a1]) => {
						return i === 0 ? [!a0, a1] : [a0, !a1];
					});
				},
			},
			tooltip: {
				backgroundColor: 'rgba(255,255,255,1)',
				bodySpacing: tooltip.bodySpacing ?? 5,
				displayColors: tooltip.displayColors ?? true,
				boxWidth: tooltip.colorBoxWidth ?? 5,
				boxHeight: tooltip.colorBoxHeight ?? 5,
				boxPadding: 5,
				usePointStyle: tooltip.usePointStyle ?? true,
				titleColor: tooltip.titleColor ?? '#000',
				bodyColor: tooltip.bodyColor ?? '#000',
				bodyFont: tooltip.bodyFont ?? {},
				borderWidth: tooltip.borderWidth ?? 1,
				borderColor: (ctx: { tooltip: TooltipModel<'bar'> }) => {
					return (
						(ctx.tooltip.getActiveElements()[0]?.element.options
							.backgroundColor as string) || 'black'
					);
				},
				callbacks: {
					title: tooltip.displayTitle
						? (items: TooltipItem<'bar'>[]) => {
								return items[0]?.label ?? '';
							}
						: () => {
								return '';
							},
					label: (ctx: TooltipItem<'bar'>) => {
						const lbl = ctx.dataset.label ?? '';
						const val = ctx.raw as number;
						return `${lbl}: ${String(Math.abs(val))}`;
					},
				},
			},
			annotation: {
				annotations: {
					horizontalLine: {
						type: 'line',
						yMin: 0,
						yMax: 0,
						borderColor: '#d5d5db',
						borderWidth: 1,
					},
				},
			},
			datalabels: {
				color: 'black',
				font: {
					size: 14,
					family: 'Poppins',
				},
				formatter: (val: number, ctx: DataLabelContext) => {
					return ctx.datasetIndex === 0
						? `${String(val)}%`
						: (ctx.chart.data.labels?.[ctx.dataIndex] ?? '');
				},
				anchor: (ctx: DataLabelContext) => {
					return ctx.datasetIndex === 0 ? 'end' : 'start';
				},
				align: (ctx: DataLabelContext) => {
					return ctx.datasetIndex === 0 ? 'end' : 'start';
				},
				offset: 5,
				padding: 5,
			},
		},
		scales: {
			x: {
				stacked: true,
				ticks: {
					display: true,
					color: '#000',
					padding: 5,
					font: {
						family: 'Poppins',
					},
				},
				grid: {
					display: false,
					// @ts-expect-error: drawBorder exists but not typed
					drawBorder: false,
				},
				display: false,
				...xAxis,
			},
			y: {
				stacked: true,
				min: -200,
				max: 200,
				ticks: {
					display: false,
					font: {
						family: 'Poppins',
					},
				},
				grid: {
					display: false,
					// @ts-expect-error: drawBorder exists but not typed
					drawBorder: false,
				},
				display: false,
				...yAxis,
			},
		},
		...chartOptions,
	};

	return (
		<div
			style={{
				position: 'relative',
				...styles,
			}}>
			<Bar data={data} options={options} plugins={[ChartDataLabels]} {...extra} />
		</div>
	);
};

export default CapsuleChart;
