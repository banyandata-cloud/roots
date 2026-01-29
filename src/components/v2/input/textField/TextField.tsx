import React, { createElement, forwardRef, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { classes, inputHelper } from '../../../../utils/utils';
import { BaseCell } from '../../../cell';
import { ErrorIcon, WarningIcon } from '../../icons';
import { Popover } from '../../../popover';
import type { MiddlewareOptions, Placement } from '../../../popover/Popover';
import { Tooltip } from '../../../tooltip';
import styles from './TextField.module.css';
import { Text } from '../../../text';

type InputType = 'text' | 'textarea' | (string & {});

interface Feedback {
	error?: string | undefined;
	info?: string | undefined;
}

interface LeftRightIconProps {
	className?: string | undefined;
}
type LeftComponentType = React.ComponentType<LeftRightIconProps>;
type RightComponentType = React.ComponentType<LeftRightIconProps>;

interface AutocompleteOptions {
	/** Decide when to open based on the current input */
	predicate?: (input: string) => boolean;
	open?: (input: string) => boolean;
	/** Popover placement (kept broad to avoid coupling to the popper types) */
	placement?: Placement;
	/** Popover middleware options (library-specific) */
	middlewareOptions?: MiddlewareOptions;
	/** Renderer for the autocomplete content */
	render?: React.ComponentType<{
		name?: string | undefined;
		value?: string | number | undefined;
	}>;
}

export interface TextFieldProps {
	id?: string;
	name?: string;
	label?: string;
	placeholder?: string;
	type?: InputType;
	value?: string | number;
	required?: boolean;
	defaultValue?: string;
	onFocus?: () => void;
	onBlur?: () => void;
	onChange?: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		value?: string
	) => void;
	size?: 'sm' | 'md' | 'lg' | (string & {});
	border?: 'default' | 'none' | (string & {});
	theme?: 'light' | 'dark' | (string & {});
	LeftComponent?: LeftComponentType;
	RightComponent?: RightComponentType;
	className?: string | undefined;
	disabled?: boolean;
	/** Extra HTML attributes to forward to the input/textarea */
	inputProps?:
		| React.InputHTMLAttributes<HTMLInputElement>
		| React.TextareaHTMLAttributes<HTMLTextAreaElement>;
	feedback?: Feedback | undefined;
	maxLength?: number;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	/** Whether to enable autocomplete popover */
	autocompleteOptions?: AutocompleteOptions | undefined;
	helperText?: string;
	linkAction?: string | (() => void);
	readOnly?: boolean;
	linkText?: string;
}

const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
	(props, inputRef) => {
		const {
			id,
			name,
			label = '',
			placeholder = '',
			type = 'text',
			value,
			required,
			defaultValue = '',
			onFocus,
			onBlur,
			onChange,
			size = 'md',
			border = 'default',
			LeftComponent,
			RightComponent,
			className,
			disabled,
			inputProps,
			feedback,
			maxLength,
			onKeyDown,
			autocompleteOptions,
			helperText,
			linkText = 'Link',
			linkAction,
			readOnly,
		} = props;

		const { current: isControlled } = useRef<boolean>(value !== undefined);

		const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue);

		const [showAutocompleteOptions, setShowAutocompleteOptions] = useState<boolean>(false);

		const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

		const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { fieldValue } = inputHelper(event) as { fieldValue: string };

			if (isControlled) {
				onChange?.(event, fieldValue);
			} else {
				setUncontrolledValue(fieldValue);
			}
		};

		const getLeftComponent = () => {
			if (!LeftComponent) return null;

			return (
				<LeftComponent
					className={classes(
						feedback?.error && styles.error,
						disabled && styles.leftIconDisabled
					)}
				/>
			);
		};

		const getRightComponent = () => {
			if (disabled) return null;

			if (feedback) {
				const Icon = feedback.error ? ErrorIcon : WarningIcon;

				return (
					<Tooltip
						content={feedback.error ?? feedback.info ?? ''}
						position='right'
						className={styles.tooltip}
						variant='light'>
						<span className={classes(styles.span, feedback.error && styles.error)}>
							<Icon
								className={classes(styles.icon, feedback.error && styles.error)}
							/>
						</span>
					</Tooltip>
				);
			}

			return RightComponent ? <RightComponent /> : null;
		};

		const handleOnBlur = () => {
			onBlur?.();
			setShowAutocompleteOptions(false);
		};

		const inputValue = isControlled ? String(value ?? '') : uncontrolledValue;

		const commonProps = {
			id,
			name,
			disabled,
			readOnly,
			placeholder,
			onFocus: () => {
				onFocus?.();
				setShowAutocompleteOptions(true);
			},
			onBlur: handleOnBlur,
			onKeyDown,
			required,
			'data-elem': 'input' as const,
			ref: mergeRefs([
				inputRef as unknown as React.Ref<HTMLInputElement & HTMLTextAreaElement>,
			]),
			value: inputValue,
			onChange: handleChange,
			className: classes(styles.input, feedback?.error ? styles.error : ''),
			...(typeof maxLength === 'number'
				? {
						maxLength,
					}
				: {}),
		};

		const Input =
			type === 'textarea'
				? createElement('textarea', {
						...commonProps,
						...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>),
					})
				: createElement('input', {
						...commonProps,
						defaultValue,
						...(inputProps as React.InputHTMLAttributes<HTMLInputElement>),
					});

		const AutocompletePopover = autocompleteOptions?.render;

		const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
			e.preventDefault();

			if (typeof linkAction === 'function') {
				linkAction();
			} else if (typeof linkAction === 'string') {
				window.location.href = linkAction;
			}
		};

		return (
			<div className={classes(styles.root, className)}>
				<label>
					<div className={styles.labelRow}>
						{label && (
							<span
								className={classes(
									required && styles.required,
									disabled && styles.labelDisabled
								)}>
								{label}
							</span>
						)}

						{type === 'textarea' && typeof maxLength === 'number' && (
							<span className={styles.textCount}>
								{inputValue.length}/{maxLength}
							</span>
						)}

						{type === 'password' && !disabled && linkAction && (
							<a href='#' onClick={handleLinkClick} className={styles.forgotPassword}>
								{linkText}
							</a>
						)}
					</div>
					<BaseCell
						ref={setAnchorEl}
						className={classes(
							styles[size],
							styles['input-wrapper'],
							styles[`border-${border}`],
							styles[`type-${type}`],
							readOnly && styles.readOnly,
							feedback?.error ? styles['feedback-error'] : ''
						)}
						{...(LeftComponent && {
							component1: getLeftComponent(),
						})}
						component2={Input}
						{...((RightComponent || feedback) && {
							component3: getRightComponent(),
						})}
					/>
					<div className={styles.helperTextWrapper}>
						{helperText && (
							<Text
								className={classes(
									styles.helperText,
									disabled && styles.helperTextDisabled,
									!disabled && feedback?.error && styles.helperTextError
								)}>
								{helperText}
							</Text>
						)}
					</div>
				</label>
				{autocompleteOptions && (
					<Popover
						anchorEl={anchorEl}
						open={
							autocompleteOptions && 'open' in autocompleteOptions
								? typeof autocompleteOptions.open === 'function'
									? autocompleteOptions.open(String(value ?? ''))
									: autocompleteOptions.open
								: showAutocompleteOptions
						}
						placement={autocompleteOptions.placement}
						middlewareOptions={autocompleteOptions.middlewareOptions}
						withOverlay={false}
						lockScroll={false}>
						{AutocompletePopover && <AutocompletePopover name={name} value={value} />}
					</Popover>
				)}
			</div>
		);
	}
);

export default TextField;
