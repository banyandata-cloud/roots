import { useCallback, useEffect, useId, useRef, useState, type ReactElement } from 'react';
import { classes } from '../utils';
import { Button } from '../buttons';
import { Dropdown } from '../input/dropdown';
import styles from './Tabs.module.scss';
import TabButtonBase from './tabButtonBase/TabButtonBase';
import type { TabButtonBaseType } from './tabButtonBase/types';
import listStyles from './TabList.module.scss';
import type { TabsProps, TabsType } from './types';

const buttonTypes: Record<TabsType, TabButtonBaseType> = {
	brand: 'button-brand',
	gray: 'button-gray',
	border: 'button-white',
	minimal: 'button-minimal',
	underline: 'underline',
};

const VariantTabs = (props: TabsProps & { type: TabsType }): ReactElement => {
	const {
		tabs = [],
		className = '',
		selectedTab,
		setSelectedTab,
		direction = 'horizontal',
		type,
		size = 'sm',
		fullWidth = false,
		children = null,
	} = props;

	const vertical = direction === 'vertical';
	const buttonType = vertical && type === 'underline' ? 'line' : buttonTypes[type];
	const instanceId = useId().replaceAll(':', '');
	const selectedIndex = tabs.findIndex((tab) =>
		tab.dropdown
			? tab.dropdownItems?.some((item) => item.id === selectedTab)
			: tab.id === selectedTab
	);
	const firstEnabledIndex = tabs.findIndex((tab) => !tab.disabled && !tab.dropdown);
	const rovingIndex =
		selectedIndex >= 0 && !tabs[selectedIndex]?.disabled && !tabs[selectedIndex]?.dropdown
			? selectedIndex
			: firstEnabledIndex;
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const panelId = `${instanceId}-tabpanel`;

	const moveFocus = (index: number, key: string) => {
		const step = key === 'ArrowRight' || key === 'ArrowDown' ? 1 : -1;
		const candidates = tabs
			.map((tab, tabIndex) => ({ tab, tabIndex }))
			.filter(({ tab }) => !tab.disabled && !tab.dropdown);
		const currentPosition = candidates.findIndex(({ tabIndex }) => tabIndex === index);
		const nextPosition = (currentPosition + step + candidates.length) % candidates.length;
		const next = candidates[nextPosition];
		if (next) {
			tabRefs.current[next.tabIndex]?.focus();
			setSelectedTab(next.tab.id);
		}
	};

	return (
		<div className={classes(vertical ? listStyles.row : '', className)}>
			<div
				role='tablist'
				aria-orientation={direction}
				className={classes(
					listStyles.list,
					listStyles[type],
					vertical ? listStyles.vertical : '',
					fullWidth && !vertical ? listStyles.full : ''
				)}
			>
				{tabs.map((tab, index) => {
					const {
						id,
						title,
						leftIcon: LeftIcon,
						rightIcon: RightIcon,
						disabled,
						badge,
					} = tab;
					const current =
						id === selectedTab ||
						!!tab.dropdownItems?.some((item) => item.id === selectedTab);
					let icon = null;
					if (typeof LeftIcon === 'function') {
						icon = <LeftIcon className={styles.icon ?? ''} />;
					} else if (LeftIcon) {
						const Icon = current ? LeftIcon.Active : LeftIcon.InActive;
						icon = Icon ? <Icon className={styles.icon ?? ''} /> : null;
					}
					const rightIcon = RightIcon ? (
						<RightIcon className={styles.icon ?? ''} />
					) : null;
					if (tab.dropdown) {
						return (
							<div key={id} className={listStyles.dropdown}>
								<Dropdown
									variant='borderless'
									size='sm'
									value={selectedTab}
									placeholder={title}
									options={tab.dropdownItems?.map((item) => ({
										value: item.id,
										label: item.title,
									}))}
									onChange={(value) => {
										if (value) setSelectedTab(value);
									}}
								/>
							</div>
						);
					}

					return (
						<TabButtonBase
							key={id}
							ref={(element) => {
								tabRefs.current[index] = element;
							}}
							id={`${instanceId}-tab-${id}`}
							aria-controls={panelId}
							tabIndex={index === rovingIndex ? 0 : -1}
							size={size}
							type={buttonType}
							current={current}
							icon={icon}
							rightIcon={rightIcon}
							badge={badge}
							disabled={disabled}
							onClick={() => {
								setSelectedTab(id);
							}}
							onKeyDown={(event) => {
								if (event.key === 'Home' || event.key === 'End') {
									event.preventDefault();
									const candidates = tabs
										.map((item, itemIndex) => ({ item, itemIndex }))
										.filter(({ item }) => !item.disabled && !item.dropdown);
									const target =
										event.key === 'Home' ? candidates.at(0) : candidates.at(-1);
									if (target) {
										tabRefs.current[target.itemIndex]?.focus();
										setSelectedTab(target.item.id);
									}
									return;
								}
								if (
									(vertical &&
										(event.key === 'ArrowUp' || event.key === 'ArrowDown')) ||
									(!vertical &&
										(event.key === 'ArrowLeft' || event.key === 'ArrowRight'))
								) {
									event.preventDefault();
									moveFocus(index, event.key);
								}
							}}
						>
							{title}
						</TabButtonBase>
					);
				})}
			</div>
			<div
				id={panelId}
				role='tabpanel'
				aria-labelledby={
					rovingIndex >= 0 && tabs[rovingIndex]
						? `${instanceId}-tab-${tabs[rovingIndex].id}`
						: undefined
				}
				className={listStyles.content}
			>
				{children}
			</div>
		</div>
	);
};

const LegacyTabs = (props: TabsProps): ReactElement => {
	const {
		tabs = [],
		className = '',
		selectedTab,
		setSelectedTab,
		direction = 'horizontal',
		children = null,
	} = props;

	const vertical = direction === 'vertical';

	const [sliderLeft, setSliderLeft] = useState<number>(0);
	const [sliderWidth, setSliderWidth] = useState<number>(0);
	const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

	const tabIndex = tabs.findIndex((tab) => {
		if (tab.dropdown) {
			const dropdownItem = tab.dropdownItems?.find((item) => {
				return item.id === selectedTab;
			});
			return !!dropdownItem;
		}
		return tab.id === selectedTab;
	});

	const selectedTabIndex = tabIndex !== -1 ? tabIndex : 0;

	const [activeTab, setActiveTab] = useState<number>(0);

	useEffect(() => {
		setActiveTab(selectedTabIndex);
	}, [selectedTabIndex]);

	const updateSliderPosition = useCallback(() => {
		const activeTabElement = tabRefs.current[activeTab];

		if (activeTabElement) {
			setSliderLeft(activeTabElement.offsetLeft);
			setSliderWidth(activeTabElement.offsetWidth);
		}
	}, [activeTab]);

	useEffect(() => {
		updateSliderPosition();
	}, [activeTab, tabs, selectedTab, updateSliderPosition]);

	const handleTabClick = (id: string, index: number) => {
		setSelectedTab(id);
		setActiveTab(index);
	};

	const handleDropClick = (selectedValue: string) => {
		setSelectedTab(selectedValue);
		updateSliderPosition();
	};

	return (
		<div
			className={classes(
				vertical ? styles['tabs-container-vertical'] : styles['tabs-container'],
				className
			)}
		>
			<div className={vertical ? styles.vertical : styles.tabs}>
				{tabs.map((tab, index) => {
					const isActive = tab.id === selectedTab;
					const {
						id,
						title,
						leftIcon: LeftIcon,
						rightIcon: RightIcon,
						disabled,
						dropdown,
						dropdownItems,
					} = tab;

					const getLeftComponent = () => {
						if (LeftIcon) {
							if (
								typeof LeftIcon === 'object' &&
								(LeftIcon.Active || LeftIcon.InActive)
							) {
								if (isActive && LeftIcon.Active) {
									return <LeftIcon.Active />;
								}
								if (LeftIcon.InActive) {
									return <LeftIcon.InActive />;
								}
							}
							if (typeof LeftIcon === 'function') {
								return <LeftIcon />;
							}
						}
						return null;
					};

					return (
						<div
							key={tab.id}
							ref={(ref) => {
								tabRefs.current[index] = ref;
							}}
							className={classes(
								styles.tab,
								vertical ? styles.vertical : styles.horizontal,
								isActive ? styles.active : ''
							)}
						>
							{dropdown ? (
								<div className={styles['dropdown-slot']}>
									<Dropdown
										variant='borderless'
										size='sm'
										className={classes(
											styles.dropdown,
											isActive ? styles.active : ''
										)}
										onChange={(selectedValue) => {
											handleDropClick(selectedValue);
											setActiveTab(index);
										}}
										value={selectedTab}
										placeholder={title}
										options={dropdownItems?.map((option) => ({
											value: option.id,
											label: option.title,
										}))}
									/>
								</div>
							) : (
								<Button
									size='auto'
									radius='none'
									key={id}
									variant='ghost'
									disabled={disabled}
									className={isActive ? styles.active : ''}
									title={title}
									onClick={() => {
										handleTabClick(tab.id, index);
									}}
									leftComponent={() => {
										return getLeftComponent();
									}}
									rightComponent={
										RightIcon &&
										(() => {
											return <RightIcon className={styles.icon} />;
										})
									}
								/>
							)}
						</div>
					);
				})}
				<div
					className={vertical ? styles['tab-slider-vertical'] : styles['tab-slider']}
					style={{
						left: `${String(sliderLeft)}px`,
						width: `${String(sliderWidth)}px`,
					}}
				/>
			</div>
			<div className={!vertical ? styles['tab-content'] : styles['tab-content-vertical']}>
				{children}
			</div>
		</div>
	);
};

const Tabs = (props: TabsProps): ReactElement => {
	const { type } = props;
	if (type) {
		return <VariantTabs {...props} type={type} />;
	}
	return <LegacyTabs {...props} />;
};

export default Tabs;
