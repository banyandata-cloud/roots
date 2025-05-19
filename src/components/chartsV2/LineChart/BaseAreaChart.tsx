import {
	CategoryScale,
	ChartData,
	Chart as ChartJS,
	ChartOptions,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	TooltipItem,
} from 'chart.js';
import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { COLORS } from '../../../styles';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

type ChartDataType = {
	metaData: {
		xAxisData: string[];
	};
	chartData: {
		[key: string]: number[];
	};
};

type ChartProps = {
	title?: string;
	seriesData: ChartDataType;
	tooltip?: any;
	legend?: {
		display?: boolean;
		position?: 'top' | 'left' | 'bottom' | 'right';
		icon?: boolean;
		legendStyles?: React.CSSProperties;
	};
	xAxisLabelShow?: boolean;
	yAxisLabelShow?: boolean;
	xAxisLabel?: string;
	yAxisLabel?: string;
	axisLabelColor?: string;
	stacked?: boolean;
	smooth?: boolean;
	theme?: string;
	isLineChart?: boolean;
	xAxisPosition?: 'top' | 'bottom';
	xSplitLineShow?: boolean;
	xAxisLineShow?: boolean;
	axisSplitColor?: string;
	cursor?: string;
	yAxis?: any;
	xAxis?: any;
	width?: string | number;
	height?: string | number;
	chartOptionsProps?: any;
	lineColors?: string[];
	borderColors?: string[];
	style?: React.CSSProperties;
	extra?: any;
};

const BaseAreaChart: React.FC<ChartProps> = (props): React.ReactElement => {
	const {
		title,
		seriesData,
		tooltip,
		legend,
		xAxisLabelShow,
		yAxisLabelShow,
		xAxisLabel,
		yAxisLabel,
		axisLabelColor,
		stacked,
		smooth,
		isLineChart,
		xAxisPosition,
		xSplitLineShow,
		xAxisLineShow,
		axisSplitColor,
		cursor,
		yAxis,
		xAxis,
		width,
		height,
		chartOptionsProps,
		lineColors = [
			'rgba(255, 99, 132, 0.5)',
			'rgba(54, 162, 235, 0.5)',
			'rgba(75, 192, 192, 0.5)',
			'rgba(153, 102, 255, 0.5)',
			'rgba(255, 159, 64, 0.5)',
		],
		borderColors = [
			'rgba(255, 99, 132, 1)',
			'rgba(54, 162, 235, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
			'rgba(255, 159, 64, 1)',
		],
		style,
		extra,
	} = props;

	const legendRef = useRef<HTMLUListElement | null>(null);
	const [hiddenDatasets, setHiddenDatasets] = useState<number[]>([]);

	const toggleDatasetVisibility = (index: number, chart: any) => {
		setHiddenDatasets((prevHidden) => {
			const newHidden = prevHidden.includes(index)
				? prevHidden.filter((i) => i !== index)
				: [...prevHidden, index];

			chart.data.datasets[index].hidden = newHidden.includes(index);
			chart.update();

			return newHidden;
		});
	};

	const customLegendPlugin = {
		id: 'customLegend',
		afterUpdate(chart: any) {
			const ul = legendRef.current;
			while (ul?.firstChild) {
				ul.firstChild.remove();
			}

			chart.data.datasets.forEach((dataset: any, index: number) => {
				const li = document.createElement('li');
				li.style.display = 'flex';
				li.style.alignItems = 'center';
				li.style.cursor = 'pointer';
				li.style.opacity = hiddenDatasets.includes(index) ? '0.5' : '1';
				li.style.margin = '5px 10px';
				li.style.maxWidth = '120px';
				li.style.whiteSpace = 'nowrap';
				li.style.overflow = 'hidden';
				li.style.textOverflow = 'ellipsis';

				const textColor = hiddenDatasets.includes(index) ? 'grey' : 'inherit';
				const circleColor = hiddenDatasets.includes(index)
					? 'grey'
					: dataset.backgroundColor;

				li.onclick = () => {
					toggleDatasetVisibility(index, chart);
					li.style.color = li.style.color === 'grey' ? 'inherit' : 'grey';

					const circle = li.querySelector('circle');
					if (circle) {
						circle.setAttribute(
							'stroke',
							circle.getAttribute('stroke') === 'grey'
								? dataset.backgroundColor
								: 'grey'
						);
					}
				};

				li.innerHTML = `
					<svg width="15" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="15" cy="15" r="12" stroke="${circleColor}" stroke-width="6"/>
					</svg>
				<span style="margin-left: 10px; color: ${textColor};">${dataset.label}</span>
				`;

				ul?.appendChild(li);
			});
		},
	};

	const chartData: ChartData<'line'> = {
		labels: seriesData?.metaData?.xAxisData ?? [],
		datasets: Object.keys(seriesData?.chartData ?? {}).map((key, index) => ({
			label: key,
			data: seriesData.chartData[key] ?? [],
			fill: !isLineChart,
			backgroundColor: isLineChart ? 'transparent' : lineColors[index % lineColors.length],
			borderColor: borderColors[index % borderColors.length],
			tension: smooth ? 0.4 : 0,
			borderWidth: chartOptionsProps?.borderWidth ?? 2,
			pointRadius: chartOptionsProps?.pointRadius ?? 4,
			pointHoverRadius: chartOptionsProps?.pointHoverRadius ?? 6,
			pointBackgroundColor: borderColors[index % borderColors.length],
			pointStyle: chartOptionsProps?.pointStyle ?? 'rectRot',
			datalabels: {
				display: false,
			},
		})),
	};

	const chartOptions: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: legend?.icon
				? { display: false }
				: {
						display: legend?.display ?? true,
						position: legend?.position ?? 'bottom',
						labels: {
							color: axisLabelColor || COLORS.grey,
							boxWidth: 9,
							boxHeight: 9,
							borderRadius: 50,
							padding: 10,
							usePointStyle: true,
							font: { family: 'Poppins' },
						},
						...legend,
				  },
			tooltip: {
				borderWidth: tooltip?.borderWidth ?? 1,
				borderColor: (context: any) =>
					context?.tooltipItems[0]?.dataset?.backgroundColor || 'black',
				backgroundColor: 'rgba(255, 255, 255, 1)',
				callbacks: tooltip?.callbacks ?? {
					label: (context: TooltipItem<'line'>) => {
						const label = context?.dataset?.label || '';
						const value = context?.formattedValue;
						return `${label}: ${value}`;
					},
					title: tooltip?.displayTitle
						? (tooltipItems: TooltipItem<'line'>[]) => {
								return tooltipItems[0]?.label || '';
						  }
						: () => '',
				},
				bodySpacing: tooltip?.bodySpacing ?? 5,
				displayColors: tooltip?.displayColors ?? true,
				boxWidth: tooltip?.colorBoxWidth ?? 5,
				boxHeight: tooltip?.colorBoxHeight ?? 5,
				boxPadding: 5,
				usePointStyle: tooltip?.usePointStyle ?? true,
				titleColor: tooltip?.bodyFont?.titleColor ?? '#000',
				bodyColor: tooltip?.bodyFont?.color ?? '#000',
				bodyFont: {
					...(tooltip?.bodyFont || {}),
				},
				...tooltip,
			},
			title: {
				display: !!title,
				text: title,
				color: axisLabelColor || COLORS.grey,
				font: {
					size: 16,
					weight: 'bold',
					family: 'Poppins',
				},
			},
		},
		scales: {
			x: {
				display: xAxisLabelShow,
				position: xAxisPosition,
				stacked,
				title: {
					display: !!xAxisLabel,
					text: xAxisLabel,
					color: axisLabelColor || COLORS.grey,
					font: { size: 14, family: 'Poppins' },
				},
				grid: {
					display: xSplitLineShow,
					color: axisSplitColor,
					lineWidth: 1,
					tickLength: 30,
				},
				ticks: {
					color: axisLabelColor || COLORS.grey,
					stepSize: 100,
					font: { family: 'Poppins' },
				},
				border: {
					display: !!xAxisLineShow,
					color: 'rgba(0, 0, 0, 0)',
					width: xAxisLineShow ? 1 : 0,
				},
				...xAxis,
			},
			y: {
				display: yAxisLabelShow,
				stacked,
				title: {
					display: !!yAxisLabel,
					text: yAxisLabel,
					color: axisLabelColor || COLORS.grey,
					font: { size: 14, family: 'Poppins' },
				},
				grid: {
					display: true,
					color: axisSplitColor,
				},
				ticks: {
					color: axisLabelColor || COLORS.grey,
					stepSize: 100,
					font: { family: 'Poppins' },
					callback:
						yAxis?.callback ??
						((value: number | string) => {
							return value;
						}),
				},
				...yAxis,
			},
		},
		elements: {
			line: { tension: smooth ? 0.4 : 0 },
			point: { radius: 0 },
		},
		...(cursor ? { cursor } : {}),
		...chartOptionsProps,
	};

	const legendStyle: React.CSSProperties = {
		display: 'flex',
		listStyle: 'none',
		padding: '0px',
		...legend?.legendStyles,
	};

	return (
		<div
			style={{
				width: width ?? '100%',
				height: height ?? '300px',
				display: 'flex',
				alignItems: 'center',
				...style,
			}}>
			<Line
				data={chartData}
				options={chartOptions}
				plugins={[customLegendPlugin]}
				{...extra}
			/>
			{legend?.icon && legend?.display && <ul ref={legendRef} style={legendStyle} />}
		</div>
	);
};

export default BaseAreaChart;
