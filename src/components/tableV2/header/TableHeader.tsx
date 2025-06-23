import type { ReactElement } from 'react';
import { TableRow } from '../row';
import styles from './TableHeader.module.css';

const TableHeader = ({
	headerData,
	customCells,
	expandable,
	onSort,
	sortValue,
	rowHeight,
	theme = '',
	onRowClick,
	onCheck,
	checkedRows,
	setCheckedRows,
	tableData,
	checkAsRadio,
	disableCheck,
}): ReactElement => {
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
				theme={theme}
				onCheck={onCheck}
				checkedRows={checkedRows}
				setCheckedRows={setCheckedRows}
				checkAsRadio={checkAsRadio}
				disableCheck={disableCheck}
			/>
		</thead>
	);
};

export default TableHeader;
