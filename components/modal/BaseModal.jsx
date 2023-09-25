import {
	FloatingFocusManager,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { useAnimate } from 'framer-motion';
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { CrossIcon } from '../icons';
import { Popper } from '../popper';
import { Button } from '../buttons';
import styles from './BaseModal.module.css';
import { useEffect } from 'react';

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

	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (scope.current) {
			animate(scope.current, { opacity: 1 });
			animate('footer', { y: ['100%', '0%'] });
		}
	});

	return (
		<Popper
			open={open}
			className={popperClassName}
			transparent={false}
			wrapperId='base-modal-popper'>
			{open && (
				<FloatingFocusManager context={context}>
					<div
						{...getFloatingProps({
							className: classes(styles.root, className),
							ref: floating,
						})}
						ref={scope}>
						{renderHeader && (
							<header data-elem='header' className={styles.header}>
								{renderHeader}
							</header>
						)}
						<div data-elem='body' className={styles.body}>
							{children}
						</div>
						{renderFooter && (
							<footer data-elem='footer' className={styles.footer}>
								{renderFooter}
							</footer>
						)}
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
					</div>
				</FloatingFocusManager>
			)}
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
};

BaseModal.defaultProps = {
	className: '',
	popperClassName: '',
	renderHeader: null,
	renderFooter: null,
	toggle: () => {},
	noDismiss: false,
};

export default BaseModal;
