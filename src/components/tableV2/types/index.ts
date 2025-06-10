import type { ElementSizeTypes } from 'components/cell';
import type { CSSProperties, ReactElement } from 'react';

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

type TableDataType = Record<string, TableDataValueType>;

interface CustomCellsType {
	header?: Record<string, (extra: string | undefined) => Record<string, ReactElement>>;
	body?: Record<string, (extra: string | undefined) => Record<string, ReactElement>>;
}

export interface TableProps {
	className?: string | undefined;
	headerData: TableHeaderType;
	tableData: TableDataType[];
	uniqueKey?: string | undefined;
	customCells?: CustomCellsType;
	loading: boolean;
	checkAsRadio: boolean;
	filtersCount: number;
	emptyPlaceholder?: ReactElement | null;
	onCheck?: ((datum: TableDataType[]) => void) | undefined;
	disableCheck?: ((datum: TableDataType) => boolean) | undefined;
	dataLabel: string;
	isFloating?: boolean | undefined;
	tableInfo: {
		title: string | ReactElement;
		description?: string | ReactElement | undefined;
	};
	searchProps: {
		onSearch: (search: string) => void;
		placeholder: string;
		disabled?: boolean | undefined;
		onClear: () => void;
	};
	jumpLabel: string | undefined;
}
