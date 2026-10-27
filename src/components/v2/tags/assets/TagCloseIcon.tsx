import type { TagSize } from '../types';

// Figma "Tag close": an X drawn in currentColor. The cross is 5 / 6 / 7px (small / md / lg) with
// a 1.5 / 1.5 / 1.6px round stroke, centred in the close box.
const CROSS: Record<TagSize, { box: number; extent: number; stroke: number }> = {
	sm: { box: 5, extent: 5, stroke: 1.5 },
	md: { box: 6, extent: 6, stroke: 1.5 },
	lg: { box: 7, extent: 7, stroke: 1.6 },
};

const TagCloseIcon = ({ size }: { size: TagSize }) => {
	const { box, extent, stroke } = CROSS[size];
	const pad = stroke / 2 + 0.05;
	const total = box + pad * 2;
	const start = pad;
	const end = pad + extent;

	return (
		<svg
			width={total}
			height={total}
			viewBox={`0 0 ${total} ${total}`}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<path
				d={`M${start} ${start}L${end} ${end}M${start} ${end}L${end} ${start}`}
				stroke='currentColor'
				strokeWidth={stroke}
				strokeLinecap='round'
			/>
		</svg>
	);
};

export default TagCloseIcon;
