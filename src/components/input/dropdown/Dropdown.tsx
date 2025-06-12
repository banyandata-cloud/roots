import {
	FloatingFocusManager,
	autoUpdate,
	flip,
	offset,
	shift,
	size,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useListNavigation,
	useRole,
} from '@floating-ui/react-dom-interactions';
import { motion } from 'framer-motion';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
	type HTMLAttributes,
	type ReactElement,
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { classes } from '../../../utils';
import Button from '../../buttons/button/Button';
import { ErrorBoundaryWrapper } from '../../errorBoundary';
import { CaretIcon, InfoIcon } from '../../icons';
import { SelectAllIcon } from '../../icons/SelectAll';
import Popper from '../../popper/Popper';
import { Tooltip } from '../../tooltip';
import styles from './Dropdown.module.css';

interface DropdownProps {
	className?: string;
	popperClassName?: string;
	value?: string | string[];
	onChange?: (event: React.SyntheticEvent, value: string | string[]) => void;
	leftComponent?:
		| React.ComponentType
		| { Active: React.ComponentType; InActive: React.ComponentType };
	onBlur?: (event: React.FocusEvent) => void;
	children?: React.ReactNode;
	highlightOnSelect?: boolean;
	label?: string;
	placeholder?: string | React.ReactNode;
	multi?: boolean;
	disabled?: boolean;
	error?: string;
	id?: string;
	name?: string;
	feedback?: {
		text?: React.ReactNode;
		type?: 'error' | 'success' | 'default';
	};
	formatter?: (totalSelected: number) => string;
	custom?: boolean;
	required?: boolean;
	multiSelectActionTitle?: string;
	valueAsCount?: boolean;
	caretAsUpDown?: boolean;
}

interface DropdownRef {
	value: () => string | string[] | null;
}

interface SelectedOption {
	title?: string;
	value?: string;
}

// eslint-disable-next-line prefer-arrow-callback
const Dropdown = forwardRef<DropdownRef, DropdownProps>(function Dropdown(props, inputRef) {
	const {
		className = '',
		popperClassName = '',
		value,
		onChange,
		leftComponent: LeftComponent,
		onBlur,
		children,
		highlightOnSelect,
		label,
		placeholder = 'Select an option',
		multi,
		disabled,
		error,
		id,
		name,
		feedback,
		formatter = (totalSelected) => {
			return `${totalSelected.toString()} options applied`;
		},
		custom,
		required,
		multiSelectActionTitle,
		valueAsCount,
		caretAsUpDown,
	} = props;
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const listItemsRef = useRef<(HTMLElement | null)[]>([]);
	const multiOptionsRef = useRef<HTMLLIElement>(null);

	const isControlled = value !== undefined;

	// for uncontrolled input
	const [uncontrolledValue, setUncontrolledValue] = useState<string | string[] | undefined>(
		value
	);
	const [appliedMultiUncontrolledValue, setAppliedMultiUncontrolledValue] = useState<
		string[] | null
	>(null);

	const { x, y, reference, floating, strategy, context } = useFloating({
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(5),
			flip({
				padding: 8,
			}),
			shift({
				padding: 8,
			}),
			size({
				apply({ rects, availableHeight, elements }) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width.toString()}px`,
						minWidth: 'fit-content',
						maxHeight: `${availableHeight.toString()}px`,
					});
				},
				padding: 8,
			}),
		],
	});

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
		useClick(context, {
			enabled: !disabled && !error,
		}),
		useRole(context, {
			role: 'listbox',
		}),
		useListNavigation(context, {
			listRef: listItemsRef,
			activeIndex,
			selectedIndex,
			onNavigate: setActiveIndex,
		}),
		useDismiss(context),
	]);

	const onSelect = (child: React.ReactElement, selected: boolean) => {
		return (event: React.MouseEvent) => {
			if (event.currentTarget.getAttribute('data-elem') !== 'dropdown-item') {
				return;
			}
			const { value: itemValue } = (child as React.ReactElement<{ value: string }>).props;
			const itemValueString = itemValue.toString();
			const index = event.currentTarget.getAttribute('data-index');

			// to support form libraries which require name and value on the event
			const { nativeEvent } = event;
			const clonedEvent = new MouseEvent(nativeEvent.type, nativeEvent as MouseEventInit);

			Object.defineProperty(clonedEvent, 'target', {
				writable: true,
				value: {
					value: itemValueString,
					name,
				},
			});

			setSelectedIndex(parseInt(index ?? '0', 10));

			if (multi) {
				if (selected) {
					setUncontrolledValue(
						(uncontrolledValue as string[]).filter((val) => {
							return val !== itemValueString;
						})
					);
				} else {
					setUncontrolledValue([
						...((uncontrolledValue ?? []) as string[]),
						itemValueString,
					]);
				}
				setActiveIndex(parseInt(index ?? '0', 10));
			} else {
				if (isControlled) {
					onChange?.(event, itemValueString.toString());
				} else {
					setUncontrolledValue(itemValueString.toString());
				}
				setActiveIndex(null);
				setOpen(false);
			}
		};
	};

	const onNavigate = (child: React.ReactElement, selected: boolean) => {
		return (event: React.KeyboardEvent) => {
			const selectKey = [' ', 'Spacebar', 'Enter'].includes(event.key);
			if (selectKey) {
				event.stopPropagation();
				onSelect(child, selected)(event as unknown as React.MouseEvent);
			}
		};
	};

	useImperativeHandle(inputRef, () => {
		return {
			value: () => {
				const inputElement = (inputRef as unknown as React.RefObject<HTMLInputElement>)
					.current;
				const inputValue = (inputElement.value || '').split(', ');
				if (multi) {
					return inputValue;
				}
				return inputValue[0] ?? null;
			},
		};
	}, [inputRef, multi]);

	const childrenArray = React.Children.toArray(children);

	interface DropdownChildProps {
		value: string | number;
		title?: string;
	}

	const selectedOptions = useMemo<SelectedOption[]>(() => {
		let inputValue = uncontrolledValue;
		if (isControlled && !multi) {
			inputValue = value;
		}
		const options: SelectedOption[] = [];
		if (inputValue != null && inputValue !== '') {
			childrenArray.forEach((child) => {
				if (!React.isValidElement(child)) return;

				const childProps = child.props as DropdownChildProps;
				const childValueString = childProps.value.toString();

				if (
					(multi && (inputValue as string[]).includes(childValueString)) ||
					(!multi && inputValue.toString() === childValueString)
				) {
					options.push({
						title: childProps.title ?? '',
						value: childValueString,
					});
				}
			});
		}
		return options;
	}, [value, uncontrolledValue, multi, childrenArray, isControlled]);

	const items = childrenArray.map((child, index) => {
		if (!React.isValidElement(child)) return child;

		let selected = false;

		if (
			selectedOptions.findIndex((option) => {
				return (
					option.value ===
					String((child as React.ReactElement<{ value: string }>).props.value)
				);
			}) !== -1
		) {
			selected = true;
		}

		return React.cloneElement(
			child as ReactElement,
			{
				'data-index': index,
				...getItemProps({
					key: (child as React.ReactElement<{ value: string | number }>).props.value,
					onKeyDown: onNavigate(child, selected),
					onClick: onSelect(child, selected),
					onMouseEnter: () => {
						setActiveIndex(index);
					},
					selected,
					tabIndex: activeIndex === index ? 0 : -1,
					ref: (node: HTMLElement | null) => {
						listItemsRef.current[index] = node;
					},
				}),
			} as Record<string, unknown>
		);
	});

	const [pointer, setPointer] = useState(false);

	if (!open && pointer) {
		setPointer(false);
	}

	useLayoutEffect(() => {
		if (open && activeIndex != null && !pointer) {
			requestAnimationFrame(() => {
				listItemsRef.current[activeIndex]?.scrollIntoView({
					block: 'nearest',
				});
			});
		}
	}, [open, activeIndex, pointer]);

	useEffect(() => {
		if (multi && isControlled) {
			setUncontrolledValue(value);
		}
	}, [open, multi, value, isControlled]);

	const onSelectAll = (event: React.MouseEvent, selected: boolean) => {
		// to support form libraries which require name and value on the event
		const nativeEvent =
			'nativeEvent' in event ? (event as React.SyntheticEvent).nativeEvent : event;
		const clonedEvent = new (nativeEvent.constructor as new (
			type: string,
			eventInitDict?: EventInit
		) => Event)(nativeEvent.type, nativeEvent);

		let itemValue: string[] = [];

		if (selected) {
			itemValue = childrenArray
				.filter((child): child is React.ReactElement<{ value: string | number }> => {
					return React.isValidElement(child);
				})
				.map((child) => {
					return String(child.props.value);
				});
		}

		Object.defineProperty(clonedEvent, 'target', {
			writable: true,
			value: {
				value: itemValue,
				name,
			},
		});

		setUncontrolledValue(itemValue);

		setActiveIndex(0);
	};

	const onApply = (event: React.MouseEvent) => {
		const customEvent = {
			...event,
			target: {
				value: uncontrolledValue,
				name,
			},
		} as unknown as React.ChangeEvent<HTMLInputElement>;

		if (!isControlled) {
			setAppliedMultiUncontrolledValue(uncontrolledValue as string[]);
			onChange?.(customEvent, appliedMultiUncontrolledValue ?? []);
			return;
		}

		onChange?.(customEvent, uncontrolledValue as string[]);
	};

	let selectedItemsLabel = null;

	if (selectedOptions.length === 1) {
		selectedItemsLabel = '1 option selected';
	} else {
		selectedItemsLabel = `${selectedOptions.length.toString()} options selected`;
	}

	const getValueToDisplay = (): string | React.ReactNode => {
		if (value) {
			if (Array.isArray(value) && value.length > 0) {
				const sanitizedValue = value.filter(Boolean);

				console.log('sanitizedValue', sanitizedValue);
				console.log('sanitizedValue Length', sanitizedValue.length);
				console.log('valueAsCount', valueAsCount);

				if (sanitizedValue.length === 0) {
					return '';
				}
				if (sanitizedValue.length === 1 && !valueAsCount) {
					const selectedItem = items.find((item) => {
						return (
							React.isValidElement(item) &&
							React.isValidElement<{ value: string | number }>(item) &&
							item.props.value === sanitizedValue[0]
						);
					});
					if (React.isValidElement<{ title?: React.ReactNode }>(selectedItem)) {
						return selectedItem.props.title;
					}
					return '';
				}
				return formatter(sanitizedValue.length);
			}

			const selectedItem = items.find((item) => {
				return (
					React.isValidElement(item) &&
					String((item.props as { value: string | number }).value) === String(value)
				);
			});
			if (React.isValidElement(selectedItem)) {
				return (selectedItem.props as { title: string | React.ReactNode }).title;
			}
			return '';
		}
		if (
			!isControlled &&
			appliedMultiUncontrolledValue &&
			appliedMultiUncontrolledValue.length > 0
		) {
			if (appliedMultiUncontrolledValue.length === 1) {
				const selectedItem = items.find((item) => {
					return (
						React.isValidElement(item) &&
						item.props.value == appliedMultiUncontrolledValue[0]
					);
				});
				return (selectedItem as React.ReactElement)?.props?.title;
			}
			return formatter(appliedMultiUncontrolledValue.length);
		}
		if (!isControlled) {
			const selectedItem = items.find((item) => {
				return React.isValidElement(item) && item.props.value == uncontrolledValue;
			});
			return (selectedItem as React.ReactElement)?.props?.title;
		}
		return '';
	};

	const getLeftComponent = (): React.ReactNode => {
		if (LeftComponent) {
			if ('Active' in LeftComponent && 'InActive' in LeftComponent) {
				if (highlightOnSelect && Array.isArray(value) && value.length > 0) {
					return <LeftComponent.Active />;
				}

				return <LeftComponent.InActive />;
			}
			return <LeftComponent />;
		}
		return null;
	};

	return (
		<ErrorBoundary
			FallbackComponent={(args) => {
				return (
					<ErrorBoundaryWrapper
						{...args}
						className={styles['error-boundary'] ?? ''}
						custom={custom}
					/>
				);
			}}>
			<div
				className={classes(
					styles.root,
					open ? styles.open : '',
					disabled || error ? styles.disabled : '',
					className
				)}>
				{label && (
					<div
						data-elem='label'
						className={classes(styles.label, required ? styles.required : '')}>
						<span>{label}</span>
					</div>
				)}
				<div
					data-elem='header'
					className={classes(
						styles.header,
						error ? styles.error : ' ',
						open ? styles.open : '',
						(Array.isArray(value) ? value.length > 0 : !!value) && highlightOnSelect
							? styles.highlightOnSelect
							: ''
					)}
					ref={reference}
					{...getReferenceProps()}>
					<input
						id={id}
						name={name}
						ref={inputRef as React.Ref<HTMLInputElement>}
						disabled={disabled}
						tabIndex={0}
						className={styles.input}
						onKeyDown={(event) => {
							const validKey = [' ', 'Spacebar', 'Enter'].includes(event.key);
							if (validKey) {
								setOpen(true);
							}
						}}
						onBlur={onBlur}
						value={selectedOptions
							.map((option) => {
								return option.value;
							})
							.join(', ')}
					/>
					<div
						data-elem='select'
						role='button'
						className={classes(
							styles.select,
							feedback != null ? styles[`feedback-${feedback.type ?? ''}`] : ''
						)}>
						{getLeftComponent()}
						{(() => {
							if (typeof placeholder === 'string' || placeholder instanceof String) {
								const valueToDisplay = getValueToDisplay();
								if (valueToDisplay) {
									return <span data-elem='value'>{valueToDisplay}</span>;
								}
								if (placeholder) {
									return (
										<span
											data-elem='placeholder'
											className={styles.placeholder}>
											{placeholder}
										</span>
									);
								}
							} else {
								return <div data-elem='placeholder'>{placeholder}</div>;
							}
							return null;
						})()}

						<div className={styles['icon-bundle']}>
							{error && (
								<Tooltip
									content={error}
									position='top'
									className={styles.tooltip}
									variant='light'>
									<span className={styles.span}>
										<InfoIcon className={styles['info-icon']} />
									</span>
								</Tooltip>
							)}
							{caretAsUpDown ? (
								<CaretIcon
									className={classes(
										styles['caret-icon-upDown'],
										open ? styles.open : ''
									)}
									upDown
								/>
							) : (
								<CaretIcon
									data-elem='icon'
									className={classes(
										styles['caret-icon'],
										open ? styles.open : ''
									)}
								/>
							)}
						</div>
					</div>
				</div>
				<Popper open={open} wrapperId='dropdown-popper'>
					{open && (
						<FloatingFocusManager context={context} initialFocus={-1} modal={false}>
							<motion.ul
								{...getFloatingProps({
									...({
										'data-elem': 'body',
									} as Record<'data-elem', string>),

									role: 'group',
									ref: floating,
									onKeyDown(event: React.KeyboardEvent) {
										setPointer(false);
										if (event.key === 'Tab' && !multi) {
											setOpen(false);
										}
									},
									onPointerMove() {
										setPointer(true);
									},
									style: {
										position: strategy,
										top: y ?? 0,
										left: x ?? 0,
									},
									className: classes(
										styles.body,
										styles.open,
										multi ? styles.multi : '',
										popperClassName
									),
								})}
								initial={{
									opacity: 0,
									scale: 0,
								}}
								animate={{
									opacity: 1,
									scale: 1,
								}}>
								{multi && (
									<li
										ref={multiOptionsRef}
										className={styles['multi-options']}
										tabIndex={-1}>
										<Button
											className={styles.button}
											blurOnClick={false}
											title='Select All'
											variant='contained'
											type='button'
											leftComponent={() => {
												return (
													<SelectAllIcon
														className={styles.icon}
														position='left'
													/>
												);
											}}
											onClick={(
												event: React.MouseEvent<HTMLButtonElement>
											) => {
												event.stopPropagation();
												multiOptionsRef.current?.focus();
												onSelectAll(event, true);
											}}
										/>
										{selectedOptions.length > 0 && (
											<span className={styles.items}>
												{selectedItemsLabel}
											</span>
										)}
									</li>
								)}
								{items}
								{multi && (
									<div className={styles.footer}>
										<Button
											className={styles['multi-clear']}
											blurOnClick={false}
											title='Clear All'
											size='auto'
											disabled={selectedOptions.length === 0}
											onClick={(
												event: React.MouseEvent<HTMLButtonElement>
											) => {
												event.stopPropagation();
												multiOptionsRef.current?.focus();
												onSelectAll(event, false);
											}}
										/>
										<Button
											className={styles['multi-apply']}
											title={multiSelectActionTitle ?? 'Apply'}
											size='auto'
											onClick={onApply}
										/>
									</div>
								)}
							</motion.ul>
						</FloatingFocusManager>
					)}
				</Popper>
			</div>
		</ErrorBoundary>
	);
});

export default Dropdown;
