import { subHours, subMinutes } from 'date-fns';
import { DateSwitcher } from '../../../../components/datePicker/dateSwitcher';
import { classes, getDayInfo } from '../../../../utils';
import { Button } from '../../../buttons';
import { ChevronIcon } from '../../../icons';
import styles from './Header.module.css';

const CarouselSwitch = ({ onMonthChange, selectedMonth }) => {
	return (
		<div className={styles['title-container']}>
			<div className={styles['left-container']}>
				<Button
					size='auto'
					variant='text'
					data-elem='left'
					className={styles['left-button']}
					onClick={() => {
						onMonthChange('prev');
					}}
					rightComponent={() => {
						return <ChevronIcon className={classes(styles.icon)} position='left' />;
					}}
				/>
				<span
					className={
						styles.title
					}>{`${selectedMonth?.month} ${selectedMonth?.year}`}</span>
			</div>

			<div className={styles['right-container']}>
				<span
					className={
						styles.title
					}>{`${selectedMonth?.month} ${selectedMonth?.year}`}</span>
				<Button
					size='auto'
					variant='text'
					data-elem='right'
					className={styles['right-button']}
					onClick={() => {
						onMonthChange('next');
					}}
					rightComponent={() => {
						return <ChevronIcon className={classes(styles.icon)} position='right' />;
					}}
				/>
			</div>
		</div>
	);
};

const Header = (props) => {
	const { range, dateSelectionView, defaultHourDiff, timeSelectionView, selectedDate } =
		props ?? {};

	const showCarouselSwitcher = !dateSelectionView && !timeSelectionView;

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
			defaultHourDiff ? 0 : currentTime.minutes
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
