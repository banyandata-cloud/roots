import PropTypes from 'prop-types';
// import { classes } from '../../../../utils';
import ReactEcharts from 'echarts-for-react';
// import styles from '../BaseHorizontalChart.module.css';

const builderJson = {
	all: 100,
	total: 135666,
	charts: {
	  Settings: 20,
	  Authorization: 10,
	  'High Availability': 20,
	  Authentication: 40,
	  'Patches and Plugins': 10,
	},
  };

const BaseHorizontalChart = (props) => {
	const {
		title,
		gridContainLabel,
		height,
		xAxisShow,
		yAxisData,
		yAxisLabelShow,
		ySplitLineShow,
		yAxisLineShow,
		yAxisTickShow,
		barWidth,
		firstStackColor,
		firstStackLabelColor,
		secondStackColor,
		secondStackLabelColor,
		thirdStackLabelColor,
	} = props;
return <ReactEcharts
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
				   data: Object.keys(yAxisData),
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
						stack: 'total',
						groupPadding: 3,
						label: {
						  color: firstStackLabelColor,
						  position: [0, -15],
						  formatter(param) { return param.name; },
						  show: true,
						},
						itemStyle: {
							borderRadius: [0, 2, 2, 0],
						},
						data: Object.keys(yAxisData).map((key) => {
							return yAxisData[key];
						}),
					},
					{
						type: 'bar',
						barWidth,
						stack: 'total',
						color: secondStackColor,
						groupPadding: 3,
						label: {
							show: true,
							position: 'insideBottomRight',
							offset: [-70, -15],
							color: secondStackLabelColor,
							formatter(params) { return `${builderJson.all - params.value}%`; },
						},
						data: Object.keys(yAxisData).map((key) => {
							return builderJson.all - yAxisData[key];
						}),
					},
					{
						type: 'bar',
						stack: 'total',
						barWidth,
						groupPadding: 3,
						avoidLabelOverlap: true,
						label: {
							show: true,
							position: 'insideBottomRight',
							offset: [0, -15],
							color: thirdStackLabelColor,
							formatter() { return builderJson.total; },
						},
						data: Object.keys(yAxisData).map(() => {
							return 0;
						}),
					},
				],
			}}
		style={{
 				width: '100%', height: '100vh',
			}}
		/>;
};

BaseHorizontalChart.propTypes = {
	title: PropTypes.string,
	gridContainLabel: PropTypes.bool,
	height: PropTypes.string,
	xAxisShow: PropTypes.bool,
	yAxisData: PropTypes.objectOf(PropTypes.shape),
	yAxisLabelShow: PropTypes.bool,
	ySplitLineShow: PropTypes.bool,
	yAxisLineShow: PropTypes.bool,
	yAxisTickShow: PropTypes.bool,
	barWidth: PropTypes.string,
	firstStackColor: PropTypes.string,
	firstStackLabelColor: PropTypes.string,
	secondStackColor: PropTypes.string,
	secondStackLabelColor: PropTypes.string,
	thirdStackLabelColor: PropTypes.string,
};

BaseHorizontalChart.defaultProps = {
	title: '',
	gridContainLabel: false,
	height: '60%',
	xAxisShow: false,
	yAxisData: {},
	yAxisLabelShow: false,
	ySplitLineShow: false,
	yAxisLineShow: false,
	yAxisTickShow: false,
	barWidth: '40%',
	firstStackColor: 'green',
	firstStackLabelColor: 'black',
	secondStackColor: 'whitesmoke',
	secondStackLabelColor: 'grey',
	thirdStackLabelColor: 'black',
};

export default BaseHorizontalChart;
