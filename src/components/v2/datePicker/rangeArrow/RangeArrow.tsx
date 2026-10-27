import type { CSSProperties, ReactElement } from 'react';
import { classes } from '../../utils';
import { ArrowRightIcon } from '../icons';
import styles from './RangeArrow.module.scss';

export interface RangeArrowProps {
	className?: string | undefined;
	style?: CSSProperties | undefined;
}

/**
 * C6 Range arrow: joins the Start and End date fields. Never shows a number — the
 * length of the range lives only in the Summary card — and is never interactive.
 */
const RangeArrow = (props: RangeArrowProps): ReactElement => {
	const { className, style } = props;

	return (
		<div className={classes(styles.root, className)} style={style} aria-hidden='true'>
			<ArrowRightIcon className={styles.icon} />
		</div>
	);
};

export default RangeArrow;
