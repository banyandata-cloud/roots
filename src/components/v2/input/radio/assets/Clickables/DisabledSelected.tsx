import React from 'react';

const DisabledSelected: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			style={{ aspectRatio: '1 / 1' }}
			className={className}>
			<circle cx='10' cy='10' r='7.5' stroke='#D5D7DA' />
			<circle cx='10' cy='10' r='3' fill='#A4A7AE' />
		</svg>
	);
};

export default DisabledSelected;