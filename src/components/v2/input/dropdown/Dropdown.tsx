import React, { forwardRef, useRef, useState } from 'react';
import { classes } from '../../../../utils';
import { CrossIcon } from '../../../icons';
import { Popover } from '../../../popover';
import { Checkbox } from '../../../v2/checkbox';
import { Button } from '../../buttons/button';
import { HelpIcon } from '../../icons';
import { ChevronDownIcon } from '../../icons/chevron-down';
import { ErrorIcon } from '../../icons/error';
import { TickIcon } from '../../icons/tickIcon';
import { WarningIcon } from '../../icons/warning';
import styles from './Dropdown.module.scss';
import type { DropdownProps } from './types';

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
	(
		{
			label,
			placeholder = 'Select the option',
			helperText = 'This is a hint text to help user.',
			value,
			defaultValue,
			selectedValues,
			defaultSelectedValues,
			options = [],
			state = 'default',
			size = 'sm',
			variant = 'simple',
			required = true,
			disabled = false,
			readOnly = false,
			helpIcon = true,
			errorIcon = true,
			warningIcon = true,
			icon,
			onChange,
			onMultiSelectChange,
			onFocus,
			onBlur,
			className,
			id,
			name,
			...props
		},
		ref
	) => {
		// Internal state for uncontrolled component
		// setInternalValue will be used when dropdown menu selection is implemented
		const [internalValue, setInternalValue] = useState(defaultValue || '');
		const [internalSelectedValues, setInternalSelectedValues] = useState<string[]>(
			defaultSelectedValues || []
		);
		const [isFocused, setIsFocused] = useState(false);
		const [isOpen, setIsOpen] = useState(false);
		const dropdownButtonRef = useRef<HTMLButtonElement>(null);

		// Check if multi-select mode
		const isMultiSelect = variant === 'multi-select';

		// Determine current display value and selection
		const displayValue = value !== undefined ? value : internalValue;
		const currentSelectedValues =
			selectedValues !== undefined ? selectedValues : internalSelectedValues;

		// For single select
		const selectedOption = options.find((opt) => opt.value === displayValue);
		const isSelected = isMultiSelect ? currentSelectedValues.length > 0 : !!selectedOption;

		// Generate display text based on mode
		const getDisplayText = () => {
			if (isMultiSelect) {
				if (currentSelectedValues.length === 0) {
					return placeholder;
				}
				return `${currentSelectedValues.length} selected`;
			}
			return selectedOption?.label || placeholder;
		};

		const displayText = getDisplayText();

		// Determine actual state based on props and internal state
		const getActualState = () => {
			if (disabled) return 'disabled';
			if (readOnly) return 'read-only';
			if (state !== 'default') return state;

			// Auto-determine state based on focus and interaction
			if (isFocused || isOpen) return 'focus';
			if (isSelected) return 'selected';
			return 'default';
		};

		const actualState = getActualState();

		// Determine helper text color
		const getHelperTextClass = () => {
			switch (actualState) {
				case 'error':
					return styles.helperError;
				case 'warning':
					return styles.helperWarning;
				default:
					return styles.helperDefault;
			}
		};

		// Show status icon (error/warning)
		const showStatusIcon = () => {
			return (
				(actualState === 'error' && errorIcon) || (actualState === 'warning' && warningIcon)
			);
		};

		// Get appropriate status icon
		const getStatusIcon = () => {
			switch (actualState) {
				case 'error':
					return <ErrorIcon hexagon={true} />;
				case 'warning':
					return <WarningIcon hexagon={true} />;
				default:
					return null;
			}
		};

		// Handle dropdown toggle
		const handleToggle = () => {
			if (disabled || readOnly) return;
			const newIsOpen = !isOpen;
			setIsOpen(newIsOpen);

			// Set focus when opening, clear when closing
			if (newIsOpen) {
				setIsFocused(true);
			}
		};

		// Handle button focus
		const handleButtonFocus = (e: React.FocusEvent<HTMLDivElement>) => {
			console.log('Button focused via tab');
			setIsFocused(true);
			onFocus?.(e as any);
		};

		// Handle button blur
		const handleButtonBlur = (e: React.FocusEvent<HTMLDivElement>) => {
			// Only blur if not clicking inside the popover
			const relatedTarget = e.relatedTarget;
			if (relatedTarget && (relatedTarget as Element).closest('[data-dropdown-menu]')) {
				return; // Don't blur if clicking inside dropdown menu
			}

			// Delay blur slightly to allow click events on menu items
			setTimeout(() => {
				if (!isOpen) {
					setIsFocused(false);
					onBlur?.(e as any);
				}
			}, 100);
		};

		// Handle popover close
		const handlePopoverClose = () => {
			setIsOpen(false);
			setIsFocused(false);
		};

		// Handle multi-select option toggle
		const handleMultiSelectToggle = (optionValue: string) => {
			if (disabled || readOnly) return;

			let newValues: string[];
			if (currentSelectedValues.includes(optionValue)) {
				// Remove from selection
				newValues = currentSelectedValues.filter((val) => val !== optionValue);
			} else {
				// Add to selection
				newValues = [...currentSelectedValues, optionValue];
			}

			// Update state
			if (selectedValues === undefined) {
				setInternalSelectedValues(newValues);
			}
			onMultiSelectChange?.(newValues);
		};

		// Handle removing a specific selected value (for count badge close)
		const handleRemoveValue = (valueToRemove: string) => {
			if (disabled || readOnly) return;
			const newValues = currentSelectedValues.filter((val) => val !== valueToRemove);

			if (selectedValues === undefined) {
				setInternalSelectedValues(newValues);
			}
			onMultiSelectChange?.(newValues);
		};

		// Handle clear all selections
		const handleClearAll = (e: React.MouseEvent) => {
			e.stopPropagation();
			if (disabled || readOnly) return;

			if (selectedValues === undefined) {
				setInternalSelectedValues([]);
			}
			onMultiSelectChange?.([]);
		};

		return (
			<div className={classes(styles.dropdown, className)} ref={ref} {...props}>
				{/* Label */}
				{label && (
					<div className={styles.labelContainer}>
						<span className={styles.label}>{label}</span>
						{required && <span className={styles.required}>*</span>}
						{helpIcon && (
							<div className={styles.helpIcon}>
								<HelpIcon />
							</div>
						)}
					</div>
				)}

				{/* Dropdown Container */}
				<div
					tabIndex={disabled ? -1 : 0}
					onFocus={handleButtonFocus}
					onBlur={handleButtonBlur}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							handleToggle();
						}
					}}
					className={styles.buttonWrapper}>
					<Button
						ref={dropdownButtonRef}
						type='button'
						variant='ghost'
						size={size === 'sm' ? 'sm' : 'md'}
						title={
							<>
								<div className={styles.contentArea}>
									{/* Leading Icon */}
									{icon && (
										<div className={styles.leadingIcon}>
											{React.createElement(icon)}
										</div>
									)}

									{/* Multi-select count badge or regular text */}
									{isMultiSelect && currentSelectedValues.length > 0 ? (
										<div className={styles.countBadge}>
											<span className={styles.countText}>
												{currentSelectedValues.length}
											</span>
											<button
												type='button'
												className={styles.countCloseButton}
												onClick={handleClearAll}
												disabled={disabled || readOnly}>
												<CrossIcon />
											</button>
										</div>
									) : (
										<span
											className={classes(
												styles.dropdownText,
												!isSelected && styles.placeholder
											)}>
											{displayText}
										</span>
									)}
								</div>
								<div className={styles.trailingArea}>
									{/* Status Icon (Error/Warning) */}
									{showStatusIcon() && (
										<div className={styles.statusIcon}>{getStatusIcon()}</div>
									)}
									{/* Dropdown Arrow */}
									<div className={styles.dropdownIcon}>
										<ChevronDownIcon />
									</div>
								</div>
							</>
						}
						onClick={handleToggle}
						disabled={disabled}
						className={classes(
							styles.dropdownContainer,
							styles[actualState],
							styles[size]
						)}
						id={id}
					/>
				</div>

				{/* Dropdown Menu with Popover */}
				<Popover
					anchorEl={dropdownButtonRef.current}
					open={isOpen && options.length > 0}
					setOpen={handlePopoverClose}
					placement='bottom-start'
					theme='light'
					withOverlay={false}
					className={styles.dropdownMenuPopover}
					middlewareOptions={{
						offset: 4,
						shift: { padding: 8 },
						flip: { padding: 8 },
					}}>
					<div className={styles.dropdownMenu} data-dropdown-menu>
						{options.map((option) => {
							const isOptionSelected = isMultiSelect
								? currentSelectedValues.includes(option.value)
								: option.value === displayValue;

							return (
								<div
									key={option.value}
									className={classes(
										styles.dropdownMenuItem,
										isOptionSelected && styles.dropdownMenuItemSelected,
										isMultiSelect && styles.dropdownMenuItemMultiSelect
									)}
									onClick={() => {
										if (disabled || readOnly) return;

										if (isMultiSelect) {
											handleMultiSelectToggle(option.value);
											// Don't close dropdown for multi-select
										} else {
											// Single select behavior
											const newValue = option.value;
											if (value === undefined) {
												setInternalValue(newValue);
											}
											onChange?.(newValue);
											// Close dropdown and clear focus after selection
											setIsOpen(false);
											setIsFocused(false);
										}
									}}>
									<div className={styles.dropdownMenuItemContent}>
										{/* For multi-select, show checkbox */}
										{isMultiSelect && (
											<div className={styles.dropdownMenuItemCheckbox}>
												<Checkbox
													size={size === 'sm' ? 'sm' : 'md'}
													checked={isOptionSelected}
													onChange={() => {}} // Handled by parent click
													disabled={disabled || readOnly}
												/>
											</div>
										)}

										{/* Option Icon */}
										{option.icon && !isMultiSelect && (
											<div className={styles.dropdownMenuItemIcon}>
												{React.createElement(option.icon)}
											</div>
										)}
										<span className={styles.dropdownMenuItemText}>
											{option.label}
										</span>
									</div>

									{/* For single select, show tick icon */}
									{!isMultiSelect && isOptionSelected && (
										<div className={styles.dropdownMenuItemCheck}>
											<TickIcon />
										</div>
									)}
								</div>
							);
						})}
					</div>
				</Popover>

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

Dropdown.displayName = 'Dropdown';

export default Dropdown;
