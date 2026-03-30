import React, { forwardRef, useEffect, useRef, useState } from 'react';
import TextField from '../../input/textField/TextField';
import Checkbox from '../checkbox/CheckBox';
import Indicator from '../tags/assets/Indicator/Indicator';
import type { TagProps, TagSize } from '../tags/types';
import Logo from './assets/Logo/Logo1';
import TagCloserLg from './assets/TagCloser/TagCloserLg';
import TagCloserMd from './assets/TagCloser/TagCloserMd';
import TagCloserSm from './assets/TagCloser/TagCloserSm';
import TagCountLg from './assets/TagCount/TagCountLg';
import TagCountMd from './assets/TagCount/TagCountMd';
import TagCountSm from './assets/TagCount/TagCountSm';
import styles from './Tags.module.scss';

const INDICATOR_SIZE: Record<TagSize, number> = {
	sm: 8,
	md: 8,
	lg: 10,
};

const CLOSER_MAP: Record<TagSize, React.ReactElement> = {
	sm: <TagCloserSm />,
	md: <TagCloserMd />,
	lg: <TagCloserLg />,
};

const COUNT_MAP = (count: number): Record<TagSize, React.ReactElement> => ({
	sm: <TagCountSm count={count} />,
	md: <TagCountMd count={count} />,
	lg: <TagCountLg count={count} />,
});

const Tag = forwardRef<HTMLInputElement, TagProps>(
	(
		{
			label = 'Label',
			size = 'sm',
			closable = false,
			checkbox = false,
			indicator = false,
			indicatorType = 'success',
			count,
			checkboxIndicator = false,
			checkboxIndicatorClosable = false,
			checkboxIndicatorCount = false,
			onlyCount = false,
			checkboxCloser = false,
			checkboxCount = false,
			logo = false,
			checkboxLogo = false,
			checkboxLogoClosable = false,
			checkboxLogoCount = false,
			textField = false,
			inputValue,
			onInputChange,
			defaultInputValue = '',
			inputPlaceholder = '',
			onInputClear,
		},
		ref
	) => {
		const isCheckboxClosable = checkbox && closable;
		const isIndicatorClosable = indicator && closable;
		const isIndicatorCount = indicator && count !== undefined;
		const isLogoClosable = logo && closable;
		const isLogoCount = logo && count !== undefined;

		const isControlled = inputValue !== undefined;
		const [internalValue, setInternalValue] = useState<string>(defaultInputValue);
		const resolvedValue = isControlled ? inputValue : internalValue;

		const internalInputRef = useRef<HTMLInputElement>(null);
		const resolvedRef = (ref ?? internalInputRef) as React.RefObject<HTMLInputElement>;
		const sizerRef = useRef<HTMLSpanElement>(null);

		const focusInput = () => {
			resolvedRef.current?.focus();
		};

		useEffect(() => {
			if (sizerRef.current && resolvedRef.current) {
				resolvedRef.current.style.width = sizerRef.current.offsetWidth + 'px';
			}
		}, [resolvedValue, inputPlaceholder]);

		const handleChange = (
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
			val?: string
		) => {
			const next = val ?? '';
			if (!isControlled) setInternalValue(next);
			onInputChange?.(next, e as React.ChangeEvent<HTMLInputElement>);
		};

		const handleClear = () => {
			if (!isControlled) setInternalValue('');
			onInputClear?.();
		};

		const CloserSpan = ({ extraClass }: { extraClass?: string }) => (
			<span
				className={[styles.tag__closer, styles[`tag__closer--${size}`], extraClass]
					.filter(Boolean)
					.join(' ')}>
				{CLOSER_MAP[size]}
			</span>
		);

		const CheckboxIndicatorCloserSpan = () => (
			<span
				className={[
					styles.tag__closer,
					styles[`tag__closer--checkbox-indicator-${size}`],
				].join(' ')}>
				{CLOSER_MAP[size]}
			</span>
		);

		if (textField) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--textfield`],
					].join(' ')}
					onClick={focusInput}>
					<span className={styles.tag__textfield_label}>{label}</span>
					<span
						ref={sizerRef}
						aria-hidden
						style={{
							position: 'absolute',
							visibility: 'hidden',
							whiteSpace: 'pre',
							fontSize: 'inherit',
							fontWeight: 'inherit',
							fontFamily: 'inherit',
							letterSpacing: 'inherit',
							pointerEvents: 'none',
						}}>
						{resolvedValue || inputPlaceholder || '\u200b'}
					</span>
					<TextField
						ref={resolvedRef as any}
						unstyled
						size={size}
						value={resolvedValue}
						onChange={handleChange}
						placeholder={inputPlaceholder}
						className={[
							styles.tag__textfield_input,
							styles[`tag__textfield_input--${size}`],
						]
							.filter(Boolean)
							.join(' ')}
					/>
					<span
						className={styles.tag__textfield_closer}
						onClick={(e) => {
							e.stopPropagation();
							handleClear();
							focusInput();
						}}>
						{CLOSER_MAP[size]}
					</span>
				</span>
			);
		}

		if (onlyCount && count !== undefined) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--count`],
					].join(' ')}>
					{label}
					<span className={[styles.tag__count, styles[`tag__count--${size}`]].join(' ')}>
						{COUNT_MAP(count)[size]}
					</span>
				</span>
			);
		}

		if (checkboxCloser) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--checkbox-closable`],
					].join(' ')}>
					<Checkbox size={size} />
					{label}
					<CloserSpan />
				</span>
			);
		}

		if (checkboxCount && count !== undefined) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--checkbox-count`],
					].join(' ')}>
					<Checkbox size={size} />
					{label}
					<span
						className={[styles.tag__count, styles[`tag__count--checkbox-${size}`]].join(
							' '
						)}>
						{COUNT_MAP(count)[size]}
					</span>
				</span>
			);
		}

		if (checkboxLogoCount && count !== undefined) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--checkbox-indicator-count`],
					].join(' ')}>
					<Checkbox size={size} />
					<Logo
						className={[styles.tag__logo, styles[`tag__logo--checkbox-count-${size}`]]
							.filter(Boolean)
							.join(' ')}
					/>
					{label}
					<span
						className={[
							styles.tag__count,
							styles[`tag__count--checkbox-indicator-${size}`],
						].join(' ')}>
						{COUNT_MAP(count)[size]}
					</span>
				</span>
			);
		}

		if (checkboxLogoClosable) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--checkbox-indicator-closable`],
					].join(' ')}>
					<Checkbox size={size} />
					<Logo
						className={[
							styles.tag__logo,
							styles[`tag__logo--checkbox-closable-${size}`],
						]
							.filter(Boolean)
							.join(' ')}
					/>
					{label}
					<CheckboxIndicatorCloserSpan />
				</span>
			);
		}

		if (checkboxLogo) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--checkbox-indicator`],
					].join(' ')}>
					<Checkbox size={size} />
					<Logo
						className={[styles.tag__logo, styles[`tag__logo--checkbox-${size}`]]
							.filter(Boolean)
							.join(' ')}
					/>
					{label}
				</span>
			);
		}

		if (isLogoCount) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--indicator-count`],
					].join(' ')}>
					<Logo
						className={[styles.tag__logo, styles[`tag__logo--count-${size}`]]
							.filter(Boolean)
							.join(' ')}
					/>
					{label}
					<span className={[styles.tag__count, styles[`tag__count--${size}`]].join(' ')}>
						{COUNT_MAP(count)[size]}
					</span>
				</span>
			);
		}

		if (isLogoClosable) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--indicator-closable`],
					].join(' ')}>
					<Logo
						className={[styles.tag__logo, styles[`tag__logo--closable-${size}`]]
							.filter(Boolean)
							.join(' ')}
					/>
					{label}
					<CloserSpan />
				</span>
			);
		}

		if (logo) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--indicator`],
					].join(' ')}>
					<Logo className={styles.tag__logo} />
					{label}
				</span>
			);
		}

		if (checkboxIndicatorCount && count !== undefined) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--checkbox-indicator-count`],
					].join(' ')}>
					<Checkbox size={size} />
					<Indicator
						type={indicatorType}
						size={INDICATOR_SIZE[size]}
						className={[
							styles.tag__indicator,
							styles[`tag__indicator--checkbox-count-${size}`],
						]
							.filter(Boolean)
							.join(' ')}
					/>
					{label}
					<span
						className={[
							styles.tag__count,
							styles[`tag__count--checkbox-indicator-${size}`],
						].join(' ')}>
						{COUNT_MAP(count)[size]}
					</span>
				</span>
			);
		}

		if (checkboxIndicatorClosable) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--checkbox-indicator-closable`],
					].join(' ')}>
					<Checkbox size={size} />
					<Indicator
						type={indicatorType}
						size={INDICATOR_SIZE[size]}
						className={[
							styles.tag__indicator,
							styles[`tag__indicator--checkbox-closable-${size}`],
						]
							.filter(Boolean)
							.join(' ')}
					/>
					{label}
					<CheckboxIndicatorCloserSpan />
				</span>
			);
		}

		if (checkboxIndicator) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--checkbox-indicator`],
					].join(' ')}>
					<Checkbox size={size} />
					<Indicator
						type={indicatorType}
						size={INDICATOR_SIZE[size]}
						className={[
							styles.tag__indicator,
							styles[`tag__indicator--checkbox-${size}`],
						]
							.filter(Boolean)
							.join(' ')}
					/>
					{label}
				</span>
			);
		}

		if (isIndicatorCount) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--indicator-count`],
					].join(' ')}>
					<Indicator
						type={indicatorType}
						size={INDICATOR_SIZE[size]}
						className={styles.tag__indicator}
					/>
					{label}
					<span className={[styles.tag__count, styles[`tag__count--${size}`]].join(' ')}>
						{COUNT_MAP(count)[size]}
					</span>
				</span>
			);
		}

		if (isIndicatorClosable) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--indicator-closable`],
					].join(' ')}>
					<Indicator
						type={indicatorType}
						size={INDICATOR_SIZE[size]}
						className={[
							styles.tag__indicator,
							styles[`tag__indicator--closable-${size}`],
						]
							.filter(Boolean)
							.join(' ')}
					/>
					{label}
					<CloserSpan />
				</span>
			);
		}

		if (indicator) {
			return (
				<span
					className={[
						styles.tag,
						styles[`tag--${size}`],
						styles[`tag--${size}--indicator`],
					].join(' ')}>
					<Indicator
						type={indicatorType}
						size={INDICATOR_SIZE[size]}
						className={styles.tag__indicator}
					/>
					{label}
				</span>
			);
		}

		return (
			<span
				className={[
					styles.tag,
					styles[`tag--${size}`],
					isCheckboxClosable
						? styles[`tag--${size}--checkbox-closable`]
						: closable
							? styles[`tag--${size}--closable`]
							: '',
					!isCheckboxClosable && checkbox ? styles[`tag--${size}--checkbox`] : '',
				]
					.filter(Boolean)
					.join(' ')}>
				{checkbox && <Checkbox size={size} />}
				{label}
				{closable && <CloserSpan />}
			</span>
		);
	}
);

export default Tag;
