import React from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../../buttons';
import { ChevronIcon } from '../../../icons';
import { DateAndTimeSelection } from './dateAndTimeSelection';
import styles from './Header.module.css';

const Header = (props) => {
	const { selectedMonth, onMonthChange } = props;

	return (
		<div className={styles.root}>
			<DateAndTimeSelection {...props} />
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

				<span className={styles.title}>
					{`${selectedMonth?.month} ${selectedMonth?.year}`}
				</span>

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
		</div>
	);
};

export default Header;
