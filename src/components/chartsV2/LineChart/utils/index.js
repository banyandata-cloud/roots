export const getCustomLegendPlugin = ({ toggleDatasetVisibility, hiddenDatasets, legendRef }) => {
	return {
		id: 'customLegend',
		afterUpdate(chart) {
			// Clear existing legend items
			const ul = legendRef.current;
			while (ul?.firstChild) {
				ul.firstChild.remove();
			}

			// Loop through the datasets and create legend items
			chart.data.datasets.forEach((dataset, index) => {
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
					// Toggle visibility of the dataset
					toggleDatasetVisibility(index, chart);

					// Apply grey-out effect on click
					if (li.style.color === 'grey') {
						li.style.color = 'inherit';
					} else {
						li.style.color = 'grey';
					}

					const circle = li.querySelector('circle');
					if (circle) {
						if (circle.getAttribute('stroke') === 'grey') {
							circle.setAttribute('stroke', dataset.backgroundColor);
						} else {
							circle.setAttribute('stroke', 'grey');
						}
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
};
