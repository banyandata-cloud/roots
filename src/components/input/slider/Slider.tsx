import React, { useRef, useState } from 'react';
import styles from './Slider.module.css';
import RangeSlider from './rangeslider/RangeSlider';
import type { SliderProps } from './types';

const Slider: React.FC<SliderProps> = ({
	disabled,
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	range,
	label,
	node1,
	node2,
	percent,
}) => {
	const { current: isControlled } = useRef(value !== undefined);
	const [uncontrolledValue, setUncontrolledValue] = useState<number | undefined>(value);
	const [isTooltipVisible, setTooltipVisible] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fieldValue = parseInt(event.target.value, 10);

		if (isControlled) {
			onChange?.(event, fieldValue);
		} else {
			setUncontrolledValue(fieldValue);
		}
	};

	const valueOfSlider = isControlled ? value : (uncontrolledValue ?? min);

	if (range) {
		return (
			<RangeSlider
				className={styles['range-slider']}
				min={min}
				max={max}
				node1={node1 ?? min}
				node2={node2 ?? max}
				step={step}
				onChange={(ranges) => {
					onChange?.(null, ranges);
				}}
				disabled={disabled}
				label={label}
				percent={percent}
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

	const tooltipStyle: React.CSSProperties = {
		left: `calc(${((Number(valueOfSlider) / 100) * 30).toString()}% - 58px)`,
		top: `${tooltipTop.toString()}px`,
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

export default Slider;
