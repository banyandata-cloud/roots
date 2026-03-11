/* eslint-disable no-nested-ternary */
/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react';
import { classes, doubleDigitted } from '../../../utils';
import { Text } from '../../text';
import type { TextComponentType, TextVariant } from '../../text/types';
import { calculateMeridian } from '../utils';
import styles from './ClockView.module.css';
import { clockConfig } from './config';
import type { ActiveTimeSelection, TimeRangeSelection } from '../calender/Calender';

interface ClockViewProps {
	activeTimeSelection?: ActiveTimeSelection | undefined;
	timeRangeSelection?: TimeRangeSelection | undefined;
	setTimeRangeSelection?: ((value: TimeRangeSelection) => void) | undefined;
	limitHours?: number | undefined;
}

type RangeType = 'previous' | 'next';

// Constants
const clockHours: number[] = new Array(12).fill(null).map((_: null, index: number) => index);

const clockMins: number[] = [
	0,
	...new Array(55)
		.fill(null)
		.map((_: null, index: number) => {
			if ((index + 1) % 5 === 0) return index + 1;
			return null;
		})
		.filter((item): item is number => item !== null),
];

// Component
const ClockView = (props: ClockViewProps = {}): React.JSX.Element => {
	const {
		activeTimeSelection = {},
		timeRangeSelection = {},
		setTimeRangeSelection,
		limitHours,
	} = props;

	const isMin = Object.values(activeTimeSelection)?.[0] === 'MIN';
	const rangeType = Object.keys(activeTimeSelection)?.[0] as RangeType;
	const [selectedValue, setSelectedValue] = useState<number | null>(null);
	const disabled = Object.values(activeTimeSelection)?.[0] === undefined;

	useEffect(() => {
		setSelectedValue(null);
	}, [activeTimeSelection]);

	const clockNumberArgs = (item: number, isMins?: boolean) => {
		const absoluteCalcValue = isMins ? item / 5 : item;
		return {
			variant: 'b1' as TextVariant,
			component: 'span' as TextComponentType,
			className: classes(
				styles.number,
				selectedValue === absoluteCalcValue ? styles.selected : '',
				disabled ? styles.disabled : ''
			),
			attrs: {
				style: { ...clockConfig[absoluteCalcValue], fontWeight: 500 },
				onClick: () => {
					if (disabled) return;
					setSelectedValue(absoluteCalcValue);
					if (limitHours) {
						if (isMin) {
							if (rangeType === 'previous') {
								setTimeRangeSelection?.({
									next: { ...timeRangeSelection.next, MINS: item },
									previous: { ...timeRangeSelection[rangeType], MINS: item },
								});
							} else {
								setTimeRangeSelection?.({
									previous: { ...timeRangeSelection.previous, MINS: item },
									next: { ...timeRangeSelection[rangeType], MINS: item },
								});
							}
						} else {
							if (rangeType === 'previous') {
								setTimeRangeSelection?.({
									next: {
										...timeRangeSelection.next,
										HOURS: item === 0 ? 1 : item + limitHours,
										MINS: timeRangeSelection.previous?.MINS,
										MER:
											item + limitHours >= 12
												? calculateMeridian(
														timeRangeSelection.previous?.MER,
														timeRangeSelection.next?.MER
													)
												: timeRangeSelection.previous?.MER,
									},
									previous: {
										...timeRangeSelection[rangeType],
										HOURS: item === 0 ? 12 : item,
									},
								});
							} else {
								setTimeRangeSelection?.({
									previous: {
										...timeRangeSelection.previous,
										HOURS:
											item === 0 ? 11 : item === 1 ? 12 : item - limitHours,
										MER:
											item - limitHours < 0
												? calculateMeridian(
														timeRangeSelection.previous?.MER,
														timeRangeSelection.next?.MER
													)
												: timeRangeSelection.previous?.MER,
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
						setTimeRangeSelection?.({
							...timeRangeSelection,
							[rangeType]: { ...timeRangeSelection[rangeType], MINS: item },
						});
					} else {
						setTimeRangeSelection?.({
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

	const connectorArgs = () => ({
		className: styles.connector,
		style: {
			rotate: `${(selectedValue ?? 0) * 30}deg`,
			...((selectedValue ?? 0) >= 5
				? { top: '29%', left: '49%' }
				: { top: '30%', left: '50%' }),
		},
	});

	const showConnector = !disabled && !Number.isNaN(selectedValue) && (selectedValue ?? -1) >= 0;

	if (isMin) {
		return (
			<div className={styles.root}>
				<div className={styles.clock}>
					{clockMins?.map((item: number) => (
						<Text key={item} {...clockNumberArgs(item, true)}>
							{doubleDigitted(item)}
						</Text>
					))}
					<div className={styles.midpoint} />
					{showConnector && <div {...connectorArgs()} />}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.root}>
			<div className={styles.clock}>
				{clockHours?.map((item: number) => (
					<Text key={item} {...clockNumberArgs(item)}>
						{item === 0 ? 12 : item}
					</Text>
				))}
				<div className={styles.midpoint} />
				{showConnector && <div {...connectorArgs()} />}
			</div>
		</div>
	);
};

export default ClockView;
