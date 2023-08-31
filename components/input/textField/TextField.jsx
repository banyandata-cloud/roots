/* eslint-disable react/forbid-prop-types */
import React, { createElement, forwardRef, useRef, useState } from 'react';
import { ErrorBoundaryWrapper } from '../../errorBoundary';
import PropTypes from 'prop-types';
import { mergeRefs } from 'react-merge-refs';
import styles from './TextField.module.css';
import { classes, inputHelper } from '../../../utils/utils';
import { BaseCell } from '../../cell';
import { Popover } from '../../popover';
import { ErrorBoundaryWrapper } from '../../errorBoundary';

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
		onFocus,
		onBlur,
		onChange,
		size,
		border,
		theme,
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
		autocomplete,
		autocompleteOptions,
		custom,
	} = props;

	const { current: isControlled } = useRef(value !== undefined);

	// for uncontrolled input
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

	const [anchorEl, setAnchorEl] = useState(null);

	const checkAndOpenAutocomplete = (inputString) => {
		if (autocomplete) {
			autocompleteOptions?.setOpen?.(
				autocompleteOptions?.predicate?.(inputString) ?? inputString?.length > 0
			);
		}
	};

	const handleChange = (event) => {
		const { fieldValue } = inputHelper(event);

		checkAndOpenAutocomplete(fieldValue);

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
		onFocus: () => {
			onFocus?.();
			checkAndOpenAutocomplete(inputValue);
		},
		onBlur,
		onKeyDown,
		'data-elem': 'input',
		ref: mergeRefs([inputRef]),
		value: inputValue,
		onChange: handleChange,
		className: classes(styles[size], styles.input),
		...inputProps,
	});

	const AutocompletePopover = autocompleteOptions?.render;

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
			<div className={classes(styles.root, className)}>
				<label>
					{label}
					<BaseCell
						ref={setAnchorEl}
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
				{autocomplete && (
					<Popover
						anchorEl={anchorEl}
						open={autocompleteOptions?.open}
						setOpen={autocompleteOptions?.setOpen}
						theme={theme}
						placement={autocompleteOptions?.placement}
						middlewareOptions={autocompleteOptions?.middlewareOptions}>
						{AutocompletePopover && <AutocompletePopover name={name} value={value} />}
					</Popover>
				)}
			</div>
		</ErrorBoundary>
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
	autocomplete: PropTypes.bool,
	autocompleteOptions: PropTypes.shape({
		open: PropTypes.bool,
		setOpen: PropTypes.func,
		render: PropTypes.func,
		predicate: PropTypes.func,
		placement: PropTypes.string,
		middlewareOptions: PropTypes.shape({
			offset: PropTypes.object,
			shift: PropTypes.object,
			flip: PropTypes.object,
		}),
	}),
	theme: PropTypes.oneOf(['light', 'dark']),
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
	autocomplete: false,
	autocompleteOptions: {},
	theme: 'light',
};

export default TextField;
