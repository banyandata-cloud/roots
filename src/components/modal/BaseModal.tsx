/* eslint-disable no-nested-ternary */
import {
	FloatingFocusManager,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { CrossIcon } from '../icons';
import { Popper } from '../popper';
import { Text } from '../text';
import styles from './BaseModal.module.css';
import type { ReactElement } from 'react';

interface FooterAnimations {
	initial: {
		opacity: number;
		y: string;
	};
	animate: {
		opacity: number;
		y: number;
	};
	transition: {
		duration: number;
	};
}

const footerAnimations: FooterAnimations = {
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
};

interface ModalHeaderProps {
	title: string;
	description?: string;
}

const MotionFooter = motion.footer as React.FC<
	React.HTMLAttributes<HTMLElement> & import('framer-motion').MotionProps
>;

const ModalHeader = ({ title, description }: ModalHeaderProps): ReactElement => {
	return (
		<>
			<Text component='h2' variant='h2' weight={600}>
				{title}
			</Text>
			{description && (
				<Text component='span' variant='b1' weight={400}>
					{description}
				</Text>
			)}
		</>
	);
};

interface ModalFooterProps {
	actionTitle?: string;
	disabled?: {
		action?: boolean;
		cancel?: boolean;
	};
	cancelTitle?: string;
	onAction?: () => void;
	onDismiss?: () => void;
	toggle?: (open: boolean) => void;
	loading?: boolean;
}

const ModalFooter = (props: ModalFooterProps): ReactElement => {
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
		toggle?.(false);
	};

	return (
		<>
			<Button
				className={styles.dismiss}
				title={cancelTitle}
				onClick={handleDismiss}
				disabled={disabled?.cancel}
			/>
			<Button
				className={styles.action}
				title={actionTitle}
				onClick={handleAction}
				disabled={disabled?.action}
			/>
		</>
	);
};

interface AnimationProps {
	initial: {
		opacity: number;
		scale: number;
		x: string;
		y: string;
	};
	animate: {
		opacity: number;
		scale: number;
		x: string;
		y: string;
	};
	exit: {
		scale: number;
		opacity: number;
	};
	transition: {
		duration: number;
	};
}

const DEFAULT_ANIMATION_PROPS: AnimationProps = {
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
};

interface BaseModalProps {
	className?: string;
	title?: string;
	description?: string;
	popperClassName?: string;
	renderHeader?: React.ReactNode | ((props: any) => React.ReactNode);
	children?: React.ReactNode;
	renderFooter?: React.ReactNode | ((props: any) => React.ReactNode);
	toggle?: (open: boolean) => void;
	open?: boolean;
	noDismiss?: boolean;
	hideCrossDismiss?: boolean;
	footerProps?: ModalFooterProps;
	animation?: boolean;
	animationProperties?: AnimationProps;
}

/**
 * Renders a modal dialog with customizable header, body, and footer content.
 * Manages the modal's open state and provides a toggle function.
 * Handles dismiss interactions, such as clicking outside the modal or pressing the Escape key.
 *
 * @param {string} className - The CSS class name for the modal container.
 * @param {string} popperClassName - The CSS class name for the popper container.
 * @param {ReactElement|Function} renderHeader - The content to render in the modal header.
 * @param {ReactElement} children - The content to render in the modal body.
 * @param {ReactElement|Function} renderFooter - The content to render in the modal footer.
 * @param {Function} toggle - A function to toggle the modal's open state.
 * @param {boolean} open - The open state of the modal.
 * @param {boolean} noDismiss - If true, the modal cannot be dismissed by clicking outside or pressing the Escape key.
 * @param {boolean} hideCrossDismiss - If true, it will hide the cross close button from the top right of the modal.
 * @returns {ReactElement} The rendered modal dialog.
 */
const BaseModal = (props: BaseModalProps): ReactElement => {
	const {
		className = '',
		title,
		description,
		popperClassName = '',
		renderHeader,
		children,
		renderFooter,
		toggle = () => {},
		open,
		noDismiss,
		hideCrossDismiss,
		footerProps,
		animation = true,
		animationProperties = DEFAULT_ANIMATION_PROPS,
	} = props;

	const { floating, context } = useFloating({
		open,
		onOpenChange: (isOpen) => toggle(isOpen),
	});

	const { getFloatingProps } = useInteractions([
		useDismiss(context, {
			enabled: !noDismiss,
		}),
	]);

	const { props: bodyProps } = (children as any) ?? {};

	return (
		<AnimatePresence>
			<Popper
				open={open}
				className={popperClassName}
				transparent={false}
				wrapperId='base-modal-popper'>
				{open && (
					<FloatingFocusManager context={context}>
						<motion.div
							{...getFloatingProps({
								className: classes(styles.root, className),
								ref: floating,
								...(animation && {
									...animationProperties,
								}),
							} as any)}>
							{renderHeader ? (
								<header data-elem='header' className={styles.header}>
									{typeof renderHeader === 'function'
										? renderHeader({
												...bodyProps,
										  })
										: renderHeader}
								</header>
							) : (
								<header data-elem='header' className={styles.header}>
									<ModalHeader title={title || ''} description={description} />
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
									className={styles.footer}>
									{typeof renderFooter === 'function'
										? renderFooter({
												...bodyProps,
										  })
										: renderFooter}
								</MotionFooter>
							) : footerProps ? (
								<MotionFooter
									{...(animation && {
										...footerAnimations,
									})}
									data-elem='footer'
									className={styles.footer}>
									<ModalFooter {...footerProps} />
								</MotionFooter>
							) : null}
							{!hideCrossDismiss && (
								<Button
									size='auto'
									variant='text'
									className={styles.close}
									onClick={() => {
										toggle(false);
									}}
									rightComponent={() => {
										return <CrossIcon className={styles.icon} />;
									}}
								/>
							)}
						</motion.div>
					</FloatingFocusManager>
				)}
			</Popper>
		</AnimatePresence>
	);
};

export default BaseModal;
