import React, { forwardRef, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TextField.module.css';
import { classes, inputHelper } from '../../../utils/utils';
import { BaseCell } from '../../cell';

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
		onBlur,
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
				<BaseCell
					className={classes(styles['input-wrapper'], styles[`border-${border}`])}
					component1={LeftComponent && <LeftComponent />}
					component2={
						<input
							{...{
								id,
								name,
								disabled,
								type,
								defaultValue,
								placeholder,
								onBlur,
							}}
							data-elem='input'
							ref={inputRef}
							value={isControlled ? value ?? '' : uncontrolledValue}
							onChange={handleChange}
							className={classes(styles[size], styles.input)}
							{...inputProps}
						/>
					}
					component3={RightComponent && <RightComponent />}
				/>
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
