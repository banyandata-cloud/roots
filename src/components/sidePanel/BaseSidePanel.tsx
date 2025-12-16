import React, { useEffect, useRef, useState } from 'react';
import { classes } from '../../utils';
import BaseModal from '../modal/BaseModal';
import Tabs from '../tabs/Tabs';
import styles from './BaseSidePanel.module.css';

type TabsConfig = {
	/** Passed straight through to <Tabs>. Kept intentionally broad. */
	tabs?: unknown[];
	className?: string;
};

type ToggleTableDrawer = {
	data?: { index?: number } & Record<string, unknown>;
} & Record<string, unknown>;

export interface BaseSidePanelProps {
	className?: string;
	renderHeader?: React.ReactNode;
	renderFooter?: React.ReactNode;
	children?: React.ReactNode;
	tabsOrientation?: 'horizontal' | 'vertical';

	/** When true, render inside BaseModal; otherwise render as a drawer div */
	isModal?: boolean;

	/** Open/close controls */
	open?: boolean;
	toggle?: () => void;
	noDismiss?: boolean;

	/** Slide-in animation (both for modal and drawer) */
	animation?: boolean;

	/** External state that tracks which table drawer/tab is open */
	toggleTableDrawer?: ToggleTableDrawer;
	setToggleTableDrawer?: (next: ToggleTableDrawer) => void;

	/** Zero-based active tab index to sync from parent */
	activeTab?: number;

	/** Tabs configuration passed to <Tabs> */
	tabsConfig?: TabsConfig;
}

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
	<div data-elem='header' className={styles.header}>
		{children}
	</div>
);

const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
	<div data-elem='footer' className={styles.footer}>
		{children}
	</div>
);

const BaseSidePanel: React.FC<BaseSidePanelProps> = (props) => {
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
		tabsConfig = { tabs: [], className: '' },
		tabsOrientation = 'vertical',
	} = props;

	const { tabs = [], className: tabsClassName } = tabsConfig ?? {};

	// Tabs component uses 1-based indexing in this app (selectedTab = activeTab + 1)
	const [selectedTab, setSelectedTab] = useState<number | undefined>(undefined);

	const panelRef = useRef<HTMLDivElement | null>(null);

	// Sync from parent-provided activeTab (0-based) → internal selectedTab (1-based)
	useEffect(() => {
		if (typeof activeTab === 'number' && activeTab >= 0) {
			setToggleTableDrawer({
				...(toggleTableDrawer as ToggleTableDrawer),
				data: {
					...(toggleTableDrawer as ToggleTableDrawer).data,
					index: activeTab,
				},
			});
			setSelectedTab(activeTab + 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	// When user changes the selected tab, reflect it back to external drawer state
	useEffect(() => {
		if (typeof selectedTab === 'number') {
			setToggleTableDrawer({
				...(toggleTableDrawer as ToggleTableDrawer),
				data: {
					...(toggleTableDrawer as ToggleTableDrawer).data,
					index: selectedTab - 1,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTab]);

	const filteredTabs = Array.isArray(tabs) ? (tabs.filter(Boolean) as unknown[]) : [];

	if (isModal) {
		return (
			<BaseModal
				open={open}
				toggle={toggle}
				hideCrossDismiss
				noDismiss={noDismiss}
				className={classes(styles.modal, className)}
				renderHeader={renderHeader ? <Header>{renderHeader}</Header> : undefined}
				renderFooter={renderFooter ? <Footer>{renderFooter}</Footer> : undefined}
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
		);
	}

	return (
		<div
			ref={panelRef}
			className={classes(
				styles.drawer,
				open ? '' : styles.close,
				animation ? styles.animation : '',
				className
			)}>
			{filteredTabs.length > 0 ? (
				<Tabs
					tabs={filteredTabs as any} // passthrough; Tabs defines the exact item shape
					className={classes(styles.tabs, tabsClassName)}
					direction={tabsOrientation}
					selectedTab={selectedTab as any}
					setSelectedTab={setSelectedTab as any}>
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

export default BaseSidePanel;
