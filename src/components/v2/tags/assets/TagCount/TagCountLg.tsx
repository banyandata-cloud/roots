import React from 'react';

interface TagCountLgProps {
	count?: number;
	bgColor?: string;
	textColor?: string;
}

const TagCountLg: React.FC<TagCountLgProps> = ({
	count = 0,
	bgColor = '#F5F5F5',
	textColor = '#414651',
}) => {
	const containerStyle: React.CSSProperties = {
		display: 'inline-flex',
		height: '20px',
		padding: '0 6px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '10px',
		borderRadius: '3px',
		background: bgColor,
		color: textColor,
		fontSize: '12px',
		fontWeight: 500,
		lineHeight: '20px',
		whiteSpace: 'nowrap',
	};

	return <div style={containerStyle}>{count}</div>;
};

export default TagCountLg;
