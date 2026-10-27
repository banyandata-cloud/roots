import type { StickyType, TableProps } from '../../types';
import type { ComponentProps, CSSProperties, ReactElement, ReactNode } from 'react';

export type SortType = 'asc' | 'desc' | 'default';
export type MetaColumnIDs = '__checkbox' | '__action';

export type TableCellSize = 'xs' | 'sm' | 'md' | 'lg' | 'auto';
export type TableCellRadius = 'none' | 'default' | 'round' | 'ellipse';

export interface TableCellProps extends Pick<TableProps, 'onSort' | 'sortValue' | 'rowHeight'> {
	id: string;
	className?: string | undefined;
	size?: TableCellSize;
	/** Lets the cell grow and shrink to fill the available row space. */
	flexible?: boolean | undefined;
	/** Rendered before the cell content (usually the row checkbox). */
	component1?: ReactElement | undefined | null;
	/** Rendered after the cell content; replaced by the sort/filter actions on header cells. */
	component3?: ReactElement | undefined | null;
	/** Defaults to `th` for header cells and `td` for body cells. */
	RootDOM?: 'td' | 'th';
	/** Extra attributes spread onto the root element. */
	attrs?: ComponentProps<'td'>;
	radius?: TableCellRadius;
	_index?: number | undefined;
	style?: CSSProperties | undefined;
	multiLine?: boolean | undefined;
	type?: 'header' | 'body';
	cellContent?: ReactNode | Record<string, unknown> | undefined | null;
	cellTitle?: string | undefined | null;
	sticky?: StickyType;
	sort?: boolean;
	html?: boolean;
	datum?: Record<string, unknown>;
	columnFilter?: boolean;
	filterOptions?: string[];
	onFilter?: (id: string, selected: string[]) => void;
	filterValue?: string[];
	tabIndex?: number | undefined;
	hideColumnLines?: boolean;
	expandableProps?:
		| ((params: { datum: Record<string, unknown>; index: number }) => boolean)
		| Record<string, unknown>
		| undefined;
}
