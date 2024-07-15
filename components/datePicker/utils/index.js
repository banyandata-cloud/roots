import { offset, flip, size, autoUpdate, shift } from '@floating-ui/react-dom-interactions';
import {
	differenceInMinutes,
	differenceInHours,
	differenceInDays,
	differenceInMonths,
	fromUnixTime,
} from 'date-fns';
import { MONTHS } from '../../../constants';
import { dateRanges } from '../calender/footer/utils';
import { doubleDigitted } from '../../../utils';

export const getFloatingReferences = (open, onOpenChange) => {
	return {
		open,
		onOpenChange,
		whileElementsMounted: autoUpdate,
		middleware: [
			size({
				apply({ rects, availableHeight, elements }) {
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

export const isMaxRangeExceeded = ({ maxRange, selectedRange }) => {
	if (maxRange === null) {
		return false;
	}

	const { value, type } = maxRange;
	const { unix } = selectedRange;
	const [firstDateInRange, secondDateInRange] = unix;

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

export const getDateRangeTag = (dates = []) => {
	const [startUnix, endUnix] = dates;

	const dayDifference = differenceInDays(fromUnixTime(endUnix), fromUnixTime(startUnix));

	const hourDifference = differenceInHours(fromUnixTime(endUnix), fromUnixTime(startUnix));

	const minuteDifference = differenceInMinutes(fromUnixTime(endUnix), fromUnixTime(startUnix));

	if (minuteDifference <= 60) {
		return 'minute';
	}

	if (hourDifference <= 24) {
		return 'hour';
	}

	if (dayDifference >= 30) {
		return 'month';
	}

	return 'day';
};

export const calculateZeroHours = (hours, meridian) => {
	if (hours === 12) {
		if (meridian === 'PM') {
			return 12;
		}
		return 0;
	}
	return hours;
};

export const calculateMeridian = (prev, next) => {
	if (prev === next) {
		return prev === 'AM' ? 'PM' : 'AM';
	}
	return next;
};

export const getDatePickerDisplayValue = ({
	value,
	rangePicker,
	singlePicker,
	timeRange,
	limitHours,
}) => {
	if (rangePicker) {
		const startDate = fromUnixTime(value[0]);
		const endDate = fromUnixTime(value[1]);

		const selectedFixedRange = dateRanges().find((dRange) => {
			return dRange.dateRange?.unix?.toString() === value.toString();
		});

		if (selectedFixedRange) {
			return selectedFixedRange.title;
		}

		const startDateValue = `${startDate.getDate()} ${
			MONTHS[startDate.getMonth().toString()?.substring(0, 3)]
		}`;

		const endDateValue = `${endDate.getDate()} ${
			MONTHS[endDate.getMonth().toString()?.substring(0, 3)]
		} ${endDate.getFullYear()}`;

		return `${startDateValue} - ${endDateValue}`;
	}

	if (singlePicker && !timeRange) {
		const sDate = fromUnixTime(value);

		const timeValue = `${doubleDigitted(((sDate.getHours() + 11) % 12) + 1)}:${doubleDigitted(
			sDate.getMinutes()
		)} ${sDate.getHours() >= 12 ? 'PM' : 'AM'}`;

		return ` ${sDate.getDate()} ${
			MONTHS[sDate.getMonth().toString()?.substring(0, 3)]
		} ${sDate.getFullYear()} ${timeValue}`;
	}
	if (timeRange) {
		const sDate = fromUnixTime(value - 3600 * limitHours);

		const timeValue = `${doubleDigitted(((sDate.getHours() + 11) % 12) + 1)}:${doubleDigitted(
			sDate.getMinutes()
		)} ${sDate.getHours() >= 12 ? 'PM' : 'AM'}`;

		return ` ${sDate.getDate()} ${
			MONTHS[sDate.getMonth().toString()?.substring(0, 3)]
		} ${sDate.getFullYear()} ${timeValue}`;
	}

	return '';
};
