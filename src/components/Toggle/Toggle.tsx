import { useEffect, useRef, useState } from 'react';
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

interface ToggleProps {
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
	const [sliderLeft, setSliderLeft] = useState(0);
	const [sliderWidth, setSliderWidth] = useState(0);

	const sliderRef = useRef<HTMLButtonElement | null>(null);

	const updateSliderPosition = () => {
		const activeTabElement = sliderRef.current;
		if (activeTabElement) {
			setSliderLeft(activeTabElement.offsetLeft);
			setSliderWidth(activeTabElement.offsetWidth);
		}
	};

	const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(() => {
		if (multi) {
			return (defaultValue as string[]) ?? options?.[0]?.value ?? [];
		}
		return (defaultValue as string) ?? options?.[0]?.value ?? '';
	});

	const isControlled = useRef(value !== undefined).current;
	const inputValue = isControlled ? value ?? '' : uncontrolledValue;
	const allSelected =
		multi && Array.isArray(inputValue) ? options.length === inputValue.length : false;

	const onButtonClick = (newValue: string, selected: boolean) => {
		if (multi) {
			const currentValue = inputValue as string[];

			if (selected) {
				const newInputValue = currentValue.filter((val) => val !== newValue);
				isControlled ? onChange?.(newInputValue) : setUncontrolledValue(newInputValue);
			} else {
				if (allSelected) {
					const newInputValue = [newValue];
					isControlled ? onChange?.(newInputValue) : setUncontrolledValue(newInputValue);
				} else {
					const newInputValue = [...currentValue, newValue];
					isControlled ? onChange?.(newInputValue) : setUncontrolledValue(newInputValue);
				}
			}
		} else {
			isControlled ? onChange?.(newValue) : setUncontrolledValue(newValue);
		}
	};

	const compareSelection = (input: string | string[], item: string) => {
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
							ref={isActive ? sliderRef : null}
							type='button'
							onClick={() => onButtonClick(tab.value, isActive)}
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
							leftComponent={leftComponent}
							rightComponent={rightComponent}
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
							left: `${sliderLeft}px`,
							width: `${sliderWidth}px`,
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default Toggle;
