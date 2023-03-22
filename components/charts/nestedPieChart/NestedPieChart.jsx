/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
// ReactEcharts from 'echarts-for-react' would import the entire bundle
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
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
import styles from './NestedPieChart.module.css';
import { classes } from '../../../utils';
import { Skeleton } from './Skeleton';

// Register the required components
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	PieChart,
	CanvasRenderer,
	LegendComponent,
]);

const NestedPieChart = (props) => {
	const {
		loading,
		title,
		gridOptions,
		tooltip,
		seriesData,
		startAngle,
		radius,
		center,
		cursor,
		showLabelLine,
		itemStyle,
		legend,
		pieSeries,
		style,
		className,
		theme,
		fallback,
	} = props;

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

	const seriesOptionObject = {
		type: 'pie',
		radius,
		center,
		legendHoverLink: false,
		avoidLabelOverlap: false,
		cursor,
		labelLine: {
			show: showLabelLine,
		},
		itemStyle: {
			...itemStyle,
		},
		label: {
			show: false,
		},
		data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
			const temp = [];
			temp.push({
				value: seriesData?.chartData?.[key],
			});
			return temp;
		}),
	};

	const generateSeries = () => {
		return pieSeries.map((objectData) => {
			let completionValue = objectData?.complete;
			return {
				...seriesOptionObject,
				...objectData,
				startAngle,
				data:
					objectData?.complete ?? 0
						? [
								...Object.keys(objectData?.seriesData?.chartData ?? {}).map(
									(key, subIndex) => {
										completionValue -=
											objectData?.seriesData?.chartData?.[key] ?? 0;
										return {
											value: objectData?.seriesData?.chartData?.[key],
											name: objectData?.seriesData?.metaData?.keyData?.[key],
											itemStyle: {
												...objectData?.seriesOption?.[subIndex]?.itemStyle,
											},
											label: {
												...objectData?.seriesOption?.[subIndex]?.label,
											},
											tooltip: {
												...objectData?.seriesOption?.[subIndex]?.tooltip,
											},
											emphasis: {
												...objectData?.seriesOption?.[subIndex]?.emphasis,
											},
										};
									}
								),
								{
									value: completionValue,
									name: '',
									itemStyle: {
										opacity: 0,
									},
									tooltip: {
										show: false,
									},
								},
						  ]
						: Object.keys(objectData?.seriesData?.chartData ?? {}).map(
								(key, subIndex) => {
									return {
										value: objectData?.seriesData?.chartData?.[key],
										name: objectData?.seriesData?.metaData?.keyData?.[key],
										itemStyle: {
											...objectData?.seriesOption?.[subIndex]?.itemStyle,
										},
										label: {
											...objectData?.seriesOption?.[subIndex]?.label,
										},
										tooltip: {
											...objectData?.seriesOption?.[subIndex]?.tooltip,
										},
										emphasis: {
											...objectData?.seriesOption?.[subIndex]?.emphasis,
										},
									};
								}
						  ),
			};
		});
	};

	return (
		<EChartsReactCore
			option={{
				title: {
					text: title,
				},
				...gridOptions,
				tooltip: {
					...tooltip,
				},
				legend: {
					...legend,
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

NestedPieChart.propTypes = {
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	title: PropTypes.string,
	gridOptions: PropTypes.object,
	tooltip: PropTypes.object,
	seriesData: PropTypes.shape({
		chartData: PropTypes.object,
		metaData: PropTypes.object,
	}),
	startAngle: PropTypes.number,
	cursor: PropTypes.string,
	radius: PropTypes.arrayOf(PropTypes.string),
	center: PropTypes.arrayOf(PropTypes.string),
	showLabelLine: PropTypes.bool,
	itemStyle: PropTypes.object,
	legend: PropTypes.object,
	pieSeries: PropTypes.arrayOf(PropTypes.shape),
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
	theme: PropTypes.oneOf(['light', 'dark']),
};

NestedPieChart.defaultProps = {
	loading: false,
	fallback: false,
	title: '',
	gridOptions: {
		left: 0,
		right: 0,
		bottom: 20,
		top: 10,
	},
	tooltip: {
		trigger: 'item',
	},
	seriesData: {},
	startAngle: 90,
	cursor: 'default',
	radius: ['30%', '60%'],
	center: ['50%', '50%'],
	showLabelLine: false,
	itemStyle: {
		borderWidth: 0,
	},
	legend: {
		top: '80%',
		left: '30%',
		orient: 'vertical',
	},
	pieSeries: [
		{
			seriesOption: {
				stackIndex: 1,
			},
		},
	],
	style: {
		width: '100%',
		height: '100%',
	},
	className: '',
	theme: 'dark',
};

export default NestedPieChart;
