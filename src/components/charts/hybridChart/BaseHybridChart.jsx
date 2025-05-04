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

import styles from './BaseHybridChart.module.css';
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

const BaseHybridChart = (props) => {
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
		seriesOption,
		style,
		className,
	} = props;

	const seriesOptionObject = {
		type: 'bar',
		barWidth,
		cursor,
		stack: false,
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
		return (seriesData?.chartData ?? {}).map((chart, index) => {
			const { type } = chart;
			return {
				...seriesOptionObject,
				...seriesOption[index],
				type,
				label: {
					...seriesOptionObject.label,
					...seriesOption[index].label,
				},
				data: Object.keys(chart.data ?? {})
					.map((key) => {
						return type === 'line' ? chart.data?.[key] ?? [] : chart.data?.[key]?.x1;
					})
					.flat(),
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
					data: Object.keys(seriesData?.chartData[0].data ?? {}),
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
			className={classes(styles.root, className)}
			style={style}
		/>
	);
};

BaseHybridChart.propTypes = {
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
	seriesOption: PropTypes.arrayOf(PropTypes.shape),
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
};

BaseHybridChart.defaultProps = {
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

export default BaseHybridChart;
