/**
 * A single page entry for the UI.
 * - `number` is the page to navigate to when clicked.
 * - `ellipsis` marks items that should render as "..." in the UI but are still clickable.
 */
export interface Page {
	number: number;
	ellipsis?: boolean;
}

/** Input to basic numbered pagination. */
export interface PaginationListInit {
	/** 1-based current page */
	curr: number;
	/** total number of pages (>= 1) */
	total: number;
	/** max number of items (including first/last and ellipses) to show */
	limit?: number;
}

/** Internal: windowed page-range around current page */
function windowRange(curr: number, total: number, windowSize: number): [number, number] {
	const half = Math.floor(windowSize / 2);

	let start = curr - half;
	let end = curr + half;

	if (start < 2) {
		// Shift right to keep 1 reserved for the left edge
		end += 2 - start;
		start = 2;
	}
	if (end > total - 1) {
		// Shift left to keep 'total' reserved for the right edge
		const over = end - (total - 1);
		start = Math.max(2, start - over);
		end = total - 1;
	}

	return [start, end];
}

/**
 * Build a compact list of pages with ellipses.
 * - Always includes 1 and total (when total > 1)
 * - Shows a sliding window around `curr`
 * - Inserts up to two ellipses (left/right) when gaps exist
 * - Ellipsis items carry a `number` that jumps toward the hidden block
 */
export function getPagination(curr: number, total: number, limit = 7): Page[] {
	const mtotal = Math.max(1, Math.floor(total || 1));
	const mcurr = Math.min(Math.max(1, Math.floor(curr || 1)), mtotal);

	if (mtotal <= limit) {
		return Array.from(
			{
				length: mtotal,
			},
			(_, i) => {
				return {
					number: i + 1,
				};
			}
		);
	}

	// Reserve 2 slots for first/last; remaining for the sliding window + up to 2 ellipses
	// windowSize is limit - 4 (first, last, 2 ellipses). Minimum of 1.
	const windowSize = Math.max(1, limit - 4);
	const [start, end] = windowRange(mcurr, mtotal, windowSize);

	const pages: Page[] = [];

	// First page
	pages.push({
		number: 1,
	});

	// Left ellipsis (gap between 1 and start)
	if (start > 2) {
		// Jump target: midpoint between 1 and start
		const leftJump = Math.max(2, Math.floor((1 + start) / 2));
		pages.push({
			number: leftJump,
			ellipsis: true,
		});
	}

	// Middle window
	for (let p = start; p <= end; p += 1) {
		pages.push({
			number: p,
		});
	}

	// Right ellipsis (gap between end and total)
	if (end < mtotal - 1) {
		// Jump target: midpoint between end and total
		const rightJump = Math.min(mtotal - 1, Math.floor((end + mtotal) / 2));
		pages.push({
			number: rightJump,
			ellipsis: true,
		});
	}

	// Last page
	pages.push({
		number: mtotal,
	});

	// Ensure uniqueness by page number while preserving order
	const seen = new Set<number>();
	return pages.filter((p) => {
		if (seen.has(p.number)) return false;
		seen.add(p.number);
		return true;
	});
}

export class PaginationList {
	public pages: Page[];

	constructor({ curr, total, limit = 7 }: PaginationListInit) {
		this.pages = getPagination(curr, total, limit);
	}
}
