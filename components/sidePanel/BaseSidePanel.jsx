import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './BaseSidePanel.module.css';
import { classes } from '../../utils';

const BaseSidePanel = (props) => {
	const { className, renderHeader, children, renderFooter, open, position, parent } = props;

	const panelRef = useRef();

	const toggle = (state) => {
		if (state) {
			panelRef.current.style.width = '20rem';
			if (position === 'left') {
				document.getElementById(parent).style.marginLeft = '20rem';
				document.getElementById(parent).style.transition = '0.5s';
			} else {
				document.getElementById(parent).style.marginRight = '20rem';
				document.getElementById(parent).style.transition = '0.5s';
			}
			return;
		}
		panelRef.current.style.width = '0rem';
		if (position === 'left') {
			document.getElementById(parent).style.marginLeft = '0rem';
			document.getElementById(parent).style.transition = '0.5s';
		} else {
			document.getElementById(parent).style.marginRight = '0rem';
			document.getElementById(parent).style.transition = '0.5s';
		}
	};

	useEffect(() => {
		toggle(open);
	}, [open]);

	return (
		<div ref={panelRef} className={classes(styles.root, styles[position], className)}>
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
	position: PropTypes.string,
	parent: PropTypes.string,
};

BaseSidePanel.defaultProps = {
	className: '',
	renderHeader: null,
	renderFooter: null,
	open: false,
	position: 'right',
	parent: '',
};

export default BaseSidePanel;
