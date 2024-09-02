/* eslint-disable react/require-default-props */
/* eslint-disable no-lonely-if */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { Skeleton } from './Skeleton';
import styles from './Togglev2.module.css';

const Togglev2 = (props) => {
	const {
		options = [],
		multi = false,
		defaultValue,
		theme = 'light',
		value = undefined,
		onChange,
		loading = false,
		fallback = false,
		className = '',
		smooth = false,
		secondary,
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

	const inputValue = isControlled ? value ?? '' : uncontrolledValue;

	const allSelected = multi ? options.length === inputValue.length : false;

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
		return <Skeleton theme={theme} fallback={!loading && fallback} v2 />;
	}

	useEffect(() => {
		updateSliderPosition();
	}, [inputValue, options]);

	return (
		<div className={classes(styles.root, styles[theme], className)}>
			<div className={styles.toggle}>
				{options.map((tab) => {
					const {
						title,
						leftComponent,
						rightComponent,
						disabled,
						className: itemClassName,
					} = tab;
					const isActive = compareSelection(inputValue, tab.value);

					return (
						<Button
							key={title}
							ref={isActive ? sliderRef : null}
							type='button'
							onClick={() => {
								onButtonClick(tab.value, isActive);
							}}
							size='auto'
							data-elem='toggle'
							disabled={disabled}
							title={title}
							className={classes(
								styles['toggle-button'],
								styles[theme],
								disabled ? styles.disabled : '',
								isActive ? styles.active : '',
								secondary ? styles.secondary : '',
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
							secondary ? styles.secondary : '',
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

Togglev2.propTypes = {
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	className: PropTypes.string,
	theme: PropTypes.oneOf(['dark', 'light']),
	options: PropTypes.arrayOf(PropTypes.string),
	value: PropTypes.string,
	multi: PropTypes.bool,
	smooth: PropTypes.bool,
};

export default Togglev2;
