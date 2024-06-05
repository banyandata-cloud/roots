/* eslint-disable no-nested-ternary */
/* eslint-disable no-lonely-if */
import { isNumber } from 'highcharts';
import { useEffect, useState } from 'react';
import { classes, doubleDigitted } from '../../../utils';
import { Text } from '../../text';
import styles from './ClockView.module.css';
import { clockConfig } from './config';

const clockHours = new Array(12).fill().map((_, index) => {
	return index;
});

const clockMins = [
	0,
	...new Array(55)
		.fill()
		.map((_, index) => {
			if ((index + 1) % 5 === 0) {
				return index + 1;
			}
			return null;
		})
		.filter(Boolean),
];

const calculateMeridian = (prev, next) => {
	if (prev === next) {
		return prev === 'AM' ? 'PM' : 'AM';
	}
	return next;
};

const ClockView = (props = {}) => {
	const {
		activeTimeSelection = {},
		timeRangeSelection = {},
		setTimeRangeSelection,
		limitHours,
	} = props;

	const isMin = Object.values(activeTimeSelection)?.[0] === 'MIN';

	const rangeType = Object.keys(activeTimeSelection)?.[0];

	const [selectedValue, setSelectedValue] = useState(null);

	const disabled = Object.values(activeTimeSelection)?.[0] === undefined;

	useEffect(() => {
		setSelectedValue(null);
	}, [activeTimeSelection]);

	const clockNumberArgs = (item, isMins) => {
		const absoluteCalcValue = isMins ? item / 5 : item;

		return {
			variant: 'b1',
			component: 'button',
			className: classes(
				styles.number,
				selectedValue === absoluteCalcValue ? styles.selected : '',
				disabled ? styles.disabled : ''
			),
			attrs: {
				style: {
					...clockConfig[absoluteCalcValue],
					fontWeight: 500,
				},
				onClick: () => {
					if (disabled) {
						return;
					}
					setSelectedValue(absoluteCalcValue);
					if (limitHours) {
						if (isMin) {
							if (rangeType === 'previous') {
								setTimeRangeSelection({
									next: {
										...timeRangeSelection.next,
										MINS: item,
									},
									previous: {
										...timeRangeSelection[rangeType],
										MINS: item,
									},
								});
							} else {
								setTimeRangeSelection({
									previous: {
										...timeRangeSelection.previous,
										MINS: item,
									},
									next: {
										...timeRangeSelection[rangeType],
										MINS: item,
									},
								});
							}
						} else {
							if (rangeType === 'previous') {
								setTimeRangeSelection({
									next: {
										...timeRangeSelection.next,
										HOURS: item === 0 ? 1 : item + limitHours,
										MER:
											item + limitHours >= 12
												? calculateMeridian(
														timeRangeSelection.previous.MER,
														timeRangeSelection.next.MER
												  )
												: timeRangeSelection.previous.MER,
									},
									previous: {
										...timeRangeSelection[rangeType],
										HOURS: item === 0 ? 12 : item,
									},
								});
							} else {
								setTimeRangeSelection({
									previous: {
										...timeRangeSelection.previous,
										HOURS:
											item === 0 ? 11 : item === 1 ? 12 : item - limitHours,
										MER: item === 11 ? 'AM' : 'PM',
									},
									next: {
										...timeRangeSelection[rangeType],
										HOURS: item === 0 ? 12 : item,
									},
								});
							}
						}
						return;
					}
					if (isMin) {
						setTimeRangeSelection({
							...timeRangeSelection,
							[rangeType]: {
								...timeRangeSelection[rangeType],
								MINS: item,
							},
						});
					} else {
						setTimeRangeSelection({
							...timeRangeSelection,
							[rangeType]: {
								...timeRangeSelection[rangeType],
								HOURS: item === 0 ? 12 : item,
							},
						});
					}
				},
			},
		};
	};

	const connectorArgs = () => {
		return {
			className: styles.connector,
			style: {
				rotate: `${selectedValue * 30}deg`,
				...(selectedValue >= 5
					? {
							top: '29%',
							left: '49%',
					  }
					: {
							top: '30%',
							left: '50%',
					  }),
			},
		};
	};

	const showConnector = !disabled && isNumber(selectedValue) && selectedValue >= 0;

	if (isMin) {
		return (
			<div className={styles.root}>
				<div className={styles.clock}>
					{clockMins?.map((item) => {
						return (
							<Text key={item} {...clockNumberArgs(item, true)}>
								{doubleDigitted(item)}
							</Text>
						);
					})}
					<div className={styles.midpoint} />
					{showConnector && <div {...connectorArgs()} />}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.root}>
			<div className={styles.clock}>
				{clockHours?.map((item) => {
					return (
						<Text key={item} {...clockNumberArgs(item)}>
							{item === 0 ? 12 : item}
						</Text>
					);
				})}
				<div className={styles.midpoint} />
				{showConnector && <div {...connectorArgs()} />}
			</div>
		</div>
	);
};

export default ClockView;
