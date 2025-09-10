import type { ReactElement } from 'react';
import { TableRow } from '../row';
import type { TableProps } from '../types';
import styles from './TableHeader.module.css';

interface TableHeaderProps
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
		| ((params: { datum: Record<string, unknown>; index: number | undefined }) => ReactElement)
		| undefined;
	checkedRows: Record<string, unknown>[];
	setCheckedRows: (rows: Record<string, unknown>[]) => void;
}

const TableHeader = ({
	headerData,
	customCells,
	expandable,
	onSort,
	sortValue,
	rowHeight = 'md',
	onRowClick,
	onCheck,
	checkedRows,
	setCheckedRows,
	tableData,
	checkAsRadio,
	disableCheck,
}: TableHeaderProps): ReactElement => {
	return (
		<thead data-elem='table-header' className={styles.root}>
			<TableRow
				type='header'
				headerData={headerData}
				tableData={tableData}
				customCells={customCells}
				expandable={expandable}
				onSort={onSort}
				sortValue={sortValue}
				rowHeight={rowHeight}
				onRowClick={onRowClick}
				onCheck={onCheck}
				checkedRows={checkedRows}
				setCheckedRows={setCheckedRows}
				checkAsRadio={checkAsRadio}
				disableCheck={disableCheck}
				datum={{
					header: '__table_header__',
				}}
			/>
		</thead>
	);
};

export default TableHeader;
