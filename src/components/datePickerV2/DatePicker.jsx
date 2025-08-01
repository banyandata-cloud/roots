/* eslint-disable no-unsafe-optional-chaining */
import {
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react-dom-interactions';
import { fromUnixTime } from 'date-fns';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '../../components/buttons';
import {
	getDatePickerDisplayValue,
	getFloatingReferences,
} from '../../components/datePicker/utils';
import { DropdownItemv2, Dropdownv2, TextFieldv2 } from '../../components/input';
import { BaseModal } from '../../components/modal';
import { FULL_MONTHS_INDEX } from '../../constants';
import { useOutsideClickListener } from '../../hooks';
import { classes, getDayInfo } from '../../utils';
import { ErrorBoundaryWrapper } from '../errorBoundary';
import { CalenderIcon, CaretIcon, ClockIcon } from '../icons';
import styles from './DatePicker.module.css';
import { Calender } from './calender';

const DatePicker = (props) => {
	const {
		placeholder = '',
		range = false,
		value = null,
		disabled = false,
		className = '',
		customRanges = null,
		showCustomRanges = false,
		custom,
		highlightOnSelect,
		limitHours = null,
		timeRange,

		enableFutureDates,
		disabledDates,
		disableDatesBefore,
		disableDatesAfter,
		valueAsRange,
		startingYear = 1970,
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

	const [selectedDate, setSelectedDate] = useState(() => {
		return '';
	});

	const [selectedRange, setSelectedRange] = useState(() => {
		return {
			dates: [],
			unix: [],
		};
	});

	const [fixedRange, setFixedRange] = useState(() => {
		return null;
	});

	const [selectedMonth, setSelectedMonth] = useState();
	const [displayMonthRight, setDisplayMonthRight] = useState();

	const date = fromUnixTime(value);
	const selectedDayInfo = getDayInfo(date);

	const calenderProps = {
		selectedDate,
		setSelectedDate,
		enableFutureDates,
		selectedRange,
		setSelectedRange,
		fixedRange,
		range,
		onApply: () => {
			apply({
				rangeSelected: selectedRange,
				dateSelected: selectedDate,
			});
		},
		onClear: () => {
			onClear();
			setOpenDatePicker(false);
		},
		disabledDates,
		disableDatesBefore,
		disableDatesAfter,
		value,
		setFixedRange,
		customRanges,
		selectedMonth,
		setSelectedMonth,
		displayMonthRight,
		setDisplayMonthRight,
		valueAsRange,
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
			</div>
			<BaseModal
				renderHeader={
					<div className={styles.header}>
						<div className={styles.left}>
							<div className={styles.title}>Date & Time</div>
							<div className={styles.desc}>Select the date range and time</div>
						</div>
						<div className={styles.right}>
							<Dropdownv2
								placeholder={selectedDayInfo.month}
								className={styles.dropdown}>
								{FULL_MONTHS_INDEX?.map(({ value, label }) => {
									return (
										<DropdownItemv2
											title={label}
											value={value}
											key={value}
											className={classes(
												styles['dropdown-item'],
												value === selectedDayInfo.monthAsNumber
													? styles.selected
													: ''
											)}
										/>
									);
								})}
							</Dropdownv2>
							<Dropdownv2 placeholder={selectedDayInfo.year}>
								{Array.from(
									{ length: selectedDayInfo.year - startingYear + 1 },
									(_, i) => selectedDayInfo.year - i
								)?.map((year) => {
									return (
										<DropdownItemv2
											title={year}
											value={year}
											key={year}
											className={classes(
												styles['dropdown-item'],
												year === selectedDayInfo.year ? styles.selected : ''
											)}
										/>
									);
								})}
							</Dropdownv2>
							{showCustomRanges && (
								<Dropdownv2 placeholder='Last 24 hours' className={styles.dropdown}>
									{customRanges?.map((range) => {
										return (
											<DropdownItemv2
												title={range?.title}
												value={range?.value}
												key={range?.value}
												className={styles['dropdown-item']}
											/>
										);
									})}
								</Dropdownv2>
							)}
						</div>
					</div>
				}
				renderFooter={
					<div className={styles.footer}>
						<div className={styles.left}>
							<TextFieldv2
								className={styles.input}
								value={`Selected Date: ${displayValue}`}
								disabled
							/>
						</div>
						<div className={styles.right}>
							<Button
								title='Cancel'
								color='default'
								variant='outlined'
								className={styles.cancel}
								onClick={toggle}
							/>
							<Button
								title='Apply'
								color='primary'
								size='sm'
								className={styles.confirm}
								// onClick={onConfirm}
							/>
						</div>
					</div>
				}
				className={styles.modal}
				open={open}
				hideCrossDismiss
				toggle={toggle}>
				<div className={styles.body}>
					<div className={styles.top}>
						<Calender {...calenderProps} />
					</div>
					<div className={styles.bottom}>
						<div className={styles['dropdown-selection']}>
							<Dropdownv2
								label='Start Time'
								placeholder='00:00'
								leftComponent={() => {
									return <ClockIcon className={classes(styles.icon)} />;
								}}
								className={styles.dropdown}>
								{['00:00', '00:30', '01:00', '01:30', '02:00']?.map((time) => {
									return (
										<DropdownItemv2
											title={time}
											value={time}
											key={time}
											className={classes(
												styles['dropdown-item'],
												time === '01:00' ? styles.selected : ''
											)}
										/>
									);
								})}
							</Dropdownv2>
							<Dropdownv2
								label='End Time'
								placeholder='02:00'
								leftComponent={() => {
									return <ClockIcon className={classes(styles.icon)} />;
								}}
								className={styles.dropdown}>
								{['00:00', '00:30', '01:00', '01:30', '02:00']?.map((time) => {
									return (
										<DropdownItemv2
											title={time}
											value={time}
											key={time}
											className={classes(
												styles['dropdown-item'],
												time === '02:00' ? styles.selected : ''
											)}
										/>
									);
								})}
							</Dropdownv2>
						</div>
						<div className={styles['fixed-selection']}>
							{[
								{
									label: '1 hour',
									value: 1,
								},
								{
									label: '2 hour',
									value: 2,
								},
								{
									label: '5 hour',
									value: 5,
								},
								{
									label: '8 hour',
									value: 8,
								},
								{
									label: '11 hour',
									value: 11,
								},
								{
									label: '14 hour',
									value: 14,
								},
								{
									label: '17 hour',
									value: 17,
								},
								{
									label: '20 hour',
									value: 20,
								},
								{
									label: '24 hour',
									value: 24,
								},
							]?.map((custom) => {
								return (
									<Button
										key={custom?.value}
										title={custom?.label}
										color='default'
										variant='outlined'
										className={styles.custom}
										// onClick={onCancel}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</BaseModal>
		</ErrorBoundary>
	);
};

export default DatePicker;
