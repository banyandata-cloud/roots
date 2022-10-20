import React from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { CalenderIcon, HalfShadeIcon } from '../../icons';
import styles from './Footer.module.css';
import { dateRanges } from './utils';

const Footer = (props) => {
	const { selectedDate = {}, selectedRange = {}, setSelectedRange, range, onApply } = props;

	const { date, month, year } = selectedDate;

	const { dates = [] } = selectedRange;

	const monthInShort = month?.substr(0, 3);

	const datesSelected = date || dates.length === 2;

	const selectFixedDateRange = (dateRange) => {
		setSelectedRange(dateRange);
	};

	return (
		<div className={styles.root}>
			{datesSelected && (
				<div className={styles['selected-date']}>
					<CalenderIcon />
					<div className={styles.date}>
						{dates.length > 0 && (
							<span className={styles.value}>
								{`${selectedRange.dates[0]} - ${selectedRange.dates[1]}`}
							</span>
						)}
						<span className={styles.value}>
							{date} {monthInShort} {year}
						</span>
					</div>
				</div>
			)}
			{range && (
				<div className={styles['date-ranges']}>
					{dateRanges.map(({ dateRange, title }) => {
						const selectedFixedDateRange =
							dateRange.unix.toString() === selectedRange.unix?.toString();

						return (
							<div
								className={classes(
									styles['date-range'],
									selectedFixedDateRange ? styles.selected : ''
								)}
								onClick={() => {
									selectFixedDateRange(dateRange);
								}}
								key={title}>
								<HalfShadeIcon />
								<span>{title}</span>
							</div>
						);
					})}
				</div>
			)}
			{datesSelected && <Button onClick={onApply} title='Apply' className={styles.apply} />}
		</div>
	);
};

export default Footer;
