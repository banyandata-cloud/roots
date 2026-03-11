import React from 'react';
import { Button } from '../../../buttons';
import styles from './Footer.module.css';
import type { SelectedDate, SelectedRange, CustomRange } from '../Calender';

export interface FooterProps {
	selectedDate?: SelectedDate | undefined;
	selectedRange?: SelectedRange | undefined;
	onApply: () => void;
	onClear: () => void;
	value?: number | number[] | undefined;
	customRanges?: CustomRange[] | undefined;
	setFixedRange?: ((value: boolean) => void) | undefined;
}

const Footer = (props: FooterProps): React.JSX.Element => {
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
