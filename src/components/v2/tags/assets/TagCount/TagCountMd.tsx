import React from 'react';

interface TagCountMdProps {
	count?: number;
	bgColor?: string;
	textColor?: string;
}

const TagCountMd: React.FC<TagCountMdProps> = ({
	count = 0,
	bgColor = '#F5F5F5',
	textColor = '#414651',
}) => {
	const containerStyle: React.CSSProperties = {
		display: 'inline-flex',
		height: '18px',
		padding: '0 5px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '10px',
		borderRadius: '3px',
		background: bgColor,
		color: textColor,
		fontSize: '12px',
		fontWeight: 500,
		lineHeight: '18px',
		whiteSpace: 'nowrap',
	};

	return <div style={containerStyle}>{count}</div>;
};

export default TagCountMd;
