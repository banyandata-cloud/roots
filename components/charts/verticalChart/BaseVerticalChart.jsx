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

import styles from './BaseVerticalChart.module.css';
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

const BaseVerticalChart = (props) => {
	const {
		title,
		gridContainLabel,
		height,
		xAxisShow,
		seriesData,
		yAxisLabelShow,
		ySplitLineShow,
		yAxisLineShow,
		yAxisTickShow,
		axisColor,
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
					...objectData.label,
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
					height,
				},
				xAxis: {
					data: Object.keys(seriesData?.chartData ?? {}),
					show: xAxisShow,
					type: 'category',
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
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes(className, styles.root)}
			style={style}
		/>
	);
};

BaseVerticalChart.propTypes = {
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	height: PropTypes.string,
	xAxisShow: PropTypes.bool,
	seriesData: PropTypes.objectOf(PropTypes.shape),
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	axisColor: PropTypes.string,
	barWidth: PropTypes.string,
	cursor: PropTypes.string,
	stacked: PropTypes.bool,
	seriesOption: PropTypes.arrayOf(PropTypes.shape),
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
};

BaseVerticalChart.defaultProps = {
	title: '',
	gridContainLabel: false,
	height: '60%',
	xAxisShow: false,
	seriesData: {},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	axisColor: 'grey',
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

export default BaseVerticalChart;
