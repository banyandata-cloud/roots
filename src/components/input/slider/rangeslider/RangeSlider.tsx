import React, { useRef, useState } from 'react';
import { classes } from '../../../../utils';
import styles from './RangeSlider.module.css';
import type { RangeSliderProps } from './types';

const RangeSlider: React.FC<RangeSliderProps> = ({
	min,
	max,
	step,
	disabled,
	label,
	node1,
	node2,
	percent,
	onChange,
	className,
}) => {
	const [rangeValues, setRangeValues] = useState<{ min: number; max: number }>({
		min: node1,
		max: node2,
	});
	const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
	const sliderRef = useRef<HTMLDivElement | null>(null);

	const snapToStep = (val: number, steps: number) => {
		return Math.round(val / steps) * steps;
	};

	const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!sliderRef.current) return;
		const rect = sliderRef.current.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const percentage = (offsetX / rect.width) * 100;
		const newValue = snapToStep(percentage, step ?? 1);

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

			newMin = Math.max(newMin, min);
			newMax = Math.min(newMax, max);

			const updated = {
				min: newMin,
				max: newMax,
			};
			onChange?.(updated);
			return updated;
		});
	};

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, thumb: 'min' | 'max') => {
		event.preventDefault();
		setDragging(thumb);
	};

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (dragging !== null && sliderRef.current) {
			const rect = sliderRef.current.getBoundingClientRect();
			const offsetX = event.clientX - rect.left;
			const percentage = (offsetX / rect.width) * 100;

			const newValue = snapToStep(percentage, step ?? 1);

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
		onChange?.(rangeValues);
	};

	const handleThumbContainerClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div className={classes(styles['rangeslider-container'], className)}>
			<p className={styles.label}>{label}</p>
			<div
				className={styles.rangeslider}
				ref={sliderRef}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={() => {
					if (dragging) {
						handleMouseUp();
					}
				}}
				onClick={handleSliderClick}
				data-elem='track'>
				{(['min', 'max'] as const).map((thumb) => {
					return (
						<React.Fragment key={thumb}>
							<div
								className={styles['rangeslider-thumb-container']}
								onClick={handleThumbContainerClick}>
								<div
									className={styles['rangeslider-thumb']}
									data-value={
										percent
											? `${rangeValues[thumb].toString()}%`
											: rangeValues[thumb]
									}
									data-elem={thumb}
									style={{
										left: `${rangeValues[thumb].toString()}%`,
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
						left: `${rangeValues.min.toString()}%`,
						width: `${(rangeValues.max - rangeValues.min).toString()}%`,
					}}
				/>
			</div>

			{(['min', 'max'] as const).map((thumb) => {
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
								[thumb]: parseFloat(e.target.value),
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
};

export default RangeSlider;
