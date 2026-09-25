import { fromUnixTime } from 'date-fns';
import React from 'react';
import { classes, doubleDigitted, getDayInfo } from '../../../../../utils';
import { Button } from '../../../../buttons';
import { getMonthAbbreviation } from '../../../utils';
import styles from './DateAndTimeSelection.module.css';
import type { DateAndTimeSelectionProps, TimeSlot } from './types';

export type { DateAndTimeSelectionProps };

const formatFieldDate = (unix?: number): string => {
	if (unix === undefined) {
		return '';
	}
	const date = fromUnixTime(unix);
	return `${date.getDate()} ${getMonthAbbreviation(date)} ${date.getFullYear()}`;
};

const formatFieldTime = (time?: TimeSlot): string => {
	if (time?.HOURS === undefined) {
		return '';
	}
	return `${doubleDigitted(time.HOURS)}:${doubleDigitted(time.MINS)} ${time.MER ?? ''}`.trim();
};

type RangeField = 'startDate' | 'endDate' | 'startTime' | 'endTime';

const DateAndTimeSelection = ({
	selectedDate,
	setActiveGoToSelection,
	activeGoToSelection,
	showDateSelectionView,
	showTimeSelectionView,
	timeRangeSelection = {},
	showTime,
	valueAsRange,
	range,
	selectedRange,
	committedRange,
	setSelectedMonth,
	setActiveTimeSelection,
}: DateAndTimeSelectionProps): React.JSX.Element | null => {
	if (range) {
		const displayedRange = committedRange ?? selectedRange;
		const selectField = (target: RangeField): void => {
			const isSame = activeGoToSelection === target;
			const isDateField = target === 'startDate' || target === 'endDate';

			setActiveGoToSelection(isSame ? '' : target);
			showDateSelectionView(!isSame && isDateField);
			showTimeSelectionView(!isSame && !isDateField);

			if (!isSame && isDateField) {
				const unix =
					target === 'startDate' ? displayedRange?.unix?.[0] : displayedRange?.unix?.[1];
				if (unix !== undefined) {
					const info = getDayInfo(fromUnixTime(unix));
					setSelectedMonth?.({
						month: info.month,
						monthAsNumber: info.monthAsNumber,
						year: info.year,
					});
				}
			}

			if (!isSame && !isDateField) {
				setActiveTimeSelection?.({
					[target === 'startTime' ? 'previous' : 'next']: 'HR',
				});
			}
		};

		return (
			<div className={styles['range-root']}>
				<div className={styles.section}>
					<span className={styles['section-title']}>Date</span>
					<div className={styles.fields}>
						<div className={styles.field}>
							<span className={styles['field-label']}>Start Date</span>
							<Button
								onClick={() => selectField('startDate')}
								className={classes(
									styles.selector,
									activeGoToSelection === 'startDate' ? styles.active : ''
								)}
								title={formatFieldDate(displayedRange?.unix?.[0])}
								variant='outlined'
							/>
						</div>
						<div className={styles.field}>
							<span className={styles['field-label']}>End Date</span>
							<Button
								onClick={() => selectField('endDate')}
								className={classes(
									styles.selector,
									activeGoToSelection === 'endDate' ? styles.active : ''
								)}
								title={formatFieldDate(displayedRange?.unix?.[1])}
								variant='outlined'
							/>
						</div>
					</div>
				</div>
				{showTime && (
					<div className={styles.section}>
						<span className={styles['section-title']}>Time</span>
						<div className={styles.fields}>
							<div className={styles.field}>
								<span className={styles['field-label']}>Start Time</span>
								<Button
									onClick={() => selectField('startTime')}
									className={classes(
										styles.selector,
										activeGoToSelection === 'startTime' ? styles.active : ''
									)}
									title={formatFieldTime(timeRangeSelection.previous)}
									variant='outlined'
								/>
							</div>
							<div className={styles.field}>
								<span className={styles['field-label']}>End Time</span>
								<Button
									onClick={() => selectField('endTime')}
									className={classes(
										styles.selector,
										activeGoToSelection === 'endTime' ? styles.active : ''
									)}
									title={formatFieldTime(timeRangeSelection.next)}
									variant='outlined'
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}

	const { date, month, year } = selectedDate || {};

	const defaultDate = date ? `${doubleDigitted(date)} ${month?.substring(0, 3)} ${year}` : '';

	let defaultTime = `${doubleDigitted(timeRangeSelection.next?.HOURS)}:${doubleDigitted(
		timeRangeSelection.next?.MINS
	)} ${timeRangeSelection.next?.MER}`;

	if (valueAsRange) {
		defaultTime = `${doubleDigitted(timeRangeSelection.previous?.HOURS)}:${doubleDigitted(
			timeRangeSelection.previous?.MINS
		)} ${timeRangeSelection.previous?.MER} - ${doubleDigitted(
			timeRangeSelection.next?.HOURS
		)}:${doubleDigitted(timeRangeSelection.next?.MINS)} ${timeRangeSelection.next?.MER}`;
	}

	const onDateSelectorClick = (): void => {
		showTimeSelectionView(false);
		showDateSelectionView((prev) => !prev);
		if (activeGoToSelection === 'date') {
			setActiveGoToSelection('');
			return;
		}
		setActiveGoToSelection('date');
	};

	const onTimeSelectorClick = (): void => {
		showDateSelectionView(false);
		showTimeSelectionView((prev) => !prev);
		if (activeGoToSelection === 'time') {
			setActiveGoToSelection('');
			return;
		}
		setActiveGoToSelection('time');
	};

	if (!defaultDate) {
		return null;
	}

	return (
		<div className={styles.root}>
			<span>Date & Time</span>
			<div>
				<Button
					onClick={onDateSelectorClick}
					className={classes(
						styles.selector,
						activeGoToSelection === 'date' ? styles.active : ''
					)}
					title={defaultDate}
					variant='outlined'
				/>
				{showTime && (
					<Button
						onClick={onTimeSelectorClick}
						className={classes(
							styles.selector,
							activeGoToSelection === 'time' ? styles.active : ''
						)}
						title={defaultTime}
						variant='outlined'
					/>
				)}
			</div>
		</div>
	);
};

export default DateAndTimeSelection;
