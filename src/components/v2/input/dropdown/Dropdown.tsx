import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { classes } from '../../../../utils';
import { Popover } from '../../../popover';
import { Checkbox } from '../../../v2/checkbox';
import Badge from '../../badges/Badge';
import { Button } from '../../buttons/button';
import { HelpIcon, SearchIcon } from '../../icons';
import { ChevronDownIcon } from '../../icons/chevron-down';
import { ErrorIcon } from '../../icons/error';
import { TickIcon } from '../../icons/tickIcon';
import { WarningIcon } from '../../icons/warning';
import Tag from '../../tags/Tags';
import { Tooltip } from '../../tooltip';
import { TextField } from '../textField';
import styles from './Dropdown.module.scss';
import type { AdvancedSearchResult, DropdownProps, DropdownRef, SearchTag } from './types';

const Dropdown = forwardRef<DropdownRef, DropdownProps>(
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
			dataLabel = 'option',
			customAllLabel = 'All',
			state = 'default',
			size = 'sm',
			variant = 'simple',
			required = true,
			disabled = false,
			readOnly = false,
			helpIcon = true,
			helpText,
			errorIcon = true,
			warningIcon = true,
			icon,
			searchIcon,
			shortcut,
			onShortcut,
			// Advanced search props
			enableAdvancedSearch = false,
			searchTags,
			defaultSearchTags,
			availableKeys = [],
			onAdvancedSearchChange,
			// Tag options props
			tagOptionsEnabled = false,
			tagOptions = [],
			onChange,
			onMultiSelectChange,
			onSearchChange,
			onFocus,
			onBlur,
			popoverOffset,
			popoverClassName,
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
		const [searchValue, setSearchValue] = useState(''); // For search variant

		// Advanced search state - simplified
		const [internalSearchTags, setInternalSearchTags] = useState<SearchTag[]>(
			defaultSearchTags || []
		);

		const dropdownButtonRef = useRef<HTMLButtonElement>(null);
		const searchInputRef = useRef<HTMLInputElement>(null); // For search variant
		const dropdownContainerRef = useRef<HTMLDivElement>(null); // For popover anchoring
		const searchContainerRef = useRef<HTMLDivElement>(null); // For search variant anchoring
		const searchTagsContainerRef = useRef<HTMLDivElement>(null); // For tags scrolling behavior

		// Tag options state
		const [focusedTagId, setFocusedTagId] = useState<string | null>(null); // Track which tag should show options
		const [tagOptionsOpen, setTagOptionsOpen] = useState(false); // Track tag options dropdown visibility
		const focusedTagRef = useRef<HTMLInputElement | null>(null); // Reference to focused tag input

		// Expose focus method via ref
		useImperativeHandle(ref, () => ({
			focus: () => {
				if (variant === 'search' && searchInputRef.current && !disabled && !readOnly) {
					searchInputRef.current.focus();
					setIsOpen(true);
					setIsFocused(true);
				} else if (dropdownButtonRef.current && !disabled && !readOnly) {
					dropdownButtonRef.current.focus();
					setIsOpen(true); // Open the dropdown to show options
					setIsFocused(true);
				}
			},
		}));

		// Keyboard shortcut support for search variant
		useEffect(() => {
			if (variant !== 'search' || !shortcut) return;

			const handleKeyDown = (e: KeyboardEvent) => {
				// Parse shortcut (e.g., '⌘T' -> Cmd+T)
				const isCtrlOrCmd = e.metaKey || e.ctrlKey;
				const shortcutKey = shortcut.replace('⌘', '').toLowerCase();

				if (isCtrlOrCmd && e.key.toLowerCase() === shortcutKey) {
					e.preventDefault();
					onShortcut?.();
					// Focus the search input
					if (searchInputRef.current && !disabled && !readOnly) {
						searchInputRef.current.focus();
						setIsOpen(true);
						setIsFocused(true);
					}
				}
			};

			window.addEventListener('keydown', handleKeyDown);
			return () => window.removeEventListener('keydown', handleKeyDown);
		}, [variant, shortcut, onShortcut, disabled, readOnly]);

		// Advanced search helper functions - simplified
		const currentSearchTags = searchTags !== undefined ? searchTags : internalSearchTags;

		const generateTagId = () => `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

		const emitAdvancedSearchChange = (tags: SearchTag[], searchText: string) => {
			if (!onAdvancedSearchChange) return;

			const result: AdvancedSearchResult = {
				tags: tags.map(({ key, value }) => ({ key, value })),
				defaultSearch: searchText,
			};
			onAdvancedSearchChange(result);
		};

		// Handle key selection from dropdown
		const handleKeySelect = (keyLabel: string) => {
			const newTag: SearchTag = {
				id: generateTagId(),
				key: keyLabel,
				value: '',
				isEditingValue: true,
			};

			const updatedTags = [...currentSearchTags, newTag];

			if (searchTags === undefined) {
				setInternalSearchTags(updatedTags);
			}

			// Clear main search and close dropdown
			setSearchValue('');
			setIsOpen(false);

			emitAdvancedSearchChange(updatedTags, '');

			// Focus will be managed by the Tag component's ref callback
		};

		// Handle tag value updates
		const handleTagValueUpdate = (
			tagId: string,
			newValue: string,
			finalize: boolean = false
		) => {
			const updatedTags = currentSearchTags.map((tag) =>
				tag.id === tagId ? { ...tag, value: newValue, isEditingValue: !finalize } : tag
			);

			// Update internal state immediately for controlled components
			if (searchTags === undefined) {
				setInternalSearchTags(updatedTags);
			}

			// Always emit the change for external consumers
			emitAdvancedSearchChange(updatedTags, searchValue);

			// Close tag options popover when finalizing
			if (finalize && tagOptionsEnabled && focusedTagId === tagId) {
				handleTagOptionsPopoverClose();
			}

			// Focus main input after finalizing tag edit
			if (finalize && searchInputRef.current) {
				setTimeout(() => {
					searchInputRef.current?.focus();
					setIsOpen(true); // Reopen dropdown for continued searching
				}, 100);
			}
		};

		// Handle tag removal
		const handleTagRemove = (tagId: string) => {
			const updatedTags = currentSearchTags.filter((tag) => tag.id !== tagId);

			if (searchTags === undefined) {
				setInternalSearchTags(updatedTags);
			}

			emitAdvancedSearchChange(updatedTags, searchValue);

			// Focus main input after removal
			if (searchInputRef.current) {
				setTimeout(() => searchInputRef.current?.focus(), 50);
			}
		};

		// Handle tag options focus
		const handleTagOptionsFocus = (tagId: string, inputElement: HTMLInputElement | null) => {
			if (tagOptionsEnabled && tagOptions.length > 0) {
				setFocusedTagId(tagId);
				focusedTagRef.current = inputElement;
				setTagOptionsOpen(true);
			}
		};

		// Handle tag option selection
		const handleTagOptionSelect = (optionValue: string) => {
			if (focusedTagId) {
				// Update the focused tag's value and close the popover
				handleTagValueUpdate(focusedTagId, optionValue, true); // Auto-finalize
				// Delay closing the popover slightly to ensure value update completes
				setTimeout(() => {
					handleTagOptionsPopoverClose();
				}, 50);
			}
		};

		// Handle tag options popover close
		const handleTagOptionsPopoverClose = () => {
			setTagOptionsOpen(false);
			setFocusedTagId(null);
			focusedTagRef.current = null;
		};

		// Get filtered keys based on search input
		const getFilteredKeys = () => {
			if (!enableAdvancedSearch || !availableKeys) return [];

			// If no search value, show all available keys for advanced search
			if (!searchValue) return availableKeys;

			// Filter keys based on search input
			return availableKeys.filter((key) =>
				key.label.toLowerCase().includes(searchValue.toLowerCase())
			);
		};

		const filteredKeys = getFilteredKeys();

		// Check if multi-select mode
		const isMultiSelect = variant === 'multi-select';

		// Create enhanced options with "All" option for multi-select
		const enhancedOptions = isMultiSelect
			? [{ value: '__all__', label: customAllLabel }, ...options]
			: options;

		// Get actual options (excluding "All" option) for value filtering
		const actualOptions = options;

		// Determine current display value and selection
		const displayValue = value !== undefined ? value : internalValue;
		const currentSelectedValues =
			selectedValues !== undefined ? selectedValues : internalSelectedValues;

		// For single select
		const selectedOption = actualOptions.find((opt) => opt.value === displayValue);
		const isSelected = isMultiSelect ? currentSelectedValues.length > 0 : !!selectedOption;

		// Check if "All" is selected (all actual options are selected)
		const isAllSelected =
			isMultiSelect &&
			actualOptions.length > 0 &&
			actualOptions.every((option) => currentSelectedValues.includes(option.value));

		// Generate display text based on mode and dataLabel
		const getDisplayText = () => {
			if (isMultiSelect) {
				if (currentSelectedValues.length === 0) {
					return placeholder;
				}

				if (!dataLabel) {
					return `${currentSelectedValues.length} selected`;
				}

				// Handle dataLabel (string or object with singular/plural)
				if (typeof dataLabel === 'string') {
					return `Selected ${dataLabel}`;
				}

				// Handle object with singular/plural
				const labelText =
					currentSelectedValues.length === 1 ? dataLabel.singular : dataLabel.plural;
				return `Selected ${labelText}`;
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

			if (optionValue === '__all__') {
				// Handle "All" option
				if (isAllSelected) {
					// Unselect all
					newValues = [];
				} else {
					// Select all actual options (excluding "All")
					newValues = actualOptions.map((option) => option.value);
				}
			} else {
				// Handle individual option
				if (currentSelectedValues.includes(optionValue)) {
					// Remove from selection
					newValues = currentSelectedValues.filter((val) => val !== optionValue);
				} else {
					// Add to selection
					newValues = [...currentSelectedValues, optionValue];
				}
			}

			// Update state
			if (selectedValues === undefined) {
				setInternalSelectedValues(newValues);
			}

			// Always exclude "All" option from onChange callback - only pass actual option values
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

		// Handle search input change
		const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setSearchValue(newValue);
			onSearchChange?.(newValue);

			// Emit advanced search change for real-time updates
			if (enableAdvancedSearch) {
				emitAdvancedSearchChange(currentSearchTags, newValue);
			}

			// Open/close dropdown based on whether we have matching keys or regular options
			if (enableAdvancedSearch) {
				const hasMatchingKeys = availableKeys.some((key) =>
					key.label.toLowerCase().includes(newValue.toLowerCase())
				);
				setIsOpen(hasMatchingKeys || newValue.length > 0);
			} else {
				const hasMatchingOptions = actualOptions.length > 0;
				setIsOpen(hasMatchingOptions && newValue.length > 0);
			}
		};

		// Handle search input focus
		const handleSearchFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(true);
			setIsOpen(true);

			onFocus?.(e as any);
		};

		// Handle search input blur
		const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
			// Only blur if not clicking inside the popover
			const relatedTarget = e.relatedTarget;
			if (relatedTarget && (relatedTarget as Element).closest('[data-dropdown-menu]')) {
				return; // Don't blur if clicking inside dropdown menu
			}

			// Delay blur slightly to allow click events on menu items
			setTimeout(() => {
				if (!isOpen) {
					setIsFocused(false);

					// Reset scroll position to show the beginning of tags/search
					if (searchTagsContainerRef.current) {
						searchTagsContainerRef.current.scrollLeft = 0;
					}

					onBlur?.(e as any);
				}
			}, 100);
		};

		// Determine the icon to use
		const resolvedIcon = icon;

		// Shortcut Component
		const ShortcutDisplay = () => {
			if (!shortcut) return null;

			return (
				<div className={styles.shortcutDisplay}>
					<span className={styles.shortcutText}>{shortcut}</span>
				</div>
			);
		};

		return (
			<div
				ref={dropdownContainerRef}
				className={classes(styles.dropdown, className)}
				{...props}>
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

				{/* Dropdown Container */}
				{variant === 'search' ? (
					/* Search Variant Container */
					<div
						ref={searchContainerRef}
						className={classes(
							styles.searchContainer,
							styles[actualState],
							styles[size],
							disabled && styles.disabled
						)}>
						{/* Search Icon */}
						<div className={styles.searchIcon}>
							{searchIcon ? React.createElement(searchIcon) : <SearchIcon />}
						</div>

						{/* Combined Tags and Search Input Container with Horizontal Scroll */}
						<div ref={searchTagsContainerRef} className={styles.searchTagsContainer}>
							{/* Existing Tags */}
							{enableAdvancedSearch &&
								currentSearchTags.map((tag) => (
									<Tag
										key={tag.id} // Use stable key to prevent re-rendering
										label={`${tag.key}:`}
										size='sm'
										closable={true}
										textField={true} // Always use textField mode
										inputValue={
											tag.isEditingValue
												? (tag.value ?? '') // When editing, show actual value
												: tag.value || '' // When readonly, show value or "Search" placeholder
										}
										inputPlaceholder={''} // No placeholder needed since we handle display in inputValue
										readOnly={!tag.isEditingValue} // Readonly when not editing
										onClick={
											!tag.isEditingValue
												? () => {
														// Start editing when clicking readonly tag
														const updatedTags = currentSearchTags.map(
															(t) =>
																t.id === tag.id
																	? { ...t, isEditingValue: true }
																	: t
														);
														if (searchTags === undefined) {
															setInternalSearchTags(updatedTags);
														}
														emitAdvancedSearchChange(
															updatedTags,
															searchValue
														);
													}
												: undefined
										}
										onInputChange={(value) => {
											// Only handle changes when editing
											if (tag.isEditingValue) {
												handleTagValueUpdate(tag.id, value);
											}
										}}
										onInputBlur={() => {
											// Handle tag options blur - delay to allow click events on popover
											if (tagOptionsEnabled && tag.isEditingValue) {
												// Don't immediately close - let the click handler manage popover state
												// The handleTagOptionSelect will close it when an option is selected
											}

											// Reset scroll position to show the beginning when losing focus
											if (searchTagsContainerRef.current) {
												searchTagsContainerRef.current.scrollLeft = 0;
											}

											// Only finalize if there's a value, otherwise remove tag
											const currentValue = tag.value?.trim() || '';
											if (currentValue) {
												handleTagValueUpdate(tag.id, currentValue, true);
											} else {
												// Remove empty tag on blur
												handleTagRemove(tag.id);
											}
										}}
										onInputEnter={() => {
											// Only finalize if there's a value, otherwise stay focused
											const currentValue = tag.value?.trim() || '';
											if (currentValue) {
												handleTagValueUpdate(tag.id, currentValue, true);
											}
											// If empty, do nothing - stay in edit mode
										}}
										onInputClear={() => handleTagRemove(tag.id)}
										ref={
											tag.isEditingValue
												? (node: HTMLInputElement | null) => {
														if (node && !disabled && !readOnly) {
															// Focus without selecting text to fix typing issue
															setTimeout(() => {
																try {
																	node.focus();
																	// Position cursor at end instead of selecting all
																	node.setSelectionRange(
																		node.value.length,
																		node.value.length
																	);

																	// Handle tag options focus if enabled
																	if (tagOptionsEnabled) {
																		// Add event listeners for tag options
																		const handleFocus = () =>
																			handleTagOptionsFocus(
																				tag.id,
																				node
																			);

																		// Add keyboard event handler for tag options
																		const handleKeyDown = (
																			e: KeyboardEvent
																		) => {
																			if (
																				e.key === 'Enter' ||
																				e.key === 'Tab' ||
																				e.key ===
																					'Backspace'
																			) {
																				// Close tag options popover on these keys
																				handleTagOptionsPopoverClose();
																			}
																		};

																		node.addEventListener(
																			'focus',
																			handleFocus
																		);
																		node.addEventListener(
																			'keydown',
																			handleKeyDown
																		);

																		// Trigger focus handler immediately
																		handleTagOptionsFocus(
																			tag.id,
																			node
																		);

																		// Cleanup function to remove event listeners
																		return () => {
																			node.removeEventListener(
																				'focus',
																				handleFocus
																			);
																			node.removeEventListener(
																				'keydown',
																				handleKeyDown
																			);
																		};
																	}
																} catch (e) {
																	// Focus might fail, ignore silently
																}
															}, 150);
														}
													}
												: undefined
										}
									/>
								))}

							{/* Search Input - Now inside scrollable container */}
							<TextField
								ref={searchInputRef}
								value={searchValue}
								placeholder={placeholder}
								onChange={(e) => handleSearchChange(e)}
								onFocus={(e) => handleSearchFocus(e as any)}
								onBlur={(e) => handleSearchBlur(e as any)}
								disabled={disabled}
								readOnly={readOnly}
								type='default'
								size='sm'
								leadingIcon={false}
								helpIcon={false}
								label=''
								helperText=''
								required={false}
								className={classes(
									styles.searchInput,
									searchValue && styles.searchInputFilled
								)}
								id={id}
								name={name}
								{...({
									onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
										if (e.key === 'Enter') {
											e.preventDefault();

											// For advanced search - trigger search without creating tags on Enter
											if (enableAdvancedSearch && searchValue) {
												emitAdvancedSearchChange(
													currentSearchTags,
													searchValue
												);
											}

											// Toggle dropdown
											setIsOpen(!isOpen);
										}
										if (e.key === 'Escape') {
											setIsOpen(false);
											searchInputRef.current?.blur();
										}
										// Backspace handling for tag removal
										if (
											e.key === 'Backspace' &&
											enableAdvancedSearch &&
											!searchValue &&
											currentSearchTags.length > 0
										) {
											e.preventDefault();
											// Remove the last tag
											const lastTag =
												currentSearchTags[currentSearchTags.length - 1];
											if (lastTag) {
												handleTagRemove(lastTag.id);
											}
										}
									},
								} as any)}
							/>
						</div>

						{/* Status Icon (Error/Warning) */}
						{showStatusIcon() && (
							<div className={styles.statusIcon}>{getStatusIcon()}</div>
						)}

						{/* Shortcut Display */}
						<ShortcutDisplay />
					</div>
				) : (
					/* Regular Button Variant Container */
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
										{resolvedIcon && (
											<div className={styles.leadingIcon}>
												{React.createElement(resolvedIcon)}
											</div>
										)}

										{/* Multi-select: badge + text, or single select: regular text */}
										{isMultiSelect && currentSelectedValues.length > 0 ? (
											<>
												<Badge
													label={currentSelectedValues.length.toString()}
													variant='badge'
													size='sm'
													className={classes(
														styles.countBadge,
														(disabled || readOnly) &&
															styles.countBadgeDisabled
													)}
													onClose={
														disabled || readOnly
															? () => {} // Show button but make it non-functional when disabled
															: handleClearAll
													}
												/>
												<span
													className={classes(
														styles.dropdownText,
														styles.selectedText
													)}>
													{displayText}
												</span>
											</>
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
											<div className={styles.statusIcon}>
												{getStatusIcon()}
											</div>
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
								styles[size],
								variant === 'borderless' && styles.borderless
							)}
							id={id}
						/>
					</div>
				)}

				{/* Dropdown Menu with Popover */}
				<Popover
					anchorEl={
						variant === 'search'
							? searchContainerRef.current
							: dropdownButtonRef.current
					}
					open={
						isOpen &&
						(enableAdvancedSearch
							? filteredKeys.length > 0
							: enhancedOptions.length > 0)
					}
					setOpen={handlePopoverClose}
					placement='bottom-start'
					theme='light'
					withOverlay={false}
					className={classes(styles.dropdownMenuPopover, popoverClassName)}
					middlewareOptions={{
						offset: popoverOffset ?? 4,
						shift: { padding: 8 },
						flip: { padding: 8 },
					}}>
					<div className={styles.dropdownMenu} data-dropdown-menu>
						{/* Advanced Search: Show filter keys only */}
						{enableAdvancedSearch ? (
							<>
								{/* Filter Header for Advanced Search */}
								<div className={styles.filtersHeader}>
									<div className={styles.filtersTitle}>Filters</div>
								</div>

								{/* Filtered Available Keys */}
								{filteredKeys.map((keyOption) => (
									<div
										key={keyOption.value}
										className={styles.dropdownMenuItem}
										onClick={() => {
											if (disabled || readOnly) return;
											handleKeySelect(keyOption.label);
										}}>
										<div className={styles.dropdownMenuItemInner}>
											<div className={styles.dropdownMenuItemContent}>
												<Badge
													variant='modern'
													size='sm'
													label={`${keyOption.label}:`}
												/>
											</div>
										</div>
									</div>
								))}
							</>
						) : (
							/* Regular Options */
							enhancedOptions.map((option) => {
								// For "All" option, determine its state (checked/indeterminate/unchecked)
								const isOptionSelected =
									option.value === '__all__'
										? isAllSelected
										: isMultiSelect
											? currentSelectedValues.includes(option.value)
											: option.value === displayValue;

								// For "All" option, show indeterminate state when some (but not all) items are selected
								const isIndeterminate =
									option.value === '__all__' &&
									currentSelectedValues.length > 0 &&
									!isAllSelected;

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

												// Update search input for search variant
												if (variant === 'search') {
													setSearchValue(option.label);
												}

												onChange?.(newValue);
												// Close dropdown and clear focus after selection
												setIsOpen(false);
												setIsFocused(false);
											}
										}}>
										<div className={styles.dropdownMenuItemInner}>
											<div className={styles.dropdownMenuItemContent}>
												{/* For multi-select, show checkbox */}
												{isMultiSelect && (
													<div
														className={styles.dropdownMenuItemCheckbox}>
														<Checkbox
															size={size === 'sm' ? 'sm' : 'md'}
															checked={isOptionSelected}
															indeterminate={isIndeterminate}
															onChange={() => {}} // Handled by parent click
															disabled={disabled || readOnly}
														/>
													</div>
												)}

												{/* Option Icon - Only for actual options (not "All") */}
												{option.icon &&
													!isMultiSelect &&
													option.value !== '__all__' && (
														<div
															className={styles.dropdownMenuItemIcon}>
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
									</div>
								);
							})
						)}
					</div>
				</Popover>

				{/* Tag Options Dropdown - Secondary Popover for tag text field options */}
				{tagOptionsEnabled && tagOptions.length > 0 && (
					<Popover
						anchorEl={searchContainerRef.current}
						open={tagOptionsOpen && focusedTagId !== null}
						setOpen={handleTagOptionsPopoverClose}
						placement='bottom-start'
						theme='light'
						withOverlay={false}
						className={classes(styles.dropdownMenuPopover, popoverClassName)}
						middlewareOptions={{
							offset: popoverOffset ?? 4,
							shift: { padding: 8 },
							flip: { padding: 8 },
						}}>
						<div className={styles.dropdownMenu} data-tag-options-menu>
							{/* Tag Options Header */}
							<div className={styles.filtersHeader}>
								<div className={styles.filtersTitle}>Options</div>
							</div>

							{/* Tag Options List */}
							{tagOptions.map((option) => (
								<div
									key={option.value}
									className={styles.dropdownMenuItem}
									onMouseDown={(e) => {
										// Prevent input blur when clicking on option
										e.preventDefault();
									}}
									onClick={(e) => {
										if (disabled || readOnly) return;
										e.stopPropagation(); // Prevent event bubbling
										handleTagOptionSelect(option.value);
									}}>
									<div className={styles.dropdownMenuItemInner}>
										<div className={styles.dropdownMenuItemContent}>
											{/* Option Icon */}
											{option.icon && (
												<div className={styles.dropdownMenuItemIcon}>
													{React.createElement(option.icon)}
												</div>
											)}
											<span className={styles.dropdownMenuItemText}>
												{option.label}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</Popover>
				)}

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
