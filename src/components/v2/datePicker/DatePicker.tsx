import { autoUpdate, flip, offset, shift } from '@floating-ui/react-dom';
import {
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useRole,
} from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { classes } from '../../../utils';
import { Popper } from '../../popper';
import styles from './DatePicker.module.css';
import Footer from './footer/Footer';
import PresetPanel from './presetPanel/PresetPanel';
import RangeBody from './rangeBody/RangeBody';
import SingleBody from './singleBody/SingleBody';
import Trigger from './trigger/Trigger';
import type { DatePickerProps } from './types';
import { useDatePickerState } from './useDatePickerState';
import { formatDateLabel } from './utils';

/**
 * One date picker for every page that filters by date. Range or single-date mode,
 * fixed per page; presets, typed/pasted dates, and optional time controls.
 *
 * Covers the popover body for range and single-date modes. The bottom sheet for
 * narrow screens and the final C1 trigger visual are follow-ups (see project notes).
 */
const DatePicker = (props: DatePickerProps): ReactElement => {
	const { trigger, className, id } = props;
	const controller = useDatePickerState(props);
	const {
		open,
		setOpen,
		appliedValue,
		mode,
		presets,
		recents,
		hour12,
		setHour12,
		timeZone,
		defaultPresetId,
		setDefaultPresetId,
		applyDisabled,
		draft,
		onSelectPreset,
		onSelectRecent,
		onApply,
		onCancel,
	} = controller;

	const { x, y, reference, floating, strategy, context } = useFloating({
		open,
		onOpenChange: setOpen,
		placement: 'bottom-start',
		whileElementsMounted: autoUpdate,
		middleware: [offset(6), flip(), shift({ padding: 8 })],
	});

	const click = useClick(context);
	const dismiss = useDismiss(context, {
		// This version of useDismiss only supports a boolean here (no per-event
		// predicate), so the "ignore clicks inside the nested Dropdown menu" rule is
		// implemented by hand below instead, via a dedicated pointerdown listener.
		outsidePress: false,
	});
	const role = useRole(context, { role: 'dialog' });
	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

	useEffect(() => {
		if (!open) {
			return undefined;
		}

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target as Element | null;
			if (!target) {
				return;
			}
			// The nested v2 Dropdown (hour/minute/AM-PM, Default to show) renders its menu
			// in its own portal outside this dialog's DOM subtree. Without this guard,
			// picking an option there would look like an "outside" click and close the
			// whole picker.
			if (target.closest('[data-dropdown-menu]')) {
				return;
			}
			if (context.refs.floating.current?.contains(target)) {
				return;
			}
			if (context.refs.domReference.current?.contains(target)) {
				return;
			}
			setOpen(false);
		};

		document.addEventListener('pointerdown', handlePointerDown);
		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
		};
	}, [open, context.refs, setOpen]);

	const presetLabel = appliedValue.preset
		? (presets.find((preset) => preset.id === appliedValue.preset)?.label ?? null)
		: null;

	let triggerLabel = 'All time';
	let triggerSubLabel: string | undefined;
	if (presetLabel) {
		triggerLabel = presetLabel;
		if (appliedValue.from) {
			triggerSubLabel =
				mode === 'single' || !appliedValue.to
					? formatDateLabel(appliedValue.from)
					: `${formatDateLabel(appliedValue.from)} \u2013 ${formatDateLabel(appliedValue.to)}`;
		}
	} else if (appliedValue.from) {
		triggerLabel =
			mode === 'single' || !appliedValue.to
				? formatDateLabel(appliedValue.from)
				: `${formatDateLabel(appliedValue.from)} \u2013 ${formatDateLabel(appliedValue.to)}`;
	} else {
		triggerSubLabel = timeZone;
	}

	const defaultPresetOptions = presets.map((preset) => ({
		value: preset.id,
		label: preset.label,
	}));

	return (
		<div className={classes(styles.wrapper, className)} id={id}>
			{trigger ? (
				<span className={styles.triggerSlot} {...getReferenceProps({ ref: reference })}>
					{trigger({ label: triggerLabel, subLabel: triggerSubLabel, open })}
				</span>
			) : (
				<Trigger
					label={triggerLabel}
					subLabel={triggerSubLabel}
					open={open}
					{...getReferenceProps({ ref: reference })}
				/>
			)}
			<Popper
				open={open}
				backdrop={false}
				lockScroll={false}
				wrapperId='v2-datepicker-portal'
			>
				<AnimatePresence>
					{open && (
						<motion.div
							{...getFloatingProps({
								ref: floating,
								className: styles.popover,
								style: { position: strategy, top: y ?? 0, left: x ?? 0 },
							})}
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.98 }}
							transition={{ duration: 0.12 }}
						>
							<div className={styles.body}>
								<div className={styles.bodyInner}>
									<PresetPanel
										presets={presets}
										selectedPresetId={draft.preset ?? null}
										onSelectPreset={onSelectPreset}
										recents={recents}
										onSelectRecent={onSelectRecent}
									/>
									<div className={styles.main}>
										{mode === 'range' ? (
											<RangeBody controller={controller} />
										) : (
											<SingleBody controller={controller} />
										)}
									</div>
								</div>
							</div>
							<Footer
								defaultPresetOptions={defaultPresetOptions}
								defaultPresetValue={defaultPresetId}
								onDefaultPresetChange={setDefaultPresetId}
								hour12={hour12}
								onHour12Change={setHour12}
								timeZone={timeZone}
								onCancel={onCancel}
								onApply={onApply}
								applyDisabled={applyDisabled}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</Popper>
		</div>
	);
};

export default DatePicker;
