import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { classes, inputHelper } from '../../../utils/utils';
import { CheckboxIcon } from '../../icons';
import styles from './CheckBox.module.css';

const getIcon = (checked, intermediate) => {
	if (checked) {
		if (intermediate) {
			return CheckboxIcon.Intermediate;
		}
		return CheckboxIcon.Checked;
	}
	return CheckboxIcon.UnChecked;
};

const Checkbox = (props) => {
	const {
		label,
		onChange = () => {},
		defaultChecked,
		checked,
		position = 'right',
		size = 'sm',
		className = '',
		disabled,
		intermediate,
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

	const Icon = getIcon(isChecked, intermediate);

	return (
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
				type='checkbox'
				defaultChecked={defaultChecked}
				{...(isControlled
					? {
							checked,
					  }
					: {})}
				onChange={handleChange}
			/>
			<Icon className={classes(styles[`icon-${size}`], styles.icon)} />
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

export default Checkbox;
