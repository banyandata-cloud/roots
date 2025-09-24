import { forwardRef, useState, type ForwardedRef, type ReactElement, type ReactNode } from 'react';
import { classes } from '../../../utils';
import { Checkbox, Radio } from '../../input';
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
	> {
	tableData?: Record<string, unknown>[];
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
	} = props;

	const { sortValue, onSort, ...rest } = props;

	const [expanded, setExpanded] = useState<boolean>(false);

	const expandableProps: Record<string, unknown> | undefined = Expandable && {
		_expanded: expanded,
		_setExpanded: setExpanded,
		disabled: !Expandable({
			datum,
			index: _index,
		}),
		onClick: () => {
			setExpanded((prev) => {
				return !prev;
			});
		},
	};
	const tableCells = headerData.map((item) => {
		let cellContent = null;
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

		const cellProps = {
			...props,
			...item,
		};

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
					{...cellProps}
					expandableProps={expandableProps}
					toggleDrawer={(index: number, standalone: boolean) => {
						toggleDrawer?.({
							data: {
								datum,
								index,
								standalone,
							},
						});
					}}
				/>
			);
		}

		return (
			<TableCellV2
				key={item.id}
				{...cellProps}
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
				toggleDrawer={(index: number, standalone: boolean) => {
					toggleDrawer?.({
						data: {
							datum,
							index,
							standalone,
						},
					});
				}}
			/>
		);
	});

	let tableCellsToRender = tableCells;

	const existingInChecked = checkedRows.find((checkedItem) => {
		return checkedItem[uniqueKey] === datum[uniqueKey];
	});

	let checkStatus = !!existingInChecked;
	let intermediate = false;

	if (onCheck && type === 'header') {
		checkStatus =
			tableData.length === checkedRows.length ||
			(tableData.length > checkedRows.length && checkedRows.length > 0);
		intermediate = tableData.length > checkedRows.length && checkedRows.length > 0;
	}

	let cellContent: string | ReactElement = '';

	const disabledChecking = disableCheck?.(datum);

	if (type !== 'header' && checkAsRadio) {
		cellContent = (
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
	} else if (!checkAsRadio) {
		cellContent = (
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
				className={disabledChecking ? styles.disabled : undefined}
			/>
		);
	}

	if (onCheck) {
		tableCellsToRender = [
			<TableCellV2
				key={`${(_index ?? '').toString()}-default-checkbox`}
				{...rest}
				datum={datum}
				_index={_index}
				id='__checkbox'
				expandableProps={expandableProps}
				cellContent={cellContent}
				cellTitle={null}
				type={type}
				rowHeight={rowHeight}
				style={{
					width: '3rem',
				}}
				toggleDrawer={null}
			/>,
			...tableCells,
		];
	}

	return (
		<>
			<tr
				ref={ref}
				tabIndex={-1}
				data-elem='table-row'
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
					className
				)}>
				{tableCellsToRender}
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
