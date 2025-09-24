import React, { createElement, forwardRef, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { classes, inputHelper } from '../../../utils/utils';
import { Button } from '../../buttons';
import { BaseCell } from '../../cell';
import {
	EmailIcon,
	HidePasswordIcon,
	InfoIcon,
	PasswordIcon,
	UnlockPasswordIcon,
	ViewPasswordIcon,
} from '../../icons';
import { Popover } from '../../popover';
import type { MiddlewareOptions, Placement } from '../../popover/Popover';
import { Tooltip } from '../../tooltip';
import styles from './TextField.module.css';

type InputType = 'text' | 'email' | 'password' | 'textarea' | (string & {});

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
		} = props;

		const { current: isControlled } = useRef<boolean>(value !== undefined);

		const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue);
		const [inputType, setInputType] = useState<InputType>(type);

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
			if (type === 'email') {
				return <EmailIcon className={feedback?.error ? styles.error : ''} />;
			}
			if (type === 'password' && inputType === 'password') {
				return <PasswordIcon className={feedback?.error ? styles.error : ''} />;
			}
			if (type === 'password' && inputType === 'text') {
				return <UnlockPasswordIcon className={feedback?.error ? styles.error : ''} />;
			}
			if (LeftComponent) {
				return <LeftComponent className={feedback?.error ? styles.error : ''} />;
			}
			return null;
		};

		const getRightComponent = () => {
			if (type === 'password') {
				return (
					<>
						<Button
							className={classes(styles.button, feedback?.error ? styles.error : '')}
							title=''
							variant='contained'
							type='button'
							leftComponent={() => {
								return inputType === 'password' ? (
									<HidePasswordIcon
										className={classes(
											styles.icon,
											feedback?.error ? styles.error : ''
										)}
									/>
								) : (
									<ViewPasswordIcon
										className={classes(
											styles.icon,
											feedback?.error ? styles.error : ''
										)}
									/>
								);
							}}
							onClick={() => {
								setInputType((prev) => {
									return prev === 'password' ? 'text' : 'password';
								});
							}}
						/>
						{feedback && (
							<Tooltip
								content={feedback.info ?? feedback.error ?? ''}
								position='right'
								className={styles.tooltip}
								variant='light'>
								<span
									className={classes(
										styles.span,
										feedback.error ? styles.error : ''
									)}>
									<InfoIcon
										className={classes(
											styles.icon,
											feedback.error ? styles.error : ''
										)}
									/>
								</span>
							</Tooltip>
						)}
					</>
				);
			}
			if (feedback) {
				return (
					<Tooltip
						content={feedback.info ?? feedback.error ?? ''}
						position='right'
						className={styles.tooltip}
						variant='light'>
						<span className={classes(styles.span, feedback.error ? styles.error : '')}>
							<InfoIcon
								className={classes(styles.icon, feedback.error ? styles.error : '')}
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
			className: classes(styles[size], styles.input, feedback?.error ? styles.error : ''),
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
						type: inputType,
						defaultValue,
						...(inputProps as React.InputHTMLAttributes<HTMLInputElement>),
					});

		const AutocompletePopover = autocompleteOptions?.render;

		return (
			<div className={classes(styles.root, className)}>
				<label>
					{label && <span className={required ? styles.required : ''}>{label}</span>}
					<BaseCell
						ref={setAnchorEl}
						className={classes(
							styles['input-wrapper'],
							styles[`border-${border}`],
							styles[`type-${type}`],
							feedback?.error ? styles['feedback-error'] : ''
						)}
						{...((LeftComponent ?? (type === 'password' || type === 'email')) && {
							component1: getLeftComponent(),
						})}
						component2={Input}
						{...((RightComponent ?? (type === 'password' || feedback)) && {
							component3: getRightComponent(),
						})}
					/>
				</label>
				{autocompleteOptions && (
					<Popover
						anchorEl={anchorEl}
						open={showAutocompleteOptions}
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
