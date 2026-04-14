import type { ReactElement } from 'react';
export interface TableProps {
	headerData?: any[];
	customCells?: Record<string, any>;
	tableData?: any[];
	className?: string;
	loading?: boolean;
	onRowClick?: (row: any) => void;
	onSort?: (key: string, direction: 'asc' | 'desc') => void;
	sortValue?: string;
	rowHeight?: number;
	defaultActiveIndex?: number;
	emptyPlaceholder?: ReactElement;
	onCheck?: (row: any) => void;
	uniqueKey?: string;
	checkAsRadio?: boolean;
	disableCheck?: boolean;
	hideColumnLines?: boolean;
}
export interface TableBodyProps
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
	expandable?: (params: { datum: Record<string | number, any>; index: number }) => ReactElement;

	checkedRows: Record<string, unknown>[];
	setCheckedRows: (rows: Record<string, unknown>[]) => void;
	toggleDrawer?: (props: object) => void;
}
