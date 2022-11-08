import PropTypes from 'prop-types';
// import { classes } from '../../../../utils';
import ReactEcharts from 'echarts-for-react';
// import styles from '../BaseHorizontalStackedChart.module.css';

const BaseHorizontalStackedChart = (props) => {
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
		barLabel,
		firstStackColor,
		firstStackLabelColor,
		secondStackColor,
		secondStackLabelColor,
		thirdStackColor,
		thirdStackLabelColor,
		cursor,
	} = props;
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
					data: Object.keys(seriesData[0]),
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
				series: [
					{
						color: firstStackColor,
						type: 'bar',
						barWidth,
						cursor,
						stack: 'total',
						groupPadding: 3,
						label: {
							color: firstStackLabelColor,
							position: [0, -16],
							formatter(param) {
								return param.name;
							},
							show: barLabel,
						},
						itemStyle: {
							borderRadius: [0, 2, 2, 0],
						},
						data: Object.keys(seriesData[0]).map((key) => {
							return seriesData[0][key].C;
						}),
					},
					{
						color: secondStackColor,
						type: 'bar',
						barWidth,
						cursor,
						stack: 'total',
						groupPadding: 3,
						label: {
							show: false,
							position: 'insideBottomRight',
							offset: [-80, -16],
							color: secondStackLabelColor,
						},
						itemStyle: {
							borderRadius: [0, 2, 2, 0],
						},
						data: Object.keys(seriesData[0]).map((key) => {
							return seriesData[0][key].NC;
						}),
					},
					{
						color: thirdStackColor,
						type: 'bar',
						barWidth,
						cursor,
						stack: 'total',
						groupPadding: 3,
						avoidLabelOverlap: true,
						label: {
							show: false,
							position: 'insideBottomRight',
							offset: [0, -16],
							color: thirdStackLabelColor,
						},
						data: Object.keys(seriesData[0]).map((key) => {
							return seriesData[0][key].V;
						}),
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

BaseHorizontalStackedChart.propTypes = {
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
	barLabel: PropTypes.bool,
	firstStackColor: PropTypes.string,
	firstStackLabelColor: PropTypes.string,
	secondStackColor: PropTypes.string,
	secondStackLabelColor: PropTypes.string,
	thirdStackColor: PropTypes.string,
	thirdStackLabelColor: PropTypes.string,
	cursor: PropTypes.string,
};

BaseHorizontalStackedChart.defaultProps = {
	title: '',
	gridContainLabel: false,
	height: '60%',
	xAxisShow: false,
	seriesData: [],
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	barWidth: '50%',
	barLabel: true,
	firstStackColor: 'green',
	firstStackLabelColor: 'black',
	secondStackColor: 'red',
	secondStackLabelColor: 'black',
	thirdStackColor: 'gold',
	thirdStackLabelColor: 'black',
	cursor: 'default',
};

export default BaseHorizontalStackedChart;
