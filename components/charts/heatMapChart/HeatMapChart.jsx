/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-tabs */
import PropTypes from 'prop-types';
// ReactEcharts from 'echarts-for-react' would import the entire bundle
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { HeatmapChart } from 'echarts/charts';
import {
	GridComponent,
	TooltipComponent,
	TitleComponent,
	DatasetComponent,
	LegendComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
	CanvasRenderer,
	// SVGRenderer,
} from 'echarts/renderers';
import styles from './HeatMapChart.module.css';
import { classes } from '../../../utils';

// Register the required components
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	LegendComponent,
	HeatmapChart,
	CanvasRenderer,
]);

const HeatMapChart = (props) => {
	const {
		title,
		gridContainLabel,
		gridOptions,
		xAxisLabel,
		seriesData,
		onEvents,
		xSplitLineShow,
		xAxisLineShow,
		xAxisTickShow,
		yAxisLabelShow,
		ySplitLineShow,
		yAxisLineShow,
		yAxisTickShow,
		axisColor,
		tooltip,
		seriesName,
		seriesOption,
		visualMap,
		defaultColor,
		style,
		className,
	} = props;

	const seriesOptionObject = {
		type: 'heatmap',
		label: {
			show: true,
		},
		itemStyle: {
			borderWidth: 0,
			borderColor: 'white',
		},
		emphasis: {
			itemStyle: {
				shadowBlur: 10,
				shadowColor: 'rgba(0, 0, 0, 0.5)',
			},
		},
		name: seriesData?.metaData?.seriesDetails?.id ?? '',
		data: [],
	};
	const generateXAxis = () => {
		const row = Math.floor(Math.sqrt(seriesData.length));
		const xAxis = [];
		for (let i = 0; i < row; i++) {
			xAxis.push(i);
		}
		return xAxis;
	};

	const generateYAxis = () => {
		const col = Math.ceil(Math.sqrt(seriesData.length));
		const yAxis = [];
		for (let i = 0; i < col; i++) {
			yAxis.push(i);
		}
		return yAxis;
	};

	const generateSeries = () => {
		const newSeriesData = Object.keys(seriesData?.chartData ?? {}).map((ob) => {
			return {
				name: ob,
				value: seriesData.chartData[ob].x1,
			};
		});

		const row = 7;
		const col = 7;

		const dataNew = [];

		for (let i = row, k = 0; i > 0; i--) {
			for (let j = 0; j < col; j++, k++) {
				dataNew.push({
					name: newSeriesData?.[k]?.name ?? '',
					value: [j, i, newSeriesData?.[k]?.value ?? -1],
					...((newSeriesData?.[k]?.value ?? -1) === -1
						? {
								itemStyle: {
									color: defaultColor,
								},
								emphasis: {
									disabled: true,
								},
						  }
						: {}),
				});
			}
		}
		return [
			{
				...seriesOptionObject,
				...seriesOption,
				label: {
					...(seriesOptionObject?.label ?? {}),
					...(seriesOption?.label ?? {}),
				},
				itemStyle: {
					...(seriesOptionObject?.itemStyle ?? {}),
					...(seriesOption?.itemStyle ?? {}),
				},
				name: seriesName,
				data: dataNew,
			},
		];
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
					data: generateXAxis(),
					type: 'category',
					axisLabel: {
						...xAxisLabel,
					},
					splitLine: {
						show: xSplitLineShow,
					},
					axisLine: {
						show: xAxisLineShow,
					},
					axisTick: {
						show: xAxisTickShow,
					},
					splitArea: {
						show: true,
					},
				},

				tooltip: {
					...tooltip,
				},
				yAxis: {
					data: generateYAxis(),
					type: 'category',
					splitArea: {
						show: true,
					},
					axisLabel: {
						show: yAxisLabelShow,
						color: axisColor,
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
				visualMap: {
					...visualMap,
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

HeatMapChart.propTypes = {
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	gridOptions: PropTypes.object,
	xAxisLabel: PropTypes.object,
	tooltip: PropTypes.object,
	seriesData: PropTypes.object,
	onEvents: PropTypes.func,
	xSplitLineShow: PropTypes.bool,
	xAxisLineShow: PropTypes.bool,
	xAxisTickShow: PropTypes.bool,
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	axisColor: PropTypes.string,
	seriesName: PropTypes.string,
	visualMap: PropTypes.shape({}),
	seriesOption: PropTypes.shape({}),
	style: PropTypes.objectOf(PropTypes.shape),
	defaultColor: PropTypes.string,
	className: PropTypes.string,
};

HeatMapChart.defaultProps = {
	title: '',
	gridContainLabel: false,
	gridOptions: {
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
	},
	xAxisLabel: {},
	tooltip: {
		position: 'top',
	},
	seriesData: {},
	onEvents: () => {},
	yAxisLabelShow: false,
	xSplitLineShow: false,
	xAxisLineShow: false,
	xAxisTickShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	axisColor: '',
	visualMap: {},
	seriesName: '',
	seriesOption: {
		label: {
			show: true,
		},
	},
	defaultColor: 'grey',
	style: {
		width: '100%',
		height: '100%',
	},
	className: '',
};

export default HeatMapChart;
