/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useMemo, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import {
	useFloating,
	useInteractions,
	useListNavigation,
	useRole,
	useClick,
	useDismiss,
	useTypeahead,
	offset,
	flip,
	size,
	autoUpdate,
	FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import PropTypes from 'prop-types';
import { useOutsideClickListener } from '../../../hooks';
import { classes, inputHelper } from '../../../utils';
import { CaretIcon } from '../../icons';
import styles from './Dropdown.module.css';
import Popper from '../../popper/Popper';

// eslint-disable-next-line prefer-arrow-callback
const Dropdown = forwardRef(function Dropdown(props, inputRef) {
	// eslint-disable-next-line object-curly-newline
	const {
		className,
		popperClassName,
		value,
		onChange,
		children,
		label,
		placeholder,
		multi,
		disabled,
	} = props;
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const listRef = useRef([]);

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
			listRef,
			activeIndex,
			selectedIndex,
			onNavigate: setActiveIndex,
			focusItemOnHover: true,
		}),
		useTypeahead(context, {
			listRef,
			onMatch: open ? setActiveIndex : setSelectedIndex,
			activeIndex,
			selectedIndex,
			findMatch: (list, typedString) => {
				return list.find((elem) => {
					return elem?.textContent?.toLowerCase().indexOf(typedString) === 0;
				});
			},
		}),
		useDismiss(context),
	]);

	const onSelect = (event) => {
		const { dataset } = inputHelper(event);
		const { value: itemValue, index, selected, elem } = dataset;
		if (elem === 'dropdown-item') {
			setSelectedIndex(parseInt(index, 10));

			if (multi) {
				if (isControlled) {
					if (selected === 'true') {
						onChange?.(
							event,
							value.filter((val) => {
								return val !== itemValue;
							})
						);
					} else {
						onChange?.(event, [...(value ?? []), itemValue]);
					}
				} else {
					// eslint-disable-next-line no-lonely-if
					if (selected === 'true') {
						setUncontrolledValue(
							uncontrolledValue.filter((val) => {
								return val !== itemValue;
							})
						);
					} else {
						setUncontrolledValue([...(uncontrolledValue ?? []), itemValue]);
					}
				}
			} else {
				if (isControlled) {
					onChange(event, itemValue.toString());
				} else {
					setUncontrolledValue(itemValue.toString());
				}
				setActiveIndex(null);
				setOpen(false);
			}
		}
	};

	const onNavigate = (event) => {
		const selectKey = [' ', 'Spacebar', 'Enter'].includes(event.key);
		if (selectKey) {
			event.stopPropagation();
			onSelect(event);
		}
	};

	const onClick = (event) => {
		onSelect(event);
	};

	useImperativeHandle(
		inputRef,
		() => {
			return {
				value: () => {
					const inputValue = inputRef.current.value?.split?.(', ') ?? [];
					if (multi) {
						return inputRef;
					}
					return inputValue?.[0] ?? null;
				},
			};
		},
		[]
	);

	useOutsideClickListener(floating, () => {
		return setOpen(false);
	});

	const selectedOptions = useMemo(() => {
		let inputValue = uncontrolledValue;
		if (isControlled) {
			inputValue = value;
		}
		const options = [];
		if (inputValue != null && inputValue !== '') {
			children?.forEach((child) => {
				if (
					(multi &&
						(inputValue?.toString?.()?.indexOf?.(child?.props?.value?.toString?.()) ??
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
	}, [value, uncontrolledValue, multi]);

	const items = children.map((child, index) => {
		let selected = false;

		if (
			selectedOptions.find((option) => {
				return option.value === child?.props?.value?.toString?.();
			})
		) {
			selected = true;
		}

		return React.cloneElement(child, {
			...getItemProps({
				onKeyDown: onNavigate,
				dataAttrs: {
					'data-index': index,
				},
				selected,
				ref: (node) => {
					listRef.current[index] = node;
				},
			}),
		});
	});

	return (
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
					value={selectedOptions
						?.map((option) => {
							return option?.value;
						})
						?.join(', ')}
				/>
				<div data-elem='select' role='button' className={styles.select}>
					<span data-elem='placeholder' className={styles.placeholder}>
						{(selectedOptions?.length > 1
							? `${selectedOptions.length} options selected`
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
					<FloatingFocusManager context={context} initialFocus={selectedIndex}>
						<div
							{...getFloatingProps({
								'data-elem': 'body',
								role: 'group',
								ref: floating,
								onKeyDown(event) {
									if (event.key === 'Tab') {
										setOpen(false);
									}
								},
								style: {
									position: strategy,
									top: y ?? 0,
									left: x ?? 0,
								},
								onClick,
								className: classes(
									styles.body,
									popperClassName,
									open ? styles.open : ''
								),
							})}>
							{items}
						</div>
					</FloatingFocusManager>
				)}
			</Popper>
		</div>
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
};

export default Dropdown;
