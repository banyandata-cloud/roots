import { ComponentType, forwardRef, ReactElement, ReactNode } from 'react';
import { classes } from '../../utils/utils';
import { AlertIcon } from '../icons';
import styles from './Callout.module.css';

type CalloutType = 'info' | 'error' | 'warning' | 'success' | 'danger';

interface CalloutProps {
	showIcon?: boolean;
	shadow?: boolean;
	className?: string;
	title?: ReactNode;
	description?: ReactNode;
	icon?: ComponentType<{ className?: string }>;
	action?: ComponentType;
	type: CalloutType;
}

const Callout = forwardRef<HTMLDivElement, CalloutProps>((props, ref): ReactElement | null => {
	const {
		showIcon = true,
		shadow,
		className = '',
		title,
		description,
		icon: CustomIcon,
		action: CustomAction,
		type,
	} = props;

	let Icon: ReactNode = null;

	if (CustomIcon != null) {
		Icon = <CustomIcon className={styles.icon} />;
	} else {
		switch (type) {
			case 'info':
				Icon = <AlertIcon.Info className={styles.icon} v2 />;
				break;
			case 'error':
				Icon = <AlertIcon.Error className={styles.icon} v2 />;
				break;
			case 'warning':
				Icon = <AlertIcon.Warning className={styles.icon} v2 />;
				break;
			case 'success':
				Icon = <AlertIcon.Success className={styles.icon} v2 />;
				break;
			case 'danger':
				Icon = <AlertIcon.Danger className={styles.icon} v2 />;
				break;
			default:
				Icon = CustomIcon ? <CustomIcon className={styles.icon} /> : null;
				break;
		}
	}

	return (
		<div
			ref={ref}
			className={classes(styles.root, styles[type], shadow && styles.shadow, className)}>
			<div className={styles.left}>
				<div className={classes(styles['icon-container'], styles[type])}>
					{showIcon && Icon}
				</div>
				<div className={styles.content}>
					{title && (
						<span data-elem='title' className={styles.title}>
							{title}
						</span>
					)}
					{description && (
						<span data-elem='desc' className={styles.description}>
							{description}
						</span>
					)}
				</div>
			</div>
			<div className={styles.actions}>{CustomAction && <CustomAction />}</div>
		</div>
	);
});

Callout.displayName = 'Callout';

export default Callout;
