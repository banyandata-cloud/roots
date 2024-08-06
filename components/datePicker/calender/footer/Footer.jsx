/* eslint-disable no-nested-ternary */
import { Button } from '../../../buttons';
import styles from './Footer.module.css';

const Footer = (props) => {
	const { selectedDate = {}, selectedRange = {}, onApply, onClear, value } = props;

	const { date } = selectedDate;

	const { dates = [] } = selectedRange;

	const datesSelected = date || dates.length === 2;

	return (
		<div className={styles.root}>
			{value && <Button onClick={onClear} title='Clear' className={styles.clear} />}
			{datesSelected && <Button onClick={onApply} title='Apply' className={styles.apply} />}
		</div>
	);
};

export default Footer;
