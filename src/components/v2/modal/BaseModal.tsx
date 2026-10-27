import {
	FloatingFocusManager,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentType, FC } from 'react';
import { classes } from '../utils';
import { Button } from '../buttons';
import { ButtonCloseIcon } from '../icons';
import { Popper } from '../popper';
import ModalHeader from './ModalHeader';
import styles from './BaseModal.module.scss';
import type { BaseModalProps, FooterProps, ModalFooterProps } from './types';

const MotionFooter = motion.footer as ComponentType<FooterProps>;

const footerAnimations = {
	initial: {
		opacity: 0,
		y: '50%',
	},
	animate: {
		opacity: 1,
		y: 0,
	},
	transition: {
		duration: 0.5,
	},
} as const;

const ModalFooter: FC<ModalFooterProps> = (props) => {
	const {
		actionTitle = 'Save',
		disabled = {},
		cancelTitle = 'Cancel',
		onAction,
		onDismiss,
		toggle,
		loading,
	} = props;

	const handleAction = () => {
		if (loading) {
			return;
		}
		onAction?.();
	};

	const handleDismiss = () => {
		onDismiss?.();
		toggle?.();
	};

	return (
		<>
			<Button
				size='md'
				variant='outlined'
				className={styles.dismiss}
				title={cancelTitle}
				onClick={handleDismiss}
				disabled={disabled.cancel}
			/>
			<Button
				size='md'
				className={styles.action}
				title={actionTitle}
				onClick={handleAction}
				disabled={disabled.action}
			/>
		</>
	);
};

const DEFAULT_ANIMATION_PROPS = {
	initial: {
		opacity: 0,
		scale: 0,
		x: '-50%',
		y: '-50%',
	},
	animate: {
		opacity: 1,
		scale: 1,
		x: '-50%',
		y: '-50%',
	},
	exit: {
		scale: 0,
		opacity: 0,
	},
	transition: {
		duration: 0.15,
	},
} as const;

/**
 * Renders a modal dialog with customizable header, body, and footer content.
 * Manages the modal's open state and provides a toggle function.
 * Handles dismiss interactions, such as clicking outside the modal or pressing the Escape key.
 */
// eslint-disable-next-line react/function-component-definition
const BaseModal: FC<BaseModalProps> = (props) => {
	const {
		className = '',
		title,
		description,
		popperClassName = '',
		renderHeader,
		children,
		renderFooter,
		toggle,
		open,
		noDismiss,
		hideCrossDismiss,
		footerProps,
		animation = true,
		animationProperties = DEFAULT_ANIMATION_PROPS,
	} = props;

	const { floating, context } = useFloating({
		open,
		...(toggle && {
			onOpenChange: toggle,
		}),
	});

	const { getFloatingProps } = useInteractions([
		useDismiss(context, {
			enabled: !noDismiss,
		}),
	]);

	const bodyProps = ((): unknown => {
		if (
			children &&
			typeof children === 'object' &&
			'props' in (children as unknown as Record<string, unknown>)
		) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return (children as unknown as Record<string, unknown>).props;
		}
		return undefined;
	})();

	return (
		<AnimatePresence>
			<Popper
				open={open}
				className={popperClassName}
				transparent={false}
				wrapperId='base-modal-popper'
			>
				{open && (
					<FloatingFocusManager context={context}>
						<motion.div
							{...getFloatingProps({
								className: classes(styles.root, className),
								ref: floating,
								...(animation && {
									...animationProperties,
								}),
							})}
						>
							{renderHeader ? (
								<header data-elem='header' className={styles.header}>
									{typeof renderHeader !== 'function'
										? renderHeader
										: renderHeader({
												...(bodyProps as Record<string, unknown>),
											})}
								</header>
							) : (
								<header data-elem='header' className={styles.header}>
									<ModalHeader title={title} description={description} />
								</header>
							)}
							<div data-elem='body' className={styles.body}>
								{children}
							</div>
							{renderFooter ? (
								<MotionFooter
									{...(animation && {
										...footerAnimations,
									})}
									data-elem='footer'
									className={styles.footer}
								>
									{typeof renderFooter !== 'function'
										? renderFooter
										: renderFooter({
												...(bodyProps as Record<string, unknown>),
											})}
								</MotionFooter>
							) : (
								footerProps && (
									<MotionFooter
										{...(animation && {
											...footerAnimations,
										})}
										data-elem='footer'
										className={styles.footer}
									>
										<ModalFooter {...footerProps} />
									</MotionFooter>
								)
							)}
							{!hideCrossDismiss && (
								<button
									type='button'
									aria-label='Close'
									className={styles.close}
									onClick={() => {
										toggle?.(false);
									}}
								>
									<ButtonCloseIcon />
								</button>
							)}
						</motion.div>
					</FloatingFocusManager>
				)}
			</Popper>
		</AnimatePresence>
	);
};

export default BaseModal;
