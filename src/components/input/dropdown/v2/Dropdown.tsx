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
import { classes } from '../../../../utils';
import { CaretIcon, CrossIcon, InfoHexIcon } from '../../../icons';
import Popper from '../../../popper/Popper';
import { BaseButton } from '../../../v2/buttons/baseButton';
import { TextFieldv2 } from '../../textField';
import { DropdownItemv2 } from '../dropdown-item';
import type { DropdownItemProps } from '../dropdown-item/types';
import styles from './Dropdown.module.css';

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
	readOnly?: boolean;
	/** string shows tooltip + error state; boolean acts as a flag only */
	error?: string | boolean;
	warning?: string | boolean;
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
		placeholder = 'Choose an option',
		multi,
		disabled,
		readOnly,
		error,
		warning,
		id,
		name,
		feedback,
		formatter = (totalSelected: number) => {
			return `${totalSelected.toString()} options applied`;
		},
		required,
		valueAsCount,
		caretAsUpDown,
		search,
	} = props;

	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

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
			enabled: !disabled && !readOnly,
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

	const getNextMultiValue = (
		prev: string[],
		itemValue: string | null,
		selected: boolean
	): string[] => {
		if (!itemValue) return prev;

		if (selected) {
			return prev.filter((v) => v !== itemValue);
		}

		return Array.from(new Set([...prev, itemValue]));
	};

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
				const prev = Array.isArray(uncontrolledValue) ? uncontrolledValue : [];
				const next = getNextMultiValue(prev, itemValueString, selected);
				setUncontrolledValue(next);
				setActiveIndex(index);
				onChange(clonedEvent as unknown as React.SyntheticEvent, next);
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

		const nextValue: string[] = selected
			? childrenArray.map((child) => child.props.value?.toString() ?? '')
			: [];

		Object.defineProperty(clonedEvent, 'target', {
			writable: true,
			value: {
				value: itemValue,
				name,
			},
		});

		setUncontrolledValue(itemValue);
		setActiveIndex(0);
		onChange(clonedEvent as unknown as React.SyntheticEvent, nextValue);
	};

	console.log({
		selectedOptions,
	});

	const getValueToDisplay = (): ReactNode => {
		if (selectedOptions?.length > 0) {
			return (
				<div className={styles.title}>
					<BaseButton
						className={styles.chip}
						title={selectedOptions?.length?.toString()}
						onClick={(event) => {
							event.stopPropagation();
							return onSelectAll(event, false);
						}}
						component3={<CrossIcon className={styles['cross-icon']} />}
					/>
					<div data-elem='placeholder' className={styles.placeholder}>
						Choose options
					</div>
				</div>
			);
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

	let content = (
		<div
			data-elem='placeholder'
			className={classes(styles.placeholder, disabled ? styles.disabled : '')}>
			{placeholder}
		</div>
	);

	if (getValueToDisplay()) {
		content = <div data-elem='value'>{getValueToDisplay()}</div>;
	}

	return (
		<div
			className={classes(
				styles.root,
				open ? styles.open : '',
				disabled ? styles.disabled : '',
				readOnly ? styles['read-only'] : '',
				className
			)}>
			{label && (
				<div
					data-elem='label'
					className={classes(
						styles.label,
						required ? styles.required : '',
						disabled ? styles.disabled : ''
					)}>
					<span>{label}</span>
				</div>
			)}

			<div
				data-elem='header'
				className={classes(
					styles.header,
					disabled ? styles.disabled : '',
					readOnly ? styles['read-only'] : '',
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
						disabled ? styles.disabled : '',
						readOnly ? styles['read-only'] : '',
						feedback != null ? styles[`feedback-${feedback.type}` as const] : ''
					)}>
					{getLeftComponent()}
					{content}
					<div className={styles['icon-bundle']}>
						{error && (
							<span className={styles.span}>
								<InfoHexIcon
									className={classes(
										styles['info-icon'],
										error ? styles['error-icon'] : ''
									)}
								/>
							</span>
						)}
						{warning && (
							<span className={styles.span}>
								<InfoHexIcon
									className={classes(
										styles['info-icon'],
										warning ? styles['warning-icon'] : ''
									)}
								/>
							</span>
						)}
						{caretAsUpDown ? (
							<CaretIcon
								className={classes(
									styles['caret-icon-upDown'],
									open ? styles.open : '',
									disabled ? styles.disabled : ''
								)}
								upDown
							/>
						) : (
							<CaretIcon
								data-elem='icon'
								className={classes(
									styles['caret-icon'],
									open ? styles.open : '',
									disabled ? styles.disabled : ''
								)}
							/>
						)}
					</div>
				</div>
			</div>

			{(error || warning) && (
				<div
					data-elem='info'
					className={classes(styles.info, error ? styles['error-info'] : '')}>
					<span>{error?.toString() || warning?.toString()}</span>
				</div>
			)}

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
								<DropdownItemv2
									key='all'
									v2
									title='All'
									value='all'
									selected={
										items?.filter?.((item) => {
											return item?.props?.selected;
										})?.length > 0
									}
									onClick={(event) => {
										return onSelectAll(
											event,
											items?.filter?.((item) => {
												return item?.props?.selected;
											})?.length !== items?.length
										);
									}}
									variant='checkbox'
									intermediate={
										items?.filter?.((item) => {
											return item?.props?.selected;
										})?.length > 0 &&
										items?.filter?.((item) => {
											return item?.props?.selected;
										})?.length !== items?.length
									}
								/>
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
						</motion.ul>
					</FloatingFocusManager>
				)}
			</Popper>
		</div>
	);
});

export default Dropdown;
