import { classes } from '../../../../utils';
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
	const { range, dateSelectionView, timeSelectionView } = props ?? {};

	const showCarouselSwitcher = !dateSelectionView && !timeSelectionView;

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
