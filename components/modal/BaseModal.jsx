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
	const { className, renderHeader, children, renderFooter, toggle, open } = props;

	const { floating, context } = useFloating({
		open,
		onOpenChange: toggle,
	});

	const { getFloatingProps } = useInteractions([useDismiss(context)]);

	return (
		<Popper open={open} transparent={false} wrapperId='base-modal-popper'>
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
	renderHeader: PropTypes.element,
	renderFooter: PropTypes.element,
	toggle: PropTypes.func,
};

BaseModal.defaultProps = {
	className: '',
	renderHeader: null,
	renderFooter: null,
	toggle: () => {},
};

export default BaseModal;
