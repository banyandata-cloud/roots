/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { classes } from '../../utils';
import BaseModal from '../modal/BaseModal';
import Tabs from '../tabs/Tabs';
import styles from './BaseSidePanel.module.css';

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
		className = '',
		renderHeader = null,
		children,
		renderFooter = null,
		open = false,
		isModal = false,
		toggle = () => {},
		noDismiss = false,
		animation = false,
		toggleTableDrawer = {},
		setToggleTableDrawer = () => {},
		activeTab,
		tabsConfig = {
			tabs: [],
			className: '',
		},
	} = props;

	const { tabs = [], className: tabsClassName } = tabsConfig ?? {};

	const [selectedTab, setSelectedTab] = useState();

	const panelRef = useRef();

	useEffect(() => {
		if (activeTab >= 0) {
			setToggleTableDrawer({
				...toggleTableDrawer,
				data: {
					...toggleTableDrawer.data,
					index: activeTab,
				},
			});
			setSelectedTab(activeTab + 1);
		}
	}, [activeTab]);

	useEffect(() => {
		if (selectedTab) {
			setToggleTableDrawer({
				...toggleTableDrawer,
				data: {
					...toggleTableDrawer.data,
					index: selectedTab - 1,
				},
			});
		}
	}, [selectedTab]);

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
		<div
			ref={panelRef}
			className={classes(
				styles.drawer,
				open ? '' : styles.close,
				animation ? styles.animation : '',
				className
			)}>
			{tabs.length > 0 ? (
				<Tabs
					tabs={tabs}
					className={classes(styles.tabs, tabsClassName)}
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

export default BaseSidePanel;
