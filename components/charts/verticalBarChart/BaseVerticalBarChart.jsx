/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
// ReactEcharts from 'echarts-for-react' would import the entire bundle
import EChartsReactCore from 'echarts-for-react/lib/core';
import { BarChart } from 'echarts/charts';
import {
	DataZoomComponent,
	DataZoomInsideComponent,
	DataZoomSliderComponent,
	DatasetComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
import { COLORS } from '../../../styles';
import { classes } from '../../../utils';
import { BarChartIcon } from '../../icons';
import styles from './BaseVerticalBarChart.module.css';

// Register the required components
echarts.use([
	TitleComponent,
	DataZoomComponent,
	DataZoomInsideComponent,
	DataZoomSliderComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	LegendComponent,
	BarChart,
	CanvasRenderer,
]);

const AXIS_COLORS = {
	label: {
		dark: COLORS['theme-dark-mono-color3'],
		light: COLORS.grey,
	},
	line: {
		dark: COLORS['theme-dark-mono-color2'],
		light: COLORS['theme-dark-mono-color1'],
	},
	split: {
		dark: COLORS['dark-grey'],
		light: COLORS['mono-color2'],
	},
	tick: {
		dark: COLORS['theme-dark-mono-color2'],
		light: COLORS.grey3,
	},
};

const determineAxesColors = (type, defaultColor = '', theme = 'dark') => {
	if (defaultColor !== '') {
		return defaultColor;
	}
	return AXIS_COLORS[type][`${theme}`];
};

const determineGradient = (seriesData, objectData, index, subIndex, key) => {
	if (seriesData?.chartData?.[key]?.[`x${index + 1}`]) {
		if (typeof (objectData?.color ?? '' ?? {}) !== 'string') {
			return new echarts.graphic.LinearGradient(
				...((objectData?.barColor?.[subIndex] ?? '') || (objectData?.color ?? ''))
			);
		}
		return (objectData?.barColor?.[subIndex] ?? '') || (objectData?.color ?? '');
	}
	return '';
};

const BaseVerticalBarChart = (props) => {
	const {
		title,
		gridContainLabel,
		gridOptions,
		xAxis,
		xAxisShow,
		xAxisLabel,
		xAxisLabelColor,
		xAxisLineColor,
		xSplitLineShow,
		seriesData,
		onEvents,
		yAxis,
		yAxisLabelShow,
		ySplitLineShow,
		yAxisLineShow,
		yAxisTickShow,
		yAxisLineColor,
		yAxisLabelColor,
		axisColor,
		xAxisTick,
		splitType,
		xSplitType,
		barWidth,
		cursor,
		legend,
		tooltip,
		dataZoom,
		seriesName,
		stackCount,
		seriesOption,
		style,
		className,
		theme,
		isEmpty = {
			show: false,
			className: '',
			title: 'No Data Found',
			description: '',
		},
	} = props;

	if (isEmpty?.show) {
		return (
			<div className={classes(styles.empty, isEmpty?.className)}>
				<div className={styles.icon}>
					<BarChartIcon />
				</div>
				<div className={styles.text}>
					<div className={styles.title}>{isEmpty?.title ?? 'No Data Found'}</div>
					<div className={styles.description}>{isEmpty?.description}</div>
				</div>
			</div>
		);
	}

	const minHeightCheck = !Object.keys(seriesData?.chartData ?? 0)?.some((obj1) => {
		return seriesOption.some((obj, index) => {
			return seriesData?.chartData?.[obj1]?.[`x${index + 1}`];
		});
	})
		? 1
		: 0;

	const seriesOptionObject = {
		type: 'bar',
		barWidth: stackCount ? barWidth : barWidth / stackCount,
		cursor,
		stack: stackCount,
		groupPadding: 3,
		barMinHeight: minHeightCheck,
		showBackground: true,
		backgroundStyle: {
			color: 'whitesmoke',
		},
		label: {
			color: theme === 'dark' ? COLORS.white : COLORS.black,
			position: 'outside',
			formatter(param) {
				return param.value;
			},
			show: true,
		},
		itemStyle: {
			borderRadius: [0, 0, 0, 0],
		},
		name: seriesData?.metaData?.keyData?.x1 ?? '',
		data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
			return {
				value: seriesData?.chartData?.[key]?.x1 ?? '',
			};
		}),
	};

	const generateSeries = () => {
		const minHeight = Object.keys(seriesData?.chartData ?? 0)?.some((obj1) => {
			return seriesOption.some((obj, index) => {
				return seriesData?.chartData?.[obj1]?.[`x${index + 1}`];
			});
		})
			? 0.004
			: 0;
		return seriesOption.map((objectData, index) => {
			return {
				...seriesOptionObject,
				...objectData,
				label: {
					...(seriesOptionObject?.label ?? {}),
					...(objectData?.label ?? {}),
				},

				name: seriesName(index),
				data: Object.keys(seriesData?.chartData ?? {}).map((key, subIndex) => {
					let check = true;
					if (stackCount <= 1) {
						check = seriesOption.some((obj, checkIndex) => {
							return seriesData?.chartData?.[key]?.[`x${checkIndex + 1}`];
						});
					} else {
						const stackCal = seriesOption[index].stack;
						check = seriesOption.some((series, checkNewIndex) => {
							if (series.stack === stackCal) {
								return seriesData?.chartData?.[key]?.[`x${checkNewIndex + 1}`];
							}
							return false;
						});
					}

					return {
						value: check
							? seriesData?.chartData?.[key]?.[`x${index + 1}`] ?? ''
							: minHeight,
						...((objectData?.color ?? '') && {
							itemStyle: {
								color: determineGradient(
									seriesData,
									objectData,
									index,
									subIndex,
									key
								),
							},
						}),
						tooltip: {
							...(seriesOption[subIndex]?.tooltip ?? {}),
						},
					};
				}),
			};
		});
	};

	return (
		<EChartsReactCore
			option={{
				title: {
					...title,
				},
				dataZoom: [
					{
						type: 'inside',
						id: 'insideX',
						xAxisIndex: 0,
						start: 0,
						end: 100,
						zoomOnMouseWheel: false,
						moveOnMouseMove: false,
						moveOnMouseWheel: false,
						...dataZoom,
					},
				],

				grid: {
					containLabel: gridContainLabel,
					...gridOptions,
				},
				xAxis: {
					data: Object.keys(seriesData?.chartData ?? {}),
					show: xAxisShow,
					type: 'category',
					axisTick: {
						show: false,
						lineStyle: {
							color: determineAxesColors('tick', axisColor, theme),
						},
						...xAxisTick,
					},
					splitLine: {
						show: xSplitLineShow,
						lineStyle: {
							color: determineAxesColors('split', axisColor, theme),
							type: xSplitType,
						},
					},
					axisLabel: {
						...xAxisLabel,
						color: xAxisLabelColor ?? determineAxesColors('label', axisColor, theme),
					},
					axisLine: {
						show: xAxisShow,
						lineStyle: {
							color: xAxisLineColor ?? determineAxesColors('line', axisColor, theme),
						},
					},
					...xAxis,
				},
				legend: {
					...legend,
				},
				tooltip: {
					...tooltip,
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						show: yAxisLabelShow,
						color: yAxisLabelColor ?? determineAxesColors('label', axisColor, theme),
					},
					splitLine: {
						show: ySplitLineShow,
						lineStyle: {
							color: determineAxesColors('split', axisColor, theme),
							type: splitType,
						},
					},
					axisLine: {
						show: yAxisLineShow,
						lineStyle: {
							color: yAxisLineColor ?? determineAxesColors('line', axisColor, theme),
						},
					},
					axisTick: {
						show: yAxisTickShow,
						lineStyle: {
							color: determineAxesColors('tick', axisColor, theme),
						},
					},
					...yAxis,
				},
				series: generateSeries(),
			}}
			onEvents={onEvents}
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes(styles.root, className)}
			style={style}
		/>
	);
};

BaseVerticalBarChart.propTypes = {
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	gridOptions: PropTypes.object,
	xAxis: PropTypes.object,
	yAxis: PropTypes.object,
	xAxisShow: PropTypes.bool,
	xAxisLabel: PropTypes.object,
	tooltip: PropTypes.object,
	dataZoom: PropTypes.object,
	seriesData: PropTypes.shape({
		chartData: PropTypes.object,
		metaData: PropTypes.object,
	}),
	onEvents: PropTypes.func,
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	xSplitLineShow: PropTypes.bool,
	axisColor: PropTypes.string,
	splitType: PropTypes.string,
	xSplitType: PropTypes.string,
	barWidth: PropTypes.string,
	legend: PropTypes.object,
	xAxisTick: PropTypes.object,
	seriesName: PropTypes.func,
	cursor: PropTypes.string,
	stackCount: PropTypes.number,
	seriesOption: PropTypes.arrayOf(PropTypes.shape),
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
	theme: PropTypes.oneOf(['light', 'dark']),
};

BaseVerticalBarChart.defaultProps = {
	title: '',
	gridContainLabel: false,
	gridOptions: {
		left: 0,
		right: 0,
		bottom: 0,
		top: 5,
	},
	xAxis: {},
	yAxis: {},
	xAxisShow: true,
	xAxisLabel: {
		show: true,
		rotate: 90,
		inside: true,
		verticalAlign: 'bottom',
		padding: [0, 0, 90, 0],
	},
	tooltip: {
		trigger: 'item',
	},
	dataZoom: {},
	// dataZoom: {
	// moveOnMouseMove: true,
	// moveOnMouseWheel: true,
	// end: 80,
	// },
	seriesData: {},
	onEvents: () => {},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	xSplitLineShow: false,
	axisColor: '',
	xSplitType: 'solid',
	splitType: 'solid',
	barWidth: '50%',
	seriesName: () => {},
	legend: {
		show: true,
	},
	xAxisTick: {},
	cursor: 'default',
	stackCount: 1,
	seriesOption: [
		{
			stackIndex: 1,
		},
	],
	style: {
		width: '100%',
		height: '100%',
	},
	className: '',
	theme: 'dark',
};

export default BaseVerticalBarChart;
