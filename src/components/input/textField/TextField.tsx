/* eslint-disable max-len */
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
import { Tooltip } from '../../tooltip';
import styles from './TextField.module.css';

interface Feedback {
	error?: string;
	info?: string;
	type?: 'error' | 'success' | 'default';
}

interface TextFieldProps {
	id?: string;
	name?: string;
	label?: string | number;
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute | 'textarea';
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
	LeftComponent?: React.ElementType;
	RightComponent?: React.ElementType;
	className?: string;
	disabled?: boolean;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
	feedback?: Feedback;
	maxLength?: number;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
	(props, inputRef): React.ReactElement | null => {
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
			LeftComponent,
			RightComponent,
			className,
			disabled,
			inputProps = {},
			feedback,
			maxLength,
			onKeyDown = () => {},
		} = props;

		const { current: isControlled } = useRef(value !== undefined);

		const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue);
		const [inputType, setInputType] = useState<string>(type ?? 'textarea');

		const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { fieldValue } = inputHelper(event);

			if (isControlled) {
				onChange(event, fieldValue);
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

		const Input = createElement(type === 'textarea' ? 'textarea' : 'input', {
			id,
			name,
			disabled,
			type: inputType,
			defaultValue,
			placeholder,
			...(maxLength !== undefined
				? {
						maxLength,
				  }
				: {}),

			onFocus: () => {
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

		return (
			<div className={classes(styles.root, className)}>
				<label>
					{label && <span className={required ? styles.required : ''}>{label}</span>}
					<BaseCell
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
			</div>
		);
	}
);

export default TextField;
