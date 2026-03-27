import React, { forwardRef, useState } from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../buttons/button';
import { HelpIcon } from '../../icons';
import { ErrorIcon } from '../../icons/error';
import { WarningIcon } from '../../icons/warning';
import styles from './TextField.module.scss';
import type { TextFieldProps } from './types';

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(
		{
			label,
			placeholder = 'Optional placeholder text',
			helperText = 'Helper text',
			value,
			defaultValue,
			state = 'default',
			size = 'sm',
			type = 'default',
			required = true,
			disabled = false,
			leadingIcon = true,
			leadingIconComponent: LeadingIconComponent,
			leadingText,
			trailingButton,
			trailingButtonText = 'Copy',
			trailingButtonIcon,
			trailingButtonIconComponent: TrailingButtonIconComponent,
			trailingButtonOnClick,
			helpIcon = true,
			onChange,
			onFocus,
			onBlur,
			className,
			id,
			name,
			autoComplete,
			autoFocus,
			readOnly,
			...props
		},
		ref
	) => {
		const [internalValue, setInternalValue] = useState(defaultValue || '');
		const [isFocused, setIsFocused] = useState(false);

		// Determine current display value
		const displayValue = value !== undefined ? value : internalValue;

		// Determine actual state based on props and internal state
		const getActualState = () => {
			if (disabled) return 'disable';
			if (state !== 'default') return state;

			// Auto-determine state based on content and focus
			if (isFocused && displayValue) return 'filled-focus';
			if (isFocused && !displayValue) return 'active-typing';
			if (!isFocused && displayValue) return 'filled';
			return 'default';
		};

		const actualState = getActualState();

		// Determine helper text color
		const getHelperTextClass = () => {
			switch (actualState) {
				case 'error-focus':
				case 'error-filled':
					return styles.helperError;
				case 'warning':
					return styles.helperWarning;
				default:
					return styles.helperDefault;
			}
		};

		// Show status icon (error/warning)
		const showStatusIcon = () => {
			return actualState === 'error-filled' || actualState === 'warning';
		};

		// Get appropriate status icon
		const getStatusIcon = () => {
			switch (actualState) {
				case 'error-filled':
				case 'error-focus':
					return <ErrorIcon hexagon={true} />;
				case 'warning':
					return <WarningIcon hexagon={true} />;
				default:
					return null;
			}
		};

		// Handle input change
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			if (value === undefined) {
				setInternalValue(newValue);
			}
			onChange?.(e);
		};

		// Handle focus
		const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(true);
			// Position cursor at the end of existing text to prevent text clearing
			setTimeout(() => {
				if (e.target && displayValue) {
					e.target.setSelectionRange(displayValue.length, displayValue.length);
				}
			}, 0);
			onFocus?.(e);
		};

		// Handle blur
		const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(false);
			onBlur?.(e);
		};

		return (
			<div className={classes(styles.textField, className)}>
				{/* Label */}
				{label && (
					<div className={styles.labelContainer}>
						<span className={styles.label}>{label}</span>
						{required && <span className={styles.required}>*</span>}
					</div>
				)}

				{/* Input Container */}
				<div
					className={classes(
						styles.inputWrapper,
						trailingButton && styles.inputWrapperWithTrailingButton,
						trailingButton &&
							actualState === 'filled-focus' &&
							styles.wrapperFilledFocus,
						trailingButton && actualState === 'error-focus' && styles.wrapperErrorFocus
					)}>
					<div
						className={classes(
							styles.inputContainer,
							styles[actualState],
							styles[size],
							trailingButton && styles.inputContainerWithTrailingButton
						)}>
						{/* Leading Text */}
						{leadingText && (
							<div className={styles.leadingText}>
								<span className={styles.leadingTextContent}>{leadingText}</span>
							</div>
						)}

						<div
							className={classes(
								styles.inputInner,
								leadingText && styles.inputInnerWithLeadingText
							)}>
							<div className={styles.contentArea}>
								{/* Leading Icon - only show if no leading text */}
								{!leadingText && leadingIcon && LeadingIconComponent && (
									<div className={styles.leadingIcon}>
										<LeadingIconComponent />
									</div>
								)}

								{/* Single input with custom styling */}
								<input
									ref={ref}
									type='text'
									value={displayValue}
									placeholder={placeholder}
									onChange={handleChange}
									onFocus={handleFocus}
									onBlur={handleBlur}
									disabled={disabled}
									readOnly={readOnly}
									className={styles.mainInput}
									id={id}
									name={name}
									autoComplete={autoComplete}
									autoFocus={autoFocus}
									{...props}
								/>
							</div>

							{/* Trailing Icons Area - only show if no trailing button */}
							{!trailingButton && (
								<div className={styles.trailingArea}>
									{/* Status Icon (Error/Warning) */}
									{showStatusIcon() && (
										<div className={styles.statusIcon}>{getStatusIcon()}</div>
									)}

									{/* Help Icon */}
									{helpIcon && actualState !== 'warning' && (
										<div className={styles.helpIcon}>
											<HelpIcon />
										</div>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Trailing Button */}
					{trailingButton && (
						<Button
							title={trailingButtonText}
							leftComponent={
								trailingButtonIcon && TrailingButtonIconComponent
									? TrailingButtonIconComponent
									: undefined
							}
							onClick={trailingButtonOnClick}
							type='button'
							variant='ghost'
							size={size === 'sm' ? 'sm' : 'md'}
							className={classes(
								styles.trailingButton,
								styles[actualState + 'TrailingButton'],
								styles[size],
								disabled && styles.disableTrailingButton
							)}
							disabled={disabled}
						/>
					)}
				</div>

				{/* Helper Text */}
				{helperText && (
					<div className={classes(styles.helperText, getHelperTextClass())}>
						{helperText}
					</div>
				)}
			</div>
		);
	}
);

TextField.displayName = 'TextField';

export default TextField;
