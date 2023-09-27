/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
	GridComponent,
	LegendComponent,
	TooltipComponent,
	TitleComponent,
	DatasetComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
	CanvasRenderer,
	// SVGRenderer,
} from 'echarts/renderers';
import styles from './BaseAreaChart.module.css';
import { classes } from '../../../utils';
import { Skeleton } from './Skeleton';
import { COLORS } from '../../../styles';

// Register the required components
echarts.use([
	TitleComponent,
	LegendComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	LineChart,
	CanvasRenderer,
]);

const BaseAreaChart = (props) => {
	const {
		loading,
		title,
		gridOptions,
		gridContainLabel,
		seriesData,
		tooltip,
		legend,
		xAxisLabelShow,
		xSplitLineShow,
		xAxisLineShow,
		xAxisTickShow,
		xAxisLabel,
		yAxisLabelShow,
		ySplitLineShow,
		yAxisLineShow,
		yAxisTickShow,
		yAxisLabel,
		axisLabelColor,
		axisSplitColor,
		splitType,
		seriesOption,
		lineStyleWidth,
		lineStyleType,
		lineStyleCap,
		lineStyleJoin,
		stacked,
		cursor,
		smooth,
		opacity,
		style,
		className,
		theme,
		fallback,
	} = props;

	if (loading || fallback) {
		// const filled = seriesOption.some((series) => {
		// return series?.areaStyle.opacity > 0;
		// });
		return (
			<Skeleton
				//  filled={filled}
				theme={theme}
				fallback={!loading && fallback}
			/>
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
			formatter(param) {
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
			return {
				...seriesOptionObject,
				...seriesOption[index],
				name: Object.keys(seriesData?.chartData ?? {})?.[index] ?? '',
				...(seriesOption[index]?.color && {
					color:
						typeof (seriesOption[index]?.color ?? {}) !== 'string'
							? new echarts.graphic.LinearGradient(
									...(seriesOption[index]?.color ?? [])
							  )
							: seriesOption[index]?.color ?? {},
				}),
				label: {
					...(seriesOptionObject?.label ?? {}),
					...(seriesOption[index]?.label ?? {}),
				},
				lineStyle: {
					...(seriesOptionObject?.lineStyle ?? {}),
					...(seriesOption[index]?.lineStyle ?? {}),
					...(seriesOption[index]?.lineStyle?.color && {
						color:
							typeof (seriesOption[index]?.lineStyle?.color ?? {}) !== 'string'
								? new echarts.graphic.LinearGradient(
										...(seriesOption[index]?.lineStyle?.color ?? {})
								  )
								: seriesOption[index]?.lineStyle?.color ?? {},
					}),
				},
				areaStyle: {
					...(seriesOptionObject?.areaStyle ?? {}),
					...(seriesOption[index]?.areaStyle ?? {}),
					...(seriesOption[index]?.areaStyle?.color && {
						color:
							typeof (seriesOption[index]?.areaStyle?.color ?? {}) !== 'string'
								? new echarts.graphic.LinearGradient(
										seriesOption[index]?.areaStyle?.color ?? {}
								  )
								: seriesOption[index]?.areaStyle?.color ?? {},
					}),
				},
				emphasis: {
					...(seriesOptionObject?.emphasis ?? {}),
					...(seriesOption[index]?.emphasis ?? {}),
				},
				data: Object.values(seriesData?.chartData ?? {})?.[index] ?? '',
			};
		});
	};
	return (
		<EChartsReactCore
			option={{
				title: {
					text: title,
				},
				grid: {
					containLabel: gridContainLabel,
					...gridOptions,
				},
				tooltip: {
					...tooltip,
				},
				legend: {
					...legend,
					data: Object.keys(seriesData?.chartData ?? []),
				},
				xAxis: [
					{
						type: 'category',
						axisLabel: {
							show: xAxisLabelShow,
							color:
								axisLabelColor !== ''
									? axisLabelColor
									: theme === 'dark'
									? '#a2a4a5'
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
										: COLORS.grey5,
								type: splitType,
							},
						},
						axisLine: {
							show: xAxisLineShow,
							lineStyle: {
								color: theme === 'dark' ? '#757679' : COLORS.grey3,
							},
						},
						axisTick: {
							show: xAxisTickShow,
							lineStyle: {
								color: theme === 'dark' ? '#a2a4a5' : COLORS.grey,
							},
						},
						boundaryGap: false,
						data: seriesData?.metaData?.xAxisData ?? [],
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
									? '#a2a4a5'
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
										: COLORS.grey5,
								type: splitType,
							},
						},
						axisLine: {
							show: yAxisLineShow,
							lineStyle: {
								color: theme === 'dark' ? '#757679' : COLORS.grey3,
							},
						},
						axisTick: {
							show: yAxisTickShow,
							lineStyle: {
								color: theme === 'dark' ? '#a2a4a5' : COLORS.grey,
							},
						},
					},
				],
				series: generateSeries(),
			}}
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes(className, styles.root)}
			style={style}
		/>
	);
};

BaseAreaChart.propTypes = {
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	title: PropTypes.string,
	gridOptions: PropTypes.object,
	gridContainLabel: PropTypes.bool,
	tooltip: PropTypes.object,
	legend: PropTypes.object,
	xAxisLabelShow: PropTypes.bool,
	xSplitLineShow: PropTypes.bool,
	xAxisLineShow: PropTypes.bool,
	xAxisTickShow: PropTypes.bool,
	xAxisLabel: PropTypes.object,
	axisLabelColor: PropTypes.string,
	axisSplitColor: PropTypes.string,
	splitType: PropTypes.oneOf(['dashed', 'solid', 'dotted']),
	seriesData: PropTypes.objectOf(PropTypes.shape),
	stacked: PropTypes.bool,
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	yAxisLabel: PropTypes.object,
	cursor: PropTypes.string,
	seriesOption: PropTypes.arrayOf(PropTypes.object),
	lineStyleWidth: PropTypes.number,
	lineStyleType: PropTypes.oneOf(['dashed', 'solid', 'dotted']),
	lineStyleCap: PropTypes.oneOf(['butt', 'round', 'square']),
	lineStyleJoin: PropTypes.oneOf(['round', 'bevel', 'miter']),
	smooth: PropTypes.bool,
	opacity: PropTypes.number,
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
	theme: PropTypes.oneOf(['light', 'dark']),
};

BaseAreaChart.defaultProps = {
	loading: false,
	fallback: false,
	title: '',
	gridOptions: {
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
	},
	gridContainLabel: false,
	tooltip: {},
	stacked: false,
	legend: {},
	xAxisLabelShow: false,
	xSplitLineShow: false,
	xAxisLineShow: false,
	xAxisTickShow: false,
	xAxisLabel: {},
	axisLabelColor: '',
	axisSplitColor: '',
	splitType: 'solid',
	seriesData: {},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	yAxisLabel: {},
	cursor: 'default',
	seriesOption: [],
	lineStyleWidth: 4,
	lineStyleType: 'solid',
	lineStyleCap: 'butt',
	lineStyleJoin: 'round',
	smooth: false,
	opacity: 1,
	style: {
		width: '100%',
		height: '100%',
	},
	className: '',
	theme: 'dark',
};

export default BaseAreaChart;
