import { subHours, subMinutes } from 'date-fns';
import React, { useEffect } from 'react';
import { classes, getDayInfo } from '../../../../utils';
import { Button } from '../../../buttons';
import { ChevronIcon } from '../../../icons';
import { DateSwitcher } from '../../dateSwitcher';
import { TimeSwitcher } from '../../timeSwitcher';
import styles from './Header.module.css';
import { DateAndTimeSelection } from './dateAndTimeSelection';

const CarouselSwitch = ({ onMonthChange, selectedMonth }) => {
	return (
		<div className={styles['title-container']}>
			<Button
				size='auto'
				variant='text'
				data-elem='left'
				onClick={() => {
					onMonthChange('prev');
				}}
				rightComponent={() => {
					return <ChevronIcon className={classes(styles.icon)} position='left' />;
				}}
			/>

			<span className={styles.title}>{`${selectedMonth?.month} ${selectedMonth?.year}`}</span>

			<Button
				size='auto'
				variant='text'
				data-elem='right'
				onClick={() => {
					onMonthChange('next');
				}}
				rightComponent={() => {
					return <ChevronIcon className={classes(styles.icon)} position='right' />;
				}}
			/>
		</div>
	);
};

const Header = (props) => {
	const {
		range,
		dateSelectionView,
		defaultHourDiff,
		timeSelectionView,
		setTimeRangeSelection,
		selectedDate,
	} = props ?? {};

	const showCarouselSwitcher = !dateSelectionView && !timeSelectionView;

	const currentTime = getDayInfo(new Date());

	const prevTime = getDayInfo(
		subMinutes(
			subHours(
				new Date(
					currentTime.year,
					currentTime.monthAsNumber,
					currentTime.dateAsNumber,
					currentTime.hoursIn12,
					currentTime.minutes
				),
				defaultHourDiff ?? currentTime.hoursIn12
			),
			defaultHourDiff ? 0 : currentTime.minutes
		)
	);

	useEffect(() => {
		setTimeRangeSelection({
			next: {
				HOURS: currentTime.hours,
				MINS: currentTime.minutes,
				MER: currentTime.meridian,
			},
			previous: {
				HOURS: prevTime.hours,
				MINS: prevTime.minutes,
				MER: prevTime.meridian,
			},
		});
	}, []);

	useEffect(() => {
		if (selectedDate.unix !== undefined) {
			const newTime = getDayInfo(new Date(selectedDate.unix * 1000));
			setTimeRangeSelection({
				next: {
					HOURS: newTime.hours,
					MINS: newTime.minutes,
					MER: newTime.meridian,
				},
				previous: {
					HOURS: prevTime.hours,
					MINS: prevTime.minutes,
					MER: prevTime.meridian,
				},
			});
		}
	}, [selectedDate.unix]);

	return (
		<div className={styles.root}>
			{!range && <DateAndTimeSelection {...props} />}
			{showCarouselSwitcher && <CarouselSwitch {...props} />}
			<div className={styles['date-time-switch']}>
				{dateSelectionView && <DateSwitcher {...props} />}
				{timeSelectionView && <TimeSwitcher {...props} />}
			</div>
		</div>
	);
};

export default Header;
