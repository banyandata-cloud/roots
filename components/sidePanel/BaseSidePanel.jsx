/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { classes } from '../../utils';
import BaseModal from '../modal/BaseModal';
import styles from './BaseSidePanel.module.css';
import Tabs from '../tabs/Tabs';

const Header = ({ children }) => {
	return (
		<div data-elem='header' className={styles.header}>
			{children}
		</div>
	);
};

const Footer = ({ children }) => {
	return (
		<div data-elem='footer' className={styles.footer}>
			{children}
		</div>
	);
};

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

	const [selectedTab, setSelectedTab] = useState('1');

	const panelRef = useRef();

	return isModal ? (
		<BaseModal
			open={open}
			toggle={toggle}
			hideCrossDismiss
			noDismiss={noDismiss}
			className={classes(styles.modal, className)}
			renderHeader={renderHeader && <Header>{renderHeader}</Header>}
			renderFooter={renderFooter && <Footer>{renderFooter}</Footer>}
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
			{tabs.length > 0 ? (
				<Tabs
					tabs={tabs}
					className={classes(tabsClassName, styles.tabs)}
					direction='vertical'
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}>
					<div className={styles.content}>
						{renderHeader && <Header>{renderHeader}</Header>}
						<div data-elem='body' className={styles.body}>
							{children}
						</div>
						{renderFooter && <Footer>{renderFooter}</Footer>}
					</div>
				</Tabs>
			) : (
				<>
					{renderHeader && <Header>{renderHeader}</Header>}
					<div data-elem='body' className={styles.body}>
						{children}
					</div>
					{renderFooter && <Footer>{renderFooter}</Footer>}
				</>
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
