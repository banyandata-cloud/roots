import React, { useState, useRef } from 'react';
import styles from './RangeSlider.module.css';

function RangeSlider() {
	const [rangeValues, setRangeValues] = useState({
		min: 25,
		max: 75,
	});
	const [dragging, setDragging] = useState(null);
	const sliderRef = useRef(null);

	const handleMouseDown = (event, thumb) => {
		event.preventDefault();
		setDragging(thumb);
	};

	const snapToStep = (value, step) => {
		return Math.round(value / step) * step;
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
						value={rangeValues[thumb]}
						step='1'
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

export default RangeSlider;
