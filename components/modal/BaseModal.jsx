/* eslint-disable max-len */
import {
	FloatingFocusManager,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { CrossIcon } from '../icons';
import { Popper } from '../popper';
import { Button } from '../buttons';
import styles from './BaseModal.module.css';

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
		popperClassName,
		renderHeader,
		children,
		renderFooter,
		toggle,
		open,
		noDismiss,
		hideCrossDismiss,
		animation,
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
		<Popper
			open={open}
			className={popperClassName}
			transparent={false}
			wrapperId='base-modal-popper'>
			<AnimatePresence>
				{open && (
					<FloatingFocusManager context={context}>
						<motion.div
							{...getFloatingProps({
								className: classes(styles.root, className),
								ref: floating,
								...(animation && {
									initial: {
										x: '100%',
									},
									animate: {
										x: 0,
									},
									exit: {
										x: '100%',
									},
									transition: {
										duration: 0.5,
									},
								}),
							})}>
							{renderHeader && (
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
							)}
							<div data-elem='body' className={styles.body}>
								{children}
							</div>
							{renderFooter && (
								<footer data-elem='footer' className={styles.footer}>
									{(() => {
										if (typeof renderFooter !== 'function') {
											return renderFooter;
										}
										return renderFooter({
											...bodyProps,
										});
									})()}
								</footer>
							)}
							{!hideCrossDismiss && (
								<Button
									size='auto'
									variant='text'
									data-elem='close'
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
			</AnimatePresence>
		</Popper>
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
};

BaseModal.defaultProps = {
	className: '',
	popperClassName: '',
	renderHeader: null,
	renderFooter: null,
	toggle: () => {},
	noDismiss: false,
	hideCrossDismiss: false,
	animation: false,
};

export default BaseModal;
