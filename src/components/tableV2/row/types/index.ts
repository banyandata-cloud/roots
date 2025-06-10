import type { ElementSizeTypes } from 'components/cell';
import type { CSSProperties } from 'react';

type TableRowType = 'header' | 'body';

type TableHeaderType = {
	title: string;
	id: string;
	fallbackValue?: string | undefined;
	sort?: boolean | undefined;
	size?: ElementSizeTypes;
	flexible?: false | undefined;
	style?: CSSProperties | undefined;
	multiLine?: boolean | undefined;
	sticky?: 'right' | 'left' | 'undefined';
	columnFilter?: boolean | undefined;
	html?: boolean | undefined;
	json?: boolean | undefined;
}[];

type TableDataValueType = string | number | Record<string, string | number> | number[] | string[];

type TableDataType = Record<string, TableDataValueType>[];

export interface TableRowProps {
	type: TableRowType;
	headerData: TableHeaderType;
	tableData: TableDataType;
}
