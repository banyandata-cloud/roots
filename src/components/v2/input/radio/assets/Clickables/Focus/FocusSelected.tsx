import React from 'react';

const FocusSelected: React.FC = () => {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<rect
				x='0.75'
				y='0.75'
				width='18.5'
				height='18.5'
				rx='9.25'
				stroke='#3B82F6'
				strokeWidth='1.5'
			/>
			<circle cx='10' cy='10' r='8' fill='#1570EF' />
			<circle cx='10' cy='10' r='3' fill='white' />
		</svg>
	);
};

export default FocusSelected;