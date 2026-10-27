import type { ReactElement } from 'react';
import { classes } from '../../utils';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from '../icons';
import styles from './MonthHeader.module.scss';
import type { MonthHeaderProps } from './types';

/** C7 Month header: title plus the buttons that move the calendar view (never the selection). */
const MonthHeader = (props: MonthHeaderProps): ReactElement => {
	const {
		title,
		position,
		onPrevYear,
		onPrevMonth,
		onNextMonth,
		onNextYear,
		forwardDisabled = false,
	} = props;

	const showBack = position === 'left' || position === 'single';
	const showForward = position === 'right' || position === 'single';

	const backButtons = showBack && (
		<div className={styles.group}>
			<button
				type='button'
				className={styles.button}
				aria-label='Previous year'
				onClick={onPrevYear}
			>
				<ChevronsLeftIcon />
			</button>
			<button
				type='button'
				className={styles.button}
				aria-label='Previous month'
				onClick={onPrevMonth}
			>
				<ChevronLeftIcon />
			</button>
		</div>
	);

	const forwardButtons = showForward && (
		<div className={styles.group}>
			<button
				type='button'
				className={classes(styles.button, forwardDisabled && styles.disabled)}
				aria-label='Next month'
				disabled={forwardDisabled}
				onClick={onNextMonth}
			>
				<ChevronRightIcon />
			</button>
			<button
				type='button'
				className={classes(styles.button, forwardDisabled && styles.disabled)}
				aria-label='Next year'
				disabled={forwardDisabled}
				onClick={onNextYear}
			>
				<ChevronsRightIcon />
			</button>
		</div>
	);

	return (
		<div className={styles.root}>
			{backButtons}
			<span className={styles.title}>{title}</span>
			{forwardButtons}
		</div>
	);
};

export default MonthHeader;
