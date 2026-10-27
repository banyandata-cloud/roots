import type { ComponentType, CSSProperties, FC, ReactElement, ReactNode } from 'react';
import type { TableCellProps } from '../cell/types';

export type RowHeight = 'sm' | 'md' | 'lg';
export type CellSize = 'sm' | 'md' | 'lg';
export type SortType = 'asc' | 'desc' | 'default';
export type StickyType = 'right' | 'left';
export interface SizeInRem {
	sm: 9.063;
	md: 15.625;
	lg: 21.875;
}

export interface TableColumn {
	id: string;
	title: string;
	size?: CellSize;
	flexible?: boolean;
	sort?: boolean;
	style?: CSSProperties;
	multiLine?: boolean;
	fallbackValue?: string;
	sizeInRem?: SizeInRem;
	sticky?: StickyType;
	columnFilter?: boolean;
	html?: boolean;
	json?: boolean;
	filterOptions?: string[];
	filterValue?: string[];
	onFilter?: (id: string, selected: string[]) => void;
	formatter?:
		| ((value: string, index: number | undefined, datum: Record<string, unknown>) => string)
		| undefined;
}

export interface PaginationData {
	page: number;
	pageSize: number;
	totalItems: number;
	onPageChange: (page: number) => void;
	onPageSizeChange?: (size: number) => void;
}

export interface SearchProps {
	onSearch?: (value: string) => void;
	placeholder?: string;
	onClear?: () => void;
}

export interface CustomCells {
	header?: () => Partial<Record<string, FC<TableCellProps>>>;
	body?: () => Partial<Record<string, FC<TableCellProps>>>;
}

export interface TableProps {
	className?: string | undefined;
	headerData: TableColumn[];
	tableData?: Record<string, unknown>[] | undefined;
	uniqueKey?: string;
	customCells?: CustomCells | undefined;
	paginationData?: PaginationData | null;
	loading?: boolean;
	onIntersection?: (isVisible: boolean) => void;
	isFloating?: boolean;
	tableHeader?: () => ReactNode | undefined;
	tableSection?: ReactNode;
	hideColumnLines?: boolean;
	disabledFilterOptions?: {
		search?: boolean;
	};
	rightActions?: ((props: Record<string, unknown>) => ReactElement) | undefined;
	onSort?: ((columnId: string, direction: SortType) => void) | undefined;
	sortValue?: Record<string, SortType> | undefined;
	rowHeight?: RowHeight;
	onRowClick?: ((datum: Record<string, unknown>, setActiveId?: () => void) => void) | undefined;
	defaultActiveIndex?: number | undefined;
	tableInfo?: {
		title?: string;
		description?: string;
	};
	dataLabel?: string;
	clearSearch?: boolean | undefined;
	searchProps?: SearchProps;
	filtersCount?: number;
	emptyPlaceholder?: ComponentType | undefined;
	emptyTitle?: string | undefined;
	emptyDescription?: string | undefined;
	onRetry?: (() => void) | undefined;
	retryLabel?: string | undefined;
	onCheck?: ((checkedRows: Record<string, unknown>[]) => void) | undefined;
	defaultCheckedRows?: Record<string, unknown>[];
	checkAsRadio?: boolean | undefined;
	disableCheck?: ((datum: Record<string, unknown>) => boolean) | undefined;
}
