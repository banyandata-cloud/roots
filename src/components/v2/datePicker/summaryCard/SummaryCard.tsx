import type { ReactElement } from 'react';
import { classes } from '../../utils';
import { Tags } from '../../tags';
import styles from './SummaryCard.module.scss';
import type { SummaryCardProps } from './types';

/**
 * C10 Summary card. Range mode only — always drawn (placeholder until both dates are
 * picked) so the popover never changes height; not rendered at all in single mode.
 */
const SummaryCard = (props: SummaryCardProps): ReactElement => {
	const { state, durationText, datesText, presetLabel, startLabel } = props;

	if (state === 'empty') {
		return (
			<div className={classes(styles.root, styles.placeholder)}>
				<span className={styles.placeholderTitle}>No dates selected</span>
				<span className={styles.placeholderBody}>Pick a start date and an end date</span>
			</div>
		);
	}

	if (state === 'start-only') {
		return (
			<div className={classes(styles.root, styles.placeholder)}>
				<span className={styles.placeholderTitle}>Select an end date</span>
				<span
					className={styles.placeholderBody}
				>{`${startLabel ?? ''} \u2192 End Date`}</span>
			</div>
		);
	}

	return (
		<div className={styles.root}>
			<div className={styles.textBlock}>
				<span className={styles.duration}>{durationText}</span>
				<span className={styles.dates}>{datesText}</span>
			</div>
			{presetLabel && <Tags label={presetLabel} size='sm' />}
		</div>
	);
};

export default SummaryCard;
