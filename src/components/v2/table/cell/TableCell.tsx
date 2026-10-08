import { forwardRef, isValidElement, useEffect, useState, type ForwardedRef } from 'react';
import { classes } from '../../../../utils';
import { BaseCell } from '../../../v2/cell';
import { SortIcon } from '../../../v2/icons/Sort';
import Checkbox from '../../checkbox/CheckBox';
import CrossIcon from '../../badges/assets/CrossIcon/CrossIcon';
import TableIconFilter from '../assets/TableIconFilter';
import styles from './TableCell.module.css';
import type { SortType, TableCellProps } from './types';

const getNextSortState = (currentSort: string): SortType => {
	return {
		default: 'asc',
		asc: 'desc',
		desc: 'default',
	}[currentSort] as SortType;
};

// Single up arrow — same paths as Sort.tsx left arrow
const AscIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
		<path
			d='M8 12L8 4'
			stroke='var(--color-fg-brand-primary, #1570ef)'
			strokeWidth='1.3'
			strokeLinecap='round'
		/>
		<path
			d='M5 7L8 4L11 7'
			stroke='var(--color-fg-brand-primary, #1570ef)'
			strokeWidth='1.3'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const DescIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
		<path
			d='M8 4L8 12'
			stroke='var(--color-fg-brand-primary, #1570ef)'
			strokeWidth='1.3'
			strokeLinecap='round'
		/>
		<path
			d='M5 9L8 12L11 9'
			stroke='var(--color-fg-brand-primary, #1570ef)'
			strokeWidth='1.3'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const TableCell = forwardRef((props: TableCellProps, ref: ForwardedRef<HTMLTableCellElement>) => {
	const {
		id,
		className,
		size = 'md',
		flexible,
		component1,
		component3,
		type = 'body',
		RootDOM = type === 'header' ? 'th' : 'td',
		attrs,
		radius = 'none',
		style,
		multiLine,
		cellContent,
		cellTitle,
		sticky,
		sort,
		onSort,
		sortValue,
		html,
		columnFilter,
		filterOptions = [],
		onFilter,
		filterValue,
		tabIndex,
		hideColumnLines,
	} = props;

	const [sortState, setSortState] = useState<SortType>('default');
	const [filterOpen, setFilterOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState<string[]>(filterValue ?? []);
	const [actionsFocused, setActionsFocused] = useState(false);

	useEffect(() => {
		setSortState(sortValue?.[id] ?? 'default');
	}, [id, sortValue]);

	useEffect(() => {
		if (filterValue) setSelectedFilters(filterValue);
	}, [filterValue]);

	useEffect(() => {
		if (!filterOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest('[data-filter-wrapper]')) {
				setFilterOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [filterOpen]);

	const isFilterActive = selectedFilters.length > 0 && filterOptions.length > 0;
	const isSortActive = sortState !== 'default';

	let spanElement = (
		<span
			{...{
				...(cellTitle != null ? { title: cellTitle } : {}),
				className: classes(styles['cell-text'], multiLine ? styles['multi-line'] : ''),
				style,
				'data-elem': 'text',
			}}>
			{typeof cellContent === 'string' || isValidElement(cellContent)
				? cellContent
				: JSON.stringify(cellContent)}
		</span>
	);

	if (html) {
		spanElement = (
			<span
				{...{
					className: classes(styles['cell-text'], multiLine ? styles['multi-line'] : ''),
					style,
					'data-elem': 'text',
					dangerouslySetInnerHTML: {
						__html: cellContent as string,
					},
				}}
			/>
		);
	}

	const isCentered = style?.justifyContent === 'center';

	return (
		<BaseCell
			{...{
				ref,
				className: classes(
					styles.root,
					styles[`${type}-cell`],
					styles[`sticky-${String(sticky)}`],
					type === 'header' && (sort || columnFilter) && styles.sortable,
					isCentered && styles.centered,
					hideColumnLines && styles['no-column-lines'],
					className
				),
				attrs: {
					style,
					tabIndex,
					...attrs,
				},
				size,
				flexible,
				component1,
				component2: spanElement,
				component3:
					type === 'header' && (sort || columnFilter) ? (
						<div
							className={classes(
								styles['header-actions'],
								actionsFocused && styles['header-actions--focused']
							)}>
							{sort && (
								<button
									type='button'
									aria-label={`Sort ${cellTitle || id}`}
									className={classes(
										styles['icon-btn'],
										styles['sort-btn'],
										isSortActive && styles['sort-btn--active']
									)}
									onFocus={() => setActionsFocused(true)}
									onBlur={() => setActionsFocused(false)}
									onClick={() => {
										const next = getNextSortState(sortState);
										onSort?.(id, next);
										setSortState(next);
									}}>
									{sortState === 'default' && (
										<SortIcon
											className={styles['sort-icon']}
											position='default'
										/>
									)}
									{sortState === 'asc' && <AscIcon />}
									{sortState === 'desc' && <DescIcon />}
								</button>
							)}
							{columnFilter && (
								<div
									className={styles['filter-wrapper']}
									data-filter-wrapper='true'>
									<div className={styles['filter-icon-group']}>
										<button
											type='button'
											aria-label={`Filter ${cellTitle || id}`}
											className={classes(
												styles['icon-btn'],
												styles['filter-btn'],
												isFilterActive && styles['filter-btn--active'],
												filterOpen && styles['filter-btn--open']
											)}
											onFocus={() => setActionsFocused(true)}
											onBlur={() => setActionsFocused(false)}
											onClick={() => setFilterOpen((prev) => !prev)}>
											<TableIconFilter
												color={
													isFilterActive || filterOpen
														? 'var(--color-fg-brand-primary)'
														: 'var(--color-fg-disabled)'
												}
											/>
										</button>
										{isFilterActive && (
											<button
												type='button'
												aria-label={`Clear filter ${cellTitle || id}`}
												className={classes(
													styles['icon-btn'],
													styles['filter-close-btn']
												)}
												onFocus={() => setActionsFocused(true)}
												onBlur={() => setActionsFocused(false)}
												onClick={(e) => {
													e.stopPropagation();
													setSelectedFilters([]);
													onFilter?.(id, []);
													setFilterOpen(false);
												}}>
												<CrossIcon size={16} color='currentColor' />
											</button>
										)}
									</div>
									{filterOpen && (
										<div className={styles['filter-dropdown']}>
											<div
												className={classes(
													styles['filter-option'],
													styles['filter-option-all']
												)}>
												<Checkbox
													size='md'
													label='All'
													indeterminate={
														selectedFilters.length > 0 &&
														selectedFilters.length <
															filterOptions.length
													}
													checked={
														selectedFilters.length ===
														filterOptions.length
													}
													onChange={() => {
														const next =
															selectedFilters.length ===
															filterOptions.length
																? []
																: filterOptions;
														setSelectedFilters(next);
														onFilter?.(id, next);
													}}
												/>
											</div>
											{filterOptions.map((option) => (
												<div
													key={option}
													data-selected={selectedFilters.includes(option)}
													className={styles['filter-option']}>
													<Checkbox
														size='md'
														label={option}
														checked={selectedFilters.includes(option)}
														onChange={() => {
															const next = selectedFilters.includes(
																option
															)
																? selectedFilters.filter(
																		(o) => o !== option
																	)
																: [...selectedFilters, option];
															setSelectedFilters(next);
															onFilter?.(id, next);
														}}
													/>
												</div>
											))}
										</div>
									)}
								</div>
							)}
						</div>
					) : (
						component3
					),
				RootDOM,
				radius,
			}}
		/>
	);
});

export default TableCell;
