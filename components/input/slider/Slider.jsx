<<<<<<< HEAD
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Slider.module.css';
import RangeSlider from './rangeslider/RangeSlider';

const Slider = (props) => {
	const {
		label,
		minLabel,
		medLabel,
		disabled,
		maxLabel,
		value,
		onChange,
		min,
		max,
		step,
		range,
	} = props;

	const { current: isControlled } = useRef(value !== undefined);

	const [uncontrolledValue, setUncontrolledValue] = useState(value);

	const handleChange = (event) => {
		const fieldValue = Number(event.target.value);

		if (isControlled) {
			onChange(event, fieldValue);
		} else {
			setUncontrolledValue(fieldValue);
		}
	};

	const sliderValue = isControlled ? value : uncontrolledValue;

	if (range) {
		return <RangeSlider className={styles['range-slider']} min={min} max={max} step={step} />;
	}

	return (
		<label className={styles['slider-container']}>
			<input
				type='range'
				className={styles.slider}
				label={label}
				min={min}
				max={max}
				disabled={disabled}
				value={sliderValue}
				onChange={handleChange}
				step={step}
				data-min-label={minLabel}
				data-med-label={medLabel}
				data-max-label={maxLabel}
			/>
			<div className={styles['label-container']}>
				<span>{minLabel}</span>
				<span>{medLabel}</span>
				<span>{maxLabel}</span>
			</div>
		</label>
=======
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Track } from './track';
import { ErrorBoundaryWrapper } from '../../errorBoundary';

const Slider = (props) => {
	const { custom } = props;
	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return (
					<ErrorBoundaryWrapper
						{...args}
						className={styles['error-boundary']}
						custom={custom}
					/>
				);
			}}>
			<div>
				<Track />
			</div>
		</ErrorBoundary>
>>>>>>> 27962df15f58cd89616fa91cd1ef1b1438258e19
	);
};

Slider.propTypes = {
	label: PropTypes.string,
	minLabel: PropTypes.string,
	medLabel: PropTypes.string,
	maxLabel: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.arrayOf(PropTypes.number),
	]),
	onChange: PropTypes.func,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	range: PropTypes.bool,
};

Slider.defaultProps = {
	label: null,
	minLabel: null,
	medLabel: null,
	maxLabel: null,
	value: undefined,
	onChange: () => {},
	min: 0,
	max: 100,
	step: 1,
	range: false,
};

export default Slider;
