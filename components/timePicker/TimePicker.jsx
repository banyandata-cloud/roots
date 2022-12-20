/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import { TextField } from '../input';
import styles from './TimePicker.module.css';
import { classes, doubleDigitted, getDayInfo } from '../../utils';
import { focusInput, isValidMeridian, isValidUnit } from './utils';

const TimePicker = (props) => {
	const { className } = props;

	const today = getDayInfo(new Date());

	const refs = {
		hours: useRef(),
		minutes: useRef(),
		seconds: useRef(),
		meridian: useRef(),
	};

	const [timePickerValue, setTimePickerValue] = useState({
		hours: doubleDigitted(today.hours),
		minutes: doubleDigitted(today.minutes),
		seconds: doubleDigitted(today.seconds),
		meridian: today.meridian,
	});

	const { hours, minutes, seconds, meridian } = timePickerValue;

	useEffect(() => {
		if (props.value) {
			setTimePickerValue(props.value);
		}
	}, []);

	useEffect(() => {
		props.onChange(timePickerValue);
	}, [timePickerValue]);

	const onChange = (id, value, nextInput, focus) => {
		if (value.length <= 2) {
			setTimePickerValue({
				...timePickerValue,
				[id]: value,
			});
			if (focus && value && value.length === 2) {
				focusInput(nextInput);
			}
		}
	};

	const onBlur = (event) => {
		const { target } = event;
		const { id, value } = target;

		if (id !== 'meridian' && !Number(value) > 0) {
			setTimePickerValue({
				...timePickerValue,
				[id]: '01',
			});
			return;
		}
		if (id === 'meridian' && !['AM', 'PM'].includes(value)) {
			setTimePickerValue({
				...timePickerValue,
				[id]: 'AM',
			});
			return;
		}
		setTimePickerValue({
			...timePickerValue,
			[id]: doubleDigitted(value),
		});
	};

	const onKeyDown = (event) => {
		const { keyCode, target } = event;
		const { id, value } = target;
		if ((id === 'meridian' && keyCode === 40) || keyCode === 38) {
			setTimePickerValue({
				...timePickerValue,
				[id]: value === 'PM' ? 'AM' : 'PM',
			});
		}
	};

	return (
		<div className={classes(styles.root, className)}>
			<TextField
				className={styles.input}
				placeholder='00'
				value={hours}
				ref={refs.hours}
				type='number'
				onBlur={onBlur}
				id='hours'
				onChange={(event) => {
					const { target, nativeEvent } = event;
					const { id, value } = target;
					if (
						isValidUnit({
							type: 'hours',
							value,
						})
					) {
						onChange(id, value, refs.minutes, nativeEvent.data);
					}
				}}
			/>
			<span className={styles.colon}>:</span>
			<TextField
				className={styles.input}
				placeholder='00'
				value={minutes}
				id='minutes'
				onBlur={onBlur}
				ref={refs.minutes}
				type='number'
				onChange={(event) => {
					const { target, nativeEvent } = event;
					const { id, value } = target;
					if (
						isValidUnit({
							type: 'minutes',
							value,
						})
					) {
						onChange(id, value, refs.seconds, nativeEvent.data);
					}
				}}
			/>
			<span className={styles.colon}>:</span>
			<TextField
				className={styles.input}
				placeholder='00'
				type='number'
				value={seconds}
				ref={refs.seconds}
				onBlur={onBlur}
				id='seconds'
				onChange={(event) => {
					const { target, nativeEvent } = event;
					const { id, value } = target;
					if (
						isValidUnit({
							type: 'seconds',
							value,
						})
					) {
						onChange(id, value, refs.meridian, nativeEvent.data);
					}
				}}
			/>
			<span className={styles.separator}>|</span>
			<TextField
				className={styles.input}
				placeholder='--'
				value={meridian}
				onBlur={onBlur}
				ref={refs.meridian}
				id='meridian'
				onKeyDown={(e) => {
					onKeyDown(e);
				}}
				onChange={(event) => {
					const { target } = event;
					const { id, value } = target;
					if (!value || isValidMeridian(value.toUpperCase())) {
						onChange(id, value.toUpperCase());
					}
				}}
			/>
		</div>
	);
};

TimePicker.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.shape({
		hours: PropTypes.string,
		minutes: PropTypes.string,
		seconds: PropTypes.string,
		meridian: PropTypes.string,
	}),
};

TimePicker.defaultProps = {
	className: '',
	onChange: () => {},
	value: null,
};

export default TimePicker;
