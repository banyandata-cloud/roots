import {
	forwardRef,
	useState,
	type ForwardedRef,
	type MouseEvent,
	type ReactElement,
	type ReactNode,
} from 'react';
import { classes } from '../../utils';
import { Checkbox } from '../../checkbox';
import { Radio } from '../../input';
import { TableCellV2 } from '../cell';
import ExpandArrowIcon from '../assets/ExpandArrowIcon';
import type { TableProps } from '../types';
import styles from './TableRow.module.scss';

interface TableRowProps extends Pick<
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

	const selectableRows = tableData.filter((row) => !disableCheck?.(row));

	const headerCheckStatus =
		selectableRows.length > 0 &&
		selectableRows.every((row) =>
			checkedRows.some((checked) => checked[uniqueKey] === row[uniqueKey])
		);

	const headerIndeterminate =
		checkedRows.length > 0 &&
		!headerCheckStatus &&
		selectableRows.some((row) =>
			checkedRows.some((checked) => checked[uniqueKey] === row[uniqueKey])
		);
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

		let checkControl: ReactElement | null = null;
		if (index === 0 && onCheck) {
			const checkStatus = type === 'header' ? headerCheckStatus : !!existingInChecked;
			const indeterminate = type === 'header' ? headerIndeterminate : false;

			if (type !== 'header' && checkAsRadio) {
				checkControl = (
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
				checkControl = (
					<Checkbox
						indeterminate={indeterminate}
						onChange={() => {
							if (type === 'header') {
								const selectableRows = tableData.filter(
									(rowDatum) => !disableCheck?.(rowDatum)
								);

								const allSelected = selectableRows.every((row) =>
									checkedRows.some(
										(checked) => checked[uniqueKey] === row[uniqueKey]
									)
								);

								if (allSelected) {
									setCheckedRows([]);
									onCheck?.([]);
								} else {
									setCheckedRows(selectableRows);
									onCheck?.(selectableRows);
								}

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
						disabled={disabledChecking ?? false}
						checked={checkStatus}
						size='table'
						className={disabledChecking ? (styles.disabled ?? '') : ''}
					/>
				);
			}
		}

		const cellProps = {
			...props,
			...item,
		};

		// The expand toggle sits before the checkbox in the first cell. The header gets an empty
		// 24px spacer so its title stays aligned with the body text.
		let expandControl: ReactElement | null = null;
		if (index === 0 && Expandable) {
			expandControl =
				type === 'header' ? (
					<span className={styles['expand-spacer']} aria-hidden='true' />
				) : (
					<button
						type='button'
						className={styles['expand-toggle']}
						aria-label={expanded ? 'Collapse row' : 'Expand row'}
						aria-expanded={expanded}
						disabled={!Expandable({ datum, index: _index })}
						onClick={(event: MouseEvent<HTMLButtonElement>) => {
							event.stopPropagation();
							setExpanded((prev) => !prev);
						}}
					>
						<ExpandArrowIcon />
					</button>
				);
		}
		const component1 =
			expandControl || checkControl ? (
				<>
					{expandControl}
					{checkControl}
				</>
			) : null;

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
				/>
			);
		}

		return (
			<TableCellV2
				key={item.id}
				{...cellPropsWithoutHideColumnLines}
				tabIndex={-1}
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
					className
				)}
			>
				{tableCells}
			</tr>
			{Expandable && expanded && (
				<tr
					{...(!onCheck && {
						onClick: () => {
							onRowClick?.(datum);
						},
					})}
				>
					<Expandable datum={datum} index={_index} />
				</tr>
			)}
		</>
	);
});

export default TableRow;
