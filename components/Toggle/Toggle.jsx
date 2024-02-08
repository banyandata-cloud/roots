/* eslint-disable react/no-array-index-key */
/* eslint-disable no-lonely-if */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../buttons';
import { Skeleton } from './Skeleton';
import styles from './Toggle.module.css';

// eslint-disable-next-line prefer-arrow-callback
const Toggle = (props) => {
	const {
		options,
		multi,
		defaultSelected,
		theme,
		value,
		onChange,
		loading,
		fallback,
		className,
		smooth,
	} = props;
	const [selectedTabs, setSelectedTabs] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	const [sliderLeft, setSliderLeft] = useState(0);
	const [sliderWidth, setSliderWidth] = useState(0);

	const sliderRef = useRef(null);

	const updateSliderPosition = () => {
		const activeTabElement = sliderRef.current;
		if (activeTabElement) {
			setSliderLeft(activeTabElement.offsetLeft);
			setSliderWidth(activeTabElement.offsetWidth);
		}
	};

	// eslint-disable-next-line no-shadow
	const handleDefaultSelected = (defaultSelected) => {
		if (defaultSelected === null) {
			setSelectedTabs([]);
			setActiveTab(1);
		} else if (multi && Array.isArray(defaultSelected)) {
			const defaultSelectedIndexes = options
				.map((tab, index) => {
					return defaultSelected.includes(tab.value) ? index + 1 : null;
				})
				.filter((index) => {
					return index !== null;
				});

			setSelectedTabs(defaultSelectedIndexes);
			setActiveTab(defaultSelectedIndexes.length > 0 ? defaultSelectedIndexes[0] : 1);
		} else {
			const defaultSelectedIndex = options.findIndex((tab) => {
				return tab.value === defaultSelected;
			});
			setSelectedTabs(defaultSelectedIndex !== -1 ? [defaultSelectedIndex + 1] : []);
			setActiveTab(defaultSelectedIndex !== -1 ? defaultSelectedIndex + 1 : 1);
		}
	};

	const handleExternalValue = (externalValue) => {
		const selectedTabIndex = options.findIndex((tab) => {
			// eslint-disable-next-line no-unused-expressions
			return tab.value === externalValue;
		});
		if (selectedTabIndex !== -1) {
			setSelectedTabs([selectedTabIndex + 1]);
			setActiveTab(selectedTabIndex + 1);
		}
	};

	useEffect(() => {
		updateSliderPosition();
	}, [activeTab, options, selectedTabs]);

	useEffect(() => {
		handleDefaultSelected(defaultSelected);
	}, [defaultSelected]);

	useEffect(() => {
		handleExternalValue(value);
	}, [value]);

	const handleTabClick = (index) => {
		if (index === 0) {
			if (selectedTabs.length === options.length) {
				setSelectedTabs([]);
				if (onChange) {
					onChange(null);
				}
			} else {
				// Select all tabs
				const allValues = options.map((tab) => {
					return tab.value;
				});
				setSelectedTabs(
					Array.from(
						{
							length: options.length,
						},
						(_, i) => {
							return i + 1;
						}
					)
				);
				if (onChange) {
					onChange(allValues);
				}
			}
			setActiveTab(index);
		} else {
			const tab = options[index - 1];
			if (!tab.disabled) {
				if (multi) {
					const updatedSelectedTabs = [...selectedTabs];
					const tabIndex = updatedSelectedTabs.indexOf(index);
					if (tabIndex !== -1) {
						updatedSelectedTabs.splice(tabIndex, 1);
					} else {
						updatedSelectedTabs.push(index);
					}
					setSelectedTabs(updatedSelectedTabs);
					const selectedValues = updatedSelectedTabs.map((selectedIndex) => {
						return options[selectedIndex - 1].value;
					});
					if (onChange) {
						onChange(selectedValues);
					}
				} else {
					setSelectedTabs([index]);
					if (onChange) {
						onChange(tab.value);
					}
				}
				setActiveTab(index);
			}
		}
	};
	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

	return (
		<div
			className={`${styles['tabs-container']} ${
				theme === 'dark' ? styles['dark-theme'] : ''
			} ${className}`}>
			<div className={styles.tabs}>
				{multi && (
					<Button
						type='button'
						size='auto'
						data-elem='toggle'
						variant='text'
						className={` ${
							selectedTabs.length === options.length
								? `${styles.selected} ${
										theme === 'dark' ? styles['dark-theme'] : ''
								  }`
								: ''
						}`}
						onClick={() => {
							return handleTabClick(0);
						}}
						title='All'>
						{value}
					</Button>
				)}
				{options.map((tab, index) => {
					const { title, leftComponent, rightComponent, disabled } = tab;
					const isActive = index + 1 === activeTab;
					return (
						<div
							key={index}
							ref={index + 1 === activeTab ? sliderRef : null}
							className={`${styles.tab} ${
								theme === 'dark' ? styles['dark-theme'] : ''
							} ${index + 1 === activeTab ? styles.active : ''} ${
								disabled ? styles.disabled : ''
							} ${
								multi && selectedTabs.includes(index + 1)
									? `${styles.selected} ${
											theme === 'dark' ? styles['dark-theme'] : ''
									  }`
									: ''
							}`}
							onClick={() => {
								return handleTabClick(index + 1);
							}}>
							<Button
								type='button'
								size='auto'
								variant='text'
								data-elem='toggle'
								title={title}
								className={` ${styles.button} ${
									theme === 'dark' ? styles['dark-theme'] : ''
								} ${isActive ? styles.active : ''}`}
								leftComponent={leftComponent}
								rightComponent={rightComponent}>
								{value}
							</Button>
						</div>
					);
				})}
				<div
					className={`${styles['tab-slider']} ${
						theme === 'dark' ? styles['dark-theme'] : ''
					} ${smooth ? styles.smooth : ''}`}
					style={{
						left: `${sliderLeft}px`,
						width: `${sliderWidth}px`,
					}}
				/>
			</div>
		</div>
	);
};

Toggle.propTypes = {
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	className: PropTypes.string,
	theme: PropTypes.oneOf(['dark', 'light']),
	options: PropTypes.arrayOf(PropTypes.string),
	defaultSelected: PropTypes.string,
	value: PropTypes.string,
	multi: PropTypes.bool,
	smooth: PropTypes.bool,
};

Toggle.defaultProps = {
	loading: false,
	fallback: false,
	className: '',
	theme: 'light',
	options: [],
	defaultSelected: null,
	value: undefined,
	multi: false,
	smooth: false,
};

export default Toggle;
