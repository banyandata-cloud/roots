import type { CSSProperties, FC, ReactNode } from 'react';

export type RowHeight = 'md' | 'lg';
export type SortType = 'asc' | 'desc' | 'default';
export type StickyType = 'right' | 'left' | null;
export interface SizeInRem {
	sm: 9.063;
	md: 15.625;
	lg: 21.875;
}
export interface TableColumn<TDatum extends object = Record<string, unknown>> {
	id: keyof TDatum extends string ? keyof TDatum : string;
	title: string;
	size?: RowHeight;
	flexible?: boolean;
	sort?: boolean;
	style?: CSSProperties;
	multiLine?: boolean;
	fallbackValue?: string | number;
	sizeInRem?: SizeInRem;
	sticky?: StickyType;
	columnFilter?: boolean;
	html?: boolean;
	json?: boolean;
}

export interface TableDrawerData<TDatum extends object> {
	datum: TDatum;
	index: number;
	setActiveId?: (reset?: boolean, multiSelect?: boolean) => void;
	standalone?: boolean;
}

export interface TableDrawerToggle<TDatum extends object> {
	open: boolean;
	data: Partial<TableDrawerData<TDatum>>;
}

export interface TableDrawerProps<TDatum extends object> {
	renderBody?: FC<{ datum: TDatum }>[];
	standalone?: FC<{ datum: TDatum }>[];
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
	disabled?: boolean;
	onClear?: () => void;
}

export interface CellProps<TDatum extends object> {
	datum: TDatum;
	cellContent: ReactNode;
	cellTitle?: string;
	_index: number;
	type: 'header' | 'body';
	onSort?: (id: keyof TDatum & string, dir: SortType) => void;
	sortValue?: Record<keyof TDatum & string, SortType>;
	rowHeight?: RowHeight;
	toggleDrawer?: (data: TableDrawerData<TDatum>) => void;
	setActiveId?: (reset?: boolean, multiSelect?: boolean) => void;
	expandableProps?: {
		_expanded: boolean;
		_setExpanded: (v: boolean) => void;
		disabled: boolean;
		onClick: () => void;
	};
	style?: CSSProperties;
}

export interface CustomCells<TDatum extends object> {
	header?: () => Partial<Record<keyof TDatum & string, FC<CellProps<TDatum>>>>;
	body?: () => Partial<Record<keyof TDatum & string, FC<CellProps<TDatum>>>>;
}

export interface TableProps<TDatum extends object = Record<string, unknown>> {
	className?: string;
	headerData: TableColumn<TDatum>[];
	tableData: TDatum[];
	uniqueKey?: keyof TDatum & string;
	customCells?: CustomCells<TDatum>;
	paginationData?: PaginationData | null;
	loading?: boolean;
	onIntersection?: (isVisible: boolean) => void;
	isFloating?: boolean;
	disabledFilterOptions?: {
		search?: boolean;
	};

	rightActions?: ReactNode;

	onSort?: (columnId: keyof TDatum & string, direction: SortType) => void;
	sortValue?: Record<keyof TDatum & string, SortType>;

	rowHeight?: RowHeight;
	onRowClick?: (datum: TDatum, setActiveId?: () => void) => void;

	defaultActiveIndex?: number;

	tableInfo?: {
		title?: string;
		description?: string;
	};

	dataLabel?: string;
	jumpLabel?: string;

	tableDrawerProps?:
		| TableDrawerProps<TDatum>
		| ((data: Partial<TableDrawerData<TDatum>>) => TableDrawerProps<TDatum>)
		| undefined;

	searchProps?: SearchProps;

	filtersCount?: number;

	emptyPlaceholder?: ReactNode;

	onCheck?: (checkedRows: TDatum[]) => void;
	checkAsRadio?: boolean;
	disableCheck?: (datum: TDatum) => boolean;
}
