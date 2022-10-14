import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleModal } from '../../../redux/drawer';
import { classes } from '../../utils';
import Cross from '../icons/Cross/Cross';
import styles from './BaseModal.module.css';

Modal.setAppElement('#root');

const BaseModal = (props) => {
	const { className, renderHeader, children, renderFooter } = props;

	const { open } = useSelector((state) => {
		return state.drawerReducer.modal;
	});

	const dispatch = useDispatch();
	const toggle = () => {
		dispatch(
			toggleModal({
				open: false,
			})
		);
	};

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
};

BaseModal.defaultProps = {
	className: '',
	renderHeader: null,
	renderFooter: null,
};

export default BaseModal;
