import type {
	ComponentType,
	CSSProperties,
	Dispatch,
	FC,
	ReactElement,
	SetStateAction,
} from 'react';
import type { TableCellProps } from '../cell/types';

export type RowHeight = 'md' | 'lg';
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
	formatter?:
		| ((value: string, index: number | undefined, datum: Record<string, unknown>) => string)
		| undefined;
}

export interface TableDrawerData {
	datum: Record<string, unknown>;
	index: number;
	setActiveId?: (reset?: boolean, multiSelect?: boolean) => void;
	standalone?: boolean;
}

export interface TableDrawerToggle {
	open: boolean;
	data: Partial<TableDrawerData>;
}

export interface TableDrawerProps {
	renderBody?: FC<{
		datum: Record<string, unknown>;
		toggle?: (props: Record<string, unknown>) => void;
		toggleTableDrawer?: {
			open: boolean;
			data: Record<string, unknown>;
		};
		setToggleTableDrawer?: Dispatch<SetStateAction<TableDrawerToggle>>;
	}>[];
	standalone?: FC<{
		datum: Record<string, unknown>;
		toggle?: (props: Record<string, unknown>) => void;
		toggleTableDrawer?: {
			open: boolean;
			data: Record<string, unknown>;
		};
		setToggleTableDrawer?: Dispatch<SetStateAction<TableDrawerToggle>>;
	}>[];
	className?: string;
	tabsConfig?: unknown;
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
	tableData: Record<string, unknown>[];
	uniqueKey?: string;
	customCells?: CustomCells | undefined;
	paginationData?: PaginationData | null;
	loading?: boolean;
	onIntersection?: (isVisible: boolean) => void;
	isFloating?: boolean;
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
	jumpLabel?: string;
	clearSearch?: boolean | undefined;
	tableDrawerProps?:
		| TableDrawerProps
		| ((data: Partial<TableDrawerData>) => TableDrawerProps)
		| undefined;

	searchProps?: SearchProps;

	filtersCount?: number;

	emptyPlaceholder?: ComponentType | undefined;

	onCheck?: ((checkedRows: Record<string, unknown>[]) => void) | undefined;
	checkAsRadio?: boolean | undefined;
	disableCheck?: ((datum: Record<string, unknown>) => boolean) | undefined;
}
