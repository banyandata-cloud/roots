import PropTypes, { string } from 'prop-types';
// import { classes } from '../../../../utils';
import ReactEcharts from 'echarts-for-react';
// import styles from '../BaseVerticalStackedChart.module.css';

const BaseVerticalStackedChart = (props) => {
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
					data: Object.keys(seriesData[0]),
					show: xAxisShow,
					type: 'category',
				},
				yAxis: {
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
							position: 'insideBottomLeft',
							offset: [0, -10],
							rotate: 90,
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
						type: 'bar',
						barWidth,
						stack: 'total',
						cursor,
						color: secondStackColor,
						groupPadding: 3,
						label: {
							color: secondStackLabelColor,
							position: 'insideBottomRight',
							offset: [-80, -16],
							formatter(params) {
								return `${params.value}%`;
							},
							show: false,
						},
						data: Object.keys(seriesData[0]).map((key) => {
							return seriesData[0][key].NC;
						}),
					},
					{
						type: 'bar',
						stack: 'total',
						barWidth,
						cursor,
						color: thirdStackColor,
						groupPadding: 3,
						avoidLabelOverlap: true,
						label: {
							color: thirdStackLabelColor,
							position: 'insideBottomRight',
							offset: [0, -16],
							formatter(params) {
								return `${params.value}%`;
							},
							show: false,
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

BaseVerticalStackedChart.propTypes = {
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	height: PropTypes.string,
	xAxisShow: PropTypes.bool,
	seriesData: PropTypes.arrayOf(string),
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

BaseVerticalStackedChart.defaultProps = {
	title: '',
	gridContainLabel: false,
	height: '60%',
	xAxisShow: false,
	seriesData: [0],
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

export default BaseVerticalStackedChart;
