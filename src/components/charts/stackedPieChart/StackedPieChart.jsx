// ReactEcharts from 'echarts-for-react' would import the entire bundle
import EChartsReactCore from 'echarts-for-react/lib/core';
import { BarChart } from 'echarts/charts';
import {
	GridComponent,
	LegendComponent,
	PolarComponent,
	TitleComponent,
	TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
import { COLORS } from '../../../styles';
import { classes } from '../../../utils';
import { StackedPieChartIcon } from '../../icons';
// import styles from './StackedPieChart.module.css';

// Register the required components
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	LegendComponent,
	PolarComponent,
	BarChart,
	CanvasRenderer,
]);

const determineGradient = (seriesData, objectData, index, subIndex, key) => {
	if (seriesData?.chartData?.[key]?.[`x${index + 1}`]) {
		if (typeof (objectData?.color ?? '' ?? {}) !== 'string') {
			return new echarts.graphic.LinearGradient(
				...((objectData?.barColor?.[subIndex] ?? '') || (objectData?.color ?? ''))
			);
		}
		return (objectData?.barColor?.[subIndex] ?? '') || (objectData?.color ?? '');
	}
	return '';
};

const StackedPieChart = (props) => {
	const {
		title = '',
		gridContainLabel = false,
		gridOptions = {
			left: 0,
			right: 0,
			bottom: 0,
			top: 5,
		},
		seriesData = {},
		onEvents = () => {},
		barWidth = '50%',
		cursor = 'default',
		legend = {
			show: true,
		},
		tooltip = {
			trigger: 'item',
		},
		polar = {},
		radius = ['20%', '70%'],
		center = ['50%', '50%'],
		angleAxis = {
			type: 'category',
			boundaryGap: ['40%', '20%'],
			axisLine: {
				show: false,
			},
			axisLabel: {
				show: false,
			},
			axisTick: {
				show: false,
			},
		},
		radiusAxis = {
			axisLine: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: false,
			},
		},
		seriesName = () => {},
		stackCount = 1,
		seriesOption = [
			{
				stackIndex: 1,
			},
		],
		style = {
			width: '100%',
			height: '100%',
		},
		className = '',
		theme = 'dark',
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
					<StackedPieChartIcon />
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
		type: 'bar',
		barWidth,
		cursor,
		stack: stackCount,
		showBackground: true,
		backgroundStyle: {
			color: 'whitesmoke',
		},
		coordinateSystem: 'polar',
		label: {
			color: theme === 'dark' ? COLORS.white : COLORS.black,
			position: 'outside',
			formatter(param) {
				return param.value;
			},
			show: true,
		},
		itemStyle: {
			borderRadius: [0, 0, 0, 0],
		},
		name: seriesData?.metaData?.keyData?.x1 ?? '',
		data: Object.keys(seriesData?.chartData ?? {}).map((key) => {
			return {
				value: seriesData?.chartData?.[key]?.x1 ?? '',
			};
		}),
	};

	const generateSeries = () => {
		return seriesOption.map((objectData, index) => {
			return {
				...seriesOptionObject,
				...objectData,
				label: {
					...(seriesOptionObject?.label ?? {}),
					...(objectData?.label ?? {}),
				},

				name: seriesName(index),
				data: Object.keys(seriesData?.chartData ?? {}).map((key, subIndex) => {
					const value = seriesData?.chartData?.[key]?.[`x${index + 1}`] ?? '';

					return {
						value,
						...((objectData?.color ?? '') && {
							itemStyle: {
								color: determineGradient(
									seriesData,
									objectData,
									index,
									subIndex,
									key
								),
							},
						}),
						tooltip: {
							...(seriesOption[subIndex]?.tooltip ?? {}),
						},
						...(seriesData?.chartData?.[key]?.[`x${1}`] === 100 && {
							label: {
								show: false,
							},
						}),
					};
				}),
			};
		});
	};

	return (
		<EChartsReactCore
			option={{
				title: {
					...title,
				},
				polar: {
					radius,
					center,
					...polar,
				},
				grid: {
					containLabel: gridContainLabel,
					...gridOptions,
				},
				legend: {
					...legend,
				},
				tooltip: {
					...tooltip,
				},
				angleAxis: {
					...angleAxis,
					type: 'category',
					boundaryGap: ['50%', '0%'],
					axisLine: {
						show: false,
					},
					axisLabel: {
						show: false,
					},
					axisTick: {
						show: false,
					},
				},
				radiusAxis: {
					...radiusAxis,
					axisLine: {
						show: false,
					},
					splitLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						show: false,
					},
				},
				series: generateSeries(),
			}}
			onEvents={onEvents}
			echarts={echarts}
			notMerge
			lazyUpdate
			className={classes('bn-w-full', className)}
			style={style}
		/>
	);
};

export default StackedPieChart;
