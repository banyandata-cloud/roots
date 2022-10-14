import React, { forwardRef, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TextField.module.css';
import { classes, inputHelper } from '../../../utils/utils';

// eslint-disable-next-line prefer-arrow-callback
const TextField = forwardRef(function TextField(props, inputRef) {
	const {
		id,
		name,
		label,
		placeholder,
		type,
		value,
		defaultValue,
		onChange,
		size,
		fieldInfo,
		border,
		LeftComponent,
		RightComponent,
		fieldIcon: FieldIcon,
		className,
		disabled,
		inputProps,
	} = props;

	const { current: isControlled } = useRef(value !== undefined);

	// for uncontrolled input
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

	const handleChange = (event) => {
		const { fieldValue } = inputHelper(event);

		if (isControlled) {
			onChange(event, fieldValue);
		} else {
			setUncontrolledValue(fieldValue);
		}
	};

	return (
		<div className={classes(styles.root, className)}>
			<label>
				{label}
				<div
					data-elem='input-wrapper'
					className={classes(styles['input-wrapper'], styles[`border-${border}`])}>
					<div className={classes(styles.left)}>
						{LeftComponent && <LeftComponent />}
						<input
							data-elem='input'
							ref={inputRef}
							disabled={disabled}
							type={type}
							defaultValue={defaultValue}
							value={isControlled ? value ?? '' : uncontrolledValue}
							onChange={handleChange}
							placeholder={placeholder}
							className={classes(styles[size], styles.input)}
							{...inputProps}
						/>
					</div>
					{RightComponent && <RightComponent />}
				</div>
			</label>
			{fieldInfo && (
				<div className={classes(styles.field)}>
					<span>{fieldInfo}</span>
					{FieldIcon && (
						<span className={classes(styles.icon)}>
							<FieldIcon />
						</span>
					)}
				</div>
			)}
		</div>
	);
});

TextField.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	border: PropTypes.oneOf(['default', 'bottom', 'none']),
	fieldInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	LeftComponent: PropTypes.node,
	RightComponent: PropTypes.node,
	fieldIcon: PropTypes.node,
};

TextField.defaultProps = {
	id: null,
	name: null,
	disabled: false,
	label: '',
	placeholder: '',
	type: 'text',
	value: undefined,
	defaultValue: '',
	onChange: () => {},
	size: 'md',
	border: 'default',
	fieldInfo: '',
	LeftComponent: null,
	RightComponent: null,
	fieldIcon: null,
};

export default TextField;
