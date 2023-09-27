import { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './BaseSidePanel.module.css';
import { classes } from '../../utils';
import { Popper } from '../popper';

const BaseSidePanel = (props) => {
	const { className, renderHeader, children, renderFooter, open, isModal } = props;

	const panelRef = useRef();

	return isModal ? (
		<Popper
			open={open}
			// className={popperClassName}
			transparent={false}
			wrapperId='base-modal-popper'
			className={classes(styles.modal, open ? '' : styles.close, className)}>
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
		</Popper>
	) : (
		<div ref={panelRef} className={classes(styles.drawer, open ? '' : styles.close, className)}>
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
		</div>
	);
};

BaseSidePanel.propTypes = {
	className: PropTypes.string,
	renderHeader: PropTypes.element,
	renderFooter: PropTypes.element,
	open: PropTypes.bool,
};

BaseSidePanel.defaultProps = {
	className: '',
	renderHeader: null,
	renderFooter: null,
	open: false,
};

export default BaseSidePanel;
