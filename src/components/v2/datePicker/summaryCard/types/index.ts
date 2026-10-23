export type SummaryCardState = 'empty' | 'start-only' | 'filled';

export interface SummaryCardProps {
	state: SummaryCardState;
	/** e.g. "30 Days 8hrs" — filled state only. */
	durationText?: string | undefined;
	/** e.g. "Sep 01, 2026 → Sep 30, 2026" — filled state only. */
	datesText?: string | undefined;
	/** Shown as a tag on the right when the value still matches a preset. */
	presetLabel?: string | null | undefined;
	/** Picked start date shown while waiting for the end (start-only state). */
	startLabel?: string | undefined;
}
