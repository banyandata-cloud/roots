import { useDismiss, useFloating, useInteractions } from '@floating-ui/react-dom-interactions';
import { useAnimate } from 'framer-motion';
import {
	forwardRef,
	ForwardRefRenderFunction,
	ReactNode,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import { classes } from '../../utils/utils';
import { Button } from '../buttons';
import { AlertIcon, CrossIcon } from '../icons';
import Popper from '../popper/Popper';
import styles from './Alert.module.css';

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

type AlertType = 'info' | 'error' | 'warning' | 'success' | 'danger';
type AlertPosition = 'bottom-right' | 'bottom-center' | 'top-right' | 'top-center';

interface AlertProps {
	showIcon?: boolean;
	shadow?: boolean;
	position?: AlertPosition;
	animation?: boolean;
	className?: string;
}

interface AlertConfig {
	title: string | null;
	description: string | null;
	icon?: React.ComponentType<{ className?: string }>;
	type: AlertType;
	action?: React.ComponentType;
	position?: AlertPosition | null;
	onClose?: () => void;
	autoDismiss?: boolean;
	dismissTime?: number;
}

export interface AlertHandle {
	alert: (props: Partial<AlertConfig>) => void;
}

const Alert: ForwardRefRenderFunction<AlertHandle, AlertProps> = (
	{
		showIcon = true,
		shadow = true,
		position: defaultPosition = 'bottom-center',
		animation = true,
		className = '',
	},
	ref
) => {
	const [open, setOpen] = useState(false);

	const [alertProps, setAlertProps] = useState<AlertConfig>({
		title: null,
		description: null,
		icon: undefined,
		type: 'info',
		action: undefined,
		position: null,
		onClose: () => {
			setOpen((prev) => !prev);
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

	let Icon: ReactNode = null;
	if (CustomIcon != null) {
		Icon = <CustomIcon className={styles.icon} />;
	} else {
		switch (type) {
			case 'info':
				Icon = <AlertIcon.Info className={styles.icon} v2 />;
				break;
			case 'error':
				Icon = <AlertIcon.Error className={styles.icon} />;
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
				Icon = CustomIcon ? <CustomIcon /> : null;
		}
	}

	const { floating, context } = useFloating({
		open,
		onOpenChange: setOpen,
	});
	const [scope, animate] = useAnimate();

	const alert = (appliedAlertProps: Partial<AlertConfig>) => {
		setAlertProps((prev) => ({
			...prev,
			...appliedAlertProps,
		}));
	};

	useImperativeHandle(ref, () => ({ alert }));

	useEffect(() => {
		if (alertProps.title) {
			setOpen((prev) => !prev);
		}
	}, [alertProps]);

	useEffect(() => {
		if (scope.current && animation) {
			const [positionType, staticPosition] = position.split('-');
			animate(scope.current, {
				y: ANIMATION.transform[positionType as keyof typeof ANIMATION.transform],
				x: ANIMATION.static[staticPosition as keyof typeof ANIMATION.static],
			});
		}
	}, [animation, position, scope]);

	useEffect(() => {
		if (alertProps.title && autoDismiss) {
			const timer = setTimeout(() => {
				setOpen(false);
			}, dismissTime);

			return () => clearTimeout(timer);
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
						shadow ? styles.shadow : '',
						styles[`position-${position}`],
						className
					),
				})}
				ref={scope}>
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
								onClose?.();
								setOpen(false);
							}}
							className={styles.close}
							leftComponent={() => <CrossIcon className={styles.icon} />}
						/>
					)}
				</div>
			</div>
		</Popper>
	);
};

export default forwardRef(Alert);
