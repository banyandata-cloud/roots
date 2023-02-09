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
		title,
		gridOptions,
		gridContainLabel,
		seriesData,
		tooltip,
		legendShow,
		xAxisShow,
		yAxisLabelShow,
		ySplitLineShow,
		yAxisLineShow,
		yAxisTickShow,
		seriesOption,
		lineStyleWidth,
		lineStyleType,
		lineStyleCap,
		lineStyleJoin,
		stacked,
		cursor,
		smooth,
		style,
		className,
	} = props;

	const seriesOptionObject = {
		type: 'line',
		color: 'blue',
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
			color: 'lightblue',
			origin: 'auto',
			shadowBlur: 0,
			shadowColor: 'white',
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			opacity: 1,
		},
		emphasis: {
			focus: 'series',
		},
		data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
			return seriesData?.chartData?.[key] ?? '';
		}),
	};

	const generateSeries = () => {
		return seriesOption.map((objectData, index) => {
			return {
				...seriesOptionObject,
				...objectData,
				name: Object.keys(seriesData?.chartData ?? {})?.[index] ?? '',
				label: {
					...seriesOptionObject?.label ?? {},
					...objectData?.label ?? {},
				},
				lineStyle: {
					...seriesOptionObject?.lineStyle ?? {},
					...objectData?.lineStyle ?? {},
				},
				areaStyle: {
					...seriesOptionObject?.areaStyle ?? {},
					...objectData?.areaStyle ?? {},
				},
				emphasis: {
					...seriesOptionObject?.emphasis ?? {},
					...objectData?.emphasis ?? {},
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
					show: legendShow,
					data: Object.keys(seriesData?.chartData ?? []),
				},
				xAxis: [
					{
						type: 'category',
						show: xAxisShow,
						boundaryGap: false,
						data: seriesData?.metaData?.xAxisData ?? [],
					},
				],
				yAxis: [
					{
						type: 'value',
						axisLabel: {
							show: yAxisLabelShow,
						},
						splitLine: {
							show: ySplitLineShow,
						},
						axisLine: {
							show: yAxisLineShow,
						},
						axisTick: {
							show: yAxisTickShow,
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
	title: PropTypes.string,
	gridOptions: PropTypes.object,
	gridContainLabel: PropTypes.bool,
	tooltip: PropTypes.object,
	legendShow: PropTypes.bool,
	xAxisShow: PropTypes.bool,
	seriesData: PropTypes.objectOf(PropTypes.shape),
	stacked: PropTypes.bool,
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	cursor: PropTypes.string,
	seriesOption: PropTypes.arrayOf(PropTypes.object),
	lineStyleWidth: PropTypes.number,
	lineStyleType: PropTypes.oneOf(['dashed', 'solid', 'dotted']),
	lineStyleCap: PropTypes.oneOf(['butt', 'round', 'square']),
	lineStyleJoin: PropTypes.oneOf(['round', 'bevel', 'miter']),
	smooth: PropTypes.bool,
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
};

BaseAreaChart.defaultProps = {
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
	legendShow: false,
	xAxisShow: false,
	seriesData: {},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	cursor: 'default',
	seriesOption: [],
	lineStyleWidth: 4,
	lineStyleType: 'solid',
	lineStyleCap: 'butt',
	lineStyleJoin: 'round',
	smooth: false,
	style: {
		width: '100%',
		height: '100%',
	},
	className: '',
};

export default BaseAreaChart;
