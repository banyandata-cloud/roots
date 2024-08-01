/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { classes } from '../../utils';
import BaseModal from '../modal/BaseModal';
import styles from './BaseSidePanel.module.css';
import Tabs from '../tabs/Tabs';

const BaseSidePanel = (props) => {
	const {
		className,
		renderHeader,
		children,
		renderFooter,
		open,
		isModal,
		toggle,
		noDismiss,
		animation,
		tabsConfig = {
			tabs: [],
			className: '',
		},
	} = props;

	const { tabs, className: tabsClassName } = tabsConfig;

	const panelRef = useRef();

	return isModal ? (
		<BaseModal
			open={open}
			toggle={toggle}
			hideCrossDismiss
			noDismiss={noDismiss}
			className={classes(styles.modal, className)}
			renderHeader={
				renderHeader && (
					<div data-elem='header' className={styles.header}>
						{renderHeader}
					</div>
				)
			}
			renderFooter={
				renderFooter && (
					<div data-elem='footer' className={styles.footer}>
						{renderFooter}
					</div>
				)
			}
			animation={animation}
			animationProperties={{
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
					duration: 0.3,
				},
			}}>
			{children}
		</BaseModal>
	) : (
		<div ref={panelRef} className={classes(styles.drawer, open ? '' : styles.close, className)}>
			{tabs.length > 0 && (
				<Tabs tabs={tabs} className={tabsClassName} direction='vertical'>
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
				</Tabs>
			)}
		</div>
	);
};

BaseSidePanel.propTypes = {
	className: PropTypes.string,
	renderHeader: PropTypes.element,
	renderFooter: PropTypes.element,
	open: PropTypes.bool,
	isModal: PropTypes.bool,
	toggle: PropTypes.func,
	noDismiss: PropTypes.bool,
	animation: PropTypes.bool,
};

BaseSidePanel.defaultProps = {
	className: '',
	renderHeader: null,
	renderFooter: null,
	open: false,
	isModal: false,
	toggle: () => {},
	noDismiss: false,
	animation: false,
};

export default BaseSidePanel;
