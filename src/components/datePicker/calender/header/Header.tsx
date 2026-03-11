import React from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { ChevronIcon } from '../../../icons';
import { DateSwitcher } from '../../dateSwitcher';
import { TimeSwitcher } from '../../timeSwitcher';
import styles from './Header.module.css';
import DateAndTimeSelection from './dateAndTimeSelection/DateAndTimeSelection';
import type {
	SelectedDate,
	SelectedMonth,
	SelectedRange,
	TimeRangeSelection,
	ActiveTimeSelection,
} from '../Calender';

export interface HeaderProps {
	range?: boolean | undefined;
	selectedDate: SelectedDate;
	setSelectedDate: (date: SelectedDate) => void;
	selectedRange: SelectedRange;
	setSelectedRange: (range: SelectedRange) => void;
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	onMonthChange: (direction: 'prev' | 'next') => void;
	showDateSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	showTimeSelectionView: (value: boolean | ((prev: boolean) => boolean)) => void;
	dateSelectionView: boolean;
	timeSelectionView: boolean;
	activeGoToSelection?: string | undefined;
	setActiveGoToSelection: (value: string) => void;
	activeTimeSelection?: ActiveTimeSelection | undefined;
	setActiveTimeSelection: (value: ActiveTimeSelection | undefined) => void;
	timeRangeSelection?: TimeRangeSelection | undefined;
	setTimeRangeSelection?: ((value: TimeRangeSelection) => void) | undefined;
	defaultHourDiff?: number | undefined;
	limitHours?: number | undefined;
	showTime?: boolean | undefined;
	valueAsRange?: boolean | undefined;
}

interface CarouselSwitchProps {
	onMonthChange: (direction: 'prev' | 'next') => void;
	selectedMonth: SelectedMonth;
}

const CarouselSwitch = ({
	onMonthChange,
	selectedMonth,
}: CarouselSwitchProps): React.JSX.Element => {
	return (
		<div className={styles['title-container']}>
			<Button
				size='sm'
				variant='text'
				data-elem='left'
				onClick={() => onMonthChange('prev')}
				rightComponent={() => (
					<ChevronIcon className={classes(styles.icon)} position='left' />
				)}
			/>
			<span className={styles.title}>{`${selectedMonth?.month} ${selectedMonth?.year}`}</span>
			<Button
				size='sm'
				variant='text'
				data-elem='right'
				onClick={() => onMonthChange('next')}
				rightComponent={() => (
					<ChevronIcon className={classes(styles.icon)} position='right' />
				)}
			/>
		</div>
	);
};

const Header = (props: HeaderProps): React.JSX.Element => {
	const { range, dateSelectionView, timeSelectionView, setTimeRangeSelection } = props;
	const showCarouselSwitcher = !dateSelectionView && !timeSelectionView;
	const safeSetTimeRangeSelection = (value: TimeRangeSelection): void => {
		setTimeRangeSelection?.(value);
	};

	const sanitizedProps = {
		...props,
		setTimeRangeSelection: safeSetTimeRangeSelection,
	};

	return (
		<div className={styles.root}>
			{!range && <DateAndTimeSelection {...sanitizedProps} />}
			{showCarouselSwitcher && <CarouselSwitch {...props} />}
			<div className={styles['date-time-switch']}>
				{dateSelectionView && <DateSwitcher {...sanitizedProps} />}
				{timeSelectionView && <TimeSwitcher {...sanitizedProps} />}
			</div>
		</div>
	);
};

export default Header;
