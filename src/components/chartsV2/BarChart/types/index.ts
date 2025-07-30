import type { ChartDataset, ChartOptions, TooltipOptions } from 'chart.js';
import type { Context } from 'chartjs-plugin-datalabels';
import React from 'react';

export type ChartDataItem = Record<string, number | null>;

interface SeriesData {
	chartData: Record<string, ChartDataItem>;
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

export type AxisOptions = Record<string, string | number | boolean | object | undefined>;

type BarChartType = 'bar';

// CustomFontOptions compatible with Chart.js FontSpec
interface CustomFontOptions {
	size?: number;
	weight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number;
	family?: string;
	lineHeight?: number | string;
	color?: string;
}

// Complete tooltip configuration type for bar charts
interface CustomTooltipOptions {
	borderWidth?: number;
	backgroundColor?: string;
	bodySpacing?: number;
	displayColors?: boolean;
	colorBoxWidth?: number;
	colorBoxHeight?: number;
	usePointStyle?: boolean;
	titleColor?: string;
	bodyColor?: string;
	bodyFont?: CustomFontOptions;
	callbacks?: TooltipOptions<BarChartType>['callbacks'];
}

export interface ChartDataLabelsOptions {
	anchor?: 'start' | 'center' | 'end';
	align?: 'start' | 'center' | 'end' | 'left' | 'right' | 'top' | 'bottom';
	backgroundColor?: string | CanvasGradient | CanvasPattern | ((context: Context) => string);
	borderColor?: string;
	borderRadius?: number;
	borderWidth?: number;
	clamp?: boolean;
	clip?: boolean;
	color?: string | ((context: Context) => string);
	display?: boolean | ((context: Context) => boolean);
	font?: Partial<CustomFontOptions>;
	formatter?: (value: unknown, context: Context) => string | number;
	offset?: number;
	opacity?: number;
	padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
	rotation?: number;
	textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
	textStrokeColor?: string;
	textStrokeWidth?: number;
	textShadowColor?: string;
	textShadowBlur?: number;
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
	tooltip?: CustomTooltipOptions;
	legends?: object;
	chartOptions?: ChartOptions<'bar'>;
	chartDatasets?: Partial<ChartDataset<'bar'>>;
	xAxis?: AxisOptions;
	yAxis?: AxisOptions;
	styles?: React.CSSProperties;
	vertical?: boolean;
	stacked?: ChartDataset<'bar'>;
	extra?: object;
	dataLabelsOptions?: ChartDataLabelsOptions;
	barColors?: Record<string, string>;
}
