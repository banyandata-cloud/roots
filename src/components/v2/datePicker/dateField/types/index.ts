import type { ReactNode } from 'react';
import type { DateFieldRole } from '../../types';

export interface DateFieldProps {
	role: DateFieldRole;
	date: Date | null;
	/** A valid date was typed or pasted. */
	onChangeDate: (date: Date) => void;
	/** The clear (x) was pressed, or the field was typed empty then blurred/entered. */
	onClear: () => void;
	/** A full range was typed/pasted into this field (edge cases #26/#27). */
	onPasteRange?: ((range: { from: Date; to: Date }) => void) | undefined;
	future: boolean;
	now: Date;
	/** External error (e.g. clamped-to-data-start note) shown under the card. */
	error?: string | null | undefined;
	/** Time row(s) rendered below the divider; omit to hide the divider and time area. */
	children?: ReactNode | undefined;
	/**
	 * Stretch to fill its flex row (range mode: mirrors Calendar's `flex: 1 1 0` sizing so
	 * each date card's right edge tracks its paired calendar month). Single mode omits this
	 * to keep the compact fixed-width date card.
	 */
	fill?: boolean | undefined;
	/**
	 * Pins the rendered width to an exact pixel value (e.g. a paired Calendar's measured
	 * width), overriding `fill`'s flex-based sizing. Lets the fields row use a different,
	 * wider gap than the calendars row for arrow clearance while the two still line up.
	 */
	width?: number | undefined;
}
