import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import Cross from '../icons/Cross/Cross';
import styles from './BaseModal.module.css';

Modal.setAppElement('#root');

const BaseModal = (props) => {
	const { className, renderHeader, children, renderFooter, toggle, open } = props;

	if (open) {
		return (
			<Modal
				isOpen={open}
				className={classes(className, styles.content)}
				overlayClassName={styles.overlay}
				onRequestClose={toggle}>
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
				<div className={styles.closeModal} onClick={toggle}>
					<Cross className={styles.closeIcon} />
				</div>
			</Modal>
		);
	}
	return null;
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
