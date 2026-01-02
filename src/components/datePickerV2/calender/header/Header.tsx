import { subHours, subMinutes } from 'date-fns';
import { type ReactElement } from 'react';
import { classes, getDayInfo } from '../../../../utils';
import { Button } from '../../../buttons';
import { ChevronIcon } from '../../../icons';
import DateSwitcher from '../../dateSwitcher/DateSwitcher';
import styles from './Header.module.css';

interface SelectedMonth {
	month: string;
	monthAsNumber: number;
	year: number;
}

interface SelectedDate {
	month?: string;
	year?: number;
	date?: number;
	unix?: number;
}

interface CarouselSwitchProps {
	onMonthChange: (direction: 'prev' | 'next') => void;
	selectedMonth: SelectedMonth;
	displayMonthRight: SelectedMonth;
}

interface HeaderProps {
	range?: boolean;
	dateSelectionView?: boolean;
	defaultHourDiff?: number;
	timeSelectionView?: boolean;
	selectedDate: SelectedDate;
	selectedMonth: SelectedMonth;
	setSelectedMonth: (month: SelectedMonth) => void;
	setSelectedDate: (date: SelectedDate) => void;
	displayMonthRight: SelectedMonth;
	onMonthChange: (direction: 'prev' | 'next') => void;
}

const CarouselSwitch = ({
	onMonthChange,
	selectedMonth,
	displayMonthRight,
}: CarouselSwitchProps): ReactElement => {
	return (
		<div className={styles['title-container']}>
			<div className={styles['left-container']}>
				<Button
					size='auto'
					variant='text'
					data-elem='left'
					className={styles['left-button']}
					onClick={(): void => {
						onMonthChange('prev');
					}}
					rightComponent={(): ReactElement => {
						return <ChevronIcon className={classes(styles.icon)} position='left' />;
					}}
				/>
				<span
					className={
						styles.title
					}>{`${selectedMonth?.month} ${String(selectedMonth?.year)}`}</span>
			</div>

			<div className={styles['right-container']}>
				<span
					className={
						styles.title
					}>{`${displayMonthRight?.month} ${String(displayMonthRight?.year)}`}</span>
				<Button
					size='auto'
					variant='text'
					data-elem='right'
					className={styles['right-button']}
					onClick={(): void => {
						onMonthChange('next');
					}}
					rightComponent={(): ReactElement => {
						return <ChevronIcon className={classes(styles.icon)} position='right' />;
					}}
				/>
			</div>
		</div>
	);
};

const Header = (props: HeaderProps): ReactElement => {
	const { range, dateSelectionView, defaultHourDiff, timeSelectionView, selectedDate } = props;

	const showCarouselSwitcher: boolean = !dateSelectionView && !timeSelectionView;

	let currentTime = getDayInfo(new Date());
	if (selectedDate.unix !== undefined) {
		currentTime = getDayInfo(new Date(selectedDate.unix * 1000));
	}

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
			defaultHourDiff !== undefined ? 0 : currentTime.minutes
		)
	);

	return (
		<div className={styles.root}>
			{showCarouselSwitcher && <CarouselSwitch {...props} />}
			<div className={styles['date-time-switch']}>
				{dateSelectionView && <DateSwitcher {...props} />}
			</div>
		</div>
	);
};

export default Header;
