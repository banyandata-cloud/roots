/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import {
	FloatingFocusManager,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { CrossIcon } from '../icons';
import { Popper } from '../popper';
import { Text } from '../text';
import styles from './BaseModal.module.css';

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
};

const ModalHeader = ({ title, description }) => {
	return (
		<>
			<Text component='h2' variant='h2' weight={600}>
				{title}
			</Text>
			<Text component='span' variant='b1' weight={400}>
				{description}
			</Text>
		</>
	);
};

const ModalFooter = (props) => {
	const {
		actionTitle = 'Save',
		disable = {},
		cancelTitle = 'Cancel',
		onAction,
		onDismiss,
		toggle,
		loading,
	} = props ?? {};

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
				className={styles.dismiss}
				title={cancelTitle}
				onClick={handleDismiss}
				disable={disable.cancel}
			/>
			<Button
				className={styles.action}
				title={actionTitle}
				onClick={handleAction}
				disable={disable.action}
			/>
		</>
	);
};

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
const BaseModal = (props) => {
	const {
		className,
		title,
		description,
		popperClassName,
		renderHeader,
		children,
		renderFooter,
		toggle,
		open,
		noDismiss,
		hideCrossDismiss,
		footerProps,
		animation,
		animationProperties,
	} = props;

	const { floating, context } = useFloating({
		open,
		onOpenChange: toggle,
	});

	const { getFloatingProps } = useInteractions([
		useDismiss(context, {
			enabled: !noDismiss,
		}),
	]);

	const { props: bodyProps } = children ?? {};

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
							})}>
							{renderHeader ? (
								<header data-elem='header' className={styles.header}>
									{(() => {
										if (typeof renderHeader !== 'function') {
											return renderHeader;
										}
										return renderHeader({
											...bodyProps,
										});
									})()}
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
								<motion.footer
									{...(animation && {
										...footerAnimations,
									})}
									data-elem='footer'
									className={styles.footer}>
									{(() => {
										if (typeof renderFooter !== 'function') {
											return renderFooter;
										}
										return renderFooter({
											...bodyProps,
										});
									})()}
								</motion.footer>
							) : footerProps ? (
								<motion.footer
									{...(animation && {
										...footerAnimations,
									})}
									data-elem='footer'
									className={styles.footer}>
									<ModalFooter {...footerProps} />
								</motion.footer>
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

BaseModal.propTypes = {
	className: PropTypes.string,
	popperClassName: PropTypes.string,
	renderHeader: PropTypes.element,
	renderFooter: PropTypes.element,
	toggle: PropTypes.func,
	noDismiss: PropTypes.bool,
	hideCrossDismiss: PropTypes.bool,
	animation: PropTypes.bool,
	animationProperties: PropTypes.object,
};

BaseModal.defaultProps = {
	className: '',
	popperClassName: '',
	renderHeader: null,
	renderFooter: null,
	toggle: () => {},
	noDismiss: false,
	hideCrossDismiss: false,
	animation: true,
	animationProperties: {
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
	},
};

export default BaseModal;
