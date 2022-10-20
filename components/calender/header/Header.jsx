import React from 'react';
import { ArrowIcon } from '../../icons';
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
				<ArrowIcon />
			</div>

			<span className={styles.title}>{`${selectedMonth.month} ${selectedMonth.year}`}</span>
			<div
				onClick={() => {
					onMonthChange('next');
				}}
				className={styles['right-arrow']}>
				<ArrowIcon />
			</div>
		</div>
	);
};

export default Header;
