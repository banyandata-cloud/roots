/* eslint-disable no-nested-ternary */
import { Button } from '../../../buttons';
import styles from './Footer.module.css';

const Footer = (props) => {
	const {
		selectedDate = {},
		selectedRange = {},

		onApply,
	} = props;

	const { date } = selectedDate;

	const { dates = [] } = selectedRange;

	const datesSelected = date || dates.length === 2;

	return (
		<div className={styles.root}>
			{datesSelected && <Button onClick={onApply} title='Apply' className={styles.apply} />}
		</div>
	);
};

export default Footer;
