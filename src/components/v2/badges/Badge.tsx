import { forwardRef } from 'react';
import { classes } from '../../../utils';
import ArrowLeftIcon from '../badges/assets/ArrowLeftIcon';
import ArrowIcon from '../badges/assets/ArrowRightIcon';
import UpArrowIcon from '../badges/assets/ArrowUpIcon';
import DotIcon from '../badges/assets/DotIcon';
import PlusIcon from '../badges/assets/PlusIcon';
import { DOT_SIZE, ICON_SIZE } from '../badges/constants';
import type { BadgeProps } from '../badges/types';
import Button from '../buttons/button/Button';
import CrossIcon from '../tags/assets/TagCloser/TagCloserSm';
import Text from '../text/Text';
import styles from './Badge.module.scss';

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{
			label,
			variant = 'pill',
			size = 'sm',
			onClose,
			dot = false,
			dotColor = '#717680',
			arrow = false,
			arrowColor = '#717680',
			arrowLead = false,
			arrowLeadColor = '#717680',
			upArrow = false,
			upArrowColor = '#717680',
			plus = false,
			plusColor = '#717680',
			className,
		},
		ref
	) => {
		const classNames = classes(
			styles.badge,
			styles[`badge--${size}`],
			styles[`badge--${variant}`],
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
						size={ICON_SIZE[size]}
						color={arrowLeadColor}
						className={styles.badge__icon}
					/>
				)}
				{upArrow && (
					<UpArrowIcon
						size={ICON_SIZE[size]}
						color={upArrowColor}
						className={styles.badge__icon}
					/>
				)}
				{plus && (
					<PlusIcon
						size={ICON_SIZE[size]}
						color={plusColor}
						className={styles.badge__icon}
					/>
				)}
				{label && (
					<Text component='span' className={styles.badge__label}>
						{label}
					</Text>
				)}
				{arrow && (
					<ArrowIcon
						size={ICON_SIZE[size]}
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
						title={<CrossIcon size={ICON_SIZE[size]} />}
					/>
				)}
			</span>
		);
	}
);

Badge.displayName = 'Badge';

export default Badge;
