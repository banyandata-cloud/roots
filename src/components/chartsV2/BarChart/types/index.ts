import type { ChartDataset, ChartOptions } from 'chart.js';

export interface ChartDataItem {
	[key: string]: number | null;
}

interface SeriesData {
	chartData: Record<string, ChartDataItem>;
}

interface FontOptions {
	size?: number;
	family?: string;
	weight?: string;
	color?: string;
	titleColor?: string;
}

interface TooltipConfig {
	borderWidth?: number;
	bodySpacing?: number;
	displayColors?: boolean;
	colorBoxWidth?: number;
	colorBoxHeight?: number;
	usePointStyle?: boolean;
	bodyFont?: FontOptions;
	titleColor?: string;
	bodyColor?: string;
	[key: string]: any;
}

interface TitleConfig {
	text?: string;
	left?: number;
	textStyle?: {
		fontSize?: number;
	};
}

interface GridOptions {
	gridContainLabel?: boolean;
}

interface AxisOptions {
	[key: string]: any;
}

export interface BaseBarChartProps {
	loading?: boolean;
	seriesData: SeriesData;
	title?: TitleConfig;
	gridOptions?: GridOptions;
	width?: string | number;
	height?: string | number;
	barThickness?: number;
	borderRadius?: number;
	barColor1?: string;
	barColor2?: string;
	xAxisTitle?: string;
	yAxisTitle?: string;
	tooltip?: TooltipConfig;
	legends?: object;
	chartOptions?: ChartOptions<'bar'>;
	chartDatasets?: Partial<ChartDataset<'bar'>>;
	xAxis?: AxisOptions;
	yAxis?: AxisOptions;
	styles?: React.CSSProperties;
	vertical?: boolean;
	stacked?: ChartDataset<'bar'>;
	extra?: object;
}