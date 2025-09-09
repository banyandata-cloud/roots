import { useRef, type Key, type ReactElement } from 'react';
import { classes } from '../../../utils';
import { TableRow } from '../row';
import type { TableProps } from '../types';
import styles from './TableBody.module.css';

interface TableBodyProps
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
	checkedRows: Record<string, unknown>[];
	setCheckedRows: (rows: Record<string, unknown>[]) => void;
	toggleDrawer?: (props: object) => void;
}

const TableBody = (props: TableBodyProps) => {
	const {
		tableData = [],
		headerData,
		customCells,
		className,
		expandable,
		rowHeight = 'md',
		onRowClick,
		defaultActiveIndex,
		toggleDrawer,
		onCheck,
		checkedRows,
		setCheckedRows,
		uniqueKey = '',
		checkAsRadio,
		disableCheck,
	} = props;

	const listRef = useRef<(HTMLTableRowElement | null)[]>([]);
	const isActiveRef = useRef(false);

	return (
		<tbody data-elem='table-body' className={classes(styles.root, className)}>
			{tableData.map((datum, _index) => {
				let key = _index.toString() as Key;

				if (uniqueKey) {
					key = datum[uniqueKey] as Key;
				}

				const setActiveId = (reset = false, multiSelect = false) => {
					if (reset) {
						isActiveRef.current = false;
						listRef.current[_index]?.removeAttribute('data-active');
					} else {
						if (!multiSelect) {
							listRef.current.forEach((elem) => {
								elem?.removeAttribute('data-active');
							});
						}
						isActiveRef.current = true;
						listRef.current[_index]?.setAttribute('data-active', 'true');
					}
				};

				return (
					<TableRow
						key={key}
						{...{
							ref: (node) => {
								listRef.current[_index] = node;

								if (!isActiveRef.current && defaultActiveIndex === _index) {
									node?.setAttribute('data-active', 'true');
								}
							},
							datum,
							headerData,
							customCells,
							_index,
							setActiveId,
							expandable,
							rowHeight,
							onRowClick,
							toggleDrawer,
							onCheck,
							checkedRows,
							setCheckedRows,
							uniqueKey,
							checkAsRadio,
							disableCheck,
						}}
					/>
				);
			})}
		</tbody>
	);
};

export default TableBody;
