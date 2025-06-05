export const getCenterTextPlugin = ({ customLabel, strip }) => {
	return {
		id: 'centerText',
		afterDatasetsDraw(chart) {
			const {
				ctx,
				chartArea: { left, right, top, bottom },
			} = chart;

			ctx.save();

			// Center text styling and positioning
			ctx.font = `${customLabel?.valueStyles?.fontStyle} ${customLabel?.valueStyles?.fontSize} Poppins`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = customLabel?.valueStyles?.color;

			// Calculate the center position of the chart
			const centerX = (left + right) / 2;
			const centerY = (top + bottom) / 2;

			// Render the center text
			ctx.fillText(`${customLabel?.id}`, centerX, centerY);

			// Render the compliance title with bottom margin
			const titleBottomMargin = customLabel.margin ?? 10; // Adjust this value for bottom margin
			const position = customLabel?.labelStyles?.position ?? 5;
			const titleYPosition = centerY + position; // Default title Y position
			ctx.font = `${customLabel?.labelStyles?.fontStyle} ${customLabel?.labelStyles?.fontSize} Poppins`; // Title font style
			ctx.fillStyle = `${customLabel?.labelStyles?.color}`; // Title text color (gray)
			ctx.fillText(`${customLabel?.title}`, centerX, titleYPosition + titleBottomMargin);

			// Render compliance strip if `complianceStrip` is true
			if (strip) {
				const stripRadius = strip?.stripSize ?? 35; // Radius for the outer ring
				const stripThickness = strip?.stripWidth ?? 7; // Thickness of the strip
				const compliancePercentage = customLabel?.value; // Set compliance percentage

				// Fixed start and end angles
				const startAngle = (130 * Math.PI) / 180; // Convert degrees to radians
				const endAngle = (55 * Math.PI) / 180; // Convert degrees to radians

				// Total angle of the arc (adjusting for crossing 360 degrees)
				let totalAngle = endAngle - startAngle;
				if (totalAngle < 0) {
					totalAngle += 2 * Math.PI; // Ensure positive value for angles crossing 360
				}

				// Calculate the compliance angle based on the percentage
				const complianceAngle = (compliancePercentage / 100) * totalAngle;
				const complianceEndAngle = startAngle + complianceAngle;

				// Set line join for rounded edges
				ctx.lineJoin = 'round';

				// Draw the compliance strip (colored section)
				const gradient = ctx.createLinearGradient(
					centerX - stripRadius,
					centerY - stripRadius,
					centerX + stripRadius,
					centerY + stripRadius
				);

				gradient.addColorStop(0, strip?.startColor ?? '#4CAF50'); // Start color
				gradient.addColorStop(1, strip?.endColor ?? '#FFC107'); // End color

				ctx.beginPath();
				ctx.arc(
					centerX,
					centerY,
					stripRadius + stripThickness,
					startAngle,
					complianceEndAngle
				);
				ctx.lineWidth = stripThickness;
				ctx.strokeStyle = gradient;
				ctx.stroke();

				// Draw the remaining section (grey color)
				ctx.beginPath();
				ctx.arc(
					centerX,
					centerY,
					stripRadius + stripThickness,
					complianceEndAngle,
					startAngle + totalAngle
				);
				ctx.lineWidth = stripThickness;
				ctx.strokeStyle = '#B7CADB'; // Grey color
				ctx.stroke();
			}

			ctx.restore();
		},
	};
};

export const getCustomLegendPlugin = ({
	legendRef,
	handleLegendClick,
	handleHover,
	hoveredIndexRef,
	legendColors,
}) => {
	return {
		id: 'customLegend',
		afterUpdate(chart) {
			const ul = legendRef.current;
			while (ul?.firstChild) {
				ul.firstChild.remove();
			}

			chart.data.labels.forEach((label, index) => {
				const li = document.createElement('li');
				li.style.display = 'flex';
				li.style.alignItems = 'center';
				li.style.cursor = 'pointer';

				// Handle click for excluding/un-excluding slices
				li.onclick = (event) => {
					const legendItem = {
						index,
					}; // Simulate legend item
					handleLegendClick(event, legendItem); // Handle click
					handleHover(index); // Set hover on legend click
					chart.update('none'); // Update the chart without animation
				};

				// Handle hover on the legend item
				li.onmouseenter = () => {
					handleHover(index); // Set hover on legend hover
					chart.update('none'); // Update the chart without animation
				};

				// Handle leave event to remove hover effect
				li.onmouseleave = () => {
					setHoveredIndex(null); // Reset hover index on leave
					hoveredIndexRef.current = null;
					chart.update('none'); // Update the chart without animation
				};

				// Apply grey color dynamically based on the hovered state
				const isGreyedOut =
					hoveredIndexRef.current !== null && hoveredIndexRef.current !== index;
				const displayColor = isGreyedOut ? '#D3D3D3' : legendColors[index];

				const value = chart.data.datasets[0].data[index];

				console.log(hoveredIndexRef.current);

				li.innerHTML = `
					<svg width="15" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="15" cy="15" r="12" stroke="${displayColor}" stroke-width="6"/>
					</svg>
					
					<span style="margin-left: 10px;">
						<span>${label}</span>
						<span style="margin-left: 14px;">${value}</span>
					</span>
				`;

				ul.appendChild(li);
			});
		},
	};
};
