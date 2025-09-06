import { forwardRef, isValidElement, useEffect, useState, type ForwardedRef } from 'react';
import { classes } from '../../../utils';
import { Button } from '../../buttons';
import { BaseCell } from '../../cell';
import { SortIcon } from '../../icons';
import styles from './TableCell.module.css';
import type { SortType, TableCellProps } from './types';

const SORT_ICONS_ORDER = {
	asc: 'az',
	desc: 'za',
	default: 'default',
};

const getNextSortState = (currentSort: string): SortType => {
	return {
		asc: 'default',
		desc: 'asc',
		default: 'desc',
	}[currentSort] as SortType;
};

const TableCell = forwardRef((props: TableCellProps, ref: ForwardedRef<HTMLTableCellElement>) => {
	const {
		id,
		className,
		size = 'sm',
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
	} = props;

	const [sortState, setSortState] = useState<SortType>('default');

	useEffect(() => {
		setSortState(sortValue?.[id] ?? 'default');
	}, [id, sortValue]);

	let spanElement = (
		<span
			{...{
				...(cellTitle != null
					? {
							title: cellTitle,
						}
					: {}),
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

	return (
		<BaseCell
			{...{
				ref,
				className: classes(
					styles.root,
					styles[`${type}-cell`],
					styles[`sticky-${String(sticky)}`],
					styles[`sort-${sortState}`],
					sortState !== 'default' ? styles.sortable : '',
					className
				),
				attrs: {
					style,
					...attrs,
				},
				size,
				flexible,
				component1,
				component2: spanElement,
				component3:
					type === 'header' && sort ? (
						<Button
							className={styles.sort}
							size='auto'
							onClick={() => {
								onSort?.(id, getNextSortState(sortState));
								setSortState(getNextSortState(sortState));
							}}
							rightComponent={() => {
								return (
									<SortIcon
										className={styles['sort-icon']}
										position={SORT_ICONS_ORDER[sortState]}
									/>
								);
							}}
						/>
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
