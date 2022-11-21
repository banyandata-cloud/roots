import React from 'react';
import { classes } from '../../../../utils';
import { ChevronIcon } from '../../../icons';
import styles from './Header.module.css';

const Header = (props) => {
	const { selectedMonth, onMonthChange } = props;

	return (
		<div className={styles.container}>
			<div
				onClick={() => {
					onMonthChange('prev');
				}}
				className={styles['left-arrow']}>
				<ChevronIcon className={classes(styles.icon)} position='left' />
			</div>

			<span className={styles.title}>{`${selectedMonth.month} ${selectedMonth.year}`}</span>
			<div
				onClick={() => {
					onMonthChange('next');
				}}
				className={styles['right-arrow']}>
				<ChevronIcon className={classes(styles.icon)} position='right' />
			</div>
		</div>
	);
};

export default Header;
