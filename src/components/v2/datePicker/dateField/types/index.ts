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
}
