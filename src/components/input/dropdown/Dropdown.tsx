/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
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
	ReactNode,
	ReactElement,
	SyntheticEvent,
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
	leftComponent?:
		| {
				Active?: React.ComponentType;
				InActive?: React.ComponentType;
		  }
		| React.ComponentType;
	onBlur?: (event: SyntheticEvent) => void;
	children?: ReactNode;
	highlightOnSelect?: boolean;
	label?: string;
	placeholder?: string | ReactNode;
	multi?: boolean;
	disabled?: boolean;
	error?: string;
	id?: string;
	name?: string;
	feedback?: {
		text: ReactNode;
		type: 'error' | 'success' | 'default';
	};
	formatter?: (totalSelected: number) => string;
	custom?: boolean;
	required?: boolean;
	multiSelectActionTitle?: string;
	valueAsCount?: boolean;
	caretAsUpDown?: boolean;
	onChange?: (event: React.SyntheticEvent, value: string | string[]) => void;
}

interface DropdownRef {
	value: () => string | string[] | null;
}

interface DropdownItemProps {
	value: string | number;
	title?: ReactNode;
}

interface LeftComponentProps {
	Active?: React.ComponentType;
	InActive?: React.ComponentType;
}

const Dropdown = forwardRef<DropdownRef, DropdownProps>(function Dropdown(
	props,
	inputRef
): ReactElement {
	const {
		className = '',
		popperClassName = '',
		value,
		onChange = () => {},
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
			return `${totalSelected} options applied`;
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
	const listItemsRef = useRef<Array<HTMLElement | null>>([]);
	const multiOptionsRef = useRef<HTMLLIElement>(null);
	const internalInputRef = useRef<HTMLInputElement>(null);

	const isControlled = value !== undefined;

	// for uncontrolled input
	const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(multi ? [] : '');
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
						width: `${rects.reference.width}px`,
						minWidth: 'fit-content',
						maxHeight: `${availableHeight}px`,
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

	const onNavigate = (child: ReactElement<DropdownItemProps>, selected: boolean) => {
		return (event: React.KeyboardEvent<HTMLElement>): void => {
			const selectKey = [' ', 'Spacebar', 'Enter'].includes(event.key);
			if (selectKey) {
				event.stopPropagation();
				// Create a synthetic mouse event from the keyboard event
				const mouseEvent = {
					...event,
					nativeEvent: new MouseEvent('click'),
					currentTarget: event.currentTarget,
					target: event.target,
					preventDefault: () => event.preventDefault(),
					stopPropagation: () => event.stopPropagation(),
					isDefaultPrevented: () => event.isDefaultPrevented(),
					isPropagationStopped: () => event.isPropagationStopped(),
					persist: () => {},
				} as unknown as React.MouseEvent<HTMLElement>;

				onSelect(child, selected)(mouseEvent);
			}
		};
	};

	const onSelect = (child: ReactElement<DropdownItemProps>, selected: boolean) => {
		return (event: React.MouseEvent<HTMLElement>):void => {
			if (event.currentTarget.getAttribute('data-elem') !== 'dropdown-item') {
				return;
			}

			const { value: itemValue } = child.props;
			const itemValueString = itemValue?.toString() ?? '';
			const index = event.currentTarget.getAttribute('data-index');

			interface CustomEventTarget extends EventTarget {
				value: string;
				name?: string;
			}

			const customTarget: CustomEventTarget = {
				...(event.target as EventTarget),
				value: itemValueString,
				name,
			};

			const syntheticEvent: React.SyntheticEvent = {
				...event,
				nativeEvent: event.nativeEvent || event,
				currentTarget: event.currentTarget,
				target: customTarget,
				preventDefault: () => event.preventDefault(),
				stopPropagation: () => event.stopPropagation(),
				isDefaultPrevented: () => event.isDefaultPrevented(),
				isPropagationStopped: () => event.isPropagationStopped(),
				persist: () => {},
			};

			setSelectedIndex(parseInt(index ?? '0', 10));

			if (multi) {
				setUncontrolledValue((prev) => {
					const currentValues = (prev ?? []) as string[];
					return selected
						? currentValues.filter((val) => val !== itemValueString)
						: [...currentValues, itemValueString];
				});
				setActiveIndex(parseInt(index ?? '0', 10));
			} else {
				if (isControlled) {
					onChange?.(syntheticEvent, itemValueString);
				} else {
					setUncontrolledValue(itemValueString);
				}
				setActiveIndex(null);
				setOpen(false);
			}
		};
	};

	useImperativeHandle(
		inputRef,
		() => {
			return {
				value: () => {
					const inputValue = internalInputRef.current?.value?.split?.(', ') ?? [];
					if (multi) {
						return inputValue;
					}
					return inputValue?.[0] ?? null;
				},
			};
		},
		[multi]
	);

	const childrenArray = React.Children.toArray(children) as ReactElement<DropdownItemProps>[];

	const selectedOptions = useMemo(() => {
		let inputValue = uncontrolledValue;
		if (isControlled && !multi) {
			inputValue = value;
		}
		const options: Array<{ title?: ReactNode; value?: string }> = [];
		if (inputValue != null && inputValue !== '') {
			childrenArray?.forEach((child) => {
				if (
					(multi &&
						((inputValue as string[])?.indexOf?.(child?.props?.value?.toString?.()) ??
							-1) !== -1) ||
					(!multi && inputValue?.toString() === child?.props?.value?.toString?.())
				) {
					options.push({
						title: child?.props?.title,
						value: child?.props?.value?.toString?.(),
					});
				}
			});
		}
		return options;
	}, [value, uncontrolledValue, multi, childrenArray, isControlled]);

	const items = childrenArray.map((child, index) => {
		let selected = false;

		if (
			selectedOptions.findIndex((option) => {
				return option.value === child.props.value?.toString();
			}) !== -1
		) {
			selected = true;
		}

		return React.cloneElement(child, {
			...getItemProps({
				key: child.props.value?.toString(),
				onKeyDown: onNavigate(child, selected),
				onClick: onSelect(child, selected),
				onMouseEnter: () => {
					setActiveIndex(index);
				},
				selected,
				tabIndex: activeIndex === index ? 0 : -1,
				ref: (node) => {
					listItemsRef.current[index] = node;
				},
				// Properly typed data attributes
				['data-index']: index.toString(),
				['data-elem']: 'dropdown-item',
			} as React.HTMLAttributes<HTMLElement> & {
				'data-index': string;
				'data-elem': string;
				selected: boolean;
			}),
		});
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
			setUncontrolledValue(value as string[]);
		}
	}, [open, multi, value, isControlled]);

	const onSelectAll = (event: React.MouseEvent, selected: boolean):void => {
		// to support form libraries which require name and value on the event
		const nativeEvent = event.nativeEvent || event;
		const clonedEvent = new InputEvent(nativeEvent.type, nativeEvent);
		// const clonedEvent = new Event(nativeEvent.type, nativeEvent);
		let itemValue: string[] = [];

		if (selected) {
			itemValue = childrenArray.map((child) => {
				return child?.props?.value?.toString?.();
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

	const onApply = (event: React.MouseEvent<HTMLElement>):void => {
		// Create a proper React synthetic event instead of cloning
		const syntheticEvent = {
			...event,
			nativeEvent: event.nativeEvent || event,
			currentTarget: event.currentTarget,
			target: {
				...(event.target as any), // We need to override these
				value: uncontrolledValue,
				name,
			},
			preventDefault: () => event.preventDefault(),
			stopPropagation: () => event.stopPropagation(),
			isDefaultPrevented: () => event.isDefaultPrevented(),
			isPropagationStopped: () => event.isPropagationStopped(),
			persist: () => {},
		} as React.SyntheticEvent;

		if (!isControlled) {
			setAppliedMultiUncontrolledValue(uncontrolledValue as string[]);
			onChange?.(syntheticEvent, appliedMultiUncontrolledValue || []);
		} else {
			onChange?.(syntheticEvent, uncontrolledValue);
		}
	};

	let selectedItemsLabel: string | null = null;

	if (selectedOptions?.length === 1) {
		selectedItemsLabel = '1 option selected';
	} else {
		selectedItemsLabel = `${selectedOptions?.length} options selected`;
	}

	const getValueToDisplay = (): string| ReactNode => {
		if (value) {
			if (Array.isArray(value) && value.length > 0) {
				const sanitizedValue = value.filter(Boolean);
				if (sanitizedValue.length === 0) {
					return '';
				}
				if (sanitizedValue.length === 1 && !valueAsCount) {
					const selectedItem = items?.find((item) => {
						return item.props.value == sanitizedValue[0];
					});
					return selectedItem?.props?.title;
				}
				return formatter(sanitizedValue.length);
			}
			const selectedItem = items?.find((item) => {
				return item.props.value == value;
			});
			return selectedItem?.props?.title;
		}
		if (
			!isControlled &&
			appliedMultiUncontrolledValue &&
			appliedMultiUncontrolledValue.length > 0
		) {
			if (appliedMultiUncontrolledValue?.length === 1) {
				const selectedItem = items?.find((item) => {
					return item.props.value == appliedMultiUncontrolledValue[0];
				});
				return selectedItem?.props?.title;
			}
			return formatter(appliedMultiUncontrolledValue.length);
		}
		if (!isControlled) {
			const selectedItem = items?.find((item) => {
				return item.props.value == uncontrolledValue;
			});
			return selectedItem?.props?.title;
		}
		return '';
	};

	const getLeftComponent = () => {
		if (!LeftComponent) return null;

		if (isLeftComponentObject(LeftComponent)) {
			// Handle object case
		} else {
			// Handle component case
		}
	};

	// Type guard function
	function isLeftComponentObject(
		component: React.ComponentType | LeftComponentProps
	): component is LeftComponentProps {
		return typeof component === 'object' && ('Active' in component || 'InActive' in component);
	}

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
						ref={internalInputRef}
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
							?.map((option) => {
								return option?.value;
							})
							?.join(', ')}
					/>
					<div
						data-elem='select'
						role='button'
						className={classes(
							styles.select,
							feedback != null ? styles[`feedback-${feedback?.type}`] : ''
						)}>
						{getLeftComponent()}
						{typeof placeholder === 'string' || placeholder instanceof String ? (
							getValueToDisplay() ? (
								<span data-elem='value'>{getValueToDisplay()}</span>
							) : (
								placeholder && (
									<span data-elem='placeholder' className={styles.placeholder}>
										{placeholder}
									</span>
								)
							)
						) : (
							<div data-elem='placeholder'>{placeholder}</div>
						)}

						<div className={styles['icon-bundle']}>
							{error && (
								<Tooltip
									content={error ?? ''}
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
									'data-elem': 'body',
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
										open ? styles.open : '',
										multi ? styles.multi : '',
										popperClassName
									),
								} as React.HTMLAttributes<HTMLUListElement>)}
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
											onClick={(event) => {
												event.stopPropagation();
												multiOptionsRef?.current?.focus();
												onSelectAll(event, true);
											}}
										/>
										{selectedOptions?.length > 0 && (
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
											disabled={selectedOptions?.length === 0}
											onClick={(event) => {
												event.stopPropagation();
												multiOptionsRef?.current?.focus();
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
