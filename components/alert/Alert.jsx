import PropTypes from 'prop-types';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useDismiss, useFloating, useInteractions } from '@floating-ui/react-dom-interactions';
import { useAnimate } from 'framer-motion';
import { classes } from '../../utils/utils';
import styles from './Alert.module.css';
import { CrossIcon, AlertIcon } from '../icons';
import { Button } from '../buttons';
import Popper from '../popper/Popper';

const ALERT_DISMISS_TIME = 2000;

const ANIMATION = {
	transform: {
		top: [-100, 0],
		bottom: [100, 0],
	},
	static: {
		center: ['-50%', '-50%'],
		right: ['0%', '0%'],
	},
};

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
const Alert = forwardRef((props, ref) => {
	const { showIcon, border, shadow, position: defaultPosition, animation, className } = props;

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
		autoDismiss: true,
		dismissTime: ALERT_DISMISS_TIME,
	});
	const {
		title,
		description,
		icon: CustomIcon,
		action: CustomAction,
		type,
		position: appliedPosition,
		onClose,
		autoDismiss,
		dismissTime,
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
	const [scope, animate] = useAnimate();

	const alert = (appliedAlertProps) => {
		setAlertProps({
			...alertProps,
			...appliedAlertProps,
		});
	};

	useImperativeHandle(ref, () => {
		return {
			/**
			 * methods to get exposed
			 */
			alert,
		};
	});

	useEffect(() => {
		if (alertProps.title) {
			setOpen((prev) => {
				return !prev;
			});
		}
	}, [alertProps]);

	useEffect(() => {
		if (scope.current && animation) {
			const [positionType, staticPosition] = position.split('-');
			animate(scope.current, {
				y: ANIMATION.transform[positionType],
				x: ANIMATION.static[staticPosition],
			});
		}
	});

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (alertProps.title && autoDismiss) {
			const timer = setTimeout(() => {
				setOpen(false);
			}, dismissTime);
			return () => {
				return clearTimeout(timer);
			};
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
						styles[`position-${position}`],
						className
					),
				})}
				ref={scope}>
				<div className={styles.left}>
					<div className={styles.icons}>{showIcon && Icon}</div>
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
	position: PropTypes.oneOf(['bottom-right', 'bottom-center', 'top-right', 'top-center']),
	animation: PropTypes.bool,
	className: PropTypes.string,
};

Alert.defaultProps = {
	showIcon: true,
	border: 'none',
	shadow: true,
	position: 'bottom-center',
	animation: true,
	className: '',
};

export default Alert;
