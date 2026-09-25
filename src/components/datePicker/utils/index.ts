import { autoUpdate, flip, offset, shift, size } from '@floating-ui/react-dom-interactions';
import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	differenceInMonths,
	fromUnixTime,
	getUnixTime,
} from 'date-fns';
import { MONTHS } from '../../../constants';
import { doubleDigitted } from '../../../utils';
import type { TimeSlot } from '../calender/types';
import { dateRanges } from '../calender/footer/utils';

interface FloatingSize {
	rects: {
		reference: { width: number };
	};
	availableHeight: number;
	elements: {
		floating: { style: CSSStyleDeclaration };
	};
}

interface MaxRange {
	value: number;
	type: 'months' | 'days';
}

interface SelectedRange {
	dates?: string[];
	unix?: number[];
}

interface MaxRangeArgs {
	maxRange: MaxRange | null;
	selectedRange: SelectedRange;
}

interface DatePickerDisplayValueArgs {
	value: number | number[];
	rangePicker: boolean;
	singlePicker: boolean | number;
	timeRange?: boolean | undefined;
	limitHours?: number | undefined;
	showTime?: boolean | undefined;
}

export const getMonthAbbreviation = (date: Date): string => {
	return MONTHS[date.getMonth()] ?? '';
};

export const getFloatingReferences = (open: boolean, onOpenChange: (open: boolean) => void) => {
	return {
		open,
		onOpenChange,
		whileElementsMounted: autoUpdate,
		middleware: [
			size({
				apply({ rects, availableHeight, elements }: FloatingSize) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`,
						minWidth: 'fit-content',
						maxHeight: `${availableHeight}px`,
					});
				},
				padding: 8,
			}),
			offset(5),
			flip({
				padding: 8,
			}),
			shift({
				padding: 8,
			}),
		],
	};
};

export const isMaxRangeExceeded = ({ maxRange, selectedRange }: MaxRangeArgs): boolean => {
	if (maxRange === null) {
		return false;
	}

	const { value, type } = maxRange;
	const { unix } = selectedRange;
	const [firstDateInRange, secondDateInRange] = unix ?? [];

	if (firstDateInRange === undefined || secondDateInRange === undefined) {
		return false;
	}

	const diffInMonth = differenceInMonths(
		fromUnixTime(secondDateInRange),
		fromUnixTime(firstDateInRange)
	);
	const diffInDays = differenceInDays(
		fromUnixTime(secondDateInRange),
		fromUnixTime(firstDateInRange)
	);

	if (type === 'months') {
		return diffInMonth <= value && diffInDays < value * 30;
	}

	if (type === 'days') {
		return diffInDays <= value;
	}

	return false;
};

export const getDateRangeTag = (dates: number[] = []): string => {
	const [startUnix, endUnix] = dates;

	if (startUnix === undefined || endUnix === undefined) {
		return 'day';
	}

	const dayDifference = differenceInDays(fromUnixTime(endUnix), fromUnixTime(startUnix));
	const hourDifference = differenceInHours(fromUnixTime(endUnix), fromUnixTime(startUnix));
	const minuteDifference = differenceInMinutes(fromUnixTime(endUnix), fromUnixTime(startUnix));

	if (minuteDifference <= 60) {
		return 'minute';
	}

	if (hourDifference <= 24) {
		return 'hour';
	}

	if (dayDifference >= 60) {
		return 'month';
	}

	return 'day';
};

export const calculateZeroHours = (
	hours: number | undefined,
	meridian: string | undefined
): number => {
	if (hours === 12) {
		if (meridian === 'PM') {
			return 12;
		}
		return 0;
	}
	return hours ?? 0;
};

export const calculateMeridian = (prev: string | undefined, next: string | undefined): string => {
	if (prev === next) {
		return prev === 'AM' ? 'PM' : 'AM';
	}
	return next ?? 'AM';
};

export const to24Hour = (hours: number | undefined, meridian: string | undefined): number => {
	if (meridian === 'PM' && (hours ?? 0) < 12) {
		return (hours ?? 0) + 12;
	}
	return calculateZeroHours(hours, meridian);
};

export const combineDateAndTime = (dateUnix: number, time?: TimeSlot): number => {
	const date = fromUnixTime(dateUnix);
	return getUnixTime(
		new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			to24Hour(time?.HOURS, time?.MER),
			time?.MINS ?? 0
		)
	);
};

const formatRangeTimePart = (unix: number): string => {
	const date = fromUnixTime(unix);
	const hours12 = doubleDigitted(((date.getHours() + 11) % 12) + 1);
	const minutes = doubleDigitted(date.getMinutes());
	const meridian = date.getHours() >= 12 ? 'PM' : 'AM';
	return `${getMonthAbbreviation(date)} ${date.getDate()}, ${hours12}:${minutes} ${meridian}`;
};

export const formatRangeDuration = (fromUnix: number, toUnix: number): string => {
	if (toUnix <= fromUnix) {
		return '';
	}

	const totalMinutes = Math.floor((toUnix - fromUnix) / 60);
	const days = Math.floor(totalMinutes / (24 * 60));
	const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
	const minutes = totalMinutes % 60;

	if (days > 0) {
		return hours > 0 ? `${days}d ${hours}hr` : `${days}d`;
	}

	if (hours > 0) {
		return minutes > 0 ? `${hours}hr ${minutes}m` : `${hours}hr`;
	}

	return `${minutes}m`;
};

export const getRangeWithTimePreview = (
	fromUnix: number | undefined,
	toUnix: number | undefined
): { text: string; duration: string } | null => {
	if (fromUnix === undefined || toUnix === undefined) {
		return null;
	}

	return {
		text: `${formatRangeTimePart(fromUnix)} → ${formatRangeTimePart(toUnix)}`,
		duration: formatRangeDuration(fromUnix, toUnix),
	};
};

export const getDatePickerDisplayValue = ({
	value,
	rangePicker,
	singlePicker,
	timeRange,
	limitHours,
	showTime = true,
}: DatePickerDisplayValueArgs): string => {
	if (rangePicker && timeRange) {
		const rangeValue = value as number[];
		const startUnix = rangeValue[0];
		const endUnix = rangeValue[1];

		if (startUnix === undefined || endUnix === undefined) {
			return '';
		}

		return `${formatRangeTimePart(startUnix)} → ${formatRangeTimePart(endUnix)}`;
	}

	if (rangePicker) {
		const rangeValue = value as number[];
		const startUnix = rangeValue[0];
		const endUnix = rangeValue[1];

		if (startUnix === undefined || endUnix === undefined) {
			return '';
		}

		const startDate = fromUnixTime(startUnix);
		const endDate = fromUnixTime(endUnix);

		const selectedFixedRange = dateRanges().find((dRange) => {
			return dRange.dateRange?.unix?.toString() === rangeValue.toString();
		});

		if (selectedFixedRange) {
			return selectedFixedRange.title;
		}
		const startDateValue = `${startDate.getDate()} ${getMonthAbbreviation(startDate)} ${startDate.getFullYear()}`;
		const endDateValue = `${endDate.getDate()} ${getMonthAbbreviation(endDate)} ${endDate.getFullYear()}`;

		return `${startDateValue} - ${endDateValue}`;
	}

	if (singlePicker && !timeRange) {
		const singleValue = value as number;
		if (singleValue === undefined) return '';

		const sDate = fromUnixTime(singleValue);

		const dateValue = `${sDate.getDate()} ${getMonthAbbreviation(sDate)} ${sDate.getFullYear()}`;

		if (showTime) {
			const timeValue = `${doubleDigitted(((sDate.getHours() + 11) % 12) + 1)}:${doubleDigitted(
				sDate.getMinutes()
			)} ${sDate.getHours() >= 12 ? 'PM' : 'AM'}`;
			return `${dateValue}, ${timeValue}`;
		}

		return dateValue;
	}

	if (timeRange) {
		const singleValue = value as number;
		if (singleValue === undefined) return '';

		const sDate = fromUnixTime(singleValue - 3600 * (limitHours ?? 0));
		const eDate = fromUnixTime(singleValue);

		const dateValue = `${sDate.getDate()} ${getMonthAbbreviation(sDate)} ${sDate.getFullYear()}`;

		if (showTime) {
			const timeValue = `${doubleDigitted(((sDate.getHours() + 11) % 12) + 1)}:${doubleDigitted(
				sDate.getMinutes()
			)} ${sDate.getHours() >= 12 ? 'PM' : 'AM'} - ${doubleDigitted(
				((eDate.getHours() + 11) % 12) + 1
			)}:${doubleDigitted(eDate.getMinutes())} ${eDate.getHours() >= 12 ? 'PM' : 'AM'}`;
			return `${dateValue}, ${timeValue}`;
		}

		return dateValue;
	}

	return '';
};
