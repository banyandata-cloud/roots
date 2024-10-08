import { classes, doubleDigitted } from '../../../utils';
import { Button } from '../../buttons';
import { Text } from '../../text';
import { calculateMeridian } from '../utils';
import styles from './TimeSwitcher.module.css';

const TimeCounter = ({
	activeTimeSelection = {},
	setActiveTimeSelection,
	setTimeRangeSelection,
	timeRangeSelection = {},
	type,
	limitHours,
}) => {
	const onMeridianClick = (value) => {
		if (limitHours) {
			if (type === 'previous') {
				setTimeRangeSelection({
					...timeRangeSelection,
					[type]: {
						...timeRangeSelection[type],
						MER: value,
					},

					next: {
						...timeRangeSelection.next,
						MER:
							timeRangeSelection.previous.MINS === 0 &&
							timeRangeSelection.previous.HOURS !== 12 &&
							timeRangeSelection.previous.HOURS + limitHours >= 12
								? calculateMeridian(value, timeRangeSelection.next.MER)
								: value,
					},
				});
			} else {
				setTimeRangeSelection({
					...timeRangeSelection,
					[type]: {
						...timeRangeSelection[type],
						MER: value,
					},

					previous: {
						...timeRangeSelection.previous,
						MER:
							timeRangeSelection.previous.MINS === 0 &&
							timeRangeSelection.previous.HOURS !== 12 &&
							timeRangeSelection.previous.HOURS + limitHours >= 12
								? calculateMeridian(value, timeRangeSelection.previous.MER)
								: value,
					},
				});
			}
		} else {
			setTimeRangeSelection({
				...timeRangeSelection,
				[type]: {
					...timeRangeSelection[type],
					MER: value,
				},
			});
		}
	};

	const onTimeSelect = (value) => {
		setActiveTimeSelection({
			[type]: value,
		});
	};

	return (
		<div className={styles['time-counter']}>
			<Button
				onClick={() => {
					onTimeSelect('HR');
				}}
				className={classes(
					styles.time,
					activeTimeSelection[type] === 'HR' ? styles.selected : ''
				)}
				title={doubleDigitted(timeRangeSelection[type]?.HOURS)}
			/>
			<Text weight={600}>:</Text>
			<Button
				onClick={() => {
					onTimeSelect('MIN');
				}}
				className={classes(
					styles.time,
					activeTimeSelection[type] === 'MIN' ? styles.selected : ''
				)}
				title={doubleDigitted(timeRangeSelection[type]?.MINS)}
			/>
			<div className={styles['meridian-container']}>
				<Button
					className={classes(
						styles.meridian,
						timeRangeSelection[type]?.MER === 'AM' ? styles.selected : ''
					)}
					title='AM'
					onClick={() => {
						onMeridianClick('AM');
					}}
				/>
				<Button
					className={classes(
						styles.meridian,
						timeRangeSelection[type]?.MER === 'PM' ? styles.selected : ''
					)}
					title='PM'
					onClick={() => {
						onMeridianClick('PM');
					}}
				/>
			</div>
		</div>
	);
};

const TimeSwitcher = (props) => {
	const { valueAsRange } = props;
	return (
		<div className={styles.root}>
			{valueAsRange && <TimeCounter {...props} type='previous' />}
			{valueAsRange && <Text className={styles.to}>to</Text>}
			<TimeCounter {...props} type='next' />
		</div>
	);
};

export default TimeSwitcher;
