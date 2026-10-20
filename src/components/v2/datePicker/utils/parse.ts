import { isValid, parse as parseDateFns } from 'date-fns';

const WITH_YEAR_FORMATS = ['MMM dd, yyyy', 'MMM d, yyyy', 'MMMM dd, yyyy', 'MMMM d, yyyy'];
const WITHOUT_YEAR_FORMATS = ['MMM dd', 'MMM d', 'MMMM dd', 'MMMM d'];

function tryFormats(text: string, formats: string[], referenceDate: Date): Date | null {
	for (const fmt of formats) {
		const parsed = parseDateFns(text, fmt, referenceDate);
		if (isValid(parsed)) {
			return parsed;
		}
	}
	return null;
}

/** Numeric dates are day-first; month-first only when the second number is over 12 (edge case #23). */
function parseNumeric(text: string, referenceDate: Date): Date | null {
	const match = /^(\d{1,2})[/.](\d{1,2})(?:[/.](\d{2,4}))?$/.exec(text);
	if (!match) {
		return null;
	}
	const [, aStr, bStr, yStr] = match as unknown as [string, string, string, string | undefined];
	const a = Number(aStr);
	const b = Number(bStr);

	if (yStr && yStr.length === 2) {
		return null; // Two-digit years are rejected.
	}
	const year = yStr ? Number(yStr) : referenceDate.getFullYear();

	let day: number;
	let month: number;
	if (b > 12 && a <= 12) {
		month = a;
		day = b;
	} else {
		day = a;
		month = b;
	}
	if (month < 1 || month > 12 || day < 1 || day > 31) {
		return null;
	}
	const date = new Date(year, month - 1, day);
	return date.getMonth() === month - 1 ? date : null; // rejects impossible dates like Feb 30
}

/** ISO dates (2024-02-05); kept separate from the numeric day-first parser. */
function parseIso(text: string): Date | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
	if (!match) {
		return null;
	}
	const [, yStr, mStr, dStr] = match as unknown as [string, string, string, string];
	const year = Number(yStr);
	const month = Number(mStr);
	const day = Number(dStr);
	const date = new Date(year, month - 1, day);
	return date.getMonth() === month - 1 ? date : null;
}

/** Accepts "Feb 05, 2024", "2024-02-05", "20/08/2024", "20.08.2024" (edge case #22). */
export function parseTypedDate(text: string, referenceDate: Date = new Date()): Date | null {
	const trimmed = text.trim();
	if (!trimmed) {
		return null;
	}
	return (
		parseIso(trimmed) ??
		parseNumeric(trimmed, referenceDate) ??
		tryFormats(trimmed, WITH_YEAR_FORMATS, referenceDate) ??
		tryFormats(trimmed, WITHOUT_YEAR_FORMATS, referenceDate)
	);
}

/** Splits "Aug 20, 2024 - Oct 07, 2026", "Oct 1 -> Oct 7" or "Oct 1 to Oct 7" (edge cases #26/#27). */
function splitRangeText(text: string): [string, string] | null {
	const arrowParts = text.split(/\s*(?:->|→)\s*/);
	if (arrowParts.length === 2 && arrowParts[0] && arrowParts[1]) {
		return [arrowParts[0].trim(), arrowParts[1].trim()];
	}
	const toParts = text.split(/\s+to\s+/i);
	if (toParts.length === 2 && toParts[0] && toParts[1]) {
		return [toParts[0].trim(), toParts[1].trim()];
	}
	const dashParts = text.split(/\s-\s/);
	if (dashParts.length === 2 && dashParts[0] && dashParts[1]) {
		return [dashParts[0].trim(), dashParts[1].trim()];
	}
	return null;
}

export function parseRangeText(
	text: string,
	referenceDate: Date = new Date()
): { from: Date; to: Date } | null {
	const parts = splitRangeText(text.trim());
	if (!parts) {
		return null;
	}
	const [startText, endText] = parts;

	const startDate = parseTypedDate(startText, referenceDate);
	if (!startDate) {
		return null;
	}

	let endDate: Date | null;
	if (/^\d{1,2}$/.test(endText)) {
		// "Oct 1 - 7": the end has no month, so it inherits the start's month and year.
		const day = Number(endText);
		const candidate = new Date(startDate.getFullYear(), startDate.getMonth(), day);
		endDate = candidate.getDate() === day ? candidate : null;
	} else {
		endDate = parseTypedDate(endText, referenceDate);
	}
	if (!endDate) {
		return null;
	}

	if (startDate.getTime() > endDate.getTime()) {
		// If the start would be after the end, the start moves back one year (edge case #27).
		const adjustedStart = new Date(
			startDate.getFullYear() - 1,
			startDate.getMonth(),
			startDate.getDate()
		);
		return { from: adjustedStart, to: endDate };
	}
	return { from: startDate, to: endDate };
}
