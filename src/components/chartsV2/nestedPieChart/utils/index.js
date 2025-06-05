export const getCenterHolePlugin = (donutProps) => {
	return {
		id: 'centerHolePlugin',
		afterDatasetsDraw(chart) {
			const { ctx, chartArea } = chart;

			const centerX = (chartArea.left + chartArea.right) / 2;
			const centerY = (chartArea.top + chartArea.bottom) / 2;

			const radius =
				Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top) /
				(donutProps?.radius ?? 15);

			ctx.save();
			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			ctx.fillStyle = donutProps?.backgroundColor || '#fff'; // Fallback color
			ctx.fill();
			ctx.restore();
		},
	};
};
