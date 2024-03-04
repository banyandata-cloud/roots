import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CheckBox.module.css';
import { CheckboxIcon } from '../../icons';
import { classes, inputHelper } from '../../../utils/utils';

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
	// eslint-disable-next-line object-curly-newline
	const {
		label,
		onChange,
		defaultChecked,
		checked,
		position,
		size,
		className,
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
