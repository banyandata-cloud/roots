/* eslint-disable eqeqeq */
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
	type KeyboardEvent,
	type ReactElement,
	type ReactNode,
	type SyntheticEvent,
} from 'react';
import { classes } from '../../../utils';
import Button from '../../buttons/button/Button';
import { CaretIcon, InfoIcon } from '../../icons';
import { SelectAllIcon } from '../../icons/SelectAll';
import Popper from '../../popper/Popper';
import { Tooltip } from '../../tooltip';
import { TextFieldv2 } from '../textField';
import styles from './Dropdown.module.css';
import type { DropdownItemProps } from './dropdown-item/types';
import { Dropdownv3 } from './v2';

type FeedbackType = 'success' | 'warning' | 'info' | 'error';
interface Feedback {
	type: FeedbackType;
	message?: string;
}

type LeftComponentWithVariants =
	| React.ComponentType
	| {
			Active?: React.ComponentType;
			InActive?: React.ComponentType;
	  };

export interface DropdownProps {
	className?: string | undefined;
	popperClassName?: string | undefined;

	/** Controlled value: string for single, string[] for multi. Omit for uncontrolled */
	value?: string | string[];

	onChange: (event: SyntheticEvent, value: string | string[] | null | undefined) => void;

	leftComponent?: LeftComponentWithVariants;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

	/** Children must be DropdownItem elements */
	children?: ReactNode;

	highlightOnSelect?: boolean;
	label?: string;
	placeholder?: ReactNode;
	multi?: boolean;
	disabled?: boolean;
	/** string shows tooltip + error state; boolean acts as a flag only */
	error?: string | boolean;
	id?: string;
	name?: string;
	feedback?: Feedback;

	/** Format the summary text when multiple values are selected */
	formatter?: (totalSelected: number) => ReactNode;

	required?: boolean;
	multiSelectActionTitle?: string;

	/** When true, always show count for a single selected value in multi mode */
	valueAsCount?: boolean;

	/** Show caret as up/down variant */
	caretAsUpDown?: boolean;
	search?: {
		placeholder: string;
		value: string | number;
		onChange: (value: string | number) => void;
	};
	hideValueOnSelect?: boolean;

	v2?: boolean;
}

/** What parent components can call on the ref */
export interface DropdownRef {
	value: () => string | string[] | null;
}

// Helper to narrow children to DropdownItem elements
type DropdownItemElement = ReactElement<DropdownItemProps>;

// eslint-disable-next-line prefer-arrow-callback
const Dropdown = forwardRef<DropdownRef, DropdownProps>(function Dropdown(props, ref) {
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
		formatter = (totalSelected: number) => {
			return `${totalSelected.toString()} options applied`;
		},
		required,
		multiSelectActionTitle,
		valueAsCount,
		caretAsUpDown,
		search,
		hideValueOnSelect,
		v2 = false,
	} = props;

	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
	const multiOptionsRef = useRef<HTMLLIElement | null>(null);

	// Internal input ref; expose only "value()" via DropdownRef
	const inputElRef = useRef<HTMLInputElement>(null);

	const isControlled = value !== undefined;

	// For uncontrolled input
	const [uncontrolledValue, setUncontrolledValue] = useState<
		string | string[] | null | undefined
	>(value);
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

	// Expose the imperative value() API to parent via ref
	useImperativeHandle(ref, () => {
		return {
			value: () => {
				const raw = inputElRef.current?.value ?? '';
				const parts = raw ? raw.split(', ') : [];
				if (multi) return parts;
				return parts[0] ?? null;
			},
		};
	}, [multi]);

	const childrenArray = React.Children.toArray(children) as DropdownItemElement[];

	const selectedOptions = useMemo(() => {
		let inputValue = uncontrolledValue;
		if (isControlled && !multi) {
			inputValue = value;
		}
		const options: { title: ReactNode; value: string }[] = [];
		if (inputValue != null && inputValue !== '') {
			childrenArray.forEach((child) => {
				const childVal = child.props.value?.toString() ?? '';
				if (
					(multi && (inputValue as string[]).includes(childVal)) ||
					(!multi && (inputValue as string) === childVal)
				) {
					options.push({
						title: child.props.title,
						value: childVal,
					});
				}
			});
		}
		return options;
	}, [value, uncontrolledValue, multi, childrenArray, isControlled]);

	const onSelect = (child: DropdownItemElement, selected: boolean) => {
		return (event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => {
			// Guard: only react to real dropdown items
			const { elem, index: indexAttr } = (event.currentTarget as HTMLLIElement).dataset;
			if (elem !== 'dropdown-item') return;

			const itemValue = child.props.value;
			const itemValueString = itemValue?.toString() ?? null;
			const index = Number(indexAttr ?? '0');

			// Clone native event and graft minimal target for form libs
			const nativeEvent = event.nativeEvent as Event;
			const Ctor = nativeEvent.constructor as new (
				type: string,
				eventInitDict?: EventInit
			) => Event;
			const clonedEvent: Event = new Ctor(
				nativeEvent.type,
				nativeEvent as unknown as EventInit
			);

			Object.defineProperty(clonedEvent, 'target', {
				writable: true,
				value: {
					value: itemValueString,
					name,
				},
			});

			setSelectedIndex(index);

			if (multi) {
				if (selected) {
					// remove the value
					setUncontrolledValue((prev) => {
						const prevArr = Array.isArray(prev) ? prev : [];
						return prevArr.filter((val) => {
							return val !== itemValueString;
						});
					});
				} else {
					// add the value (dedupe)
					setUncontrolledValue((prev) => {
						const prevArr = Array.isArray(prev) ? prev : [];
						const next =
							itemValueString == null ? prevArr : [...prevArr, itemValueString];
						// optional: dedupe
						return Array.from(new Set(next));
					});
				}
				setActiveIndex(index);
			} else {
				if (isControlled) {
					onChange(clonedEvent as unknown as React.SyntheticEvent, itemValueString);
				} else {
					setUncontrolledValue(itemValueString);
				}
				setActiveIndex(null);
				setOpen(false);
			}
		};
	};

	const onNavigate = (child: DropdownItemElement, selected: boolean) => {
		return (event: React.KeyboardEvent<HTMLLIElement>) => {
			const selectKey = [' ', 'Spacebar', 'Enter'].includes(event.key);
			if (selectKey) {
				event.stopPropagation();
				onSelect(child, selected)(event);
			}
		};
	};

	const items = childrenArray.map((child, index) => {
		let isSelected = false;
		if (
			selectedOptions.findIndex((o) => {
				return o.value === child.props.value?.toString();
			}) !== -1
		) {
			isSelected = true;
		}

		return React.cloneElement(child, {
			...getItemProps({
				key: child.props.value,
				onKeyDown: onNavigate(child, isSelected),
				onClick: (event: React.MouseEvent<HTMLLIElement>) => {
					onSelect(child, isSelected)(event);
				},
				onMouseEnter: () => {
					setActiveIndex(index);
				},
				...(child.props.dataAttrs ?? {}),
				selected: isSelected,
				tabIndex: activeIndex === index ? 0 : -1,
				ref: (node: HTMLLIElement | null) => {
					listItemsRef.current[index] = node;
				},
			}),
		});
	});

	const [pointer, setPointer] = useState(false);
	if (!open && pointer) setPointer(false);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, multi, value]);

	if (v2) {
		return <Dropdownv3 {...props} />;
	}

	const onSelectAll = (event: React.MouseEvent<HTMLElement>, selected: boolean) => {
		const nativeEvent = event.nativeEvent as Event;

		const Ctor = nativeEvent.constructor as new (
			type: string,
			eventInitDict?: EventInit
		) => Event;

		const clonedEvent: Event = new Ctor(nativeEvent.type, nativeEvent as unknown as EventInit);

		let itemValue: string[] = [];
		if (selected) {
			itemValue = childrenArray.map((child) => {
				return child.props.value?.toString() ?? '';
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

	const onApply = (event: React.MouseEvent<HTMLElement>) => {
		const nativeEvent = event.nativeEvent as Event;
		const Ctor = nativeEvent.constructor as new (type: string, init?: EventInit) => Event;

		const clonedEvent: Event = new Ctor(nativeEvent.type, nativeEvent);

		Object.defineProperty(clonedEvent, 'target', {
			writable: true,
			value: {
				value: uncontrolledValue,
				name,
			},
		});

		if (!isControlled) {
			setAppliedMultiUncontrolledValue(uncontrolledValue as string[] | null);
			onChange(event, appliedMultiUncontrolledValue);
			return;
		}

		onChange(event, uncontrolledValue);
	};

	let selectedItemsLabel: string | null = null;
	selectedItemsLabel =
		selectedOptions.length === 1
			? '1 option selected'
			: `${selectedOptions.length.toString()} options selected`;

	const getValueToDisplay = (): ReactNode => {
		if (value) {
			if (Array.isArray(value) && value.length > 0) {
				const sanitized = value.filter(Boolean);
				if (sanitized.length === 0) return '';
				if (sanitized.length === 1 && !valueAsCount) {
					const selectedItem = items.find((i) => {
						return i.props.value == sanitized[0];
					});
					return selectedItem?.props.title;
				}
				return formatter(sanitized.length);
			}
			const selectedItem = items.find((i) => {
				return i.props.value == value;
			});
			return selectedItem?.props.title;
		}
		if (
			!isControlled &&
			appliedMultiUncontrolledValue &&
			appliedMultiUncontrolledValue.length > 0
		) {
			if (appliedMultiUncontrolledValue.length === 1) {
				const selectedItem = items.find((i) => {
					return i.props.value == appliedMultiUncontrolledValue[0];
				});
				return selectedItem?.props.title;
			}
			return formatter(appliedMultiUncontrolledValue.length);
		}
		if (!isControlled) {
			const selectedItem = items.find((i) => {
				return i.props.value == uncontrolledValue;
			});
			return selectedItem?.props.title;
		}
		return '';
	};

	const getLeftComponent = (): ReactNode => {
		if (LeftComponent) {
			if (
				typeof LeftComponent === 'object' &&
				(LeftComponent.Active || LeftComponent.InActive)
			) {
				if (highlightOnSelect && (Array.isArray(value) ? value.length > 0 : !!value)) {
					return LeftComponent.Active ? <LeftComponent.Active /> : null;
				}
				return LeftComponent.InActive ? <LeftComponent.InActive /> : null;
			}
			if (typeof LeftComponent === 'function') {
				return <LeftComponent />;
			}
		}
		return null;
	};

	let content: ReactNode = null;

	if (!hideValueOnSelect) {
		content = <div data-elem='placeholder'>{placeholder}</div>;

		if (getValueToDisplay()) {
			content = <span data-elem='value'>{getValueToDisplay()}</span>;
		}
	}

	return (
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
					ref={inputElRef}
					disabled={disabled}
					tabIndex={0}
					className={styles.input}
					onKeyDown={(event) => {
						const validKey = [' ', 'Spacebar', 'Enter'].includes(event.key);
						if (validKey) setOpen(true);
					}}
					onBlur={onBlur}
					value={selectedOptions
						.map((o) => {
							return o.value;
						})
						.join(', ')}
					readOnly
				/>

				<div
					data-elem='select'
					role='button'
					className={classes(
						styles.select,
						feedback != null ? styles[`feedback-${feedback.type}` as const] : ''
					)}>
					{getLeftComponent()}
					{content}
					<div className={styles['icon-bundle']}>
						{error && (
							<Tooltip
								content={error.toString()}
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
								className={classes(styles['caret-icon'], open ? styles.open : '')}
							/>
						)}
					</div>
				</div>
			</div>

			<Popper open={open} wrapperId='dropdown-popper'>
				{open && (
					<FloatingFocusManager context={context} initialFocus={-1} modal={false}>
						<motion.ul
							data-elem='body'
							{...getFloatingProps({
								role: 'group',
								ref: floating,
								onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
									setPointer(false);
									if (event.key === 'Tab' && !multi) setOpen(false);
								},
								onPointerMove() {
									setPointer(true);
								},
								style: {
									position: strategy,
									top: y ?? 0,
									left: x ?? 0,
								} as React.CSSProperties,
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
											return <SelectAllIcon className={styles.icon} />;
										}}
										onClick={(event) => {
											event.stopPropagation();
											multiOptionsRef.current?.focus();
											onSelectAll(event, true);
										}}
									/>

									{selectedOptions.length > 0 && (
										<span className={styles.items}>{selectedItemsLabel}</span>
									)}
								</li>
							)}
							{search && (
								<TextFieldv2
									className={styles.search}
									placeholder={search.placeholder}
									value={search.value}
									onChange={(e) => {
										search.onChange(e.target.value);
									}}
								/>
							)}

							{items}

							{multi && (
								<div className={styles.footer}>
									<Button
										className={styles['multi-clear']}
										blurOnClick={false}
										title='Clear'
										size='auto'
										disabled={selectedOptions.length === 0}
										onClick={(event) => {
											event.stopPropagation();
											multiOptionsRef.current?.focus();
											onSelectAll(event, false);
										}}
									/>
									<Button
										className={styles['multi-apply']}
										title={
											selectedOptions.length === 0
												? 'Apply'
												: (multiSelectActionTitle ?? 'Apply')
										}
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
	);
});

export default Dropdown;
