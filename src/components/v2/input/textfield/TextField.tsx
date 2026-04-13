import React, { forwardRef, useState } from 'react';
import { classes } from '../../../../utils';
import { Button } from '../../buttons/button';
import { HelpIcon } from '../../icons';
import { ErrorIcon } from '../../icons/error';
import { WarningIcon } from '../../icons/warning';
import { Tooltip } from '../../tooltip';
import { Dropdown } from '../dropdown';
import type { TextFieldProps } from '../textField/types/index';
import styles from './TextField.module.scss';

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
			helpText,
			rightIcon,
			// Dropdown props
			leadingDropdown,
			leadingDropdownOptions = [],
			leadingDropdownValue,
			leadingDropdownDefaultValue,
			leadingDropdownPlaceholder = 'Select',
			trailingDropdown,
			trailingDropdownOptions = [],
			trailingDropdownValue,
			trailingDropdownDefaultValue,
			trailingDropdownPlaceholder = 'Select',
			onChange,
			onFocus,
			onBlur,
			onLeadingDropdownChange,
			onTrailingDropdownChange,
			className,
			id,
			name,
			autoComplete,
			autoFocus,
			readOnly,
			unstyled = false,
			...props
		},
		ref
	) => {
		const [internalValue, setInternalValue] = useState(defaultValue || '');
		const [isFocused, setIsFocused] = useState(false);

		// Dropdown state management
		const [internalLeadingDropdownValue, setInternalLeadingDropdownValue] = useState(
			leadingDropdownDefaultValue || ''
		);
		const [internalTrailingDropdownValue, setInternalTrailingDropdownValue] = useState(
			trailingDropdownDefaultValue || ''
		);

		// Determine current display values
		const displayValue = value !== undefined ? value : internalValue;
		const displayLeadingDropdownValue =
			leadingDropdownValue !== undefined
				? leadingDropdownValue
				: internalLeadingDropdownValue;
		const displayTrailingDropdownValue =
			trailingDropdownValue !== undefined
				? trailingDropdownValue
				: internalTrailingDropdownValue;

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

		// Handle dropdown changes
		const handleLeadingDropdownChange = (dropdownValue: string) => {
			if (leadingDropdownValue === undefined) {
				setInternalLeadingDropdownValue(dropdownValue);
			}
			onLeadingDropdownChange?.(dropdownValue);
		};

		const handleTrailingDropdownChange = (dropdownValue: string) => {
			if (trailingDropdownValue === undefined) {
				setInternalTrailingDropdownValue(dropdownValue);
			}
			onTrailingDropdownChange?.(dropdownValue);
		};

		// Return unstyled input if requested
		if (unstyled) {
			return (
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
					className={className}
					id={id}
					name={name}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					{...props}
				/>
			);
		}

		return (
			<div className={classes(styles.textField, className)}>
				{/* Label */}
				{label && (
					<div className={styles.labelContainer}>
						<span className={styles.label}>{label}</span>
						{required && <span className={styles.required}>*</span>}
						{helpIcon && (
							<Tooltip
								content={helpText || 'Additional information about this field'}
								position='top'>
								<div className={styles.helpIcon}>
									<HelpIcon />
								</div>
							</Tooltip>
						)}
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
						{/* Leading Dropdown - using proper Dropdown component */}
						{leadingDropdown && (
							<div className={styles.leadingDropdownWrapper}>
								<Dropdown
									options={leadingDropdownOptions}
									value={displayLeadingDropdownValue}
									placeholder={leadingDropdownPlaceholder}
									onChange={handleLeadingDropdownChange}
									variant='borderless'
									size={size}
									state={actualState === 'disable' ? 'disabled' : 'default'}
									disabled={disabled}
									readOnly={readOnly}
									helpIcon={false}
									label=''
									helperText=''
									className={styles.inlineDropdown}
									popoverClassName={styles.leadingDropdownPopover}
								/>
							</div>
						)}

						{/* Leading Text */}
						{leadingText && (
							<div className={styles.leadingText}>
								<span className={styles.leadingTextContent}>{leadingText}</span>
							</div>
						)}

						{/* Input Field Area - takes remaining space */}
						<div
							className={classes(
								styles.inputFieldArea,
								leadingDropdown && styles.inputFieldAreaWithLeadingDropdown,
								leadingText && styles.inputFieldAreaWithLeadingText
							)}>
							<div className={styles.inputContent}>
								{/* Leading Icon - only show if no leading text or leading dropdown */}
								{!leadingText &&
									!leadingDropdown &&
									leadingIcon &&
									LeadingIconComponent && (
										<div className={styles.leadingIcon}>
											<LeadingIconComponent />
										</div>
									)}

								{/* Input field */}
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

							{/* Trailing Icons Area */}
							<div className={styles.trailingArea}>
								{/* Status Icon (Error/Warning) */}
								{showStatusIcon() && (
									<div className={styles.statusIcon}>{getStatusIcon()}</div>
								)}

								{/* Right Icon - configurable */}
								{rightIcon && (
									<div className={styles.rightIcon}>
										{React.createElement(rightIcon, {
											className: styles.iconComponent || '',
										})}
									</div>
								)}

								{/* Trailing Dropdown */}
								{trailingDropdown && (
									<div className={styles.trailingDropdown}>
										<Dropdown
											options={trailingDropdownOptions}
											value={displayTrailingDropdownValue}
											placeholder={trailingDropdownPlaceholder}
											onChange={handleTrailingDropdownChange}
											variant='borderless'
											size={size}
											state={
												actualState === 'disable' ? 'disabled' : 'default'
											}
											disabled={disabled}
											readOnly={readOnly}
											helpIcon={false}
											label=''
											helperText=''
											className={styles.inlineDropdown}
											popoverClassName={styles.trailingDropdownPopover}
										/>
									</div>
								)}
							</div>
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
