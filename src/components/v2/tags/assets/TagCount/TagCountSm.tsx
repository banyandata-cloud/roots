import React from 'react';

interface TagCountSmProps {
	count?: number | undefined;
	bgColor?: string | undefined;
	textColor?: string | undefined;
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
		flexDirection: 'row',
		gap: '10px',
		justifyContent: 'center',
		alignItems: 'center',
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
