export const getColorGradient = (ctx, gradientString) => {
	const { chartArea, ctx: canvasContext } = ctx.chart;
	if (!chartArea) return null;

	// Default vertical gradient
	const gradient = canvasContext.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

	// Parse the string to get color stops
	const match = gradientString.match(/linear-gradient\(0deg,\s*(.*)\)/);
	if (!match) return gradientString; // fallback to solid color

	const stops = match[1].split(',').map((s) => s.trim());

	stops.forEach((stop) => {
		const [color, percent] = stop.split(' ');
		gradient.addColorStop(parseFloat(percent) / 100, color);
	});

	return gradient;
};
