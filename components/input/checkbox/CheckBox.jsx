import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CheckBox.module.css';
import { CheckboxIcon } from '../../icons';
import { classes, inputHelper } from '../../../utils/utils';

const Checkbox = (props) => {
	// eslint-disable-next-line object-curly-newline
	const { label, onChange, defaultChecked, checked, position, size, className, disabled } = props;

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
		<label
			className={classes(
				styles.root,
				styles[`position-${position}`],
				className,
				disabled ? styles.disabled : ''
			)}>
			<input
				disabled={disabled}
				type='checkbox'
				defaultChecked={defaultChecked}
				{...(isControlled
					? {
							checked,
					  }
					: {})}
				onChange={handleChange}
			/>
			{isChecked ? (
				<CheckboxIcon.Checked
					data-elem='icon'
					className={classes(styles[`icon-${size}`], styles.icon)}
				/>
			) : (
				<CheckboxIcon.UnChecked
					data-elem='icon'
					className={classes(styles[`icon-${size}`], styles.icon)}
				/>
			)}
			{label && <span data-elem='label'>{label}</span>}
		</label>
	);
};

Checkbox.propTypes = {
	disabled: PropTypes.bool,
	label: PropTypes.string,
	defaultChecked: PropTypes.bool,
	checked: PropTypes.bool,
	position: PropTypes.oneOf(['left', 'right']),
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	onChange: PropTypes.func,
};

Checkbox.defaultProps = {
	disabled: false,
	label: null,
	defaultChecked: false,
	checked: undefined,
	position: 'right',
	size: 'sm',
	onChange: () => {},
};

export default Checkbox;
