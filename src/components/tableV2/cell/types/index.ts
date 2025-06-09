import type { BaseCellProps } from 'components/cell';
import type { CSSProperties, ReactElement } from 'react';

export type SortType = 'asc' | 'desc' | 'default';

export interface TableCellProps extends BaseCellProps<'td'> {
	id: string;
	style?: CSSProperties | undefined;
	multiLine?: boolean | undefined;
	type: 'header' | 'body';
	cellContent: ReactElement | string;
	cellTitle: string | undefined;
	sticky?: string | undefined;
	sort?: boolean;
	onSort: (id: string, nextState: string) => void;
	sortValue?: Record<string, SortType>;
	html?: boolean;
}
