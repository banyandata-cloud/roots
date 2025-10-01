import React, { type ComponentType, useRef, useState } from 'react';
import { classes, inputHelper } from '../../../utils';
import { RadioIcon } from '../../icons';
import styles from './Radio.module.css';

type Position = 'left' | 'right';
type Size = 'sm' | 'md' | 'lg';

// Your icon set should accept at least className
type IconType = ComponentType<{ className?: string; 'data-elem'?: string }>;

export interface RadioProps {
	label?: React.ReactNode;
	/** Controlled state */
	checked?: boolean;
	/** Uncontrolled default */
	defaultChecked?: boolean;
	/** Fires with (event, value) where value is the boolean checked state */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void;
	position?: Position;
	size?: Size;
	className?: string | undefined;
	disabled?: boolean | undefined;
}

const Radio: React.FC<RadioProps> = (props) => {
	const {
		label,
		checked,
		defaultChecked,
		onChange,
		position = 'left',
		size = 'sm',
		className,
		disabled,
	} = props;

	// Lock controlled vs uncontrolled on first render
	const { current: isControlled } = useRef<boolean>(checked !== undefined);

	// Uncontrolled state
	const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean | undefined>(
		defaultChecked
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Safely extract fieldValue; fall back to event.target.checked
		const helperResult = (
			inputHelper as unknown as
				| ((e: React.ChangeEvent<HTMLInputElement>) => { fieldValue?: boolean })
				| undefined
		)?.(event);
		const fieldValue = helperResult?.fieldValue ?? event.target.checked;

		if (isControlled) {
			onChange?.(event, fieldValue);
		} else {
			setUncontrolledChecked(fieldValue);
		}
	};

	const isChecked: boolean | undefined = isControlled ? checked : uncontrolledChecked;

	const CheckedIcon = RadioIcon.Checked as IconType;
	const UncheckedIcon = RadioIcon.UnChecked as IconType;

	const positionClass =
		position === 'left'
			? 'bn-flex bn-flex-row bn-justify-start bn-items-center'
			: 'bn-flex bn-flex-row-reverse bn-justify-end bn-items-center';

	const sizeClass =
		size === 'sm' ? 'bn-w-4 bn-h-4' : size === 'md' ? 'bn-w-5 bn-h-5' : 'bn-w-6 bn-h-8';

	return (
		<label
			className={classes(
				styles.root,
				'bn-cursor-pointer bn-gap-[0.625rem] bn-relative',
				positionClass,
				disabled
					? 'bn-cursor-default bn-text-grey4'
					: 'bn-text-grey1 hover:bn-text-text-color',
				isChecked && !disabled ? 'bn-text-text-color' : '',
				className,
				disabled ? styles.disabled : ''
			)}>
			<input
				disabled={disabled}
				type='radio'
				// Preserve original pattern: always pass checked (undefined keeps it uncontrolled)
				checked={isChecked}
				onChange={handleChange}
				className='bn-opacity-0 bn-w-[1px] bn-h-[1px] bn-z-10 bn-absolute bn-focus-visible:bn-ring bn-focus-visible:bn-ring-primary-color4 bn-focus-visible:bn-ring-opacity-25'
			/>

			{isChecked ? (
				<CheckedIcon
					data-elem='icon'
					className={classes(sizeClass, styles.icon, 'bn-inline-block bn-rounded-full')}
				/>
			) : (
				<UncheckedIcon
					data-elem='icon'
					className={classes(
						styles[`icon-${size}`],
						sizeClass,
						'bn-inline-block bn-rounded-full',
						sizeClass,
						styles.icon
					)}
				/>
			)}

			{label && (
				<span data-elem='label' className='bn-select-none'>
					{label}
				</span>
			)}
		</label>
	);
};

export default Radio;
