import PropTypes from 'prop-types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useDismiss, useFloating, useInteractions } from '@floating-ui/react-dom-interactions';
import { classes } from '../../utils/utils';
import styles from './Alert.module.css';
import { CrossIcon, AlertIcon } from '../icons';
import { Button } from '../buttons';
import Popper from '../popper/Popper';

/**
 * Renders an alert message with optional icon, title, description, and action button.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - showIcon (boolean): Determines whether to show the alert icon.
 *   - border (string): Specifies the border style of the alert.
 *   - shadow (boolean): Determines whether to apply a shadow effect to the alert.
 *   - position (string): Specifies the position of the alert on the screen.
 * @param {Ref} ref - The ref object used to expose the 'alert' function to the parent component.
 * @returns {JSX.Element} - The rendered alert component.
 */
const Alert = forwardRef((props, ref) => {
	const { showIcon, border, shadow, position: defaultPosition } = props;

	const [open, setOpen] = useState(false);
	const [alertProps, setAlertProps] = useState({
		title: null,
		description: null,
		icon: null,
		type: 'info',
		action: null,
		position: null,
		onClose: () => {
			setOpen((prev) => {
				return !prev;
			});
		},
	});
	const {
		title,
		description,
		icon: CustomIcon,
		action: CustomAction,
		type,
		position: appliedPosition,
		onClose,
	} = alertProps;

	const position = appliedPosition ?? defaultPosition;

	let Icon = null;
	if (CustomIcon != null) {
		Icon = <CustomIcon className={styles.icon} />;
	} else {
		switch (type) {
			case 'info':
				Icon = <AlertIcon.Info className={styles.icon} />;
				break;
			case 'warning':
				Icon = <AlertIcon.Warning className={styles.icon} />;
				break;
			case 'success':
				Icon = <AlertIcon.Success className={styles.icon} />;
				break;
			case 'danger':
				Icon = <AlertIcon.Danger className={styles.icon} />;
				break;
			default:
				Icon = <CustomIcon />;
				break;
		}
	}

	const { floating, context } = useFloating({
		open,
		onOpenChange: setOpen,
	});

	const alert = (appliedAlertProps) => {
		setAlertProps({
			...alertProps,
			...appliedAlertProps,
		});
	};

	useImperativeHandle(ref, () => ({
		/**
		 * methods to get exposed
		 */
		alert,
	}));

	useEffect(() => {
		if (alertProps.title) {
			setOpen((prev) => {
				return !prev;
			});
		}
	}, [alertProps]);

	const { getFloatingProps } = useInteractions([useDismiss(context)]);

	return (
		<Popper open={open} className={styles.popper} id='alert-popper'>
			<div
				{...getFloatingProps({
					ref: floating,
					className: classes(
						styles.root,
						styles[type],
						styles[`border-${border}`],
						shadow ? styles.shadow : '',
						styles[`position-${position}`]
					),
				})}>
				<div className={styles.left}>
					<div className={styles.icons}>{showIcon && Icon}</div>
					<div className={styles.content}>
						<span className={styles.title}>{title}</span>
						<span className={styles.description}>{description}</span>
					</div>
				</div>
				<div className={styles.actions}>
					{CustomAction && <CustomAction />}
					{onClose && (
						<Button
							size='auto'
							variant='text'
							onClick={() => {
								onClose();
								setOpen(false);
							}}
							className={styles.close}
							leftComponent={() => {
								return <CrossIcon className={styles.icon} />;
							}}
						/>
					)}
				</div>
			</div>
		</Popper>
	);
});

Alert.propTypes = {
	showIcon: PropTypes.bool,
	border: PropTypes.oneOf(['default', 'thick-left', 'none']),
	shadow: PropTypes.bool,
	position: PropTypes.oneOf(['bottom-center', 'top-right']),
};

Alert.defaultProps = {
	showIcon: true,
	border: 'default',
	shadow: true,
	position: 'bottom-center',
};

export default Alert;
