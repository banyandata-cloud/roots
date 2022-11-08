import PropTypes, { string } from 'prop-types';
// import { classes } from '../../../../utils';
import ReactEcharts from 'echarts-for-react';
// import styles from './BaseVerticalChart.module.css';

const BaseVerticalChart = (props) => {
	const {
		title,
		gridContainLabel,
		xAxisShow,
		yAxisId,
		yAxisLabelShow,
		ySplitLineShow,
		yAxisLineShow,
		yAxisTickShow,
		yAxisType,
		seriesData,
		barWidth,
		barColor,
		showBarBackground,
		backgroudColor,
		showLabel,
		labelColor,
		cursor,
	} = props;
	return (
		<ReactEcharts
			option={{
				grid: {
					containLabel: gridContainLabel,
				},
				title: {
					text: title,
				},
				xAxis: {
					show: xAxisShow,
					data: Object.keys(seriesData[0]),
				},
				yAxis: {
					id: yAxisId,
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
					data: [],
					gridIndex: 0,
					type: yAxisType,
				},
				color: barColor,
				series: [
					{
						type: 'bar',
						data: Object.keys(seriesData[0]).map((key) => {
							return seriesData[0][key];
						}),
						barWidth,
						cursor,
						showBackground: showBarBackground,
						backgroundStyle: {
							color: backgroudColor,
						},
						label: {
							show: showLabel,
							color: labelColor,
							position: 'insideBottomLeft',
							offset: [0, -10],
							rotate: 90,
							formatter(params) {
								return params.name;
							},
						},
					},
				],
			}}
			style={{
				width: '100%',
				height: '100vh',
			}}
		/>
	);
};

BaseVerticalChart.propTypes = {
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	xAxisShow: PropTypes.bool,
	yAxisId: PropTypes.string,
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	yAxisType: PropTypes.string,
	seriesData: PropTypes.arrayOf(string),
	barWidth: PropTypes.string,
	barColor: PropTypes.string,
	showBarBackground: PropTypes.bool,
	backgroudColor: PropTypes.string,
	showLabel: PropTypes.bool,
	labelColor: PropTypes.string,
	cursor: PropTypes.string,
};

BaseVerticalChart.defaultProps = {
	title: '',
	gridContainLabel: false,
	xAxisShow: false,
	yAxisId: '',
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	yAxisType: PropTypes.oneOf(['value', 'category', 'time', 'log']),
	seriesData: [0],
	barWidth: '50%',
	barColor: 'green',
	showBarBackground: true,
	backgroudColor: 'red',
	showLabel: true,
	labelColor: 'black',
	cursor: 'default',
};

export default BaseVerticalChart;
