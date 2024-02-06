/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from './Skeleton';
import styles from './Tabs.module.css';
import Dropdown from '../input/dropdown/Dropdown';
import DropdownItem from '../input/dropdown/dropdown-item/DropdownItem';
import { Button } from '../buttons';

const Tabs = (props) => {
	const { tabs, className, loading, fallback, selectedTab, setSelectedTab, defaultSelected } =
		props;

	const [sliderLeft, setSliderLeft] = useState(0);
	const [sliderWidth, setSliderWidth] = useState(0);
	const sliderRef = useRef(null);

	const getDefaultSelectedIndex = () => {
		if (defaultSelected) {
			const index = tabs.findIndex((tab) => {
				return tab.id === defaultSelected;
			});
			return index !== -1 ? index : 0;
		}
		return 0;
	};

	const [activeTab, setActiveTab] = useState(selectedTab || getDefaultSelectedIndex());

	const updateSliderPosition = () => {
		const activeTabElement = sliderRef.current;
		if (activeTabElement) {
			setSliderLeft(activeTabElement.offsetLeft);
			setSliderWidth(activeTabElement.offsetWidth);
}
	};

		useEffect(() => {
		updateSliderPosition();
	}, [activeTab, tabs]);

	const handleTabClick = (index) => {
		const tab = tabs[index];
		if (!tab.disabled) {
			setActiveTab(index);
			setSelectedTab(tab.id);
			updateSliderPosition();
		}
	};

	if (loading || fallback) {
		return <Skeleton fallback={!loading && fallback} />;
	}

	return (
		<div className={`${styles['tabs-container']} ${className}`}>
			<div className={styles.tabs}>
				{tabs.map((tab, index) => {
					const isActive = index === activeTab;
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
							key={id}
							ref={index === activeTab ? sliderRef : null}
							className={`${styles.tab} ${index === activeTab ? styles.active : ''}`}
							onClick={() => {
								return handleTabClick(index);
							}}>
							{dropdown ? (
								<div className={styles['tab-dropdown']}>
									<Dropdown
										className={`${styles.dropdown} ${
											isActive ? styles.active : ''
										}`}
										onChange={() => {
											updateSliderPosition();
										}}
										placeholder={title}
										value={!isActive ? title : undefined}>
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
								</div>
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
					className={styles['tab-slider']}
					style={{
						left: `${sliderLeft}px`,
						width: `${sliderWidth}px`,
					}}
				/>
			</div>
			<div className={styles['tab-content']} />
		</div>
	);
};

Tabs.propTypes = {
	className: PropTypes.string,
	tabs: PropTypes.arrayOf(PropTypes.string),
	selectedTab: PropTypes.number,
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	defaultSelected: PropTypes.string,
};

Tabs.defaultProps = {
	className: '',
	tabs: [],
	selectedTab: null,
	loading: false,
	fallback: false,
	defaultSelected: '',
};

export default Tabs;
