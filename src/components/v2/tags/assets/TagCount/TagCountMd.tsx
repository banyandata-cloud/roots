import React from 'react';

interface TagCountMdProps {
	count?: number | undefined;
	bgColor?: string | undefined;
	textColor?: string | undefined;
}

const TagCountMd: React.FC<TagCountMdProps> = ({
	count = 0,
	bgColor = 'var(--color-bg-tertiary, #f2f2f2)',
	textColor = 'var(--color-text-secondary, #414651)',
}) => {
	const containerStyle: React.CSSProperties = {
		display: 'inline-flex',
		height: '18px',
		padding: '0 5px',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '3px',
		background: bgColor,
		color: textColor,
		fontFamily: "'Plus Jakarta Sans', sans-serif",
		fontSize: '12px',
		fontWeight: 500,
		lineHeight: '16px',
		whiteSpace: 'nowrap',
	};

	return <div style={containerStyle}>{count}</div>;
};

export default TagCountMd;
