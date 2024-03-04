/* eslint-disable no-lonely-if */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { Skeleton } from './Skeleton';
import styles from './Toggle.module.css';

const Toggle = (props) => {
	const {
		options,
		multi,
		defaultValue,
		theme,
		value,
		onChange,
		loading,
		fallback,
		className,
		smooth,
	} = props;
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

	// for uncontrolled input
	const [uncontrolledValue, setUncontrolledValue] = useState(() => {
		if (multi) {
			return defaultValue ?? options?.[0]?.value ?? [];
		}
		return defaultValue ?? options?.[0]?.value;
	});

	const { current: isControlled } = useRef(value !== undefined);

	// eslint-disable-next-line no-nested-ternary
	const inputValue = isControlled ? value ?? '' : uncontrolledValue;

	const allSelected = multi ? options.length === inputValue.length : false;

	const onSelectAll = () => {
		const allValues = options.map((option) => {
			return option.value;
		});
		if (isControlled) {
			onChange(allValues);
		} else {
			setUncontrolledValue(allValues);
		}
	};

	const onButtonClick = (newValue, selected) => {
		// if multi select
		if (multi) {
			// if it was already selected, remove it
			if (selected) {
				const newInputValue = inputValue.filter((val) => {
					return val !== newValue;
				});

				// if total selected after removal is greater than 0, set that
				// else select all
				if (newInputValue.length > 0) {
					if (isControlled) {
						onChange(newInputValue);
					} else {
						setUncontrolledValue(newInputValue);
					}
				} else {
					onSelectAll();
				}
			} else {
				// if all are selected, select only the one being clicked
				if (allSelected) {
					const newInputValue = [newValue];
					if (isControlled) {
						onChange(newInputValue);
					} else {
						setUncontrolledValue(newInputValue);
					}
				} else {
					const newInputValue = [...inputValue, newValue];
					if (isControlled) {
						onChange(newInputValue);
					} else {
						setUncontrolledValue(newInputValue);
					}
				}
			}
		} else {
			// if single select, just select that item
			if (isControlled) {
				onChange(newValue);
			} else {
				setUncontrolledValue(newValue);
			}
		}
	};

	const compareSelection = (input, item) => {
		if (Array.isArray(input)) {
			return input?.includes(item);
		}
		return input === item;
	};
	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

	useEffect(() => {
		updateSliderPosition();
	}, [inputValue, options]);

	return (
		<div className={classes(styles.root, styles[theme], className)}>
			<div className={styles.toggle}>
				{multi && (
					<Button
						type='button'
						size='auto'
						data-elem='toggle'
						variant='text'
						className={classes(
							styles['toggle-button'],
							allSelected ? styles['all-select'] : ''
						)}
						onClick={onSelectAll}
						title='All'
					/>
				)}
				{options.map((tab) => {
					const {
						title,
						leftComponent,
						rightComponent,
						disabled,
						className: itemClassName,
					} = tab;
					const isActive = compareSelection(inputValue, tab.value) && !allSelected;

					return (
						<Button
							key={title}
							ref={isActive ? sliderRef : null}
							type='button'
							onClick={() => {
								return onButtonClick(tab.value, isActive);
							}}
							size='auto'
							data-elem='toggle'
							title={title}
							className={classes(
								styles['toggle-button'],
								styles[theme],
								disabled ? styles.disabled : '',
								isActive ? styles.active : '',
								!smooth ? styles.highlight : '',
								itemClassName
							)}
							leftComponent={leftComponent}
							rightComponent={rightComponent}
						/>
					);
				})}
				{smooth && !multi && (
					<div
						className={classes(
							styles.slider,
							styles[theme],
							smooth ? styles.smooth : ''
						)}
						style={{
							left: `${sliderLeft}px`,
							width: `${sliderWidth}px`,
						}}
					/>
				)}
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
	value: undefined,
	multi: false,
	smooth: false,
};

export default Toggle;
