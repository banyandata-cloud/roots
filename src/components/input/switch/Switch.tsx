import React, { useRef, useState } from 'react';
import { classes, inputHelper } from '../../../utils';
import styles from './Switch.module.css';

type Position = 'left' | 'right';

export interface SwitchProps {
	label?: React.ReactNode;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: boolean) => void;
	position?: Position;
	className?: string | undefined;
	disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = (props) => {
	const {
		label,
		checked,
		defaultChecked,
		onChange,
		position = 'right',
		className,
		disabled,
	} = props;

	// Freeze controlled vs uncontrolled mode on first render
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

	const positionClass =
		position === 'left'
			? 'bn-flex-row bn-justify-start bn-items-center'
			: 'bn-flex-row-reverse bn-justify-end bn-items-center';

	return (
		<label
			className={classes(
				styles.root,
				'bn-relative bn-cursor-pointer bn-gap-2 bn-h-6 bn-flex',
				positionClass,
				disabled ? 'bn-cursor-default' : '',
				className
			)}>
			<input
				disabled={disabled}
				type='checkbox'
				checked={isChecked}
				onChange={handleChange}
				className='bn-absolute bn-w-[1px] bn-h-[1px] bn-opacity-0 bn-z-10'
			/>
			<div className={classes(styles.pill)} />
			{label && <span data-elem='label'>{label}</span>}
		</label>
	);
};

export default Switch;
