import React from 'react';

interface TagCountLgProps {
	count?: number | undefined;
	bgColor?: string | undefined;
	textColor?: string | undefined;
}

const TagCountLg: React.FC<TagCountLgProps> = ({
	count = 0,
	bgColor = 'var(--color-bg-tertiary, #f2f2f2)',
	textColor = 'var(--color-text-secondary, #414651)',
}) => {
	const containerStyle: React.CSSProperties = {
		display: 'inline-flex',
		height: '20px',
		padding: '0 6px',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '3px',
		background: bgColor,
		color: textColor,
		fontFamily: "'Plus Jakarta Sans', sans-serif",
		fontSize: '14px',
		fontWeight: 500,
		lineHeight: '20px',
		whiteSpace: 'nowrap',
	};

	return <div style={containerStyle}>{count}</div>;
};

export default TagCountLg;
