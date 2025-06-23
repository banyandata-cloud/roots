import type { TableProps } from 'components/tableV2/types';

type TableRowType = 'header' | 'body';

export interface TableRowProps<TDatum extends object> extends TableProps<TDatum> {
	type: TableRowType;
}
