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
import styles from './BasePieChart.module.css';
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

const BasePieChart = (props) => {
	const {
		loading,
		title,
		gridOptions,
		tooltip,
		seriesData,
		startAngle,
		semiDoughnut,
		radius,
		center,
		cursor,
		showLabelLine,
		itemStyle,
		legend,
		onEvents,
		seriesOption,
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
		let semiDoughnutValue = 0;
		return {
			...seriesOptionObject,
			...seriesOption,
			startAngle: semiDoughnut ? 180 : startAngle,
			data: semiDoughnut
				? [
						...Object.keys(seriesData?.chartData ?? {}).map((key, subIndex) => {
							semiDoughnutValue += seriesData?.chartData?.[key] ?? 0;
							return {
								value: seriesData?.chartData?.[key],
								name: seriesData?.metaData?.keyData[key],
								itemStyle: {
									...(seriesOption?.[subIndex]?.itemStyle ?? {}),
								},
								label: {
									...seriesOption?.[subIndex]?.label,
								},
								tooltip: {
									...seriesOption?.[subIndex]?.tooltip,
								},
								emphasis: {
									...seriesOption?.[subIndex]?.emphasis,
								},
							};
						}),
						{
							value: semiDoughnutValue,
							name: '',
							itemStyle: {
								opacity: 0,
							},
							tooltip: {
								show: false,
							},
						},
				  ]
				: Object.keys(seriesData?.chartData ?? {}).map((key, subIndex) => {
						return {
							value: seriesData?.chartData?.[key],
							name: seriesData?.metaData?.keyData?.[key],
							itemStyle: {
								...seriesOption?.[subIndex]?.itemStyle,
							},
							label: {
								...seriesOption?.[subIndex]?.label,
							},
							tooltip: {
								...seriesOption?.[subIndex]?.tooltip,
							},
							emphasis: {
								...seriesOption?.[subIndex]?.emphasis,
							},
						};
				  }),
		};
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
			onEvents={onEvents}
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes(styles.root, className)}
			style={style}
		/>
	);
};

BasePieChart.propTypes = {
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
	semiDoughnut: PropTypes.bool,
	cursor: PropTypes.string,
	radius: PropTypes.arrayOf(PropTypes.string),
	center: PropTypes.arrayOf(PropTypes.string),
	showLabelLine: PropTypes.bool,
	itemStyle: PropTypes.object,
	legend: PropTypes.object,
	onEvents: PropTypes.func,
	seriesOption: PropTypes.arrayOf(PropTypes.shape),
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
	theme: PropTypes.oneOf(['light', 'dark']),
};

BasePieChart.defaultProps = {
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
	semiDoughnut: true,
	cursor: 'default',
	radius: ['30%', '60%'],
	center: ['50%', '50%'],
	showLabelLine: false,
	itemStyle: {
		borderWidth: 5,
		borderColor: 'white',
		borderType: 'solid',
	},
	legend: {
		top: '80%',
		left: '30%',
		orient: 'vertical',
	},
	onEvents: () => {},
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

export default BasePieChart;
