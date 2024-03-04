import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styles from './Slider.module.css';
import RangeSlider from './rangeslider/RangeSlider';

const Slider = (props) => {
	// eslint-disable-next-line object-curly-newline
	const { disabled, value, onChange, min, max, step, range, label, node1, node2 } = props;

	const { current: isControlled } = useRef(value !== undefined);

	const [uncontrolledValue, setUncontrolledValue] = useState(value);
	const [isTooltipVisible, setTooltipVisible] = useState(false);

	const handleChange = (event) => {
		const fieldValue = parseInt(event.target.value, 10);

		if (isControlled) {
			onChange(event, fieldValue);
		} else {
			setUncontrolledValue(fieldValue);
		}
	};

	const valueOfSlider = isControlled ? value : uncontrolledValue;

	if (range) {
		return (
			<RangeSlider
				className={styles['range-slider']}
				min={min}
				max={max}
				node1={node1}
				node2={node2}
				step={step}
				value={value}
				onChange={onChange}
				disabled={disabled}
				label={label}
			/>
		);
	}

	const handleMouseEnter = () => {
		setTooltipVisible(!disabled);
	};

	const handleMouseLeave = () => {
		setTooltipVisible(false);
	};

	const tooltipTop = label ? -10 : -24;

	const tooltipStyle = {
		left: `calc(${(valueOfSlider / 100) * 30}% - 58px)`,
		top: `${tooltipTop}px`,
		visibility: isTooltipVisible ? 'visible' : 'hidden',
	};

	return (
		<label
			className={styles['slider-container']}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div className={styles.tooltip} style={tooltipStyle}>
				{valueOfSlider}
			</div>
			<p className={styles.label}>{label}</p>
			<input
				type='range'
				className={styles.slider}
				min={min}
				max={max}
				disabled={disabled}
				value={valueOfSlider}
				onChange={handleChange}
				step={step}
			/>
			<div className={styles.minMaxContainer}>
				<span className={styles.min}>{min}</span>
				<span className={styles.max}>{max}</span>
			</div>
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
	label: PropTypes.string,
};

Slider.defaultProps = {
	value: undefined,
	onChange: () => {},
	min: 0,
	max: 100,
	step: 1,
	range: false,
	disabled: false,
	label: '',
};

export default Slider;
