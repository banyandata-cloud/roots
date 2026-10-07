import React from 'react';

interface TagCountSmProps {
	count?: number | undefined;
	bgColor?: string | undefined;
	textColor?: string | undefined;
}

const TagCountSm: React.FC<TagCountSmProps> = ({
	count = 0,
	bgColor = 'var(--color-bg-tertiary, #f2f2f2)',
	textColor = 'var(--color-text-secondary, #414651)',
}) => {
	const containerStyle: React.CSSProperties = {
		display: 'inline-flex',
		height: '16px',
		padding: '0 4px',
		flexDirection: 'row',
		gap: '10px',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '3px',
		background: bgColor,
		color: textColor,
		fontFamily: 'Jakarta, sans-serif',
		fontSize: '12px',
		fontWeight: 500,
		lineHeight: '16px',
		whiteSpace: 'nowrap',
	};

	return <div style={containerStyle}>{count}</div>;
};

export default TagCountSm;
