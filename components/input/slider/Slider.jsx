import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Slider.module.css';
import RangeSlider from './rangeslider/RangeSlider';

const Slider = (props) => {
	const { disabled, value, onChange, min, max, step, range } = props;

	const { current: isControlled } = useRef(value !== undefined);

	const [uncontrolledValue, setUncontrolledValue] = useState(value);
	const [sliderValue, setSliderValue] = useState(50);
	const [isTooltipVisible, setTooltipVisible] = useState(false);

	const handleChange = (event) => {
		const fieldValue = parseInt(event.target.value, 10);

		if (isControlled) {
			onChange(event, fieldValue);
		} else {
			setUncontrolledValue(fieldValue);
			setSliderValue(fieldValue);
		}
	};

	const sliderValuee = isControlled ? value : uncontrolledValue;

	if (range) {
		return (
			<RangeSlider
				className={styles['range-slider']}
				minn={min}
				maxx={max}
				step={step}
				disabled={disabled}
			/>
		);
	}

	const handleMouseEnter = () => {
		setTooltipVisible(!disabled);
	};

	const handleMouseLeave = () => {
		setTooltipVisible(false);
	};

	const tooltipStyle = {
		left: `calc(${(sliderValue / 100) * 100}% - 15px)`,
		visibility: isTooltipVisible ? 'visible' : 'hidden',
	};

	return (
		<label
			className={styles['slider-container']}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div className={styles.tooltip} style={tooltipStyle}>
				{sliderValue}
			</div>
			<input
				type='range'
				className={styles.slider}
				min={min}
				max={max}
				disabled={disabled}
				value={sliderValuee}
				onChange={handleChange}
				step={step}
			/>
		</label>
	);
};

Slider.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
	onChange: PropTypes.func,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	range: PropTypes.bool,
	disabled: PropTypes.bool,
};

Slider.defaultProps = {
	value: undefined,
	onChange: () => {},
	min: 0,
	max: 100,
	step: 1,
	range: false,
	disabled: false,
};

export default Slider;
