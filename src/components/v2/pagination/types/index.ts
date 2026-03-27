import type { Dispatch } from 'react';

type Nullable<T> = T | null;

export interface PaginationState {
	totalPages: Nullable<number>;
	currentPage: Nullable<number>;
	step: number;
	totalData: Nullable<number>;
}

export type PaginationAction =
	| { type: 'NEXT_PAGE' }
	| { type: 'PREV_PAGE' }
	| { type: 'SET_PAGE'; payload: number | undefined }
	| { type: 'SET_STEP'; payload: number }
	| { type: 'SET_TOTAL_PAGES'; payload: Nullable<number> }
	| { type: 'SET_TOTAL_DATA'; payload: Nullable<number> };

export interface PaginationProps {
	className?: string;
	floating?: boolean;
	paginationState?: Pick<PaginationState, 'totalPages' | 'currentPage' | 'step' | 'totalData'>;
	paginationDispatch?: Dispatch<PaginationAction>;
	loading?: boolean;
	dataLabel?: string | undefined;
	onChange?: (args: { currentPage: number; step: number; totalPages: number | null }) => void;
}
