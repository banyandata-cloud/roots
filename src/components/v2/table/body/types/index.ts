import type { ReactElement } from 'react';
import type { RowHeight } from '../../types';
export interface TableProps {
	headerData?: any[] | undefined;
	customCells?: Record<string, any> | undefined;
	tableData?: any[];
	className?: string;
	loading?: boolean;
	onRowClick?: ((row: any) => void) | undefined;
	onSort?: ((key: string, direction: 'asc' | 'desc') => void) | undefined;
	sortValue?: string | undefined;
	rowHeight?: RowHeight;
	defaultActiveIndex?: number | undefined;
	emptyPlaceholder?: ReactElement;
	onCheck?: ((row: any) => void) | undefined;
	uniqueKey?: string;
	checkAsRadio?: boolean | undefined;
	disableCheck?: ((datum: any) => boolean) | undefined;
	hideColumnLines?: boolean;
}
export interface TableBodyProps extends Pick<
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
	expandable?: (params: { datum: Record<string | number, any>; index: number }) => ReactElement;

	checkedRows: Record<string, unknown>[];
	setCheckedRows: (rows: Record<string, unknown>[]) => void;
}
