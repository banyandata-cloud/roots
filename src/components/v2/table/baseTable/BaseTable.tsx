import {
	forwardRef,
	useEffect,
	useRef,
	useState,
	type ForwardedRef,
	type ReactElement,
} from 'react';
import { classes } from '../../../../utils';
import { TableBody } from '../body';
import { TableHeader } from '../header';
import { NoDataPlaceHolder } from '../placeholders/general';
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
		| 'hideColumnLines'
	> {
	expandable?:
		| ((params: { datum: Record<number, unknown>; index: number | undefined }) => ReactElement)
		| undefined;
	toggleDrawer: () => void;
	defaultCheckedRows?: Record<string, unknown>[];
}

const BaseTable = forwardRef(
	(
		{
			headerData,
			customCells,
			tableData = [],
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
			defaultCheckedRows,
			hideColumnLines,
		}: BaseTableProps,
		ref: ForwardedRef<HTMLTableElement>
	): ReactElement => {
		const isFirstRender = useRef(true);
		const [checkedRows, setCheckedRows] = useState<Record<string, unknown>[]>(
			defaultCheckedRows ?? []
		);

		useEffect(() => {
			if (isFirstRender.current) {
				isFirstRender.current = false;
				return;
			}
			setCheckedRows(defaultCheckedRows ?? []);
		}, [tableData, defaultCheckedRows]);

		if (loading) {
			return <Skeleton />;
		}

		const tabularData = Array.isArray(tableData) ? tableData : [];

		return (
			<table
				ref={ref}
				data-elem='table'
				className={classes(
					styles.root,
					tabularData.length === 0 ? styles['no-scroll'] : '',
					className
				)}>
				{tabularData.length > 0 && (
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
							tableData: tabularData,
							disableCheck,
							checkAsRadio,
							rowHeight,
							uniqueKey,
							...(hideColumnLines !== undefined && {
								hideColumnLines: hideColumnLines!,
							}),
						}}
					/>
				)}
				{tabularData.length === 0 ? (
					<NoDataPlaceHolder customPlaceholder={emptyPlaceholder} />
				) : (
					<TableBody
						{...{
							ref,
							headerData,
							customCells,
							tableData: tabularData,
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
							...(hideColumnLines !== undefined && {
								hideColumnLines: hideColumnLines!,
							}),
						}}
					/>
				)}
			</table>
		);
	}
);

export default BaseTable;
