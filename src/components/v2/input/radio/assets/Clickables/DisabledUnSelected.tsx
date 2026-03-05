import React from 'react';

const DisabledUnSelected: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}>
			<circle cx='10' cy='10' r='7.5' stroke='#D5D7DA' />
		</svg>
	);
};

export default DisabledUnSelected;