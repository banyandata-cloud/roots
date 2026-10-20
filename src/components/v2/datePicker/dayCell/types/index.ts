import type { DayInfo } from '../../types';

export interface DayCellProps {
	day: DayInfo;
	onSelect: (date: Date) => void;
	onHoverEnter?: ((date: Date) => void) | undefined;
	onHoverLeave?: (() => void) | undefined;
	/** `sm` is used on the touch bottom sheet (44px rows); `md` is the desktop 34px row. */
	size?: 'md' | 'sm' | undefined;
}
