import type { TimeSlot, TimeRangeSelection, ActiveTimeSelection } from '../../calender/types';

export type { TimeSlot, TimeRangeSelection, ActiveTimeSelection };

export type RangeType = 'previous' | 'next';

export interface TimeCounterProps {
	activeTimeSelection?: ActiveTimeSelection | undefined;
	setActiveTimeSelection: (value: ActiveTimeSelection) => void;
	setTimeRangeSelection: (value: TimeRangeSelection) => void;
	timeRangeSelection?: TimeRangeSelection | undefined;
	type: RangeType;
	limitHours?: number | undefined;
}

export interface TimeSwitcherProps {
	activeTimeSelection?: ActiveTimeSelection | undefined;
	setActiveTimeSelection: (value: ActiveTimeSelection) => void;
	setTimeRangeSelection: (value: TimeRangeSelection) => void;
	timeRangeSelection?: TimeRangeSelection | undefined;
	limitHours?: number | undefined;
	valueAsRange?: boolean | undefined;
}
