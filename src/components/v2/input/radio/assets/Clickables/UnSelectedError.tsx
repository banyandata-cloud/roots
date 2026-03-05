import React from 'react';

const UnSelectedError: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			style={{ aspectRatio: '1 / 1' }}
			className={className}>
			<circle cx='10' cy='10' r='7.5' stroke='var(--Bordercolor-border-error-subtle, #FDA29B)' />
		</svg>
	);
};

export default UnSelectedError;