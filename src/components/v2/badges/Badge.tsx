import { forwardRef } from 'react';
import ArrowIcon from '../badges/assets/ArrowRightIcon';
import UpArrowIcon from '../badges/assets/ArrowUpIcon';
import DotIcon from '../badges/assets/DotIcon';
import PlusIcon from '../badges/assets/PlusIcon';
import CrossIcon from '../tags/assets/TagCloser/TagCloserSm';
import styles from './Badge.module.scss';

export type BadgeVariant = 'pill' | 'badge' | 'modern';
export type BadgeSize = 'sm' | 'md' | 'lg';

const ICON_SIZE: Record<BadgeSize, number> = {
	sm: 12,
	md: 12,
	lg: 14,
};

const DOT_SIZE: Record<BadgeSize, number> = {
	sm: 8,
	md: 8,
	lg: 8,
};

interface BadgeProps {
	label?: string | undefined;
	variant?: BadgeVariant | undefined;
	size?: BadgeSize | undefined;
	onClose?: () => void | undefined;
	dot?: boolean | undefined;
	dotColor?: string | undefined;
	arrow?: boolean | undefined;
	arrowColor?: string | undefined;
	upArrow?: boolean | undefined;
	upArrowColor?: string | undefined;
	plus?: boolean | undefined;
	plusColor?: string | undefined;
	className?: string | undefined;
}

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
			upArrow = false,
			upArrowColor = '#717680',
			plus = false,
			plusColor = '#717680',
			className,
		},
		ref
	) => {
		const classNames = [
			styles.badge,
			styles[`badge--${size}`],
			styles[`badge--${variant}`],
			dot ? styles['badge--has-dot'] : '',
			arrow ? styles['badge--has-arrow'] : '',
			upArrow ? styles['badge--has-up-arrow'] : '',
			plus ? styles['badge--has-plus'] : '',
			onClose ? styles['badge--has-closer'] : '',
			className,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<span ref={ref} className={classNames}>
				{dot && (
					<DotIcon
						size={DOT_SIZE[size]}
						color={dotColor}
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
				{label && <span className={styles.badge__label}>{label}</span>}
				{arrow && (
					<ArrowIcon
						size={ICON_SIZE[size]}
						color={arrowColor}
						className={styles.badge__icon}
					/>
				)}
				{onClose && (
					<button
						type='button'
						className={styles.badge__closer}
						onClick={onClose}
						aria-label={`Remove ${label}`}>
						<CrossIcon size={ICON_SIZE[size]} />
					</button>
				)}
			</span>
		);
	}
);

Badge.displayName = 'Badge';

export default Badge;
