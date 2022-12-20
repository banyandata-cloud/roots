import React, { createElement, forwardRef, useRef, useState } from 'react';
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
		border,
		LeftComponent,
		RightComponent,
		className,
		disabled,
		inputProps,
		feedback,
		count,
		feedbackAndCount,
		maxLength,
		onKeyDown,
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

	const inputValue = isControlled ? value ?? '' : uncontrolledValue;

	const Input = createElement(type === 'textarea' ? 'textarea' : 'input', {
		id,
		name,
		disabled,
		type,
		defaultValue,
		placeholder,
		...(maxLength !== null && {
			maxLength,
		}),
		onBlur,
		onKeyDown,
		'data-elem': 'input',
		ref: inputRef,
		value: inputValue,
		onChange: handleChange,
		className: classes(styles[size], styles.input),
		...inputProps,
	});

	return (
		<div className={classes(styles.root, className)}>
			<label>
				{label}
				<BaseCell
					className={classes(
						styles['input-wrapper'],
						styles[`border-${border}`],
						styles[`type-${type}`],
						feedback != null ? styles[`feedback-${feedback?.type}`] : ''
					)}
					component1={LeftComponent && <LeftComponent />}
					component2={Input}
					component3={RightComponent && <RightComponent />}
				/>
			</label>
			{feedbackAndCount && (
				<div className={styles.bottom}>
					{feedback != null && (
						<div
							data-elem='feedback'
							className={classes(
								styles.feedback,
								styles[`feedback-${feedback.type}`]
							)}>
							{feedback.text}
						</div>
					)}
					{count?.limit != null && (
						<div
							data-elem='count'
							className={classes(
								styles.count,
								inputValue?.length > count.limit ? styles.exceeded : ''
							)}>
							{inputValue.length ?? 0}/{count.limit}
						</div>
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
	type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'textarea']),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	border: PropTypes.oneOf(['default', 'bottom', 'none']),
	LeftComponent: PropTypes.node,
	RightComponent: PropTypes.node,
	// eslint-disable-next-line react/forbid-prop-types
	inputProps: PropTypes.object,
	count: PropTypes.shape({
		limit: PropTypes.number,
	}),
	feedback: PropTypes.shape({
		text: PropTypes.node,
		type: PropTypes.oneOf(['error', 'success', 'default']),
	}),
	feedbackAndCount: PropTypes.bool,
	maxLength: PropTypes.number,
	onKeyDown: PropTypes.func,
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
	LeftComponent: null,
	RightComponent: null,
	inputProps: {},
	count: null,
	feedback: null,
	feedbackAndCount: false,
	maxLength: null,
	onKeyDown: () => {},
};

export default TextField;
