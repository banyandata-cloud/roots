/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-tabs */
import PropTypes from 'prop-types';
// ReactEcharts from 'echarts-for-react' would import the entire bundle
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
	GridComponent,
	TooltipComponent,
	TitleComponent,
	DatasetComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
	CanvasRenderer,
	// SVGRenderer,
} from 'echarts/renderers';
import styles from './BaseVerticalBarChart.module.css';
import { classes } from '../../../utils';

// Register the required components
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	BarChart,
	CanvasRenderer,
]);

const BaseVerticalBarChart = (props) => {
	const {
		title,
		gridContainLabel,
		gridOptions,
		xAxisShow,
		seriesData,
		onEvents,
		yAxisLabelShow,
		ySplitLineShow,
		yAxisLineShow,
		yAxisTickShow,
		axisColor,
		barWidth,
		cursor,
		legend,
		tooltip,
		seriesName,
		stacked,
		seriesOption,
		style,
		className,
	} = props;

	const seriesOptionObject = {
		type: 'bar',
		barWidth: stacked ? barWidth : barWidth / (seriesOption?.length ?? 1),
		cursor,
		stack: stacked,
		groupPadding: 3,
		showBackground: true,
		backgroundStyle: {
			color: 'whitesmoke',
		},
		label: {
			color: 'black',
			position: 'insideBottomLeft',
			offset: [0, -10],
			rotate: 90,
			formatter(param) {
				return param.value;
			},
			show: true,
		},
		itemStyle: {
			borderRadius: [0, 2, 2, 0],
		},
		name: seriesData?.metaData?.keyData?.x1 ?? '',
		data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
			return {
				value: seriesData?.chartData?.[key]?.x1 ?? '',
			};
		}),
	};

	const generateSeries = () => {
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
					return {
						value: seriesData?.chartData?.[key]?.[`x${index + 1}`] ?? '',
						itemStyle: {
							color: (objectData?.barColor?.[subIndex] ?? '') || (objectData?.color ?? ''),
						},
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
					text: title,
				},
				grid: {
					containLabel: gridContainLabel,
					...gridOptions,
				},
				xAxis: {
					data: Object.keys(seriesData?.chartData ?? {}),
					show: xAxisShow,
					type: 'category',
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
						color: axisColor,
					},
					splitLine: {
						show: ySplitLineShow,
						lineStyle: {
							color: axisColor,
							type: 'dashed',
						},
					},
					axisLine: {
						show: yAxisLineShow,
					},
					axisTick: {
						show: yAxisTickShow,
					},
				},
				series: generateSeries(),
			}}
			onEvents={onEvents}
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes(className, styles.root)}
			style={style}
		/>
	);
};

BaseVerticalBarChart.propTypes = {
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	gridOptions: PropTypes.object,
	xAxisShow: PropTypes.bool,
	tooltip: PropTypes.object,
	seriesData: PropTypes.shape({
		chartData: PropTypes.object,
		metaData: PropTypes.object,
	}),
	onEvents: PropTypes.func,
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	axisColor: PropTypes.string,
	barWidth: PropTypes.string,
	legend: PropTypes.object,
	seriesName: PropTypes.func,
	cursor: PropTypes.string,
	stacked: PropTypes.bool,
	seriesOption: PropTypes.arrayOf(PropTypes.shape),
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
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
	xAxisShow: false,
	tooltip: {
		trigger: 'item',
	},
	seriesData: {},
	onEvents: () => {},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	axisColor: 'grey',
	barWidth: '50%',
	seriesName: () => {},
	legend: {
		show: true,
	},
	cursor: 'default',
	stacked: true,
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
};

export default BaseVerticalBarChart;
