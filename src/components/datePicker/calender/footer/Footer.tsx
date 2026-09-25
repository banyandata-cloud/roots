import React from 'react';
import { Button } from '../../../buttons';
import { combineDateAndTime, getRangeWithTimePreview } from '../../utils';
import styles from './Footer.module.css';
import type { FooterProps } from './types';

export type { FooterProps };

const Footer = (props: FooterProps): React.JSX.Element => {
	const {
		selectedDate = {},
		selectedRange = {},
		setSelectedRange,
		setSelectedDate,
		setFixedRange,
		onApply,
		onClear,
		value,
		range,
		timeRange,
		timeRangeSelection,
		committedRange,
	} = props;

	const { date } = selectedDate;
	const isDateTimeRange = Boolean(range && timeRange);
	const { dates = [], unix = [] } = (isDateTimeRange ? committedRange : selectedRange) ?? {};
	const datesSelected = isDateTimeRange ? dates.length === 2 : date || dates.length === 2;

	const preview =
		isDateTimeRange && unix.length === 2
			? getRangeWithTimePreview(
					combineDateAndTime(unix[0] as number, timeRangeSelection?.previous),
					combineDateAndTime(unix[1] as number, timeRangeSelection?.next)
				)
			: null;

	const isBelowMinDuration =
		isDateTimeRange &&
		unix.length === 2 &&
		combineDateAndTime(unix[1] as number, timeRangeSelection?.next) -
			combineDateAndTime(unix[0] as number, timeRangeSelection?.previous) <
			3600;

	const handleClear = (): void => {
		setSelectedRange?.({ dates: [], unix: [] });
		setSelectedDate?.({});
		setFixedRange?.(false);
		onClear();
	};

	return (
		<>
			{preview && (
				<div className={styles.preview}>
					<span className={styles['preview-text']}>{preview.text}</span>
					{preview.duration && (
						<span className={styles.duration}>{preview.duration}</span>
					)}
				</div>
			)}
			<div className={styles.root}>
				{value && <Button onClick={handleClear} title='Clear' className={styles.clear} />}
				{datesSelected && (
					<Button
						onClick={onApply}
						title='Apply'
						className={styles.apply}
						disabled={isBelowMinDuration}
					/>
				)}
			</div>
		</>
	);
};

export default Footer;
