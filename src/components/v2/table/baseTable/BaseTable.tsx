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

		const commonTableProps = {
			headerData,
			customCells,
			onRowClick,
			rowHeight,
			onCheck,
			checkedRows,
			setCheckedRows,
			uniqueKey,
			checkAsRadio,
			disableCheck,
			...(hideColumnLines !== undefined && {
				hideColumnLines,
			}),
		};

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
							...commonTableProps,
							expandable,
							onSort,
							sortValue,
							tableData: tabularData,
						}}
					/>
				)}
				{tabularData.length === 0 ? (
					<NoDataPlaceHolder customPlaceholder={emptyPlaceholder} />
				) : (
					<TableBody
						{...{
							...commonTableProps,
							...(expandable !== undefined && { expandable }),
							tableData: tabularData,
							defaultActiveIndex,
							toggleDrawer,
						}}
					/>
				)}
			</table>
		);
	}
);

export default BaseTable;
