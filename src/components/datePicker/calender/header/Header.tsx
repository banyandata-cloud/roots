import React from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { ChevronIcon } from '../../../icons';
import { DateSwitcher } from '../../dateSwitcher';
import { TimeSwitcher } from '../../timeSwitcher';
import styles from './Header.module.css';
import DateAndTimeSelection from './dateAndTimeSelection/DateAndTimeSelection';
import type { HeaderProps, CarouselSwitchProps } from './types';
import type { TimeRangeSelection } from '../Calender';

export type { HeaderProps };

const CarouselSwitch = ({
	onMonthChange,
	selectedMonth,
}: CarouselSwitchProps): React.JSX.Element => {
	return (
		<div className={styles['title-container']}>
			<Button
				size='auto'
				variant='text'
				data-elem='left'
				onClick={() => onMonthChange('prev')}
				rightComponent={() => (
					<ChevronIcon className={classes(styles.icon)} position='left' />
				)}
			/>
			<span className={styles.title}>{`${selectedMonth?.month} ${selectedMonth?.year}`}</span>
			<Button
				size='auto'
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
