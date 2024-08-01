/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { createElement, forwardRef, useRef, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { mergeRefs } from 'react-merge-refs';
import { classes, inputHelper } from '../../../utils/utils';
import { BaseCell } from '../../cell';
import { ErrorBoundaryWrapper } from '../../errorBoundary';
import { Popover } from '../../popover';
import styles from './TextFieldv2.module.css';
import {
	EmailIcon,
	HidePasswordIcon,
	PasswordIcon,
	UnlockPasswordIcon,
	ViewPasswordIcon,
	InfoIcon,
} from '../../icons';
import { Button } from '../../buttons';
import { Tooltip } from '../../tooltip';

/**
 * TextField is a functional component that renders a text input field with customizable options.
 * It handles both controlled and uncontrolled input values
 * and provides a way to open an autocomplete popover.
 *
 * @param {object} - An object containing various properties to configure the TextField component.
 * @param {string} id - The id of the input field.
 * @param {string} name - The name of the input field.
 * @param {string|number} label - The label text for the input field.
 * @param {string|number} placeholder - The placeholder text for the input field.
 * @param {string} type - The type of the input field (text, email, password, number, textarea).
 * @param {string|number} value - The value of the input field.
 * @param {boolean} required - Whether the input field is required.
 * @param {string} defaultValue - The default value for the input field.
 * @param {function} onFocus - The event handler for the input field's focus event.
 * @param {function} onBlur - The event handler for the input field's blur event.
 * @param {function} onChange - The event handler for the input field's change event.
 * @param {string} size - The size of the input field (sm, md, lg).
 * @param {string} border - The border style of the input field (default, bottom, none).
 * @param {string} theme - The theme of the input field (light, dark).
 * @param {ReactNode} LeftComponent - The component to render on the left side of the input field.
 * @param {ReactNode} RightComponent - The component to render on the right side of the input field.
 * @param {string} className - The CSS class name for the input field.
 * @param {boolean} disabled - Whether the input field is disabled.
 * @param {object} input- Additional to pass to the input field.
 * @param {object} feedback - The feedback message for the input field.
 * @param {object} count - The character count configuration for the input field.
 * @param {boolean} feedbackAndCount - Whether to display both feedback and character count.
 * @param {number} maxLength - The maximum length of the input field.
 * @param {function} onKeyDown - The event handler for the input field's key down event.
 * @param {boolean} autocomplete - Whether to enable autocomplete for the input field.
 * @param {object} autocompleteOptions - The options for the autocomplete feature.
 * @param {boolean} custom - Whether to use custom styling for the input field.
 * @returns {ReactNode} The rendered TextField component.
 */
const TextField = forwardRef((props, inputRef) => {
	const {
		id,
		name,
		label,
		placeholder,
		type,
		value,
		required,
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
	const [inputType, setInputType] = useState(type ?? 'textarea');

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

	const getType = (currType) => {
		if (currType === 'email') {
			setInputType('input');
		}
		setInputType(currType);
	};

	const getLeftComponent = () => {
		if (type === 'email') {
			return <EmailIcon className={feedback?.error ? styles.error : ''} />;
		}
		if (type === 'password' && inputType === 'password') {
			return <PasswordIcon className={feedback?.error ? styles.error : ''} />;
		}
		if (type === 'password' && inputType === 'text') {
			return <UnlockPasswordIcon className={feedback?.error ? styles.error : ''} />;
		}
		return <LeftComponent className={feedback?.error ? styles.error : ''} />;
	};

	const getRightComponent = () => {
		if (type === 'password' && inputType === 'password') {
			return (
				<Button
					className={classes(styles.button, feedback?.error ? styles.error : '')}
					title=''
					variant='contained'
					type='button'
					leftComponent={() => {
						return (
							<HidePasswordIcon
								className={classes(
									styles.icon,
									feedback?.error ? styles.error : ''
								)}
								position='left'
							/>
						);
					}}
					onClick={() => {
						setInputType('text');
					}}
				/>
			);
		}
		if (type === 'password' && inputType === 'text') {
			return (
				<Button
					className={classes(styles.button, feedback?.error ? styles.error : '')}
					title=''
					variant='contained'
					type='button'
					leftComponent={() => {
						return (
							<ViewPasswordIcon
								className={classes(
									styles.icon,
									feedback?.error ? styles.error : ''
								)}
								position='left'
							/>
						);
					}}
					onClick={() => {
						setInputType('password');
					}}
				/>
			);
		}
		if (feedback) {
			return (
				<Tooltip
					content={feedback?.info ?? feedback?.error ?? ''}
					position='top'
					className={styles.tooltip}
					variant='light'>
					<span className={classes(styles.span, feedback?.error ? styles.error : '')}>
						<InfoIcon
							className={classes(styles.icon, feedback?.error ? styles.error : '')}
						/>
					</span>
				</Tooltip>
			);
		}
		return <RightComponent />;
	};

	useEffect(() => {
		if (type) {
			getType(type);
		}
	}, [type]);

	const inputValue = isControlled ? value ?? '' : uncontrolledValue;

	const Input = createElement(type === 'textarea' ? 'textarea' : 'input', {
		id,
		name,
		disabled,
		type: inputType,
		defaultValue,
		placeholder,
		...(maxLength !== null && maxLength),
		onFocus: () => {
			checkAndOpenAutocomplete(inputValue);
			onFocus?.();
		},
		onBlur,
		onKeyDown,
		required,
		'data-elem': 'input',
		ref: mergeRefs([inputRef]),
		value: inputValue,
		onChange: handleChange,
		className: classes(styles[size], styles.input, feedback?.error ? styles.error : ''),
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
					<span className={required ? styles.required : ''}>{label}</span>
					<BaseCell
						ref={setAnchorEl}
						className={classes(
							styles['input-wrapper'],
							styles[`border-${border}`],
							styles[`type-${type}`],
							feedback?.error ? styles['feedback-error'] : ''
						)}
						component1={
							(LeftComponent || type === 'password' || type === 'email') &&
							getLeftComponent()
						}
						component2={Input}
						component3={
							(RightComponent || type === 'password' || feedback) &&
							getRightComponent()
						}
					/>
				</label>
				{feedbackAndCount && (
					<div className={styles.bottom}>
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
	required: PropTypes.bool,
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
	required: false,
};

export default TextField;
