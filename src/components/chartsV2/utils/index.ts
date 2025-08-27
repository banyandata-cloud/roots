import type { ChartType, ScriptableContext } from 'chart.js';

export const getColorGradient = (
	ctx: ScriptableContext<ChartType>,
	gradientString: string
): CanvasGradient | string => {
	const { chart } = ctx;
	const canvasContext = chart.ctx;
	const { chartArea } = ctx.chart;

	if (!chartArea) {
		return gradientString;
	}

	const gradient = canvasContext.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

	const match = /linear-gradient\(0deg,\s*(.*)\)/.exec(gradientString);
	if (!match?.[1]) return gradientString;

	const stops = match[1].split(',').map((s) => {
		return s.trim();
	});

	stops.forEach((stop) => {
		const [colorRaw, percentRaw] = stop.split(' ').map((v) => {
			return v.trim();
		});
		if (!colorRaw) return;

		const position = parseFloat(percentRaw ?? '0') / 100;
		if (!Number.isNaN(position)) {
			gradient.addColorStop(position, colorRaw);
		}
	});

	return gradient;
};
