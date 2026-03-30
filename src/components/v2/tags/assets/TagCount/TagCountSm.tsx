import React from 'react';

interface TagCountSmProps {
	count?: number;
	bgColor?: string;
	textColor?: string;
}

const TagCountSm: React.FC<TagCountSmProps> = ({
	count = 0,
	bgColor = '#F5F5F5',
	textColor = '#414651',
}) => {
	const containerStyle: React.CSSProperties = {
		display: 'inline-flex',
		height: '16px',
		padding: '0 4px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '10px',
		borderRadius: '3px',
		background: bgColor,
		color: textColor,
		fontSize: '10px',
		fontWeight: 500,
		lineHeight: '16px',
		whiteSpace: 'nowrap',
	};

	return <div style={containerStyle}>{count}</div>;
};

export default TagCountSm;
