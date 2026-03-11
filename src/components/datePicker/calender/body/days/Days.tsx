import React from 'react';
import { DAYS } from '../../../../../constants';
import styles from './Days.module.css';

const Days = (): React.JSX.Element => {
	const daysInWeek: string[] = DAYS;

	return (
		<div className={styles.days}>
			{daysInWeek.map((day: string) => {
				return <span key={day}>{day}</span>;
			})}
		</div>
	);
};
export default Days;
