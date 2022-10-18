import { useRef } from 'react';
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import Cross from '../icons/Cross/Cross';
import styles from './BaseModal.module.css';
import { Popper } from '../popper';
import { useOutsideClickListener } from '../../hooks';

const BaseModal = (props) => {
	const { className, renderHeader, children, renderFooter, toggle, open } = props;

	const ref = useRef(null);

	useOutsideClickListener(ref, () => {
		return toggle(false);
	});

	if (open) {
		return (
			<Popper open={open} transparent={false} id='base-modal-popper'>
				<div className={classes(styles.root, className)} ref={ref}>
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
				</div>
			</Popper>
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
