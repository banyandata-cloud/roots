import React from 'react';

export type IndicatorType = 'warning' | 'error' | 'success';

export interface IndicatorProps extends React.SVGProps<SVGSVGElement> {
	type: IndicatorType;
	size?: number | string;
}

export interface StatusStyle {
	fill: string;
	stroke: string;
}
