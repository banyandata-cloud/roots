import { forwardRef, type ForwardedRef, type ReactElement } from 'react';
import { classes } from '../../utils';
import styles from './TabButtonBase.module.scss';
import type { TabButtonBaseProps } from './types';

const TabButtonBase = forwardRef(
	(props: TabButtonBaseProps, ref: ForwardedRef<HTMLButtonElement>): ReactElement => {
		const {
			size = 'xs',
			type = 'button-brand',
			current = false,
			icon,
			rightIcon,
			badge,
			className = '',
			children,
			...rest
		} = props;

		return (
			<button
				ref={ref}
				type='button'
				role='tab'
				aria-selected={current}
				className={classes(
					styles.root,
					styles[size],
					styles[type],
					current && styles.current,
					className
				)}
				{...rest}
			>
				{icon ? <span className={styles.icon}>{icon}</span> : null}
				{children}
				{rightIcon ? <span className={styles.icon}>{rightIcon}</span> : null}
				{badge !== undefined && badge !== null ? (
					<span className={classes(styles.badge, current && styles['badge-brand'])}>
						{badge}
					</span>
				) : null}
			</button>
		);
	}
);

TabButtonBase.displayName = 'TabButtonBase';

export default TabButtonBase;
