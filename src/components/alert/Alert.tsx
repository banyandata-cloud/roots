import { useDismiss, useFloating, useInteractions } from '@floating-ui/react-dom-interactions';
import { useAnimate } from 'framer-motion';
import type { ForwardRefRenderFunction, ReactNode } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { classes } from '../../utils/utils';
import { Button } from '../buttons';
import { AlertIcon, CrossIcon } from '../icons';
import Popper from '../popper/Popper';
// import styles from './Alert.module.css';
import type { AlertConfig, AlertHandle, AlertProps } from './types';

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

// Tailwind Classes
const ROOT_CLASSES =
	'bn-flex bn-flex-row bn-justify-between bn-items-start bn-fixed bn-p-4 bn-w-[37.5rem] bn-rounded bn-opacity-100';
const ICON_CONTAINER_CLASSES =
	'bn-flex bn-items-center bn-justify-center bn-w-10 bn-h-10 bn-rounded-lg bn-bg-light-color3';
const CONTENT_CLASSES = 'bn-flex bn-flex-col bn-items-start bn-gap-1 bn-ml-5';
const TITLE_CLASSES = 'bn-text-text-color bn-text-base bn-font-semibold';
const DESCRIPTION_CLASSES =
	'bn-text-text-color bn-text-base bn-font-normal bn-leading-[1.3125rem] bn-break-words';
const ACTIONS_CLASSES = 'bn-flex bn-flex-row bn-gap-1';
const CLOSE_ICON_CLASSES = 'bn-w-5 bn-h-5 bn-fill-text-color';
const BUTTON_CLOSE_CLASSES = 'bn-h-auto';

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
		title: undefined,
		description: undefined,
		icon: undefined,
		type: 'info',
		action: undefined,
		position: undefined,
		onClose: () => setOpen((prev) => !prev),
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
	if (CustomIcon) {
		Icon = <CustomIcon className='bn-w-6 bn-h-6' />;
	} else {
		switch (type) {
			case 'info':
				Icon = <AlertIcon.Info className='bn-w-6 bn-h-6' />;
				break;
			case 'error':
				Icon = <AlertIcon.Error className='bn-w-6 bn-h-6' />;
				break;
			case 'warning':
				Icon = <AlertIcon.Warning className='bn-w-6 bn-h-6' />;
				break;
			case 'success':
				Icon = <AlertIcon.Success className='bn-w-6 bn-h-6' />;
				break;
			case 'danger':
				Icon = <AlertIcon.Danger className='bn-w-6 bn-h-6' />;
				break;
			default:
				Icon = null;
		}
	}

	const { floating, context } = useFloating({
		open,
		onOpenChange: setOpen,
	});
	const [scope, animate] = useAnimate();

	const alert = (appliedAlertProps: Partial<AlertConfig>) => {
		setAlertProps((prev) => ({ ...prev, ...appliedAlertProps }));
	};

	useImperativeHandle(ref, () => ({ alert }));

	useEffect(() => {
		if (alertProps.title) setOpen((prev) => !prev);
	}, [alertProps]);

	useEffect(() => {
		if (scope.current && animation) {
			const [positionType, staticPosition] = position.split('-');
			animate(scope.current, {
				y: ANIMATION.transform[positionType as keyof typeof ANIMATION.transform],
				x: ANIMATION.static[staticPosition as keyof typeof ANIMATION.static],
			});
		}
	}, [animate, animation, position, scope]);

	useEffect(() => {
		if (alertProps.title && autoDismiss) {
			const timer = setTimeout(() => setOpen(false), dismissTime);
			return () => clearTimeout(timer);
		}
		return undefined;
	}, [alertProps, autoDismiss, dismissTime]);

	const { getFloatingProps } = useInteractions([useDismiss(context)]);

	const typeBg = {
		info: 'bn-bg-[#e6edff]',
		error: 'bn-bg-[#ffebec]',
		danger: 'bn-bg-[#ffebec]',
		success: 'bn-bg-[#edffed]',
		warning: 'bn-bg-[#fff6d4]',
	}[type];

	const positionClasses = {
		'bottom-center': 'bn-left-1/2 bn-bottom-4 bn--translate-x-1/2',
		'top-center': 'bn-left-1/2 bn-top-4 bn--translate-x-1/2',
		'top-right': 'bn-right-4 bn-top-4',
		'bottom-right': 'bn-right-4 bn-bottom-4',
	}[position];

	const iconShadow = {
		info: 'bn-shadow-[0_0_0.6rem_0_#0f62fe]',
		error: 'bn-shadow-[0_0_0.6rem_0_#bd3c45]',
		danger: 'bn-shadow-[0_0_0.6rem_0_#bd3c45]',
		success: 'bn-shadow-[0_0_0.6rem_0_#487349]',
		warning: 'bn-shadow-[0_0_0.6rem_0_#cba006]',
	}[type];

	return (
		<Popper open={open} wrapperId='alert-popper' lockScroll={false}>
			<div
				{...getFloatingProps({
					ref: floating,
					className: classes(
						ROOT_CLASSES,
						type ? typeBg : 'bn-bg-light-color3',
						shadow ? 'bn-shadow-[0_0_0.5rem_0_rgba(0,0,0,0.25)]' : '',
						positionClasses,
						className
					),
				})}
				ref={scope}>
				<div className={classes('bn-flex bn-flex-row bn-items-start')}>
					<div className={classes(ICON_CONTAINER_CLASSES, iconShadow)}>
						{showIcon && Icon}
					</div>
					<div className={CONTENT_CLASSES}>
						<span className={TITLE_CLASSES}>{title}</span>
						<span className={DESCRIPTION_CLASSES}>{description}</span>
					</div>
				</div>
				<div className={ACTIONS_CLASSES}>
					{CustomAction && <CustomAction />}
					{onClose && !autoDismiss && (
						<Button
							title=''
							size='auto'
							variant='text'
							onClick={() => {
								onClose();
								setOpen(false);
							}}
							className={BUTTON_CLOSE_CLASSES}
							leftComponent={() => <CrossIcon className={CLOSE_ICON_CLASSES} />}
						/>
					)}
				</div>
			</div>
		</Popper>
	);
};

export default forwardRef(Alert);
