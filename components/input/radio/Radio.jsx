import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Radio.module.css';
import { RadioIcon } from '../../icons';
import { classes, inputHelper } from '../../../utils';

const Radio = (props) => {
	// eslint-disable-next-line object-curly-newline
	const { label, checked, defaultChecked, onChange, position, size, className, disabled } = props;

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
			<input disabled={disabled} type='radio' checked={isChecked} onChange={handleChange} />
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

Radio.defaultProps = {
	disabled: false,
	label: null,
	checked: undefined,
	defaultChecked: false,
	position: 'left',
	size: 'sm',
	onChange: () => {},
};

export default Radio;
