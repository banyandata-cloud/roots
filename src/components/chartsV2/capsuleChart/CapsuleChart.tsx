/* eslint-disable no-nested-ternary */
import {
	BarElement,
	CategoryScale,
	ChartData,
	ChartEvent,
	Chart as ChartJS,
	ChartOptions,
	Legend,
	LinearScale,
	ScriptableContext,
	Title,
	Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { FC, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Skeleton } from './Skeleton';

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
	bodyFont?: Record<string, any>;
	titleColor?: string;
	bodyColor?: string;
	borderWidth?: number;
}

interface CapsuleChartProps {
	loading?: boolean;
	fallback?: boolean;
	seriesData: SeriesData;
	showLegends?: boolean;
	tooltip?: TooltipConfig;
	dataSetsOptions?: Partial<ChartData<'bar'>>;
	chartOptions?: Partial<ChartOptions<'bar'>>;
	xAxis?: any;
	yAxis?: any;
	extra?: Record<string, any>;
	styles?: React.CSSProperties;
}

const CapsuleChart: FC<CapsuleChartProps> = ({
	loading = false,
	fallback = false,
	seriesData,
	showLegends = false,
	tooltip = {},
	dataSetsOptions = {},
	chartOptions = {},
	xAxis = {},
	yAxis = {},
	extra = {},
	styles = {},
}) => {
	const [active, setActive] = useState<[boolean, boolean]>([true, true]);

	if (loading || fallback) {
		return <Skeleton theme='dark' fallback={!loading && !!fallback} />;
	}

	const labels = Object.keys(seriesData.chartData);
	const dataX1 = labels.map((l) => seriesData.chartData[l].x1);
	const dataX2 = labels.map((l) => seriesData.chartData[l].x2);

	const data: ChartData<'bar'> = {
		labels,
		datasets: [
			{
				label: seriesData.metaData?.keyData?.x1,
				data: dataX1,
				backgroundColor: active[0] ? 'green' : 'grey',
				stack: 'Stack 0',
				borderRadius: 18,
				barThickness: 30,
			},
			{
				label: seriesData.metaData?.keyData?.x2,
				data: dataX2.map((v) => -v),
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
				labels: { color: '#000', font: { family: 'Poppins' } },
				onClick: (_e: ChartEvent, item: any) => {
					const i = item.datasetIndex as number;
					setActive(([a0, a1]) => (i === 0 ? [!a0, a1] : [a0, !a1]));
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
				bodyFont: (tooltip.bodyFont ?? {}) as any,
				borderWidth: tooltip.borderWidth ?? 1,
				borderColor: (ctx) =>
					(ctx.tooltip?.getActiveElements()[0]?.element.options
						.backgroundColor as string) || 'black',
				callbacks: {
					title: tooltip.displayTitle ? (items) => items[0].label || '' : () => '',
					label: (ctx) => {
						const lbl = ctx.dataset.label || '';
						const val = ctx.raw as number;
						return `${lbl}: ${Math.abs(val)}`;
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
				font: { size: 14, family: 'Poppins' },
				formatter: (val: number, ctx: ScriptableContext<'bar'>) =>
					ctx.datasetIndex === 0
						? `${val}%`
						: ctx.chart.data.labels?.[ctx.dataIndex] ?? '',
				anchor: (ctx: ScriptableContext<'bar'>) =>
					ctx.datasetIndex === 0 ? 'end' : 'start',
				align: (ctx: ScriptableContext<'bar'>) =>
					ctx.datasetIndex === 0 ? 'end' : 'start',
				offset: 5,
				padding: 5,
				shadowColor: 'black',
				shadowBlur: 18,
				shadowOffsetX: 4,
				shadowOffsetY: 4,
			},
		} as any,
		scales: {
			x: {
				stacked: true,
				ticks: { display: true, color: '#000', padding: 5, font: { family: 'Poppins' } },
				grid: { display: false, drawBorder: false },
				display: false,
				...xAxis,
			},
			y: {
				stacked: true,
				min: -200,
				max: 200,
				ticks: { display: false, font: { family: 'Poppins' } },
				grid: { display: false, drawBorder: false },
				display: false,
				...yAxis,
			},
		} as any,
		...chartOptions,
	};

	return (
		<div style={{ position: 'relative', ...styles }}>
			<Bar data={data} options={options} plugins={[ChartDataLabels]} {...extra} />
		</div>
	);
};

export default CapsuleChart;
