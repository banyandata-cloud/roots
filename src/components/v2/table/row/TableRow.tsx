import React, {
	forwardRef,
	useState,
	type ForwardedRef,
	type ReactElement,
	type ReactNode,
} from 'react';
import { classes } from '../../../../utils';
import { CheckboxV2 as Checkbox } from '../../../input/checkbox/v2';
import { Radio } from '../../../input';
import { TableCellV2 } from '../cell';
import type { TableProps } from '../types';
import styles from './TableRow.module.css';

interface TableRowProps
	extends Pick<
		TableProps,
		| 'headerData'
		| 'customCells'
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
	tableData?: Record<string, unknown>[] | undefined;
	expandable?:
		| ((params: { datum: Record<number, unknown>; index: number | undefined }) => ReactElement)
		| undefined;
	toggleDrawer?: ((props: object) => void) | undefined;
	type?: 'body' | 'header';
	datum: Record<string, unknown>;
	_index?: number;
	checkedRows: Record<string, unknown>[];
	setCheckedRows: (rows: Record<string, unknown>[]) => void;
}

const TableRow = forwardRef((props: TableRowProps, ref: ForwardedRef<HTMLTableRowElement>) => {
	const {
		type = 'body',
		headerData = [],
		tableData = [],
		datum,
		_index,
		customCells,
		className = '',
		onRowClick,
		expandable: Expandable,
		rowHeight = 'md',
		toggleDrawer,
		onCheck,
		checkedRows = [],
		setCheckedRows,
		uniqueKey = '',
		checkAsRadio,
		disableCheck,
		hideColumnLines,
	} = props;

	const { sortValue, onSort } = props;

	const [expanded, setExpanded] = useState<boolean>(false);

	const expandableProps: Record<string, unknown> | undefined = Expandable && {
		_expanded: expanded,
		_setExpanded: setExpanded,
		disabled: !Expandable({ datum, index: _index }),
		onClick: () => {
			setExpanded((prev) => !prev);
		},
	};

	const existingInChecked = checkedRows.find((checkedItem) => {
		return checkedItem[uniqueKey] === datum[uniqueKey];
	});

	const disabledChecking = disableCheck?.(datum);

	const headerCheckStatus =
		tableData.length === checkedRows.length ||
		(tableData.length > checkedRows.length && checkedRows.length > 0);
	const headerIntermediate = tableData.length > checkedRows.length && checkedRows.length > 0;

	const tableCells = headerData.map((item, index) => {
		let cellContent: ReactNode = null;

		if (type === 'header') {
			cellContent = item.title;
		}
		if (type === 'body') {
			if (item.formatter) {
				cellContent = item.formatter(datum[item.id] as string, _index, datum);
			} else {
				cellContent = (datum[item.id] as ReactNode) ?? item.fallbackValue;
			}
		}

		let component1: ReactElement | null = null;
		if (index === 0 && onCheck) {
			const checkStatus = type === 'header' ? headerCheckStatus : !!existingInChecked;
			const intermediate = type === 'header' ? headerIntermediate : false;

			if (type !== 'header' && checkAsRadio) {
				component1 = (
					<Radio
						onChange={() => {
							if (existingInChecked) {
								setCheckedRows([]);
								onCheck?.([]);
								return;
							}
							setCheckedRows([datum]);
							onCheck?.([datum]);
						}}
						disabled={disabledChecking}
						checked={checkStatus}
						className={disabledChecking ? styles.disabled : undefined}
					/>
				);
			} else {
				component1 = (
					<Checkbox
						intermediate={intermediate}
						onChange={() => {
							if (type === 'header') {
								const filteredTableData = tableData.filter((rowDatum) => {
									return !disableCheck?.(rowDatum);
								});
								if (checkedRows.length === filteredTableData.length) {
									setCheckedRows([]);
									onCheck?.([]);
									return;
								}
								if (disableCheck) {
									setCheckedRows(filteredTableData);
									onCheck?.(filteredTableData);
									return;
								}
								setCheckedRows(tableData);
								onCheck?.(tableData);
								return;
							}
							if (existingInChecked) {
								const checkedSansSelection = checkedRows.filter((checkedItem) => {
									return checkedItem[uniqueKey] !== datum[uniqueKey];
								});
								setCheckedRows(checkedSansSelection);
								onCheck?.(checkedSansSelection);
								return;
							}
							setCheckedRows([...checkedRows, datum]);
							onCheck?.([...checkedRows, datum]);
						}}
						disabled={disabledChecking}
						checked={checkStatus}
						position='left'
						size='sm'
						className={disabledChecking ? styles.disabled : undefined}
					/>
				);
			}
		}

		const cellProps = {
			...props,
			...item,
		};

		const { hideColumnLines: hideColumnLinesProp, ...cellPropsWithoutHideColumnLines } =
			cellProps;

		const getCustomCell = customCells?.[type];
		const CustomCell = typeof getCustomCell === 'function' ? getCustomCell()[item.id] : null;

		if (CustomCell != null) {
			return (
				<CustomCell
					key={item.id}
					cellContent={cellContent}
					{...(typeof cellContent === 'string' && {
						cellTitle: cellContent,
					})}
					{...cellPropsWithoutHideColumnLines}
					expandableProps={expandableProps}
					toggleDrawer={(i: number, standalone: boolean) => {
						toggleDrawer?.({
							data: { datum, index: i, standalone },
						});
					}}
				/>
			);
		}

		return (
			<TableCellV2
				key={item.id}
				{...cellPropsWithoutHideColumnLines}
				tabIndex={type === 'body' ? 0 : item.sort || item.columnFilter ? -1 : 0}
				id={item.id}
				_index={_index}
				expandableProps={expandableProps}
				datum={datum}
				cellContent={cellContent}
				{...(typeof cellContent === 'string' && {
					cellTitle: cellContent,
				})}
				type={type}
				onSort={onSort}
				sortValue={sortValue}
				rowHeight={rowHeight}
				component1={component1}
				{...(hideColumnLines !== undefined && { hideColumnLines })}
				toggleDrawer={(i: number, standalone: boolean) => {
					toggleDrawer?.({
						data: { datum, index: i, standalone },
					});
				}}
			/>
		);
	});

	return (
		<>
			<tr
				ref={ref}
				data-elem='table-row'
				data-selected={!!existingInChecked}
				data-disabled={!!disabledChecking}
				{...(!onCheck &&
					onRowClick && {
						onClick: () => {
							onRowClick(datum);
						},
					})}
				className={classes(
					styles.root,
					styles[`${type}-row`],
					styles[`row-height-${rowHeight}`],
					disabledChecking && styles.disabled,
					className
				)}>
				{tableCells}
			</tr>
			{Expandable && expanded && (
				<tr
					{...(!onCheck && {
						onClick: () => {
							onRowClick?.(datum);
						},
					})}>
					<Expandable datum={datum} index={_index} />
				</tr>
			)}
		</>
	);
});

export default TableRow;
