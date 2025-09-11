import React, { useEffect, useRef, useState } from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import styles from './Toggle.module.css';

interface ToggleOption {
	title: string;
	value: string;
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	disabled?: boolean;
	className?: string;
}

export interface ToggleProps {
	options?: ToggleOption[];
	multi?: boolean;
	defaultValue?: string | string[];
	theme?: 'light' | 'dark';
	value?: string | string[];
	onChange?: (value: string | string[]) => void;
	className?: string;
	smooth?: boolean;
	secondary?: boolean;
}

const Toggle = ({
	options = [],
	multi,
	defaultValue,
	theme = 'light',
	value = undefined,
	onChange,
	className = '',
	smooth,
	secondary,
}: ToggleProps): React.ReactElement => {
	const [sliderLeft, setSliderLeft] = useState<number>(0);
	const [sliderWidth, setSliderWidth] = useState<number>(0);

	const sliderRef = useRef<HTMLButtonElement | null>(null);

	const updateSliderPosition = (): void => {
		const activeTabElement = sliderRef.current;
		if (activeTabElement) {
			setSliderLeft(activeTabElement.offsetLeft);
			setSliderWidth(activeTabElement.offsetWidth);
		}
	};

	const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(() => {
		if (multi) {
			// eslint-disable-next-line no-nested-ternary
			return Array.isArray(defaultValue)
				? defaultValue
				: options[0]?.value
					? [options[0].value]
					: [];
		}
		return typeof defaultValue === 'string' ? defaultValue : (options[0]?.value ?? '');
	});

	const isControlled = useRef(value !== undefined).current;
	const inputValue = isControlled ? (value ?? '') : uncontrolledValue;
	const allSelected =
		multi && Array.isArray(inputValue) ? options.length === inputValue.length : false;

	const onButtonClick = (newValue: string, selected: boolean): void => {
		if (multi) {
			const currentValue = inputValue as string[];
			let newInputValue: string[];

			if (selected) {
				newInputValue = currentValue.filter((val) => {
					return val !== newValue;
				});
			} else if (allSelected) {
				newInputValue = [newValue];
			} else {
				newInputValue = [...currentValue, newValue];
			}

			if (isControlled) {
				onChange?.(newInputValue);
			} else {
				setUncontrolledValue(newInputValue);
			}
		} else if (isControlled) {
			onChange?.(newValue);
		} else {
			setUncontrolledValue(newValue);
		}
	};

	const compareSelection = (input: string | string[], item: string): boolean => {
		if (Array.isArray(input)) {
			return input.includes(item);
		}
		return input === item;
	};

	useEffect(() => {
		updateSliderPosition();
	}, [inputValue, options]);

	return (
		<div className={classes(styles.root, styles[theme], className)}>
			<div className={styles.toggle}>
				{options.map((tab) => {
					const {
						title,
						leftComponent,
						rightComponent,
						disabled,
						className: itemClassName,
					} = tab;
					const isActive = compareSelection(inputValue, tab.value);

					return (
						<Button
							key={title}
							ref={
								isActive
									? (el) => {
											if (el instanceof HTMLButtonElement) {
												sliderRef.current = el;
											}
										}
									: null
							}
							type='button'
							onClick={() => {
								onButtonClick(tab.value, isActive);
							}}
							size='auto'
							data-elem='toggle'
							disabled={disabled}
							title={title}
							className={classes(
								styles['toggle-button'],
								styles[theme],
								disabled ? styles.disabled : '',
								isActive ? styles.active : '',
								secondary ? styles.secondary : '',
								!smooth ? styles.highlight : '',
								itemClassName
							)}
							leftComponent={
								typeof leftComponent === 'function'
									? leftComponent
									: () => {
											return leftComponent;
										}
							}
							rightComponent={
								typeof rightComponent === 'function'
									? rightComponent
									: () => {
											return rightComponent;
										}
							}
						/>
					);
				})}
				{smooth && !multi && (
					<div
						className={classes(
							styles.slider,
							secondary ? styles.secondary : '',
							styles[theme],
							styles.smooth
						)}
						style={{
							left: `${sliderLeft.toString()}px`,
							width: `${sliderWidth.toString()}px`,
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default Toggle;
