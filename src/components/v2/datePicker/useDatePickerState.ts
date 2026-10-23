import { useCallback, useMemo, useRef, useState } from 'react';
import { addMonths, isSameDay, startOfDay, subMonths } from 'date-fns';
import type { RecentRange } from './presetPanel/types';
import type { DatePickerProps, DatePickerValue, PresetDefinition, SingleTimeMode } from './types';
import {
	clampRangeToToday,
	clampToDataStart,
	findPreset,
	getPresets,
	getSystemTimeZone,
	swapIfReversed,
} from './utils';

const MAX_RECENTS = 3;

function emptyValue(): DatePickerValue {
	return { preset: null, from: null, to: null, fromTime: null, toTime: null };
}

/** Owns every piece of draft/applied state for the picker; the component only renders it. */
export function useDatePickerState(props: DatePickerProps) {
	const {
		mode = 'range',
		time = false,
		future = false,
		autoApply = true,
		dataStart = null,
		defaultPreset,
		value,
		defaultValue,
		onChange,
		onCancel,
		hour12: hour12Prop,
		onHour12Change,
		timeZone,
		open: openProp,
		defaultOpen = false,
		onOpenChange,
	} = props;

	const now = useRef(new Date()).current;
	const isValueControlled = value !== undefined;
	const isOpenControlled = openProp !== undefined;
	const isHour12Controlled = hour12Prop !== undefined;

	const presets = useMemo(() => getPresets(mode, future), [mode, future]);

	const initialValue = useMemo<DatePickerValue>(() => {
		if (defaultValue) {
			return defaultValue;
		}
		const presetId = defaultPreset ?? presets[0]?.id;
		const preset = presetId ? findPreset(mode, future, presetId) : undefined;
		if (preset) {
			const resolved = clampRangeToToday(preset.resolve(now), now, future);
			return {
				preset: preset.id,
				from: resolved.from,
				to: resolved.to,
				fromTime: null,
				toTime: null,
			};
		}
		return emptyValue();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [uncontrolledValue, setUncontrolledValue] = useState<DatePickerValue>(initialValue);
	const appliedValue = isValueControlled ? (value as DatePickerValue) : uncontrolledValue;

	const [draft, setDraft] = useState<DatePickerValue>(appliedValue);
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const open = isOpenControlled ? (openProp as boolean) : uncontrolledOpen;

	const [uncontrolledHour12, setUncontrolledHour12] = useState(true);
	const hour12 = isHour12Controlled ? (hour12Prop as boolean) : uncontrolledHour12;

	const [hoverPreviewEnd, setHoverPreviewEnd] = useState<Date | null>(null);
	const [recents, setRecents] = useState<RecentRange[]>([]);
	const [defaultPresetId, setDefaultPresetId] = useState<string>(
		defaultPreset ?? presets[0]?.id ?? ''
	);
	const [dataStartNote, setDataStartNote] = useState<string | null>(null);

	const [leftMonth, setLeftMonth] = useState<Date>(() => appliedValue.from ?? now);

	const setOpen = useCallback(
		(next: boolean) => {
			if (next) {
				// Reopen on the month of the applied start date, with the applied values (edge case #34).
				setDraft(appliedValue);
				setLeftMonth(appliedValue.from ?? now);
				setHoverPreviewEnd(null);
				setDataStartNote(null);
			}
			if (!isOpenControlled) {
				setUncontrolledOpen(next);
			}
			onOpenChange?.(next);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[appliedValue, isOpenControlled, onOpenChange]
	);

	const setHour12 = useCallback(
		(next: boolean) => {
			if (!isHour12Controlled) {
				setUncontrolledHour12(next);
			}
			onHour12Change?.(next);
		},
		[isHour12Controlled, onHour12Change]
	);

	const commit = useCallback(
		(next: DatePickerValue, options: { close: boolean } = { close: false }) => {
			if (!isValueControlled) {
				setUncontrolledValue(next);
			}
			onChange?.(next);
			if (options.close) {
				setOpen(false);
			}
		},
		[isValueControlled, onChange, setOpen]
	);

	const clampFrom = useCallback(
		(date: Date) => {
			const clamped = clampToDataStart(date, dataStart);
			if (!isSameDay(clamped, date) && dataStart) {
				setDataStartNote(
					`Your data starts on ${dataStart.toDateString()}, so ${clamped.toDateString()} was selected.`
				);
			} else {
				setDataStartNote(null);
			}
			return clamped;
		},
		[dataStart]
	);

	const onSelectPreset = useCallback(
		(preset: PresetDefinition) => {
			// Never select a disabled (future) day unless future dates are allowed —
			// e.g. "This quarter" naturally runs past today.
			const resolved = clampRangeToToday(preset.resolve(now), now, future);
			const next: DatePickerValue = {
				...draft,
				preset: preset.id,
				from: resolved.from,
				to: resolved.to,
			};
			setDraft(next);
			setLeftMonth(resolved.from);
			// Preset click always applies instantly (but never closes the popover —
			// only Cancel/Apply do that).
			commit(next);
		},
		[commit, draft, future, now]
	);

	const onSelectRecent = useCallback(
		(recent: RecentRange) => {
			const next: DatePickerValue = {
				...draft,
				preset: null,
				from: recent.from,
				to: recent.to,
			};
			setDraft(next);
			setLeftMonth(recent.from);
			commit(next);
		},
		[commit, draft]
	);

	const pushRecent = useCallback((from: Date, to: Date) => {
		const label = `${from.toDateString()} \u2192 ${to.toDateString()}`;
		setRecents((prev) => {
			const withoutDupe = prev.filter(
				(item) => !(isSameDay(item.from, from) && isSameDay(item.to, to))
			);
			return [
				{ id: `${from.getTime()}-${to.getTime()}`, label, from, to },
				...withoutDupe,
			].slice(0, MAX_RECENTS);
		});
	}, []);

	const maybeAutoApply = useCallback(
		(next: DatePickerValue, complete: boolean) => {
			if (complete && autoApply && !time) {
				if (mode === 'range' && !next.preset && next.from && next.to) {
					pushRecent(next.from, next.to);
				}
				commit(next);
			}
		},
		[autoApply, commit, mode, pushRecent, time]
	);

	const onSelectDay = useCallback(
		(rawDate: Date) => {
			const date = clampFrom(startOfDay(rawDate));

			if (mode === 'single') {
				const next: DatePickerValue = { ...draft, preset: null, from: date, to: null };
				setDraft(next);
				maybeAutoApply(next, true);
				return;
			}

			const hasCompleteRange = !!draft.from && !!draft.to;
			if (!draft.from || hasCompleteRange) {
				const next: DatePickerValue = { ...draft, preset: null, from: date, to: null };
				setDraft(next);
				return;
			}

			const [from, to] = swapIfReversed(draft.from, date);
			const next: DatePickerValue = { ...draft, preset: null, from, to };
			setDraft(next);
			setHoverPreviewEnd(null);
			maybeAutoApply(next, true);
		},
		[clampFrom, draft, maybeAutoApply, mode]
	);

	const onHoverDay = useCallback(
		(date: Date) => {
			if (mode === 'range' && draft.from && !draft.to) {
				setHoverPreviewEnd(date);
			}
		},
		[draft.from, draft.to, mode]
	);

	const onHoverLeave = useCallback(() => setHoverPreviewEnd(null), []);

	const onClearStart = useCallback(() => {
		const next: DatePickerValue = { ...draft, preset: null, from: null, to: null };
		setDraft(next);
	}, [draft]);

	const onClearEnd = useCallback(() => {
		const next: DatePickerValue = { ...draft, preset: null, to: null };
		setDraft(next);
	}, [draft]);

	const onChangeDateField = useCallback(
		(role: 'start' | 'end' | 'date', date: Date) => {
			const clamped = clampFrom(date);
			if (role === 'date') {
				const next: DatePickerValue = { ...draft, preset: null, from: clamped, to: null };
				setDraft(next);
				maybeAutoApply(next, true);
				return;
			}
			if (role === 'start') {
				const end = draft.to ?? clamped;
				const [from, to] = swapIfReversed(clamped, end);
				setDraft({ ...draft, preset: null, from, to: draft.to ? to : null });
				return;
			}
			const start = draft.from ?? clamped;
			const [from, to] = swapIfReversed(start, clamped);
			const next: DatePickerValue = { ...draft, preset: null, from, to };
			setDraft(next);
			maybeAutoApply(next, !!next.from && !!next.to);
		},
		[clampFrom, draft, maybeAutoApply]
	);

	const onPasteRange = useCallback(
		(range: { from: Date; to: Date }) => {
			const from = clampFrom(range.from);
			const to = future ? range.to : range.to > now ? now : range.to;
			const next: DatePickerValue = { ...draft, preset: null, from, to };
			setDraft(next);
			setLeftMonth(from);
			maybeAutoApply(next, true);
		},
		[clampFrom, draft, future, maybeAutoApply, now]
	);

	const onChangeFromTime = useCallback((fromTime: { hour: number; minute: number }) => {
		setDraft((prev) => ({ ...prev, preset: null, fromTime }));
	}, []);

	const onChangeToTime = useCallback((toTime: { hour: number; minute: number }) => {
		setDraft((prev) => ({ ...prev, preset: null, toTime }));
	}, []);

	const onChangeTimeMode = useCallback((timeMode: SingleTimeMode) => {
		setDraft((prev) => ({ ...prev, timeMode }));
	}, []);

	const onNavPrevYear = useCallback(() => setLeftMonth((m) => subMonths(m, 12)), []);
	const onNavPrevMonth = useCallback(() => setLeftMonth((m) => subMonths(m, 1)), []);
	const onNavNextMonth = useCallback(() => setLeftMonth((m) => addMonths(m, 1)), []);
	const onNavNextYear = useCallback(() => setLeftMonth((m) => addMonths(m, 12)), []);

	const applyDisabled = useMemo(() => {
		if (mode === 'single') {
			return !draft.from;
		}
		return !draft.from || !draft.to;
	}, [draft.from, draft.to, mode]);

	const onApply = useCallback(() => {
		if (applyDisabled) {
			return;
		}
		if (mode === 'range' && !draft.preset && draft.from && draft.to) {
			pushRecent(draft.from, draft.to);
		}
		commit(draft, { close: true });
	}, [applyDisabled, commit, draft, mode, pushRecent]);

	const onCancelClick = useCallback(() => {
		setDraft(appliedValue);
		onCancel?.();
		setOpen(false);
	}, [appliedValue, onCancel, setOpen]);

	return {
		now,
		open,
		setOpen,
		draft,
		appliedValue,
		leftMonth,
		rightMonth: addMonths(leftMonth, 1),
		hoverPreviewEnd,
		presets,
		recents,
		hour12,
		setHour12,
		timeZone: timeZone ?? getSystemTimeZone(),
		defaultPresetId,
		setDefaultPresetId,
		dataStartNote,
		applyDisabled,
		mode,
		time,
		future,
		dataStart,
		onSelectPreset,
		onSelectRecent,
		onSelectDay,
		onHoverDay,
		onHoverLeave,
		onClearStart,
		onClearEnd,
		onChangeDateField,
		onPasteRange,
		onChangeFromTime,
		onChangeToTime,
		onChangeTimeMode,
		onNavPrevYear,
		onNavPrevMonth,
		onNavNextMonth,
		onNavNextYear,
		onApply,
		onCancel: onCancelClick,
	};
}

export type DatePickerController = ReturnType<typeof useDatePickerState>;
