import React from 'react';

const ReadOnlySelected: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			style={{ aspectRatio: '1 / 1' }}
			className={className}>
			<circle
				opacity='0.25'
				cx='10'
				cy='10'
				r='7.5'
				stroke='var(--icon-icon-disabled, #161616)'
			/>
			<circle cx='10' cy='10' r='3' fill='var(--Foregroundcolor-fg-secondary, #414651)' />
		</svg>
	);
};

export default ReadOnlySelected;