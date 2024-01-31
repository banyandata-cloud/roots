/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CaretIcon } from '../icons';
import { Skeleton } from './Skeleton';
import styles from './Tabs.module.css';

const Tabs = (props) => {
	const { tabs, className, loading, fallback, selectedTab, setSelectedTab, defaultSelected } =
		props;

	const [sliderLeft, setSliderLeft] = useState(0);
	const [sliderWidth, setSliderWidth] = useState(0);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
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
			setDropdownOpen(false);

			if (tab.dropdown) {
				setSelectedDropdownValue(null);
			}
			setSelectedTab(tab.id);
		}
	};

	const handleDropdownClick = (index, event) => {
		event.stopPropagation();
		handleTabClick(index);
		setDropdownOpen(!dropdownOpen);
	};

	const handleDropdownOptionClick = (index, value, label) => {
		setSelectedDropdownValue(value);
		setDropdownOpen(false);

		// eslint-disable-next-line no-param-reassign
		tabs[index].title = label;

		handleTabClick(index);
	};

	if (loading || fallback) {
		return <Skeleton fallback={!loading && fallback} />;
	}

	return (
		<div className={`${styles['tabs-container']} ${className}`}>
			<div className={styles.tabs}>
				{tabs.map((tab, index) => {
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
							className={`${styles.tab} ${index === activeTab ? styles.active : ''} ${
								disabled ? styles.disabled : ''
							} ${dropdown ? styles.dropdown : ''}`}
							onClick={() => {
								return handleTabClick(index);
							}}>
							{dropdown ? (
								<div className={styles['tab-dropdown']}>
									<div
										className={styles['drop-label']}
										onClick={(event) => {
											return handleDropdownClick(index, event);
										}}>
										{title}
									</div>
									<CaretIcon
										className={`${styles.icon} ${
											dropdownOpen ? styles.rotateCaret : ''
										}`}
									/>

									{dropdownOpen && index === activeTab && (
										<div className={styles['dropdown-options']}>
											{dropdownItems.map((option) => {
												return (
													<div
														key={option.id}
														className={`${styles['dropdown-option']} ${
															option.id === selectedDropdownValue
																? styles.selected
																: ''
														}`}
														onClick={() => {
															return handleDropdownOptionClick(
																index,
																option.id,
																option.title
															);
														}}>
														{option.title}
													</div>
												);
											})}
										</div>
									)}
								</div>
							) : (
								<React.Fragment key={id}>
									{LeftIcon && (
										<div className={styles['tab-left']}>
											<LeftIcon className={styles.icon} />
										</div>
									)}
									<div className={styles['tab-label']}>{title}</div>
									{RightIcon && (
										<div className={styles['tab-right']}>
											<RightIcon className={styles.icon} />
										</div>
									)}
								</React.Fragment>
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
