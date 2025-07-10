/* eslint-disable no-unsafe-optional-chaining */
import {
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
	getDatePickerDisplayValue,
	getFloatingReferences,
} from '../../components/datePicker/utils';
import { BaseModal } from '../../components/modal';
import { useOutsideClickListener } from '../../hooks';
import { classes } from '../../utils';
import { ErrorBoundaryWrapper } from '../errorBoundary';
import { CalenderIcon, CaretIcon } from '../icons';
import styles from './DatePicker.module.css';

const DatePicker = (props) => {
	const {
		placeholder = '',
		range = false,
		value = null,
		disabled = false,
		className = '',
		customRanges = null,
		custom,
		highlightOnSelect,
		limitHours = null,
		timeRange,
	} = props;

	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openCustomRange, setOpenCustomRange] = useState(false);
	const [open, setOpen] = useState(false);
	const toggle = () => {
		setOpen((prevState) => {
			return !prevState;
		});
	};

	const displayValue = getDatePickerDisplayValue({
		value,
		rangePicker: range && value?.filter?.(Boolean)?.length > 0,
		singlePicker: !range && value,
		timeRange,
		limitHours,
	});

	const datePickerFloatingReference = useFloating(
		getFloatingReferences(openDatePicker, setOpenDatePicker)
	);

	const customRangeFloatingReference = useFloating(
		getFloatingReferences(openCustomRange, setOpenCustomRange)
	);

	useOutsideClickListener(datePickerFloatingReference.floating, () => {
		console.log('CLICKED1');
		toggle();
		return setOpenDatePicker(false);
	});

	useOutsideClickListener(customRangeFloatingReference.floating, () => {
		console.log('CLICKED2');
		toggle();
		return setOpenDatePicker(false);
	});

	const datePickerInteractionProps = useInteractions([
		useClick(datePickerFloatingReference.context, {
			enabled: !disabled,
		}),
		useDismiss(datePickerFloatingReference.context),
	]);

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
				className={styles.root}
				onClick={() => {
					console.log('CLICKED');
					toggle();
				}}>
				<div className={classes(styles['date-picker'], className)}>
					<div
						data-elem='header'
						ref={datePickerFloatingReference.reference}
						role='button'
						tabIndex={0}
						className={classes(
							styles.container,
							disabled ? styles.disabled : '',
							openDatePicker ? styles.open : '',
							customRanges ? styles['with-custom'] : '',
							displayValue ? styles.highlight : '',
							highlightOnSelect && value ? styles.highlightOnSelect : ''
						)}
						{...datePickerInteractionProps.getReferenceProps()}>
						<div className={styles.left}>
							<CalenderIcon />

							{!displayValue && (
								<span className={styles.placeholder}>{placeholder}</span>
							)}

							{displayValue && <span className={styles.value}>{displayValue}</span>}
						</div>

						<input className={styles.input} value={displayValue} />
						<CaretIcon className={classes(styles.icon)} />
					</div>
				</div>
				<BaseModal className={styles.modal} open={open} hideCrossDismiss toggle={toggle}>
					<p>Date Modal</p>
				</BaseModal>
			</div>
		</ErrorBoundary>
	);
};

export default DatePicker;
