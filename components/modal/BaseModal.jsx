import {
	FloatingFocusManager,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import { CrossIcon } from '../icons';
import { Popper } from '../popper';
import { Button } from '../buttons';
import styles from './BaseModal.module.css';

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
		customWrapperId,
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

	return (
		<Popper
			open={open}
			className={popperClassName}
			transparent={false}
			wrapperId={customWrapperId ?? 'base-modal-popper'}>
			{open && (
				<FloatingFocusManager context={context}>
					<div
						{...getFloatingProps({
							className: classes(styles.root, className),
							ref: floating,
						})}>
						{renderHeader && (
							<div data-elem='header' className={styles.header}>
								{renderHeader}
							</div>
						)}
						<div data-elem='body' className={styles.body}>
							{children}
						</div>
						{renderFooter && (
							<div data-elem='footer' className={styles.footer}>
								{renderFooter}
							</div>
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
	customWrapperId: PropTypes.string,
};

BaseModal.defaultProps = {
	className: '',
	popperClassName: '',
	renderHeader: null,
	renderFooter: null,
	toggle: () => {},
	noDismiss: false,
	customWrapperId: null,
};

export default BaseModal;
