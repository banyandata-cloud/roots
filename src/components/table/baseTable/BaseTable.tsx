import { forwardRef, useEffect, useState, type ForwardedRef, type ReactElement } from 'react';
import { classes } from '../../../utils';
import { TableBody } from '../body';
import { TableHeader } from '../header';
import { NoDataPlaceHolder } from '../placeholders/noData/general';
import type { TableProps } from '../types';
import styles from './BaseTable.module.css';
import { Skeleton } from './Skeleton';

interface BaseTableProps
	extends Pick<
		TableProps,
		| 'headerData'
		| 'customCells'
		| 'tableData'
		| 'className'
		| 'loading'
		| 'onRowClick'
		| 'onSort'
		| 'sortValue'
		| 'rowHeight'
		| 'defaultActiveIndex'
		| 'emptyPlaceholder'
		| 'onCheck'
		| 'uniqueKey'
		| 'checkAsRadio'
		| 'disableCheck'
	> {
	expandable?:
		| ((params: { datum: Record<number, unknown>; index: number | undefined }) => ReactElement)
		| undefined;
	toggleDrawer: () => void;
}

const BaseTable = forwardRef(
	(
		{
			headerData,
			customCells,
			tableData,
			className,
			loading,
			onRowClick,
			expandable,
			onSort,
			sortValue,
			rowHeight = 'md',
			defaultActiveIndex,
			toggleDrawer,
			emptyPlaceholder,
			onCheck,
			uniqueKey = '',
			checkAsRadio,
			disableCheck,
		}: BaseTableProps,
		ref: ForwardedRef<HTMLTableElement>
	): ReactElement => {
		const [checkedRows, setCheckedRows] = useState<Record<string, unknown>[]>([]);

		useEffect(() => {
			setCheckedRows([]);
		}, [tableData]);

		if (loading) {
			return <Skeleton />;
		}

		return (
			<table
				ref={ref}
				data-elem='table'
				className={classes(
					styles.root,
					tableData.length === 0 ? styles['no-scroll'] : '',
					className
				)}>
				{tableData.length > 0 && (
					<TableHeader
						{...{
							headerData,
							expandable,
							customCells,
							onSort,
							sortValue,
							onRowClick,
							onCheck,
							checkedRows,
							setCheckedRows,
							tableData,
							disableCheck,
							checkAsRadio,
							rowHeight,
						}}
					/>
				)}
				{tableData.length === 0 ? (
					<NoDataPlaceHolder customPlaceholder={emptyPlaceholder} />
				) : (
					<TableBody
						{...{
							ref,
							headerData,
							customCells,
							tableData,
							expandable,
							rowHeight,
							onRowClick,
							defaultActiveIndex,
							toggleDrawer,
							onCheck,
							checkedRows,
							setCheckedRows,
							uniqueKey,
							checkAsRadio,
							disableCheck,
						}}
					/>
				)}
			</table>
		);
	}
);

export default BaseTable;
