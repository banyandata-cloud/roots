import { classes } from '../../../utils';
import { Button } from '../../buttons';
import styles from './Ranges.module.css';
import { dateRanges } from './utils';

const CustomRanges = ({ customRanges, selectedRange, setSelectedRange, setFixedRange }) => {
	const selectFixedDateRange = (dateRange, title) => {
		setSelectedRange(dateRange);
		setFixedRange(title);
	};

	return (
		<div className={styles.root}>
			{dateRanges(customRanges)?.map(({ dateRange, title }) => {
				const selectedFixedDateRange =
					dateRange.unix.toString() === selectedRange?.unix?.toString();

				return (
					<Button
						size='auto'
						key={title}
						onClick={() => {
							selectFixedDateRange(dateRange, title);
						}}
						className={classes(
							styles.option,
							selectedFixedDateRange ? styles.selected : ''
						)}
						title={title}
					/>
				);
			})}
		</div>
	);
};

export default CustomRanges;
