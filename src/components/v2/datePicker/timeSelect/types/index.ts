import type { TimeOfDay } from '../../types';

export interface TimeSelectProps {
	/** Row label, e.g. "Starts at", "Ends at", "At", "From", "To". */
	label?: string | undefined;
	value: TimeOfDay | null;
	onChange: (time: TimeOfDay) => void;
	hour12: boolean;
	disabled?: boolean | undefined;
	/** Same-day end constraint (edge case #16): only times strictly after this are offered. */
	minExclusive?: TimeOfDay | undefined;
	/** Shown instead of the selects when a same-day end has no valid slot left (edge case #16). */
	noSlotMessage?: string | undefined;
}
