import { forwardRef, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { classes } from '../utils';
import Checkbox from '../checkbox/CheckBox';
import Indicator from './assets/Indicator/Indicator';
import TagCloseIcon from './assets/TagCloseIcon';
import styles from './Tags.module.scss';
import type { TagProps } from './types';

// Figma Tag: [leading] label [count] [close]. The leading part is a checkbox, a status dot or an
// icon; the outer padding depends on it and on what trails, so the markup only exposes
// data-lead / data-trail for the stylesheet.
const Tag = forwardRef<HTMLInputElement, TagProps>((props, ref) => {
	const {
		label = 'Label',
		size = 'sm',
		closable = false,
		onClose,
		checkbox = false,
		checked,
		defaultChecked,
		onCheckedChange,
		indicator = false,
		indicatorType = 'success',
		icon,
		count,
		textField = false,
		searchTag = false,
		readOnly = false,
		inputValue,
		defaultInputValue = '',
		inputPlaceholder = '',
		onInputChange,
		onInputBlur,
		onInputEnter,
		onInputClear,
		onClick,
	} = props;

	const isControlled = inputValue !== undefined;
	const [internalValue, setInternalValue] = useState(defaultInputValue);
	const value = isControlled ? inputValue : internalValue;
	const fallbackRef = useRef<HTMLInputElement>(null);
	const inputRef = (ref ?? fallbackRef) as React.RefObject<HTMLInputElement>;

	const hasIcon = icon !== undefined && icon !== null;
	const lead = checkbox ? 'checkbox' : indicator ? 'indicator' : hasIcon ? 'icon' : 'none';
	const hasCount = count !== undefined && !textField;
	const trail = closable || textField || searchTag ? 'closer' : hasCount ? 'count' : 'none';

	// Figma draws the large checkbox at the medium size when it sits before a status/icon and a count.
	const stacked = checkbox && (indicator || hasIcon);
	const checkboxSize = size === 'lg' && stacked && hasCount ? 'md' : size;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!isControlled) setInternalValue(event.target.value);
		onInputChange?.(event.target.value, event);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' || event.key === 'Tab') {
			event.preventDefault();
			onInputEnter?.();
		} else if (event.key === 'Backspace' && value === '') {
			event.preventDefault();
			onInputClear?.();
		}
	};

	const handleClose = () => {
		if (textField) {
			if (!isControlled) setInternalValue('');
			onInputClear?.();
			inputRef.current?.focus();
		}
		onClose?.();
	};

	return (
		<span
			className={classes(styles.tag, styles[size], onClick && styles.clickable)}
			data-lead={lead}
			data-trail={trail}
			data-stacked={stacked ? 'true' : undefined}
			data-count-plain={hasCount && lead === 'none' ? 'true' : undefined}
			onClick={onClick}
			role={onClick ? 'button' : undefined}
		>
			<span className={styles.content}>
				{checkbox && (
					<Checkbox
						size={checkboxSize}
						{...(checked !== undefined && { checked })}
						{...(defaultChecked !== undefined && { defaultChecked })}
						onChange={(event) => onCheckedChange?.(event.target.checked)}
					/>
				)}
				{indicator && <Indicator type={indicatorType} size={8} />}
				{hasIcon && <span className={styles.icon}>{icon}</span>}
				<span
					className={classes(
						styles.label,
						textField && styles.muted,
						(searchTag || textField) && styles.spacedLabel
					)}
				>
					{label}
				</span>
				{textField && (
					<span className={styles.field} data-value={value || inputPlaceholder}>
						<input
							ref={inputRef}
							className={styles.input}
							type='text'
							value={value}
							readOnly={readOnly}
							placeholder={inputPlaceholder}
							onChange={readOnly ? undefined : handleChange}
							onBlur={readOnly ? undefined : onInputBlur}
							onKeyDown={handleKeyDown}
						/>
					</span>
				)}
				{hasCount && <span className={styles.count}>{count}</span>}
			</span>
			{(closable || textField) && (
				<button
					type='button'
					className={styles.close}
					aria-label='Remove'
					onClick={(event) => {
						event.stopPropagation();
						handleClose();
					}}
				>
					<TagCloseIcon size={size} />
				</button>
			)}
		</span>
	);
});

Tag.displayName = 'Tag';

export default Tag;
