import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styles from './RangeSlider.module.css';

function RangeSlider(props) {
	// eslint-disable-next-line object-curly-newline
	const { min, max, onChange, step, disabled, label, node1, node2, percent } = props;
	const [rangeValues, setRangeValues] = useState({
		min: node1,
		max: node2,
	});
	const [dragging, setDragging] = useState(null);
	const sliderRef = useRef(null);

	const snapToStep = (val, steps) => {
		return Math.round(val / steps) * steps;
	};

	const handleSliderClick = (event) => {
		const rect = sliderRef.current.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const percentage = (offsetX / rect.width) * 100;

		const newValue = snapToStep(percentage, step || 1);

		setRangeValues((prevValues) => {
			const distanceToMin = Math.abs(newValue - prevValues.min);
			const distanceToMax = Math.abs(newValue - prevValues.max);

			let newMin = prevValues.min;
			let newMax = prevValues.max;

			if (distanceToMin <= distanceToMax) {
				newMin = Math.min(newValue, prevValues.max);
			} else {
				newMax = Math.max(newValue, prevValues.min);
			}

			newMin = Math.max(newMin, min || 0);
			newMax = Math.min(newMax, max || 100);

			if (onChange && typeof onChange === 'function') {
				onChange({
					min: newMin,
					max: newMax,
				});
			}

			return {
				min: newMin,
				max: newMax,
			};
		});
	};

	const handleMouseDown = (event, thumb) => {
		event.preventDefault();
		setDragging(thumb);
	};

	const handleMouseMove = (event) => {
		if (dragging !== null) {
			const rect = sliderRef.current.getBoundingClientRect();
			const offsetX = event.clientX - rect.left;
			const percentage = (offsetX / rect.width) * 100;

			const newValue = snapToStep(
				percentage,
				parseFloat(document.getElementsByName(dragging)[0].step)
			);

			setRangeValues((prevValues) => {
				let newMin = prevValues.min;
				let newMax = prevValues.max;

				if (dragging === 'min') {
					newMin = Math.min(newValue, prevValues.max);
				} else {
					newMax = Math.max(newValue, prevValues.min);
				}

				newMin = Math.max(newMin, min);
				newMax = Math.min(newMax, max);

				return {
					min: newMin,
					max: newMax,
				};
			});
		}
	};

	const handleMouseUp = () => {
		setDragging(null);
		if (typeof onChange === 'function') {
			onChange(rangeValues);
		}
	};

	const handleThumbContainerClick = (e) => {
		e.stopPropagation();
	};

	return (
		<div className={styles['rangeslider-container']}>
			<p className={styles.label}>{label}</p>
			<div
				className={styles.rangeslider}
				ref={sliderRef}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={() => {
					return dragging && handleMouseUp();
				}}
				onClick={handleSliderClick}
				data-elem='track'>
				{['min', 'max'].map((thumb) => {
					return (
						<React.Fragment key={thumb}>
							<div
								className={styles['rangeslider-thumb-container']}
								onClick={handleThumbContainerClick}>
								<div
									className={styles['rangeslider-thumb']}
									data-value={
										percent ? `${rangeValues[thumb]}%` : rangeValues[thumb]
									}
									data-elem={thumb}
									style={{
										left: `${rangeValues[thumb]}%`,
									}}
									onMouseDown={(e) => {
										handleMouseDown(e, thumb);
									}}
								/>
							</div>
						</React.Fragment>
					);
				})}
				<div
					className={styles['rangeslider-track']}
					style={{
						left: `${rangeValues.min}%`,
						width: `${rangeValues.max - rangeValues.min}%`,
					}}
				/>
			</div>
			{['min', 'max'].map((thumb) => {
				return (
					<input
						key={thumb}
						type='range'
						min={min}
						max={max}
						name={thumb}
						disabled={disabled}
						value={rangeValues[thumb]}
						step={step}
						onChange={(e) => {
							setRangeValues({
								...rangeValues,
								[thumb]: e.target.value,
							});
						}}
						className={styles['rangeslider-input']}
					/>
				);
			})}
			<div className={styles.minMaxContainer} data-elem='minMax'>
				<span className={styles.min}>{min}</span>
				<span className={styles.max}>{max}</span>
			</div>
		</div>
	);
}

RangeSlider.propTypes = {
	step: PropTypes.number,
	disabled: PropTypes.bool,
};

RangeSlider.defaultProps = {
	step: 1,
	disabled: false,
};

export default RangeSlider;
