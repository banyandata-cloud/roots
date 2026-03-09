import { forwardRef, useEffect, useReducer, useRef, useState, type Dispatch } from 'react';
import { classes } from '../../../utils';
import { DropdownItemv2, Dropdownv2 } from '../../input';
import styles from './Pagination.module.css';

type Nullable<T> = T | null;

export interface PaginationState {
	totalPages: Nullable<number>;
	currentPage: Nullable<number>;
	step: number;
	totalData: Nullable<number>;
}

type PaginationAction =
	| { type: 'NEXT_PAGE' }
	| { type: 'PREV_PAGE' }
	| { type: 'SET_PAGE'; payload: number | undefined }
	| { type: 'SET_STEP'; payload: number }
	| { type: 'SET_TOTAL_PAGES'; payload: Nullable<number> }
	| { type: 'SET_TOTAL_DATA'; payload: Nullable<number> };

const reducer = (state: PaginationState, action: PaginationAction): PaginationState => {
	switch (action.type) {
		case 'NEXT_PAGE':
			return { ...state, currentPage: (state.currentPage ?? 0) + 1 };
		case 'PREV_PAGE':
			return { ...state, currentPage: (state.currentPage ?? 0) - 1 };
		case 'SET_PAGE':
			return { ...state, currentPage: action.payload ?? 1 };
		case 'SET_STEP':
			const firstRow = ((state.currentPage ?? 1) - 1) * state.step + 1;
			const newPage = Math.ceil(firstRow / action.payload);
			const newTotalPages =
				state.totalData != null
					? Math.ceil(state.totalData / action.payload)
					: state.totalPages;
			return {
				...state,
				step: action.payload,
				currentPage: newPage,
				totalPages: newTotalPages,
			};
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload };
		case 'SET_TOTAL_DATA':
			return { ...state, totalData: action.payload };
		default:
			return state;
	}
};

type UsePaginationArgs = Partial<
	Pick<PaginationState, 'totalPages' | 'currentPage' | 'step' | 'totalData'>
>;

export const usePagination = (props: UsePaginationArgs) => {
	const { totalPages = null, currentPage = null, step = 10, totalData = null } = props;
	const [paginationState, paginationDispatch] = useReducer(reducer, {
		totalPages,
		currentPage,
		step,
		totalData,
	} as PaginationState);

	useEffect(() => {
		if (
			paginationState.currentPage != null &&
			totalPages != null &&
			paginationState.currentPage > totalPages
		) {
			paginationDispatch({ type: 'SET_PAGE', payload: totalPages });
		}
		if (paginationState.totalData !== totalData) {
			paginationDispatch({ type: 'SET_TOTAL_DATA', payload: totalData });
		}
		paginationDispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages });

	}, [totalPages, totalData]);

	return [paginationState, paginationDispatch] as const;
};

const ALL_DROPDOWN_OPTIONS = [
	{ title: '10', value: 10 },
	{ title: '20', value: 20 },
	{ title: '30', value: 30 },
	{ title: '40', value: 40 },
] as const;

const ChevronLeft = () => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M10 12L6 8L10 4'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const ChevronRight = () => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M6 4L10 8L6 12'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export interface PaginationProps {
	className?: string;
	floating?: boolean;
	paginationState?: Pick<PaginationState, 'totalPages' | 'currentPage' | 'step' | 'totalData'>;
	paginationDispatch?: Dispatch<PaginationAction>;
	loading?: boolean;
	dataLabel?: string | undefined;
	onChange?: (args: { currentPage: number; step: number; totalPages: number | null }) => void;
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
	const {
		className = '',
		floating,
		paginationState = {
			totalPages: null,
			currentPage: null,
			step: 30,
			totalData: null,
		},
		paginationDispatch,
		loading,
		dataLabel,
		onChange,
	} = props;

	const { totalPages = 0, currentPage = 1, step = 30, totalData = null } = paginationState;
	const mountedRef = useRef(false);

	const [pageInputValue, setPageInputValue] = useState<string>('');

	const dispatch = (action: PaginationAction) => paginationDispatch?.(action);

	useEffect(() => {
		if (mountedRef.current && onChange) {
			onChange({ currentPage: currentPage ?? 1, step, totalPages });
		}
	}, [currentPage, step, totalPages]);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		const curr = currentPage === 0 ? 1 : (currentPage ?? 1);
		setPageInputValue(curr.toString());
	}, [currentPage]);

	const curr = currentPage === 0 ? 1 : (currentPage ?? 1);
	const start = (curr - 1) * step + 1;
	const end = curr === totalPages ? (totalData ?? curr * step) : curr * step;
	const isSinglePage = (totalPages ?? 0) <= 1;
	const canGoPrev = !isSinglePage && curr > 1;
	const canGoNext = !isSinglePage && totalPages != null && totalPages > 0 && curr < totalPages;
	const showData = typeof totalData === 'number' && totalData > 0 && !loading;
	const availableDropdownOptions = ALL_DROPDOWN_OPTIONS.filter((opt) => {
		if (totalData == null) return true;
		const prevOption = ALL_DROPDOWN_OPTIONS[ALL_DROPDOWN_OPTIONS.indexOf(opt) - 1];
		if (!prevOption) return true;
		return totalData > prevOption.value;
	});


	const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPageInputValue(e.target.value);
	};

	const handlePageInputCommit = () => {
		const parsed = parseInt(pageInputValue, 10);
		const maxPage = totalPages ?? 1;

		if (isNaN(parsed) || parsed < 1) {
			dispatch({ type: 'SET_PAGE', payload: 1 });
			setPageInputValue('1');
		} else if (parsed > maxPage) {
			dispatch({ type: 'SET_PAGE', payload: maxPage });
			setPageInputValue(maxPage.toString());
		} else {
			dispatch({ type: 'SET_PAGE', payload: parsed });
		}
	};

	const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handlePageInputCommit();
			(e.target as HTMLInputElement).blur();
		}
	};

	return (
		<div ref={ref} className={classes(styles.root, floating ? styles.floating : '', className)}>
			<div className={styles['left']}>
				<div className={styles['rows-per-page']}>
					<span className={styles['rows-label']}>Rows per page :</span>
					<Dropdownv2
						className={classes(
							styles['dropdown'],
							isSinglePage ? styles['dropdown-disabled'] : ''
						)}
						popperClassName={styles['dropdown-popper']}
						value={step.toString()}
						placeholder=''
						disabled={isSinglePage}
						onChange={(_, newStep) => {
							dispatch({ type: 'SET_STEP', payload: Number(newStep ?? 30) });
						}}>
						{availableDropdownOptions.map((item) => (
							<DropdownItemv2
								title={item.title}
								value={item.value}
								key={item.value}
							/>
						))}
					</Dropdownv2>
				</div>

				{showData && (
					<div className={styles['showing']}>
						<span className={styles['showing-text']}>
							Showing {start}–{end} from {totalData}
							{dataLabel ? ` ${dataLabel}` : ''}
						</span>
					</div>
				)}
			</div>

			<div className={styles['right']}>
				<div className={styles['page-counter']}>
					<div className={styles['page-num-box']}>
						<input
							className={styles['page-input']}
							type='number'
							min={1}
							max={totalPages ?? 1}
							value={pageInputValue}
							onChange={handlePageInputChange}
							onBlur={handlePageInputCommit}
							onKeyDown={handlePageInputKeyDown}
							disabled={isSinglePage}
						/>
					</div>
					<span className={styles['page-of']}>of</span>
					<span className={styles['page-total']}>{totalPages ?? 1}</span>
				</div>

				<div className={styles['nav-buttons']}>
					<button
						className={styles['nav-btn']}
						disabled={!canGoPrev}
						onClick={() => dispatch({ type: 'PREV_PAGE' })}
						aria-label='Previous page'>
						<ChevronLeft />
					</button>

					<button
						className={styles['nav-btn']}
						disabled={!canGoNext}
						onClick={() => dispatch({ type: 'NEXT_PAGE' })}
						aria-label='Next page'>
						<ChevronRight />
					</button>
				</div>
			</div>
		</div>
	);
});
