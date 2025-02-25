import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { classes, inputHelper } from '../../../utils';
import { ErrorBoundaryWrapper } from '../../errorBoundary';
import { RadioIcon } from '../../icons';
import styles from './Radio.module.css';

const Radio = (props) => {
	const {
		label,
		checked,
		defaultChecked,
		onChange = () => {},
		position = 'left',
		size = 'sm',
		className,
		disabled,
		custom,
	} = props;

	const { current: isControlled } = useRef(checked !== undefined);

	// for uncontrolled input
	const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);

	const handleChange = (event) => {
		const { fieldValue } = inputHelper(event);

		if (isControlled) {
			onChange(event, fieldValue);
		} else {
			setUncontrolledChecked(fieldValue);
		}
	};

	const isChecked = isControlled ? checked : uncontrolledChecked;

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
			<label
				className={classes(
					styles.root,
					styles[`position-${position}`],
					disabled ? styles.disabled : '',
					isChecked ? styles.selected : '',
					className
				)}>
				<input
					disabled={disabled}
					type='radio'
					checked={isChecked}
					onChange={handleChange}
				/>
				{isChecked ? (
					<RadioIcon.Checked
						data-elem='icon'
						className={classes(styles[`icon-${size}`], styles.icon)}
					/>
				) : (
					<RadioIcon.UnChecked
						data-elem='icon'
						className={classes(styles[`icon-${size}`], styles.icon)}
					/>
				)}
				{label && <span data-elem='label'>{label}</span>}
			</label>
		</ErrorBoundary>
	);
};

Radio.propTypes = {
	disabled: PropTypes.bool,
	label: PropTypes.string,
	checked: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	position: PropTypes.oneOf(['left', 'right']),
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	onChange: PropTypes.func,
};

export default Radio;
