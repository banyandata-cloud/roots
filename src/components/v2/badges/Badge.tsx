import { forwardRef } from 'react';
import { classes } from '../../../utils';
import ArrowLeftIcon from '../badges/assets/ArrowLeftIcon';
import ArrowIcon from '../badges/assets/ArrowRightIcon';
import UpArrowIcon from '../badges/assets/ArrowUpIcon';
import DotIcon from '../badges/assets/DotIcon';
import PlusIcon from '../badges/assets/PlusIcon';
import { ARROW_SIZE, DOT_SIZE, ICON_SIZE } from '../badges/constants';
import type { BadgeProps } from '../badges/types';
import Button from '../buttons/button/Button';
import CrossIcon from '../tags/assets/TagCloser/TagCloserSm';
import Text from '../text/Text';
import styles from './Badge.module.scss';

const DEFAULT_ICON_COLOR = 'var(--badge-icon-color, var(--color-fg-quaternary, #717680))';
const CLOSE_ICON_COLOR = 'var(--badge-cross-icon-color, var(--color-fg-disabled, #c1c5cd))';

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{
			label,
			variant = 'pill',
			color = 'gray',
			size = 'sm',
			onClose,
			dot = false,
			dotColor = DEFAULT_ICON_COLOR,
			arrow = false,
			arrowColor = DEFAULT_ICON_COLOR,
			arrowLead = false,
			arrowLeadColor = DEFAULT_ICON_COLOR,
			upArrow = false,
			upArrowColor = DEFAULT_ICON_COLOR,
			plus = false,
			plusColor = DEFAULT_ICON_COLOR,
			className,
		},
		ref
	) => {
		const classNames = classes(
			styles.badge,
			styles[`badge--${size}`],
			styles[`badge--${variant}`],
			variant !== 'modern' && styles[`badge--color-${color}`],
			dot && styles['badge--has-dot'],
			arrow && styles['badge--has-arrow'],
			arrowLead && styles['badge--has-lead'],
			upArrow && styles['badge--has-up-arrow'],
			plus && styles['badge--has-plus'],
			onClose && styles['badge--has-closer'],
			className
		);

		return (
			<span ref={ref} className={classNames}>
				{dot && (
					<DotIcon
						size={DOT_SIZE[size]}
						color={dotColor}
						className={styles.badge__icon}
					/>
				)}
				{arrowLead && (
					<ArrowLeftIcon
						size={ARROW_SIZE}
						color={arrowLeadColor}
						className={styles.badge__icon}
					/>
				)}
				{upArrow && (
					<UpArrowIcon
						size={ARROW_SIZE}
						color={upArrowColor}
						className={styles.badge__icon}
					/>
				)}
				{plus && (
					<PlusIcon size={ARROW_SIZE} color={plusColor} className={styles.badge__icon} />
				)}
				{label && (
					<Text component='span' stroke='medium' className={styles.badge__label}>
						{label}
					</Text>
				)}
				{arrow && (
					<ArrowIcon
						size={ARROW_SIZE}
						color={arrowColor}
						className={styles.badge__icon}
					/>
				)}
				{onClose && (
					<Button
						type='button'
						variant='unstyled'
						className={styles.badge__closer}
						onClick={onClose}
						title={<CrossIcon size={ICON_SIZE[size]} color={CLOSE_ICON_COLOR} />}
					/>
				)}
			</span>
		);
	}
);

Badge.displayName = 'Badge';

export default Badge;
