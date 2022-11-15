import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import styles from './BaseHorizontalChart.module.css';
import { classes } from '../../../utils';

const BaseHorizontalChart = (props) => {
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
		stack: 'total',
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
					...objectData.label,
				},
				data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
					return seriesData?.chartData?.[key]?.[`x${index + 1}`];
				}),
			};
		});
	};
	return (
		<ReactEcharts
			option={{
				title: {
					text: title,
				},

				grid: {
					containLabel: gridContainLabel,
					height,
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
			className={classes(className, styles.root)}
			style={style}
		/>
	);
};

BaseHorizontalChart.propTypes = {
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	height: PropTypes.string,
	xAxisShow: PropTypes.bool,
	seriesData: PropTypes.objectOf(PropTypes.shape),
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	barWidth: PropTypes.string,
	cursor: PropTypes.string,
	seriesOption: PropTypes.objectOf(PropTypes.shape),
	style: PropTypes.objectOf(PropTypes.shape),
	className: PropTypes.string,
};

BaseHorizontalChart.defaultProps = {
	title: '',
	gridContainLabel: false,
	height: '60%',
	xAxisShow: false,
	seriesData: {},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	barWidth: '50%',
	cursor: 'default',
	seriesOption: [],
	style: {
		width: '100%',
		height: '100%',
	},
	className: '',
};

export default BaseHorizontalChart;
