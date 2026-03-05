import React from 'react';

const Selected: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			style={{ aspectRatio: '1 / 1' }}
			className={className}>
			<circle cx='10' cy='10' r='8' fill='var(--Foregroundcolor-fg-brand-primary, #1570EF)' />
			<circle cx='10' cy='10' r='3' fill='var(--Foregroundcolor-fg-white, #FFFFFF)' />
		</svg>
	);
};

export default Selected;