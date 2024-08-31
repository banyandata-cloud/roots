import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { classes } from '../../utils/utils';
import { Button } from '../buttons';
import { AlertIcon, CrossIcon } from '../icons';
import styles from './Callout.module.css';

/**
 * Renders an alert message with optional icon, title, description, and action button.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - showIcon (boolean): Determines whether to show the alert icon.
 *   - border (string): Specifies the border style of the alert.
 *   - shadow (boolean): Determines whether to apply a shadow effect to the alert.
 *   - position (string): Specifies the position of the alert on the screen.
 *   - animation (boolean): Determines whether to apply the animation effect.
 * @param {Ref} ref - The ref object used to expose the 'alert' function to the parent component.
 * @returns {JSX.Element} - The rendered alert component.
 */
const Callout = forwardRef((props) => {
	const {
		showIcon = true,
		shadow,
		className = '',
		title,
		description,
		icon: CustomIcon,
		action: CustomAction,
		type,
		onClose,
		autoDismiss,
	} = props;

	let Icon = null;
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
				Icon = <CustomIcon />;
				break;
		}
	}

	return (
		<div className={classes(styles.root, styles[type], shadow ? styles.shadow : '', className)}>
			<div className={styles.left}>
				<div className={classes(styles['icon-container'], styles[type])}>
					{showIcon && Icon}
				</div>
				<div className={styles.content}>
					<span className={styles.title}>{title}</span>
					<span className={styles.description}>{description}</span>
				</div>
			</div>
			<div className={styles.actions}>
				{CustomAction && <CustomAction />}
				{onClose && !autoDismiss && (
					<Button
						size='auto'
						variant='text'
						onClick={() => {
							onClose();
						}}
						className={styles.close}
						leftComponent={() => {
							return <CrossIcon className={styles.icon} />;
						}}
					/>
				)}
			</div>
		</div>
	);
});

Callout.propTypes = {
	showIcon: PropTypes.bool,
	border: PropTypes.oneOf(['default', 'thick-left', 'none']),
	shadow: PropTypes.bool,
	className: PropTypes.string,
};

export default Callout;
