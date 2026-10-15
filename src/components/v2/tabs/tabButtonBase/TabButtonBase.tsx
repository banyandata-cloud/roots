import type { ReactElement } from 'react';
import { classes } from '../../../../utils';
import styles from './TabButtonBase.module.css';
import type { TabButtonBaseProps } from './types';

const TabButtonBase = (props: TabButtonBaseProps): ReactElement => {
	const {
		size = 'xs',
		type = 'button-brand',
		current = false,
		icon,
		badge,
		className = '',
		children,
		...rest
	} = props;

	return (
		<button
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
			{badge !== undefined && badge !== null ? (
				<span className={classes(styles.badge, current && styles['badge-brand'])}>
					{badge}
				</span>
			) : null}
		</button>
	);
};

export default TabButtonBase;
