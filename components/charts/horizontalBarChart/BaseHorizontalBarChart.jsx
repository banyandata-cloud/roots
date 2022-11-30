/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
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
import styles from './BaseHorizontalBarChart.module.css';
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

const BaseHorizontalBarChart = (props) => {
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
		barWidth,
		cursor,
		stacked,
		seriesOption,
		style,
		className,
	} = props;

	const seriesOptionObject = {
		type: 'bar',
		barWidth: stacked ? barWidth : barWidth / seriesOption.length,
		cursor,
		stack: stacked,
		groupPadding: 3,
		showBackground: true,
		backgroundStyle: {
			color: 'whitesmoke',
		},
		label: {
			color: 'black',
			position: [0, -16],
			formatter(param) {
				return param.value;
			},
			show: true,
		},
		itemStyle: {
			borderRadius: [0, 2, 2, 0],
		},
		data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
			return seriesData?.chartData?.[key]?.x1;
		}),
	};

	const generateSeries = () => {
		return seriesOption.map((objectData, index) => {
			return {
				...seriesOptionObject,
				...objectData,
				label: {
					...seriesOptionObject.label,
					...(objectData?.label ?? {}),
				},
				data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
					return seriesData?.chartData?.[key]?.[`x${index + 1}`];
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
					show: xAxisShow,
					type: 'value',
				},
				yAxis: {
					data: Object.keys(seriesData?.chartData ?? {}),
					type: 'category',
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
					inverse: true,
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

BaseHorizontalBarChart.propTypes = {
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	gridOptions: PropTypes.object,
	xAxisShow: PropTypes.bool,
	seriesData: PropTypes.shape({
		chartData: PropTypes.object,
		metaData: PropTypes.object,
	}),
	onEvents: PropTypes.object,
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	barWidth: PropTypes.string,
	cursor: PropTypes.string,
	stacked: PropTypes.bool,
	seriesOption: PropTypes.objectOf(PropTypes.shape),
	style: PropTypes.object,
	className: PropTypes.string,
};

BaseHorizontalBarChart.defaultProps = {
	title: '',
	gridContainLabel: false,
	gridOptions: {
		left: 0,
		right: 0,
		bottom: 0,
		top: 5,
	},
	xAxisShow: false,
	seriesData: {},
	onEvents: {},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	barWidth: '50%',
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

export default BaseHorizontalBarChart;
