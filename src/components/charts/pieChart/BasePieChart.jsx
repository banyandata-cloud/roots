/* eslint-disable react/forbid-prop-types */
// ReactEcharts from 'echarts-for-react' would import the entire bundle
import EChartsReactCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import {
	DatasetComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
import PropTypes from 'prop-types';
import { classes } from '../../../utils';
import { PieChartIcon } from '../../icons';
import styles from './BasePieChart.module.css';

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
		title = '',
		gridOptions = {
			left: 0,
			right: 0,
			bottom: 20,
			top: 10,
		},
		tooltip = {
			trigger: 'item',
		},
		seriesData = {},
		startAngle = 90,
		semiDoughnut = true,
		radius = ['30%', '60%'],
		center = ['50%', '50%'],
		cursor = 'default',
		showLabelLine = false,
		itemStyle = {
			borderWidth: 5,
			borderColor: 'white',
			borderType: 'solid',
		},
		legend = {
			top: '80%',
			left: '30%',
			orient: 'vertical',
		},
		onHoverLegend = () => {},
		onEvents = () => {},
		seriesOption = [
			{
				stackIndex: 1,
			},
		],
		seriesOptionUpdate = {},
		style = {
			width: '100%',
			height: '100%',
		},
		className = '',
		isEmpty = {
			show: false,
			className: '',
			title: 'No Data Found',
			description: '',
		},
	} = props;

	if (isEmpty?.show) {
		return (
			<div
				className={classes(
					'bn-flex bn-flex-row bn-justify-center bn-items-center bn-gap-4 bn-h-[90%]',
					isEmpty?.className
				)}>
				<div className={styles.icon}>
					<PieChartIcon />
				</div>
				<div className='bn-flex bn-flex-col bn-justify-start bn-items-start bn-gap-4'>
					<div className='bn-font-poppins bn-text-[1.75rem] bn-font-semibold bn-leading-[1.875rem]'>
						{isEmpty?.title ?? 'No Data Found'}
					</div>
					<div className='bn-font-poppins bn-text-[1.25rem] bn-font-normal bn-leading-[1.3125rem]'>
						{isEmpty?.description}
					</div>
				</div>
			</div>
		);
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
			...seriesOptionUpdate,
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

	const onChartReady = (chart) => {
		chart.on('highlight', (e) => {
			onHoverLegend('onmouseover', e);
		});
		chart.on('downplay', (e) => {
			onHoverLegend('onmouseout', e);
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
			onEvents={onEvents}
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes('bn-w-full', className)}
			onChartReady={onChartReady}
			style={style}
		/>
	);
};

BasePieChart.propTypes = {
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
};

export default BasePieChart;
