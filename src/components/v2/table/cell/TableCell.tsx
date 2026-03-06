import { forwardRef, isValidElement, useEffect, useState, type ForwardedRef } from 'react';
import { classes } from '../../../../utils';
import { BaseCell } from '../../../v2/cell';
import { SortIcon } from '../../../v2/icons/Sort';
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
		<path d='M8 12L8 4' stroke='#1f5fcc' strokeWidth='1.3' strokeLinecap='round' />
		<path
			d='M5 7L8 4L11 7'
			stroke='#1f5fcc'
			strokeWidth='1.3'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const DescIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
		<path d='M8 4L8 12' stroke='#1f5fcc' strokeWidth='1.3' strokeLinecap='round' />
		<path
			d='M5 9L8 12L11 9'
			stroke='#1f5fcc'
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
		RootDOM = 'td',
		attrs,
		radius = 'none',
		style,
		multiLine,
		type = 'body',
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
		filterValue = [],
		tabIndex,
	} = props;

	const [sortState, setSortState] = useState<SortType>('default');
	const [filterOpen, setFilterOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState<string[]>(filterValue);
	const [actionsFocused, setActionsFocused] = useState(false);

	useEffect(() => {
		setSortState(sortValue?.[id] ?? 'default');
	}, [id, sortValue]);

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
														? '#1f5fcc'
														: '#A4A7AE'
												}
											/>
										</button>
										{isFilterActive && (
											<button
												type='button'
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
												✕
											</button>
										)}
									</div>
									{filterOpen && (
										<div className={styles['filter-dropdown']}>
											<label className={styles['filter-option']}>
												<input
													type='checkbox'
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
												All
											</label>
											{filterOptions.map((option) => (
												<label
													key={option}
													className={styles['filter-option']}>
													<input
														type='checkbox'
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
													{option}
												</label>
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
