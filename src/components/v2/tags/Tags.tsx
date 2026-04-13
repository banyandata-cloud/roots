import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Logo1 from '../../icons/Email/Email';
import Checkbox from '../checkbox/CheckBox';
import TextField from '../input/textField/TextField';
import Indicator from '../tags/assets/Indicator/Indicator';
import type { TagProps, TagSize } from '../tags/types';
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
			readOnly = false,
			inputValue,
			onInputChange,
			onInputBlur,
			onInputEnter,
			defaultInputValue = '',
			inputPlaceholder = '',
			onClick,
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
			const updateWidth = () => {
				// Since TextField doesn't properly forward refs, find the input element directly
				const inputElement =
					resolvedRef.current ||
					sizerRef.current?.parentElement?.querySelector('input[type="text"]') ||
					sizerRef.current?.parentElement?.querySelector('input') ||
					sizerRef.current?.nextElementSibling?.querySelector('input');

				if (sizerRef.current && inputElement) {
					// Force reflow to ensure accurate measurements
					sizerRef.current.offsetHeight;

					const sizerWidth = sizerRef.current.offsetWidth;
					const buffer = size === 'sm' ? 4 : size === 'md' ? 4 : 6; // Minimal buffer for cursor space
					const minWidth = size === 'sm' ? 10 : size === 'md' ? 35 : 40;

					// Calculate available space in container, leaving room for close button
					const tagContainer = inputElement.closest(
						'[class*="tag--"][class*="textfield"]'
					);
					let maxInputWidth = 120; // Conservative maximum for input field

					if (tagContainer) {
						// Get all elements in the tag to calculate reserved space
						const closeButton = tagContainer.querySelector(
							'[class*="textfield_closer"]'
						);
						const label = tagContainer.querySelector('[class*="textfield_label"]');

						// Calculate space used by other elements (more conservative)
						let reservedSpace = 16; // padding and gaps

						if (label) {
							reservedSpace += label.getBoundingClientRect().width + 4; // label + gap
						}
						if (closeButton) {
							reservedSpace += closeButton.getBoundingClientRect().width + 4; // close button + gap
						}

						// Don't let tags get too wide - reasonable maximum
						const maxTagWidth = 180;
						maxInputWidth = Math.max(maxTagWidth - reservedSpace, minWidth);

						// Further constrain if current container is smaller
						const currentContainerWidth = tagContainer.getBoundingClientRect().width;
						if (currentContainerWidth > 0) {
							maxInputWidth = Math.min(
								maxInputWidth,
								currentContainerWidth - reservedSpace
							);
						}
					}

					const idealWidth = Math.max(sizerWidth + buffer, minWidth);
					const finalWidth = Math.min(idealWidth, maxInputWidth);

					// Apply constrained width to input
					(inputElement as HTMLInputElement).style.setProperty(
						'width',
						`${finalWidth}px`,
						'important'
					);
					(inputElement as HTMLInputElement).style.setProperty(
						'max-width',
						`${finalWidth}px`,
						'important'
					);
					(inputElement as HTMLInputElement).style.setProperty(
						'min-width',
						`${minWidth}px`,
						'important'
					);

					// Update tag container to fit content but with strict bounds
					if (tagContainer) {
						(tagContainer as HTMLElement).style.setProperty(
							'width',
							'auto',
							'important'
						);
						(tagContainer as HTMLElement).style.setProperty(
							'max-width',
							'180px',
							'important'
						);
						(tagContainer as HTMLElement).style.setProperty(
							'min-width',
							'max-content',
							'important'
						);
						(tagContainer as HTMLElement).style.setProperty(
							'overflow',
							'hidden',
							'important'
						);
					}
				}
			};

			// Run with delays to handle complex DOM updates
			updateWidth();
			const timeout1 = setTimeout(updateWidth, 10);
			const timeout2 = setTimeout(updateWidth, 50);
			const timeout3 = setTimeout(updateWidth, 100);

			return () => {
				clearTimeout(timeout1);
				clearTimeout(timeout2);
				clearTimeout(timeout3);
			};
		}, [resolvedValue, inputPlaceholder, size]);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const next = e.target.value;
			if (!isControlled) setInternalValue(next);
			onInputChange?.(next, e);
		};

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter' || e.key === 'Tab') {
				e.preventDefault();
				onInputEnter?.();
			} else if (e.key === 'Backspace' && resolvedValue === '') {
				e.preventDefault();
				onInputClear?.();
			}
		};

		const handleBlur = () => {
			onInputBlur?.();
		};

		const handleClear = () => {
			if (!isControlled) setInternalValue('');
			onInputClear?.();
		};

		// Map TagSize to TextField size (v2 only supports sm/md)
		const getTextFieldSize = (tagSize: TagSize): 'sm' | 'md' => {
			return tagSize === 'lg' ? 'md' : tagSize;
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
						readOnly && styles[`tag--${size}--textfield-readonly`],
					]
						.filter(Boolean)
						.join(' ')}
					onClick={
						readOnly
							? () => {
									// Handle click for readonly tags
									onClick?.();
								}
							: focusInput
					}>
					<span
						className={`${styles.tag__textfield_label} ${styles[`tag__textfield_label--${size}`]}`}>
						{label}
					</span>
					<span
						ref={sizerRef}
						aria-hidden
						className={`${styles.tag__textfield_sizer} ${styles[`tag__textfield_sizer--${size}`]}`}>
						{resolvedValue || inputPlaceholder || '\u200b'}
					</span>
					<TextField
						ref={resolvedRef}
						unstyled={true}
						size={getTextFieldSize(size)}
						value={resolvedValue}
						onChange={readOnly ? undefined : handleChange}
						onBlur={readOnly ? undefined : handleBlur}
						readOnly={readOnly}
						placeholder={inputPlaceholder}
						disabled={readOnly}
						className={[
							styles.tag__textfield_input,
							styles[`tag__textfield_input--${size}`],
						]
							.filter(Boolean)
							.join(' ')}
						{...({ onKeyDown: handleKeyDown } as any)}
					/>
					{closable && (
						<span
							className={styles.tag__textfield_closer}
							onClick={(e) => {
								e.stopPropagation();
								handleClear();
								focusInput();
							}}>
							{CLOSER_MAP[size]}
						</span>
					)}
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
					<Logo1
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
					<Logo1
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
					<Logo1
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
					<Logo1
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
					<Logo1
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
					<Logo1 className={styles.tag__logo} />
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
