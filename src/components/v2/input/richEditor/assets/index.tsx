export const BoldIcon = ({ color = 'currentColor' }: { color?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='10.831px'
			height='13.33px'
			viewBox='0 0 13 15'
			fill='none'
			style={{ aspectRatio: '13/16' }}
			aria-hidden='true'
		>
			<path
				d='M0.834961 7.50002H8.33309C9.21692 7.50002 10.0646 7.85112 10.6895 8.47609C11.3145 9.10105 11.6656 9.94869 11.6656 10.8325C11.6656 11.7164 11.3145 12.564 10.6895 13.189C10.0646 13.8139 9.21692 14.165 8.33309 14.165H1.66809C1.44713 14.165 1.23522 14.0772 1.07898 13.921C0.922737 13.7648 0.834961 13.5529 0.834961 13.3319V1.66815C0.834961 1.44719 0.922737 1.23528 1.07898 1.07904C1.23522 0.922798 1.44713 0.835022 1.66809 0.835022H7.49996C8.38379 0.835022 9.23143 1.18612 9.85639 1.81109C10.4814 2.43605 10.8325 3.28369 10.8325 4.16752C10.8325 5.05136 10.4814 5.89899 9.85639 6.52396C9.23143 7.14892 8.38379 7.50002 7.49996 7.50002'
				stroke={color}
				strokeWidth='1.67'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export const ItalicIcon = ({ color = 'currentColor' }: { color?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			style={{ flexShrink: 0, aspectRatio: '1/1' }}
			aria-hidden='true'
		>
			<path
				d='M15.832 3.33502H8.33384M11.6663 16.665H4.16821M12.4995 3.33502L7.50071 16.665'
				stroke={color}
				strokeWidth='1.67'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export const UnderlineIcon = ({ color = 'currentColor' }: { color?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			style={{ flexShrink: 0, aspectRatio: '1/1' }}
			aria-hidden='true'
		>
			<path
				d='M5.00121 3.33502V8.33377C5.00121 9.65952 5.52786 10.931 6.46531 11.8684C7.40276 12.8059 8.67421 13.3325 9.99996 13.3325C11.3257 13.3325 12.5972 12.8059 13.5346 11.8684C14.4721 10.931 14.9987 9.65952 14.9987 8.33377V3.33502M3.33496 16.665H16.665'
				stroke={color}
				strokeWidth='1.67'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};
export const TextColorIcon = ({ color = 'currentColor' }: { color?: string }) => {
	return (
		<svg
			width='100%'
			height='100%'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<circle cx='10' cy='10' r='10' fill={color} />
			<circle cx='10' cy='10' r='9.5' stroke='rgba(0, 0, 0, 0.15)' />
		</svg>
	);
};

export const TextAlignIcon = {
	Left: ({ color = 'currentColor' }: { color?: string }) => {
		return (
			<svg
				width='20'
				height='20'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				style={{ flexShrink: 0, aspectRatio: '1/1' }}
				aria-hidden='true'
			>
				<path
					d='M17 4.55554H3M12.3333 9.99999H3M13.8889 15.4444H3'
					stroke={color}
					strokeWidth='1.67'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		);
	},
	Center: ({ color = 'currentColor' }: { color?: string }) => {
		return (
			<svg
				width='20'
				height='20'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				style={{ flexShrink: 0, aspectRatio: '1/1' }}
				aria-hidden='true'
			>
				<path
					d='M17 4.55554H3M13.8889 9.99999H6.11111M15.4444 15.4444H4.55556'
					stroke={color}
					strokeWidth='1.67'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		);
	},
	Right: ({ color = 'currentColor' }: { color?: string }) => {
		return (
			<svg
				width='20'
				height='20'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				style={{ flexShrink: 0, aspectRatio: '1/1' }}
				aria-hidden='true'
			>
				<path
					d='M17 4.55554H3M17 9.99999H7.66667M17 15.4444H6.11111'
					stroke={color}
					strokeWidth='1.67'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		);
	},
	Justify: ({ color = 'currentColor' }: { color?: string }) => {
		return (
			<svg
				width='20'
				height='20'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				style={{ flexShrink: 0, aspectRatio: '1/1' }}
				aria-hidden='true'
			>
				<path
					d='M2.95 6.6H19.1C19.34 6.6 19.57 6.51 19.74 6.34C19.91 6.17 20 5.94 20 5.7C20 5.47 19.91 5.24 19.74 5.07C19.57 4.9 19.34 4.81 19.1 4.81H2.95C2.71 4.81 2.48 4.9 2.31 5.07C2.14 5.24 2.05 5.47 2.05 5.7C2.05 5.94 2.14 6.17 2.31 6.34C2.48 6.51 2.71 6.6 2.95 6.6ZM2.95 10.2H19.1C19.34 10.2 19.57 10.1 19.74 9.93C19.91 9.76 20 9.53 20 9.3C20 9.06 19.91 8.83 19.74 8.66C19.57 8.49 19.34 8.4 19.1 8.4H2.95C2.71 8.4 2.48 8.49 2.31 8.66C2.14 8.83 2.05 9.06 2.05 9.3C2.05 9.53 2.14 9.76 2.31 9.93C2.48 10.1 2.71 10.2 2.95 10.2ZM2.95 13.78H19.1C19.34 13.78 19.57 13.69 19.74 13.52C19.91 13.35 20 13.12 20 12.89C20 12.65 19.91 12.42 19.74 12.25C19.57 12.08 19.34 11.99 19.1 11.99H2.95C2.71 11.99 2.48 12.08 2.31 12.25C2.14 12.42 2.05 12.65 2.05 12.89C2.05 13.12 2.14 13.35 2.31 13.52C2.48 13.69 2.71 13.78 2.95 13.78ZM2.95 17.37H19.1C19.34 17.37 19.57 17.28 19.74 17.11C19.91 16.94 20 16.71 20 16.48C20 16.24 19.91 16.01 19.74 15.84C19.57 15.67 19.34 15.58 19.1 15.58H2.95C2.71 15.58 2.48 15.67 2.31 15.84C2.14 16.01 2.05 16.24 2.05 16.48C2.05 16.71 2.14 16.94 2.31 17.11C2.48 17.28 2.71 17.37 2.95 17.37Z'
					fill={color}
				/>
			</svg>
		);
	},
};

export const TextLinkIcon = ({ color = 'currentColor' }: { color?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			style={{ flexShrink: 0, aspectRatio: '1/1' }}
			aria-hidden='true'
		>
			<path
				d='M11.0605 14.2427L9.99987 15.3033C9.29661 16.0066 8.34278 16.4017 7.34822 16.4017C6.35366 16.4017 5.39983 16.0066 4.69657 15.3033C3.99331 14.6001 3.59822 13.6462 3.59822 12.6517C3.59822 11.6571 3.99331 10.7033 4.69657 10L5.75723 8.93936M8.93921 5.75738L9.99987 4.69672C10.7031 3.99346 11.657 3.59837 12.6515 3.59837C13.6461 3.59837 14.5999 3.99346 15.3032 4.69672C16.0064 5.39998 16.4015 6.35381 16.4015 7.34837C16.4015 8.34293 16.0064 9.29676 15.3032 10L14.2425 11.0607M7.87855 12.1213L12.1212 7.8787'
				stroke={color}
				strokeWidth='1.67'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export const BulletListIcon = ({ color = 'currentColor' }: { color?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			style={{ flexShrink: 0, aspectRatio: '1/1' }}
			aria-hidden='true'
		>
			<path
				d='M8.02417 4.89771H17.4999M8.02417 10H17.4999M8.02417 15.1024H17.4999'
				stroke={color}
				strokeWidth='1.67'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<circle cx='4.20792' cy='4.89767' r='0.872916' stroke={color} strokeWidth='1.67' />
			<circle cx='4.20792' cy='10' r='0.872916' stroke={color} strokeWidth='1.67' />
			<circle cx='4.20792' cy='15.1023' r='0.872916' stroke={color} strokeWidth='1.67' />
		</svg>
	);
};

export const ImageIcon = ({ color = 'currentColor' }: { color?: string }) => {
	return (
		<svg width='1.5rem' height='1.5rem' viewBox='0 0 22 22' fill='none' aria-hidden='true'>
			<rect
				x='2.2'
				y='3.5'
				width='17.6'
				height='14.4'
				rx='2'
				stroke={color}
				strokeWidth='1.8'
			/>
			<circle cx='7.2' cy='7.5' r='1.4' fill={color} />
			<path
				d='M4.1 15.8L8.8 11.6L12 14.3L14.9 12.1L17.8 15.8'
				stroke={color}
				strokeWidth='1.8'
				strokeLinecap='round'
			/>
		</svg>
	);
};

export const AttachmentIcon = ({ color = 'currentColor' }: { color?: string }) => {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
			<path
				d='M8 11.6L12.4 7.2C13.6 6 15.6 6 16.8 7.2C18 8.4 18 10.4 16.8 11.6L10.9 17.5C8.9 19.5 5.6 19.5 3.6 17.5C1.6 15.5 1.6 12.2 3.6 10.2L9.3 4.5'
				stroke={color}
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export const CodeIcon = ({ color = 'currentColor' }: { color?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			style={{ flexShrink: 0, aspectRatio: '1/1' }}
			aria-hidden='true'
		>
			<path
				d='M14.5 13L17.5 10L14.5 7M5.5 7L2.5 10L5.5 13M11.875 4L8.125 16'
				stroke={color}
				strokeWidth='1.67'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export const ResizeHandleIcon = ({ color = '#A4A7AE' }: { color?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='12'
			height='12'
			viewBox='0 0 12 12'
			fill='none'
			style={{ aspectRatio: '1/1' }}
			aria-hidden='true'
		>
			<line x1='2.64645' y1='8.1755' x2='8.17553' y2='2.64641' stroke={color} />
			<line x1='5.01608' y1='8.64645' x2='8.64647' y2='5.01605' stroke={color} />
		</svg>
	);
};
