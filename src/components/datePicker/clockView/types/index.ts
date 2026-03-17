import type { ActiveTimeSelection, TimeRangeSelection } from '../../calender/Calender';

export interface ClockViewProps {
	activeTimeSelection?: ActiveTimeSelection | undefined;
	timeRangeSelection?: TimeRangeSelection | undefined;
	setTimeRangeSelection?: ((value: TimeRangeSelection) => void) | undefined;
	limitHours?: number | undefined;
}

export type RangeType = 'previous' | 'next';
