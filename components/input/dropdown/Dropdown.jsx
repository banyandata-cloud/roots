/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {
	useMemo,
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
	useRef,
	useLayoutEffect,
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
	useFloating,
	useInteractions,
	useListNavigation,
	useRole,
	useClick,
	useDismiss,
	offset,
	flip,
	shift,
	size,
	autoUpdate,
	FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import PropTypes from 'prop-types';
import { classes } from '../../../utils';
import { CaretIcon } from '../../icons';
import styles from './Dropdown.module.css';
import Popper from '../../popper/Popper';
import { Checkbox } from '../checkbox';
import Button from '../../buttons/button/Button';
import { ErrorBoundaryWrapper } from '../../errorBoundary';

// eslint-disable-next-line prefer-arrow-callback
const Dropdown = forwardRef(function Dropdown(props, inputRef) {
	// eslint-disable-next-line object-curly-newline
	const {
		className,
		popperClassName,
		value,
		onChange,
		onBlur,
		children,
		label,
		placeholder,
		multi,
		disabled,
		id,
		name,
		feedback,
		formatter,
		custom,
	} = props;
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const listItemsRef = useRef([]);
	const multiOptionsRef = useRef(null);

	const isControlled = value !== undefined;

	// for uncontrolled input
	const [uncontrolledValue, setUncontrolledValue] = useState(value);

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
			enabled: !disabled,
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

	const onSelect = (child, selected) => {
		return (event) => {
			if (event.currentTarget.getAttribute('data-elem') !== 'dropdown-item') {
				return;
			}
			const { value: itemValue } = child.props;
			const itemValueString = itemValue?.toString?.();
			const index = event.currentTarget.getAttribute('data-index');

			// to support form libraries which require name and value on the event
			const nativeEvent = event.nativeEvent || event;
			const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

			Object.defineProperty(clonedEvent, 'target', {
				writable: true,
				value: {
					value: itemValueString,
					name,
				},
			});

			// if (elem === 'dropdown-item') {
			setSelectedIndex(parseInt(index, 10));

			if (multi) {
				// eslint-disable-next-line no-lonely-if
				if (selected === true) {
					setUncontrolledValue(
						uncontrolledValue.filter((val) => {
							return val !== itemValueString;
						})
					);
				} else {
					setUncontrolledValue([...(uncontrolledValue ?? []), itemValueString]);
				}
				setActiveIndex(parseInt(index, 10));
			} else {
				if (isControlled) {
					onChange(clonedEvent, itemValueString.toString());
				} else {
					setUncontrolledValue(itemValueString.toString());
				}
				setActiveIndex(null);
				setOpen(false);
			}
			// }
		};
	};

	const onNavigate = (child, selected) => {
		return (event) => {
			const selectKey = [' ', 'Spacebar', 'Enter'].includes(event.key);
			if (selectKey) {
				event.stopPropagation();
				onSelect(child, selected)(event);
			}
		};
	};

	useImperativeHandle(
		inputRef,
		() => {
			return {
				value: () => {
					const inputValue = inputRef.current.value?.split?.(', ') ?? [];
					if (multi) {
						return inputValue;
					}
					return inputValue?.[0] ?? null;
				},
			};
		},
		[]
	);

	const childrenArray = React.Children.toArray(children);

	const selectedOptions = useMemo(() => {
		let inputValue = uncontrolledValue;
		if (isControlled && !multi) {
			inputValue = value;
		}
		const options = [];
		if (inputValue != null && inputValue !== '') {
			childrenArray?.forEach((child) => {
				if (
					(multi &&
						(inputValue?.indexOf?.(child?.props?.value?.toString?.()) ?? -1) !== -1) ||
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
	}, [value, uncontrolledValue, multi]);

	const items = childrenArray.map((child, index) => {
		let selected = false;

		if (
			selectedOptions.findIndex((option) => {
				return option.value === child?.props?.value?.toString?.();
			}) !== -1
		) {
			selected = true;
		}

		return React.cloneElement(child, {
			...getItemProps({
				key: child?.props?.value,
				onKeyDown: onNavigate(child, selected),
				onClick: onSelect(child, selected),
				onMouseEnter: () => {
					setActiveIndex(index);
				},
				dataAttrs: {
					'data-index': index,
				},
				selected,
				tabIndex: activeIndex === index ? 0 : -1,
				ref: (node) => {
					listItemsRef.current[index] = node;
				},
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
		if (multi) {
			setUncontrolledValue(value);
		}
	}, [open, multi, value]);

	const onSelectAll = (event, selected) => {
		// to support form libraries which require name and value on the event
		const nativeEvent = event.nativeEvent || event;
		const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

		let itemValue = [];

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

		// eslint-disable-next-line no-lonely-if
		if (selected === true) {
			setUncontrolledValue(itemValue);
		} else {
			setUncontrolledValue(itemValue);
		}

		setActiveIndex(0);
	};

	const onApply = (event) => {
		const nativeEvent = event.nativeEvent || event;
		const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

		Object.defineProperty(clonedEvent, 'target', {
			writable: true,
			value: {
				value: uncontrolledValue,
				name,
			},
		});

		onChange(event, uncontrolledValue);
	};

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
					className,
					styles.root,
					open ? styles.open : '',
					disabled ? styles.disabled : ''
				)}>
				{label && (
					<div data-elem='label' className={styles.label}>
						<span>{label}</span>
					</div>
				)}
				<div
					data-elem='header'
					className={styles.header}
					ref={reference}
					{...getReferenceProps()}>
					<input
						id={id}
						name={name}
						ref={inputRef}
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
						<span data-elem='placeholder' className={styles.placeholder}>
							{(selectedOptions?.length > 1
								? formatter(selectedOptions.length)
								: selectedOptions?.[0]?.title) ?? placeholder}
						</span>
						<CaretIcon
							data-elem='icon'
							className={classes(styles.icon, styles['drop-icon'])}
						/>
					</div>
				</div>
				<Popper open={open} wrapperId='dropdown-popper'>
					{open && (
						<FloatingFocusManager context={context} initialFocus={-1} modal={false}>
							<ul
								{...getFloatingProps({
									'data-elem': 'body',
									role: 'group',
									ref: floating,
									onKeyDown(event) {
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
										popperClassName,
										open ? styles.open : ''
									),
								})}>
								{multi && (
									<li
										ref={multiOptionsRef}
										className={styles['multi-options']}
										tabIndex={-1}>
										<Checkbox
											label='Select All'
											position='left'
											checked={
												selectedOptions.length === childrenArray.length
											}
											onChange={onSelectAll}
										/>{' '}
										<Button
											blurOnClick={false}
											variant='text'
											title='Clear'
											size='auto'
											color='danger'
											onClick={(event) => {
												multiOptionsRef?.current?.focus();
												onSelectAll(event, false);
											}}
										/>
									</li>
								)}
								{items}
								{multi && (
									<Button
										className={styles['multi-apply']}
										title='Apply'
										size='auto'
										onClick={onApply}
									/>
								)}
							</ul>
						</FloatingFocusManager>
					)}
				</Popper>
				{feedback != null && (
					<div className={styles.bottom}>
						<div
							data-elem='feedback'
							className={classes(
								styles.feedback,
								styles[`feedback-${feedback.type}`]
							)}>
							{feedback.text}
						</div>
					</div>
				)}
			</div>
		</ErrorBoundary>
	);
});

Dropdown.propTypes = {
	popperClassName: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	placeholder: PropTypes.string,
	// search: PropTypes.bool,
	// max: PropTypes.number,
	multi: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	feedback: PropTypes.shape({
		text: PropTypes.node,
		type: PropTypes.oneOf(['error', 'success', 'default']),
	}),
	formatter: PropTypes.func,
};

Dropdown.defaultProps = {
	popperClassName: '',
	className: '',
	disabled: false,
	label: null,
	value: undefined,
	placeholder: 'Select an option',
	// search: false,
	// max: null,
	multi: false,
	onChange: null,
	onBlur: null,
	feedback: null,
	formatter: (totalSelected) => {
		return `${totalSelected} options selected`;
	},
};

export default Dropdown;
