import React, { createElement, forwardRef, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { classes, inputHelper } from '../../../utils/utils';
import { Button } from '../../buttons';
import { BaseCell } from '../../cell';
import { ErrorBoundaryWrapper } from '../../errorBoundary';
import {
	EmailIcon,
	HidePasswordIcon,
	InfoIcon,
	PasswordIcon,
	UnlockPasswordIcon,
	ViewPasswordIcon,
} from '../../icons';
import { Popover } from '../../popover';
import { Tooltip } from '../../tooltip';
import styles from './TextFieldv2.module.css';

interface Feedback {
	error?: string;
	info?: string;
	type?: 'error' | 'success' | 'default';
}

interface AutocompleteOptions {
	open: boolean;
	setOpen: (open: boolean) => void;
	render: React.ComponentType<{ name: string; value: string | number }>;
	predicate?: (inputString: string) => boolean;
	placement?: string;
	middlewareOptions?: {
		offset: { [key: string]: any };
		shift: { [key: string]: any };
		flip: { [key: string]: any };
	};
}

interface TextFieldProps {
	id?: string;
	name?: string;
	label?: string | number;
	placeholder?: string; // changed to string only
	type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
	value?: string | number;
	defaultValue?: string;
	required?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
	onChange?: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		value: string | number
	) => void;
	size?: 'sm' | 'md' | 'lg';
	border?: 'default' | 'bottom' | 'none';
	theme?: 'light' | 'dark';
	LeftComponent?: React.ElementType; // changed to ElementType
	RightComponent?: React.ElementType; // changed to ElementType
	className?: string;
	disabled?: boolean;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
	feedback?: Feedback;
	maxLength?: number;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	autocomplete?: boolean;
	autocompleteOptions?: AutocompleteOptions;
	custom?: boolean;
	count?: {
		limit: number;
	};
	feedbackAndCount?: boolean;
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
			onChange = () => {},
			size = 'md',
			border = 'default',
			theme = 'light',
			LeftComponent,
			RightComponent,
			className,
			disabled,
			inputProps = {},
			feedback,
			maxLength,
			onKeyDown = () => {},
			autocomplete,
			autocompleteOptions = {} as AutocompleteOptions,
			custom,
		} = props;

		const { current: isControlled } = useRef(value !== undefined);

		const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue);
		const [inputType, setInputType] = useState<string>(type ?? 'textarea');

		const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

		const checkAndOpenAutocomplete = (inputString: string) => {
			if (autocomplete) {
				autocompleteOptions?.setOpen?.(
					autocompleteOptions?.predicate?.(inputString) ?? inputString?.length > 0
				);
			}
		};

		const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { fieldValue } = inputHelper(event);

			checkAndOpenAutocomplete(fieldValue);

			if (isControlled) {
				onChange(event, fieldValue);
			} else {
				setUncontrolledValue(fieldValue);
			}
		};

		const getLeftComponent = () => {
			console.log('leftttty');
			if (type === 'email') {
				return <EmailIcon className={feedback?.error ? styles.error : ''} />;
			}
			if (type === 'password' && inputType === 'password') {
				return <PasswordIcon className={feedback?.error ? styles.error : ''} />;
			}
			if (type === 'password' && inputType === 'text') {
				return <UnlockPasswordIcon className={feedback?.error ? styles.error : ''} />;
			}
			return LeftComponent ? (
				<LeftComponent className={feedback?.error ? styles.error : ''} />
			) : null;
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
										position='left'
									/>
								) : (
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
								if (inputType === 'password') {
									setInputType('text');
									return;
								}
								setInputType('password');
							}}
						/>
						{feedback && (
							<Tooltip
								content={feedback?.info ?? feedback?.error ?? ''}
								position='right'
								className={styles.tooltip}
								variant='light'>
								<span
									className={classes(
										styles.span,
										feedback?.error ? styles.error : ''
									)}>
									<InfoIcon
										className={classes(
											styles.icon,
											feedback?.error ? styles.error : ''
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
						content={feedback?.info ?? feedback?.error ?? ''}
						position='right'
						className={styles.tooltip}
						variant='light'>
						<span className={classes(styles.span, feedback?.error ? styles.error : '')}>
							<InfoIcon
								className={classes(
									styles.icon,
									feedback?.error ? styles.error : ''
								)}
							/>
						</span>
					</Tooltip>
				);
			}
			return RightComponent ? <RightComponent /> : null;
		};

		const inputValue = isControlled ? value ?? '' : uncontrolledValue;

		// const Input = createElement(type === 'textarea' ? 'textarea' : 'input', {
		// 	id,
		// 	name,
		// 	disabled,
		// 	type: inputType,
		// 	defaultValue,
		// 	placeholder,
		// 	...(maxLength !== undefined ? { maxLength } : {}),

		// 	onFocus: () => {
		//         checkAndOpenAutocomplete(String(inputValue));
		// 		onFocus?.();
		// 	},
		// 	onBlur,
		// 	onKeyDown,
		// 	required,
		// 	'data-elem': 'input',
		// 	ref: mergeRefs([inputRef]),
		// 	value: inputValue,
		// 	onChange: handleChange,
		// 	className: classes(styles[size], styles.input, feedback?.error ? styles.error : ''),
		// 	...inputProps,
		// });

		const Input = createElement(type === 'textarea' ? 'textarea' : 'input', {
			id,
			name,
			disabled,
			type: inputType,
			defaultValue,
			placeholder,
			...(maxLength !== undefined ? { maxLength } : {}),

			onFocus: () => {
				checkAndOpenAutocomplete(String(inputValue));
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
		} as React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>);

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
				{autocomplete && (
					<Popover
						anchorEl={anchorEl}
						open={autocompleteOptions?.open}
						setOpen={autocompleteOptions?.setOpen}
						theme={theme}
						placement={autocompleteOptions?.placement}
						middlewareOptions={autocompleteOptions?.middlewareOptions}>
						{AutocompletePopover && value !== undefined && (
							<AutocompletePopover name={name ?? ''} value={value} />
						)}
					</Popover>
				)}
			</div>
		);
	}
);

export default TextField;
