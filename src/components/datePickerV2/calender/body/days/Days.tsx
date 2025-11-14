import { DAYS } from '../../../../../constants';
import styles from './Days.module.css';

const Days = () => {
	const daysInWeek = DAYS;

	return (
		<div className={styles.days}>
			{daysInWeek.map((day) => {
				return <span key={day}>{day}</span>;
			})}
		</div>
	);
};

export default Days;
