import {
	forwardRef,
	useEffect,
	useReducer,
	useRef,
	useState,
	type Dispatch,
	type RefObject,
} from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { BaseCell } from '../cell';
import { ArrowIcon } from '../icons';
import { DropdownItemv2, Dropdownv2, TextFieldv2 } from '../input';
import { Text } from '../text';
import { Tooltip } from '../tooltip';
import type { PaginationListInit, Page as PaginationPage } from './Pagination.class';
import { PaginationList } from './Pagination.class';
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
			return {
				...state,
				currentPage: (state.currentPage ?? 0) + 1,
			};
		case 'PREV_PAGE':
			return {
				...state,
				currentPage: (state.currentPage ?? 0) - 1,
			};
		case 'SET_PAGE':
			return {
				...state,
				currentPage: action.payload ?? 1,
			};
		case 'SET_STEP':
			return {
				...state,
				step: action.payload,
			};
		case 'SET_TOTAL_PAGES':
			return {
				...state,
				totalPages: action.payload,
			};
		case 'SET_TOTAL_DATA':
			return {
				...state,
				totalData: action.payload,
			};
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
			paginationDispatch({
				type: 'SET_PAGE',
				payload: totalPages,
			});
		}

		if (paginationState.totalData !== totalData) {
			paginationDispatch({
				type: 'SET_TOTAL_DATA',
				payload: totalData,
			});
		}

		paginationDispatch({
			type: 'SET_TOTAL_PAGES',
			payload: totalPages,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalPages, totalData]);

	return [paginationState, paginationDispatch] as const;
};

const dropdownOptions = [
	{
		title: '10 per page',
		value: 10,
	},
	{
		title: '15 per page',
		value: 15,
	},
	{
		title: '25 per page',
		value: 25,
	},
	{
		title: '35 per page',
		value: 35,
	},
	{
		title: '50 per page',
		value: 50,
	},
	{
		title: '100 per page',
		value: 100,
	},
] as const;

interface PageLabelDisplayProps {
	currentPage: number | null;
	step: number;
	totalData: number | null;
	totalPages: number | null;
	isDisplayLabelVisible: boolean;
	dataLabel?: string | undefined;
	render?: boolean;
	fallback?: boolean;
}

const PageLabelDisplay = ({
	currentPage,
	step,
	totalData,
	totalPages,
	isDisplayLabelVisible,
	dataLabel,
	render,
	fallback,
}: PageLabelDisplayProps) => {
	if (!render) return null;

	const curr = currentPage === 0 ? 1 : (currentPage ?? 1);
	const start = (curr - 1) * step + 1;
	const end = curr * step;

	return (
		(Boolean(totalData && totalData > 0) || Boolean(totalPages && totalPages > 0)) &&
		(isDisplayLabelVisible || fallback) && (
			<Text
				variant='b1'
				stroke='medium'
				className={styles['total-data']}
				attrs={{
					title: `${start.toString()}-${end.toString()} of ${(totalData ?? 0).toString()}`,
				}}>
				<Text>Displaying</Text> {start}-
				{currentPage != null && totalPages != null && currentPage === totalPages
					? (totalData ?? 0)
					: end}{' '}
				of {totalData ?? 'total'} <Text>{dataLabel ?? 'records'}</Text>
			</Text>
		)
	);
};

export interface PaginationProps {
	className?: string;
	floating?: boolean;
	enableJumpToPage?: boolean;
	paginationState?: Pick<PaginationState, 'totalPages' | 'currentPage' | 'step' | 'totalData'>;
	paginationDispatch?: Dispatch<PaginationAction>;
	loading?: boolean;
	dataLabel?: string | undefined;
	jumpLabel?: string | undefined;
	onChange?: (args: { currentPage: number; step: number; totalPages: number | null }) => void;
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
	const {
		className = '',
		floating,
		enableJumpToPage = true,
		paginationState = {
			totalPages: null,
			currentPage: null,
			step: 10,
			totalData: null,
		},
		paginationDispatch,
		loading,
		dataLabel,
		jumpLabel = 'Jump to Page',
		onChange,
	} = props;

	const { totalPages = 0, currentPage = 1, step = 10, totalData = null } = paginationState;

	const paginationList = new PaginationList({
		curr: currentPage === 0 ? 1 : currentPage,
		total: totalPages,
	} as PaginationListInit);

	const jumpPageRef = useRef<HTMLInputElement | null>(null);
	const mountedRef = useRef(false);

	const dispatch = (action: PaginationAction) => {
		paginationDispatch?.(action);
	};

	useEffect(() => {
		if (mountedRef.current && onChange) {
			onChange({
				currentPage: currentPage ?? 1,
				step,
				totalPages,
			});
		}
	}, [currentPage, step, totalPages]);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const [isDisplayLabelVisible, setDisplayLabelVisible] = useState(false);

	const updateChildVisibility = () => {
		const parent = (ref as RefObject<HTMLDivElement>)?.current;
		const parentWidth = parent?.offsetWidth;
		setDisplayLabelVisible(parentWidth >= 1000);
	};

	useEffect(() => {
		updateChildVisibility();
		window.addEventListener('resize', updateChildVisibility);
		return () => {
			window.removeEventListener('resize', updateChildVisibility);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showTotalData =
		typeof totalData === 'number' && ((currentPage ?? 1) - 1) * step + 1 < totalData;

	const showPages = (totalPages ?? 0) > 1;

	return (
		<div
			ref={ref}
			className={classes(
				styles.root,
				floating ? styles.floating : '',
				showTotalData ? '' : styles['no-total-data'],
				className
			)}>
			<div className={styles['left-options']}>
				<BaseCell
					size='auto'
					flexible
					className={styles['row-switcher']}
					component2={
						<BaseCell
							size='auto'
							flexible
							className={styles['row-switcher-handle']}
							component2={
								<Dropdownv2
									className={styles.dropdown}
									popperClassName={styles['dropdown-popper']}
									value={step.toString()}
									placeholder=''
									onChange={(_, newStep) => {
										dispatch({
											type: 'SET_STEP',
											payload: Number(newStep ?? 1),
										});
									}}>
									{dropdownOptions.map((item) => {
										return (
											<DropdownItemv2
												title={item.title}
												value={item.value}
												key={item.value}
											/>
										);
									})}
								</Dropdownv2>
							}
						/>
					}
				/>

				<PageLabelDisplay
					currentPage={currentPage}
					step={step}
					totalData={totalData}
					totalPages={totalPages}
					isDisplayLabelVisible={isDisplayLabelVisible && !loading}
					dataLabel={dataLabel}
					render={enableJumpToPage}
				/>
			</div>

			{showPages && (
				<div
					className={classes(
						styles['page-numbers'],
						!enableJumpToPage ? styles.stretch : ''
					)}>
					<div className={styles.pageSelect}>
						{paginationList.pages.map((page: PaginationPage) => {
							const active = (currentPage === 0 ? 1 : currentPage) === page.number;
							return (
								<span
									title={`Page ${page.number.toString()}`}
									key={page.number}
									onClick={() => {
										dispatch({
											type: 'SET_PAGE',
											payload: page.number,
										});
									}}
									data-active={active}
									className={classes(
										active ? styles.active : '',
										styles.number,
										page.ellipsis ? styles.ellipsis : ''
									)}>
									{page.ellipsis ? '...' : page.number}
								</span>
							);
						})}
					</div>
				</div>
			)}

			{showPages && enableJumpToPage && (
				<div className={styles.options}>
					<BaseCell
						flexible
						className={styles.form}
						component2={
							<form
								onSubmit={(e) => {
									e.preventDefault();
									const v = jumpPageRef.current?.value;
									if (!v) return;
									const next = parseInt(v, 10);
									if (Number.isNaN(next)) return;
									dispatch({
										type: 'SET_PAGE',
										payload: next,
									});
								}}>
								<Tooltip content={jumpLabel} position='top'>
									<BaseCell
										size='auto'
										className={styles['jump-to-page']}
										component1={
											<TextFieldv2
												inputProps={{
													min: 1,
													max: totalPages ?? undefined,
													required: true,
													placeholder: '',
												}}
												ref={jumpPageRef}
												type='number'
												className={styles.inputbox}
											/>
										}
										component2={
											<Button
												size='auto'
												variant='contained'
												className={styles.button}
												rightComponent={() => {
													return <ArrowIcon className={styles.icon} />;
												}}
											/>
										}
									/>
								</Tooltip>
							</form>
						}
					/>
				</div>
			)}

			{!enableJumpToPage && (
				<div className={styles.options}>
					<PageLabelDisplay
						currentPage={currentPage}
						step={step}
						totalData={totalData}
						totalPages={totalPages}
						isDisplayLabelVisible={isDisplayLabelVisible}
						dataLabel={dataLabel}
						render
						fallback
					/>
				</div>
			)}
		</div>
	);
});
