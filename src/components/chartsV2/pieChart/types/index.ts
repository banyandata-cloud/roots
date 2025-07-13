import type { ChartDataset, ChartOptions, ChartType, TooltipCallbacks } from 'chart.js';
import React from 'react';

interface ChartSeriesOption {
	itemStyle: {
		color: string;
	};
}

interface SeriesData {
	chartData: Record<string, number>;
	metaData?: {
		keyData: Record<string, string>;
	};
}

export interface TooltipCallbackContext {
	label: string;
	raw: number;
	dataset: ChartDataset<'bar'>;
	radius?: string;
}

export interface LegendItem {
	index: number;
}

interface CustomLabel {
	id?: string;
	title?: string;
	value?: number;
	margin?: number;
	labelStyles?: {
		fontStyle: string;
		fontSize: string;
		color: string;
		position?: number;
	};
	valueStyles?: {
		fontStyle: string;
		fontSize: string;
		color: string;
	};
}

interface StripProps {
	stripSize?: number;
	stripWidth?: number;
	circumference?: number;
}

interface TooltipFontOptions {
	titleColor?: string;
	color?: string;
	size?: number;
	family?: string;
}

export interface TooltipProps<TType extends ChartType = 'bar'> {
	borderWidth?: number;
	displayTitle?: boolean;
	callbacks?: Partial<TooltipCallbacks<TType>>;
	bodySpacing?: number;
	displayColors?: boolean;
	colorBoxWidth?: number;
	colorBoxHeight?: number;
	usePointStyle?: boolean;
	bodyFont?: TooltipFontOptions;
	extraOptions?: Record<string, unknown>;
}

interface LegendProps {
	display?: boolean;
	icon?: boolean;
	legendStyles?: string;
}

export interface BasePieChartProps {
	loading?: boolean;
	fallback?: boolean;
	title?: string;
	tittleSize?: number;
	seriesData: SeriesData;
	cursor?: string;
	legend?: LegendProps;
	style?: React.CSSProperties;
	className?: string;
	theme?: string;
	seriesOption?: ChartSeriesOption[];
	options?: ChartOptions<'pie'>;
	tooltip?: TooltipProps;
	width?: string | number;
	height?: string | number;
	customLabel?: CustomLabel;
	strip?: StripProps;
	doughnut?: [string, string];
	hoverBorderWidth?: number;
	dataSetOptions?: Record<string, unknown>;
	extra?: React.ReactNode;
	radius?: string;
}
