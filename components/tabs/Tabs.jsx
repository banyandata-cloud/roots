/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../buttons';
import Dropdown from '../input/dropdown/Dropdown';
import DropdownItem from '../input/dropdown/dropdown-item/DropdownItem';
import { Skeleton } from './Skeleton';
import styles from './Tabs.module.css';

const Tabs = (props) => {
	const {
		tabs,
		className,
		loading,
		fallback,
		selectedTab,
		setSelectedTab,
		direction = 'horizontal',
		children = null,
	} = props;

	const vertical = direction === 'vertical';

	const [sliderLeft, setSliderLeft] = useState(0);
	const [sliderWidth, setSliderWidth] = useState(0);
	const tabRefs = useRef([]);

	const tabIndex = tabs?.findIndex((tab) => {
		if (tab.dropdown) {
			const dropdownItem = tab.dropdownItems?.find((item) => {
				return item.id === selectedTab;
			});
			return !!dropdownItem;
		}
		return tab.id === selectedTab;
	});

	const selectedTabIndex = tabIndex !== -1 ? tabIndex : 0;

	const [activeTab, setActiveTab] = useState();

	useEffect(() => {
		setActiveTab(selectedTabIndex);
	}, [selectedTabIndex]);

	const updateSliderPosition = () => {
		const activeTabElement = tabRefs.current[activeTab];

		if (activeTabElement) {
			setSliderLeft(activeTabElement.offsetLeft);
			setSliderWidth(activeTabElement.offsetWidth);
		}
	};

	useEffect(() => {
		updateSliderPosition();
	}, [activeTab, tabs, selectedTab]);

	const handleTabClick = (id, index) => {
		setSelectedTab(id);
		setActiveTab(index);
	};

	const handleDropClick = (selectedValue) => {
		setSelectedTab(selectedValue);
		updateSliderPosition();
	};

	if (loading || fallback) {
		return <Skeleton fallback={!loading && fallback} />;
	}

	return (
		<div
			className={`${
				vertical ? styles['tabs-container-vertical'] : styles['tabs-container']
			} ${className}`}>
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

					return (
						<div
							key={tab.id}
							ref={(ref) => {
								tabRefs.current[index] = ref;
							}}
							className={`${styles.tab} ${
								vertical ? styles.vertical : styles.horizontal
							} ${isActive ? styles.active : ''}`}>
							{dropdown ? (
								<Dropdown
									className={`${styles.dropdown} ${
										isActive ? styles.active : ''
									}`}
									onChange={(event) => {
										const selectedValue = event.target.value;
										handleDropClick(selectedValue);
										setActiveTab(index);
									}}
									value={selectedTab}
									placeholder={title}
									// value={!isActive ? title : undefined}
								>
									{dropdownItems.map((option) => {
										return (
											<DropdownItem
												key={option.id}
												title={option.title}
												value={option.id}
											/>
										);
									})}
								</Dropdown>
							) : (
								<Button
									size='auto'
									color='default'
									radius='none'
									key={id}
									variant='text'
									disabled={disabled}
									className={isActive ? styles.active : ''}
									title={title}
									onClick={() => {
										return handleTabClick(tab.id, index);
									}}
									leftComponent={
										LeftIcon &&
										(() => {
											return <LeftIcon className={styles.icon} />;
										})
									}
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
						left: `${sliderLeft}px`,
						width: `${sliderWidth}px`,
					}}
				/>
			</div>
			<div className={!vertical ? styles['tab-content'] : ''} />
			{children}
		</div>
	);
};

Tabs.propTypes = {
	className: PropTypes.string,
	tabs: PropTypes.arrayOf(PropTypes.string),
	selectedTab: PropTypes.number,
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
};

Tabs.defaultProps = {
	className: '',
	tabs: [],
	selectedTab: null,
	loading: false,
	fallback: false,
};

export default Tabs;
