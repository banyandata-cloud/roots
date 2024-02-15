import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styles from './RangeSlider.module.css';

function RangeSlider(props) {
	const { minn, maxx, onChange, step, disabled } = props;
	const [rangeValues, setRangeValues] = useState({
		min: minn,
		max: maxx,
	});
	const [dragging, setDragging] = useState(null);
	const sliderRef = useRef(null);

	const handleMouseDown = (event, thumb) => {
		event.preventDefault();
		setDragging(thumb);
	};

	const snapToStep = (val, steps) => {
		return Math.round(val / steps) * steps;
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

				newMin = Math.max(newMin, 0);
				newMax = Math.min(newMax, 100);

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

	return (
		<div className={styles['rangeslider-container']}>
			<div
				className={styles.rangeslider}
				ref={sliderRef}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={() => {
					return dragging && handleMouseUp();
				}}>
				{['min', 'max'].map((thumb) => {
					return (
						<React.Fragment key={thumb}>
							<div className={styles['rangeslider-thumb-container']}>
								<div
									className={styles['rangeslider-thumb']}
									data-value={rangeValues[thumb]}
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
						min='0'
						max='100'
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
