import { useEffect, useState, type ReactElement } from 'react';
import { classes } from '../../../../utils';
import { CloseIcon } from '../icons';
import { formatDateLabel, isFutureDisabled, parseRangeText, parseTypedDate } from '../utils';
import styles from './DateField.module.css';
import type { DateFieldProps } from './types';

const ROLE_LABELS: Record<DateFieldProps['role'], string> = {
	start: 'START DATE',
	end: 'END DATE',
	date: 'DATE',
};

const ROLE_PLACEHOLDERS: Record<DateFieldProps['role'], string> = {
	start: 'Select start date',
	end: 'Select end date',
	date: 'Select date',
};

/** C4 Date field: typed/pasted/picked value, a clear (x), and an optional time row. */
const DateField = (props: DateFieldProps): ReactElement => {
	const {
		role,
		date,
		onChangeDate,
		onClear,
		onPasteRange,
		future,
		now,
		error,
		children,
		fill,
		width,
	} = props;

	const [draft, setDraft] = useState(() => (date ? formatDateLabel(date) : ''));
	const [localError, setLocalError] = useState<string | null>(null);

	useEffect(() => {
		setDraft(date ? formatDateLabel(date) : '');
		setLocalError(null);
	}, [date]);

	const commit = (text: string) => {
		const trimmed = text.trim();
		if (!trimmed) {
			setLocalError(null);
			onClear();
			return;
		}

		if (onPasteRange) {
			const range = parseRangeText(trimmed, now);
			if (range) {
				setLocalError(null);
				onPasteRange(range);
				return;
			}
		}

		const parsed = parseTypedDate(trimmed, now);
		if (!parsed) {
			setLocalError('Enter a date like Feb 05, 2024 or 2024-02-05');
			return;
		}
		if (isFutureDisabled(parsed, future, now)) {
			setLocalError('Future dates are not allowed');
			return;
		}
		setLocalError(null);
		onChangeDate(parsed);
	};

	const shownError = error ?? localError;
	const label = ROLE_LABELS[role];

	return (
		<div
			className={classes(styles.root, fill && styles.fill, shownError && styles.error)}
			style={width ? { width, flex: '0 0 auto' } : undefined}
		>
			<div className={styles.valueBlock}>
				<div className={styles.labelRow}>
					<span className={styles.label}>{label}</span>
				</div>
				<input
					className={styles.input}
					value={draft}
					placeholder={ROLE_PLACEHOLDERS[role]}
					aria-label={label}
					onChange={(event) => setDraft(event.target.value)}
					onBlur={() => commit(draft)}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							commit(draft);
							event.currentTarget.blur();
						}
					}}
				/>
				{date && (
					<button
						type='button'
						className={styles.clear}
						aria-label={`Clear ${label.toLowerCase()}`}
						onClick={onClear}
					>
						<CloseIcon />
					</button>
				)}
			</div>
			{children && (
				<>
					<div className={styles.divider} />
					<div className={styles.timeBlock}>{children}</div>
				</>
			)}
			{shownError && <span className={styles.errorText}>{shownError}</span>}
		</div>
	);
};

export default DateField;
