/* eslint-disable no-lonely-if */
import PropTypes from 'prop-types';
import { useRef, useState, forwardRef } from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { Skeleton } from './Skeleton';
import styles from './Toggle.module.css';

// eslint-disable-next-line prefer-arrow-callback
const Toggle = forwardRef(function Toggle(props, ref) {
	// eslint-disable-next-line object-curly-newline
	const {
		className,
		theme,
		options,
		defaultValue,
		value,
		onChange,
		multi,
		color,
		loading,
		fallback,
	} = props;

	// for uncontrolled input
	const [uncontrolledValue, setUncontrolledValue] = useState(() => {
		if (multi) {
			return defaultValue ?? options?.[0]?.value ?? [];
		}
		return defaultValue ?? options?.[0]?.value;
	});

	const { current: isControlled } = useRef(value !== undefined);

	// eslint-disable-next-line no-nested-ternary
	const inputValue = isControlled ? value ?? '' : uncontrolledValue;

	const allSelected = multi ? options.length === inputValue.length : false;

	const onSelectAll = () => {
		const allValues = options.map((option) => {
			return option.value;
		});
		if (isControlled) {
			onChange(allValues);
		} else {
			setUncontrolledValue(allValues);
		}
	};

	const onButtonClick = (newValue, selected) => {
		// if multi select
		if (multi) {
			// if it was already selected, remove it
			if (selected) {
				const newInputValue = inputValue.filter((val) => {
					return val !== newValue;
				});

				// if total selected after removal is greater than 0, set that
				// else select all
				if (newInputValue.length > 0) {
					if (isControlled) {
						onChange(newInputValue);
					} else {
						setUncontrolledValue(newInputValue);
					}
				} else {
					onSelectAll();
				}
			} else {
				// if all are selected, select only the one being clicked
				if (allSelected) {
					const newInputValue = [newValue];
					if (isControlled) {
						onChange(newInputValue);
					} else {
						setUncontrolledValue(newInputValue);
					}
				} else {
					const newInputValue = [...inputValue, newValue];
					if (isControlled) {
						onChange(newInputValue);
					} else {
						setUncontrolledValue(newInputValue);
					}
				}
			}
		} else {
			// if single select, just select that item
			if (isControlled) {
				onChange(newValue);
			} else {
				setUncontrolledValue(newValue);
			}
		}
	};

	const compareSelection = (input, item) => {
		if (Array.isArray(input)) {
			return input?.includes(item);
		} else {
			return input === item;
		}
	};

	if (loading || fallback) {
		return <Skeleton theme={theme} fallback={!loading && fallback} />;
	}

	return (
		<div className={classes(styles.root, styles[`theme-${theme}`], className)}>
			{multi && (
				<Button
					size='auto'
					data-elem='toggle'
					className={classes(styles['toggle-button'], allSelected ? styles.active : '')}
					onClick={onSelectAll}
					title='All'
					color={allSelected ? color : 'default'}>
					{value}
				</Button>
			)}
			{options.map((item) => {
				const {
					title,
					value: itemValue,
					leftComponent,
					rightComponent,
					className: itemClassName,
				} = item;
				const isActive = compareSelection(inputValue, itemValue) && !allSelected;
				return (
					<Button
						size='auto'
						data-elem='toggle'
						key={itemValue}
						className={classes(
							styles['toggle-button'],
							isActive ? styles.active : '',
							itemClassName
						)}
						onClick={() => {
							onButtonClick(itemValue, isActive);
						}}
						title={title}
						color={isActive ? color : 'default'}
						leftComponent={leftComponent}
						rightComponent={rightComponent}>
						{value}
					</Button>
				);
			})}
			<input type='text' ref={ref} className={styles.input} value={inputValue} />
		</div>
	);
});

Toggle.propTypes = {
	loading: PropTypes.bool,
	fallback: PropTypes.bool,
	className: PropTypes.string,
	theme: PropTypes.oneOf(['dark', 'light']),
	options: PropTypes.arrayOf(PropTypes.string),
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	multi: PropTypes.bool,
	theme: PropTypes.oneOf(['light', 'dark']),
};

Toggle.defaultProps = {
	loading: false,
	fallback: false,
	className: '',
	theme: 'light',
	options: [],
	defaultValue: null,
	value: undefined,
	multi: false,
	theme: 'dark',
};

export default Toggle;
