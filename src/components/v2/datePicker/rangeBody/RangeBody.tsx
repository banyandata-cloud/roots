import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import Calendar from '../calendar/Calendar';
import DateField from '../dateField/DateField';
import RangeArrow from '../rangeArrow/RangeArrow';
import SummaryCard from '../summaryCard/SummaryCard';
import TimeSelect from '../timeSelect/TimeSelect';
import { combineDateAndTime, DEFAULT_TIME, formatDateLabel, formatDuration } from '../utils';
import type { DatePickerController } from '../useDatePickerState';
import styles from './RangeBody.module.css';

/** Range-mode main area: fields row, two calendars, summary card, reserved message line. */
const RangeBody = (props: { controller: DatePickerController }): ReactElement => {
	const { controller } = props;
	const {
		draft,
		now,
		future,
		time,
		leftMonth,
		rightMonth,
		hoverPreviewEnd,
		hour12,
		dataStartNote,
		presets,
		onSelectDay,
		onHoverDay,
		onHoverLeave,
		onClearStart,
		onClearEnd,
		onChangeDateField,
		onPasteRange,
		onChangeFromTime,
		onChangeToTime,
		onNavPrevYear,
		onNavPrevMonth,
		onNavNextMonth,
		onNavNextYear,
	} = controller;

	const sameDay =
		!!draft.from && !!draft.to && draft.from.toDateString() === draft.to.toDateString();
	// Falls back to DEFAULT_TIME (not undefined) when fromTime hasn't been touched yet
	// — "Starts at" still *displays* 9:00 AM as its default even though the state is
	// null, so the clamp must use that same effective value or it silently stays
	// disabled and lets "Ends at" be picked less than an hour later.
	const minEndTime = sameDay ? (draft.fromTime ?? DEFAULT_TIME) : undefined;

	const summaryState = !draft.from ? 'empty' : !draft.to ? 'start-only' : 'filled';
	// Duration must account for the selected time-of-day too (edge case: a same-day
	// 9:00->9:20 range was showing "0 mins" because only the calendar dates — both at
	// midnight — were diffed, ignoring fromTime/toTime entirely). Both TimeSelects show
	// DEFAULT_TIME (9:00 AM) whenever their value is still unset, so resolve to that
	// same fallback here too — otherwise an untouched "Ends at" (null) combines as
	// midnight and the pair can show a nonsensical negative duration.
	const durationText =
		draft.from && draft.to
			? formatDuration(
					time
						? combineDateAndTime(draft.from, draft.fromTime ?? DEFAULT_TIME)
						: draft.from,
					time ? combineDateAndTime(draft.to, draft.toTime ?? DEFAULT_TIME) : draft.to,
					{ withTime: time }
				)
			: undefined;
	const datesText =
		draft.from && draft.to
			? `${formatDateLabel(draft.from)} \u2192 ${formatDateLabel(draft.to)}`
			: undefined;
	const presetLabel = draft.preset
		? (presets.find((preset) => preset.id === draft.preset)?.label ?? null)
		: null;

	// Each DateField's width is pinned to its paired Calendar's own measured width
	// (item 9: right edges must align) independently of the fields row's own gap —
	// that decoupling is what lets the gap around the arrow be wide enough for real
	// clearance without reopening the misalignment the gap-matching trick caused.
	//
	// The fields row's gap (44px = 12px clearance + 20px arrow icon + 12px clearance)
	// is wider than the calendars row's (16px, flattened). Both rows start at the same
	// left edge, so pinning the *start* field to its calendar's raw width keeps that
	// first pair's right edges aligned already; the full 28px gap difference then has
	// to come off the *end* field alone so the second pair's right edges land in the
	// same place too — splitting the correction across both fields would misalign the
	// first pair by half of it instead. Because that leaves the two fields with
	// slightly different widths, the arrow is positioned explicitly at `start width +
	// half the gap` instead of relying on CSS `left: 50%`, so it still sits exactly
	// centered in the true gap rather than in the middle of the (now asymmetric) row.
	// These constants must stay in sync with RangeBody.module.scss's `.fieldsRow`/
	// `.calendarsRow` gap values.
	const FIELDS_ROW_GAP_PX = 44;
	const CALENDARS_ROW_GAP_PX = 16;
	const END_FIELD_GAP_CORRECTION_PX = FIELDS_ROW_GAP_PX - CALENDARS_ROW_GAP_PX;

	const leftCalendarRef = useRef<HTMLDivElement>(null);
	const rightCalendarRef = useRef<HTMLDivElement>(null);
	const [fieldWidths, setFieldWidths] = useState<{ start?: number; end?: number }>({});

	useEffect(() => {
		if (typeof ResizeObserver === 'undefined') {
			return undefined;
		}
		const leftNode = leftCalendarRef.current;
		const rightNode = rightCalendarRef.current;
		if (!leftNode || !rightNode) {
			return undefined;
		}
		const observer = new ResizeObserver((entries) => {
			setFieldWidths((prev) => {
				const next = { ...prev };
				entries.forEach((entry) => {
					if (entry.target === leftNode) {
						next.start = entry.contentRect.width;
					} else if (entry.target === rightNode) {
						next.end = entry.contentRect.width - END_FIELD_GAP_CORRECTION_PX;
					}
				});
				return next;
			});
		});
		observer.observe(leftNode);
		observer.observe(rightNode);
		return () => observer.disconnect();
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.fieldsRow}>
				<DateField
					role='start'
					date={draft.from}
					future={future}
					now={now}
					fill
					width={fieldWidths.start}
					onChangeDate={(date) => onChangeDateField('start', date)}
					onClear={onClearStart}
					onPasteRange={onPasteRange}
				>
					{time && (
						<TimeSelect
							label='Starts at'
							value={draft.fromTime ?? null}
							hour12={hour12}
							onChange={onChangeFromTime}
						/>
					)}
				</DateField>
				<RangeArrow
					className={styles.arrowOverlay}
					style={
						fieldWidths.start != null
							? { left: fieldWidths.start + FIELDS_ROW_GAP_PX / 2 }
							: undefined
					}
				/>
				<DateField
					role='end'
					date={draft.to}
					future={future}
					now={now}
					fill
					width={fieldWidths.end}
					onChangeDate={(date) => onChangeDateField('end', date)}
					onClear={onClearEnd}
					onPasteRange={onPasteRange}
				>
					{time && (
						<TimeSelect
							label='Ends at'
							value={draft.toTime ?? null}
							hour12={hour12}
							onChange={onChangeToTime}
							minExclusive={minEndTime}
						/>
					)}
				</DateField>
			</div>
			<div className={styles.calendarsRow}>
				<Calendar
					ref={leftCalendarRef}
					month={leftMonth}
					position='left'
					now={now}
					future={future}
					selectionStart={draft.from}
					selectionEnd={draft.to}
					hoverPreviewEnd={hoverPreviewEnd}
					onSelectDay={onSelectDay}
					onHoverDay={onHoverDay}
					onHoverLeave={onHoverLeave}
					onPrevYear={onNavPrevYear}
					onPrevMonth={onNavPrevMonth}
					onNextMonth={onNavNextMonth}
					onNextYear={onNavNextYear}
				/>
				<Calendar
					ref={rightCalendarRef}
					month={rightMonth}
					position='right'
					now={now}
					future={future}
					selectionStart={draft.from}
					selectionEnd={draft.to}
					hoverPreviewEnd={hoverPreviewEnd}
					onSelectDay={onSelectDay}
					onHoverDay={onHoverDay}
					onHoverLeave={onHoverLeave}
					onPrevYear={onNavPrevYear}
					onPrevMonth={onNavPrevMonth}
					onNextMonth={onNavNextMonth}
					onNextYear={onNavNextYear}
				/>
			</div>
			<SummaryCard
				state={summaryState}
				durationText={durationText}
				datesText={datesText}
				presetLabel={presetLabel}
				startLabel={draft.from ? formatDateLabel(draft.from) : undefined}
			/>
			<div className={styles.messageLine}>{dataStartNote}</div>
		</div>
	);
};

export default RangeBody;
