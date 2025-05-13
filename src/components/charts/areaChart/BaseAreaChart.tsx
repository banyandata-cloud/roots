import EChartsReactCore from 'echarts-for-react/lib/core';
import { LineChart } from 'echarts/charts';
import {
	DatasetComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { CSSProperties } from 'react';
import { COLORS } from '../../../styles';
import { classes } from '../../../utils';
import { AreaChartIcon, LineChartIcon } from '../../icons';
import styles from './BaseAreaChart.module.css';

echarts.use([
	TitleComponent,
	LegendComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	LineChart,
	CanvasRenderer,
]);

interface BaseAreaChartProps {
	title?: string;
	gridOptions?: Record<string, any>;
	gridContainLabel?: boolean;
	seriesData: {
		chartData: Record<string, number[]>;
		metaData?: {
			xAxisData?: string[];
		};
	};
	tooltip?: Record<string, any>;
	legend?: Record<string, any>;
	xAxis?: Record<string, any>;
	yAxis?: Record<string, any>;
	xAxisLabelShow?: boolean;
	xSplitLineShow?: boolean;
	xAxisLineShow?: boolean;
	xAxisTickShow?: boolean;
	xAxisLabel?: Record<string, any>;
	yAxisLabelShow?: boolean;
	ySplitLineShow?: boolean;
	yAxisLineShow?: boolean;
	yAxisTickShow?: boolean;
	yAxisTick?: Record<string, any>;
	yAxisLabel?: Record<string, any>;
	axisLabelColor?: string;
	axisSplitColor?: string;
	splitType?: 'dashed' | 'solid' | 'dotted';
	seriesOption?: Array<Record<string, any>>;
	lineStyleWidth?: number;
	lineStyleType?: 'dashed' | 'solid' | 'dotted';
	lineStyleCap?: 'butt' | 'round' | 'square';
	lineStyleJoin?: 'round' | 'bevel' | 'miter';
	stacked?: boolean | string;
	cursor?: string;
	smooth?: boolean;
	opacity?: number;
	style?: CSSProperties;
	className?: string;
	theme?: 'light' | 'dark';
	isEmpty?: {
		show: boolean;
		className?: string;
		title?: string;
		description?: string;
		type?: 'line' | 'area';
	};
}

function getLinearGradient(color: any): echarts.graphic.LinearGradient | string {
	if (typeof color === 'string') return color;

	// Expecting full LinearGradient format: x, y, x2, y2, colorStops, [globalCoord]
	if (
		Array.isArray(color) &&
		color.length >= 5 &&
		typeof color[0] === 'number' &&
		typeof color[4] === 'object'
	) {
		const [x, y, x2, y2, colorStops, globalCoord] = color;
		return new echarts.graphic.LinearGradient(x, y, x2, y2, colorStops, globalCoord ?? false);
	}

	// Fallback
	return '';
}

const BaseAreaChart = ({
	title = '',
	gridOptions = { left: 0, right: 0, bottom: 0, top: 0 },
	gridContainLabel = false,
	seriesData = { chartData: {} },
	tooltip = {},
	legend = {},
	xAxis = {},
	yAxis = {},
	xAxisLabelShow = false,
	xSplitLineShow = false,
	xAxisLineShow = false,
	xAxisTickShow = false,
	xAxisLabel = {},
	yAxisLabelShow = false,
	ySplitLineShow = false,
	yAxisLineShow = false,
	yAxisTickShow = false,
	yAxisTick = {},
	yAxisLabel = {},
	axisLabelColor = '',
	axisSplitColor = '',
	splitType = 'solid',
	seriesOption = [],
	lineStyleWidth = 4,
	lineStyleType = 'solid',
	lineStyleCap = 'butt',
	lineStyleJoin = 'round',
	stacked = false,
	cursor = 'default',
	smooth = false,
	opacity = 1,
	style = {
		width: '100%',
		height: '100%',
	},
	className = '',
	theme = 'dark',
	isEmpty = {
		show: false,
		className: '',
		title: 'No Data Found',
		description: '',
	},
}: BaseAreaChartProps) => {
	if (isEmpty?.show) {
		return (
			<div className={classes(styles.empty, isEmpty?.className)}>
				<div className={styles.icon}>
					{isEmpty?.type === 'line' ? <LineChartIcon /> : <AreaChartIcon />}
				</div>
				<div className={styles.text}>
					<div className={styles.title}>{isEmpty?.title ?? 'No Data Found'}</div>
					<div className={styles.description}>{isEmpty?.description}</div>
				</div>
			</div>
		);
	}

	const seriesOptionObject = {
		type: 'line',
		symbol: 'emptyCircle',
		stack: stacked,
		symbolSize: 4,
		smooth,
		name: 'SeriesName',
		connectNulls: true,
		clip: true,
		cursor,
		groupPadding: 3,
		showBackground: true,
		backgroundStyle: {
			color: 'whitesmoke',
		},
		label: {
			color: 'black',
			offset: [0, 0],
			show: false,
			position: 'top',
			formatter(param: any) {
				return param.value;
			},
		},
		lineStyle: {
			width: lineStyleWidth,
			type: lineStyleType,
			cap: lineStyleCap,
			join: lineStyleJoin,
		},
		areaStyle: {
			origin: 'auto',
			shadowBlur: 0,
			shadowColor: 'white',
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			opacity,
		},
		emphasis: {
			focus: 'series',
		},
		data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
			return seriesData?.chartData?.[key] ?? '';
		}),
	};

	const generateSeries = () => {
		return Object.keys(seriesData?.chartData).map((objectData, index) => {
			const option = seriesOption[index] ?? {};
			return {
				...seriesOptionObject,
				...option,
				name: objectData,
				...(option?.color && {
					color: getLinearGradient(option.color),
				}),
				label: {
					...(seriesOptionObject.label ?? {}),
					...(option.label ?? {}),
				},
				lineStyle: {
					...(seriesOptionObject.lineStyle ?? {}),
					...(option.lineStyle ?? {}),
					...(option.lineStyle?.color && {
						color: getLinearGradient(option.color),
					}),
				},
				areaStyle: {
					...(seriesOptionObject.areaStyle ?? {}),
					...(option.areaStyle ?? {}),
					...(option.areaStyle?.color && {
						color: option.areaStyle.color,
					}),
				},
				emphasis: {
					...(seriesOptionObject.emphasis ?? {}),
					...(option.emphasis ?? {}),
				},
				data: seriesData.chartData[objectData] ?? [],
			};
		});
	};

	return (
		<EChartsReactCore
			option={{
				title: { text: title },
				grid: { containLabel: gridContainLabel, ...gridOptions },
				tooltip,
				legend: {
					...legend,
					data: Object.keys(seriesData?.chartData ?? []),
				},
				xAxis: [
					{
						data: seriesData?.metaData?.xAxisData ?? [],
						type: 'category',
						axisLabel: {
							show: xAxisLabelShow,
							color:
								axisLabelColor !== ''
									? axisLabelColor
									: theme === 'dark'
									? COLORS[`theme-${theme}-mono-color3`]
									: COLORS.grey,
							...xAxisLabel,
						},
						splitLine: {
							show: xSplitLineShow,
							lineStyle: {
								color:
									axisSplitColor !== ''
										? axisSplitColor
										: theme === 'dark'
										? COLORS['dark-grey']
										: COLORS['mono-color2'],
								type: splitType,
							},
						},
						axisLine: {
							show: xAxisLineShow,
							onZero: false,
							lineStyle: {
								color:
									theme === 'dark'
										? COLORS['theme-dark-mono-color2']
										: COLORS['theme-dark-mono-color1'],
							},
						},
						axisTick: {
							show: xAxisTickShow,
							lineStyle: {
								color:
									theme === 'dark'
										? COLORS[`theme-${theme}-mono-color2`]
										: COLORS.grey3,
							},
						},
						...xAxis,
					},
				],
				yAxis: [
					{
						type: 'value',
						axisLabel: {
							show: yAxisLabelShow,
							color:
								axisLabelColor !== ''
									? axisLabelColor
									: theme === 'dark'
									? COLORS[`theme-${theme}-mono-color3`]
									: COLORS.grey,
							...yAxisLabel,
						},
						splitLine: {
							show: ySplitLineShow,
							lineStyle: {
								color:
									axisSplitColor !== ''
										? axisSplitColor
										: theme === 'dark'
										? COLORS['dark-grey']
										: COLORS['mono-color2'],
								type: splitType,
							},
						},
						axisLine: {
							show: yAxisLineShow,
							onZero: false,
							lineStyle: {
								color:
									theme === 'dark'
										? COLORS['theme-dark-mono-color2']
										: COLORS['theme-dark-mono-color1'],
							},
						},
						axisTick: {
							show: yAxisTickShow,
							lineStyle: {
								color:
									theme === 'dark'
										? COLORS[`theme-${theme}-mono-color2`]
										: COLORS.grey3,
							},
							...yAxisTick,
						},
						...yAxis,
					},
				],
				series: generateSeries(),
			}}
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes(styles.root, className)}
			style={style}
		/>
	);
};

export default BaseAreaChart;
