import type { BaseCellProps } from 'components/cell';
import type { StickyType, TableProps } from 'components/table/types';
import type { CSSProperties, ReactNode } from 'react';

export type SortType = 'asc' | 'desc' | 'default';
export type MetaColumnIDs = '__checkbox' | '__action';

export interface TableCellProps
	extends Pick<TableProps, 'onSort' | 'sortValue' | 'rowHeight'>,
		BaseCellProps<'td', false> {
	id: string;
	_index?: number | undefined;
	style?: CSSProperties | undefined;
	multiLine?: boolean | undefined;
	type?: 'header' | 'body';
	cellContent: ReactNode | undefined | null;
	cellTitle?: string | undefined | null;
	sticky?: StickyType;
	sort?: boolean;
	html?: boolean;
	datum?: Record<string, unknown>;
	expandableProps?:
		| ((params: { datum: Record<string, unknown>; index: number }) => boolean)
		| Record<string, unknown>
		| undefined;
	toggleDrawer?: ((index: number, standalone: boolean) => void) | null;
}
