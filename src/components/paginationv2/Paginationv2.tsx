/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import { forwardRef, useEffect, useReducer, useRef, useState } from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { BaseCell } from '../cell';
import { ArrowIcon } from '../icons';
import { DropdownItem, Dropdown, TextField } from '../input';
import { Text } from '../text';
import { Tooltip } from '../tooltip';
import { CustomPaginationList, PaginationList } from './Pagination.class';
import styles from './Paginationv2.module.css';

interface DropdownOption {
	title: string;
	value: number;
}

const dropdownOptions: DropdownOption[] = [
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
];

interface PaginationState {
	currentPage: number | null;
	step: number | null;
	totalPages: number | null;
	totalData: number | null;
}

type PaginationAction =
	| { type: 'NEXT_PAGE' }
	| { type: 'PREV_PAGE' }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_STEP'; payload: number }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_TOTAL_DATA'; payload: number };

const reducer = (state: PaginationState, action: PaginationAction): PaginationState => {
	switch (action.type) {
		case 'NEXT_PAGE':
			return {
				...state,
				currentPage: (state.currentPage || 0) + 1,
			};
		case 'PREV_PAGE':
			return {
				...state,
				currentPage: Math.max((state.currentPage || 1) - 1, 1),
			};
		case 'SET_PAGE':
			return {
				...state,
				currentPage: action.payload || 1,
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

interface PageLabelDisplayProps {
	currentPage: number | null;
	step: number | null;
	customPagination?: boolean;
	customLabel?: string | null; // Accept both undefined and null
	totalData: number | null;
	totalPages: number | null;
	isDisplayLabelVisible?: boolean;
	dataLabel?: string | null; // Accept both undefined and null
	render?: boolean;
	fallback?: boolean;
}

const PageLabelDisplay: React.FC<PageLabelDisplayProps> = ({
	currentPage,
	step,
	customPagination,
	customLabel,
	totalData,
	totalPages,
	isDisplayLabelVisible,
	dataLabel,
	render,
	fallback,
}) => {
	if (!render) {
		return null;
	}

	const safeCurrentPage = currentPage || 1;
	const safeStep = step || 10;
	const safeTotalData = totalData || 0;
	const safeTotalPages = totalPages || 0;

	return customPagination ? (
		<Text
			variant='b1'
			stroke='medium'
			className={styles['total-data'] || ''}
			attrs={{
				title: `${(safeCurrentPage - 1) * safeStep + 1}-${
					safeCurrentPage * safeStep
				} of ${safeTotalData}`,
			}}>
			<Text>{customLabel ?? ''}</Text>
		</Text>
	) : (
		(safeTotalData > 0 || safeTotalPages > 0) && (isDisplayLabelVisible || fallback) && (
			<Text
				variant='b1'
				stroke='medium'
				className={styles['total-data'] || ''}
				attrs={{
					title: `${(safeCurrentPage - 1) * safeStep + 1}-${
						safeCurrentPage * safeStep
					} of ${safeTotalData}`,
				}}>
				<Text>Displaying</Text> {(safeCurrentPage - 1) * safeStep + 1}-
				{safeCurrentPage === safeTotalPages ? safeTotalData : safeCurrentPage * safeStep} of{' '}
				{safeTotalData ?? 'total'} <Text>{dataLabel ?? 'records'}</Text>
			</Text>
		)
	);
};

interface UsePaginationProps {
	totalPages?: number | null;
	currentPage?: number | null;
	step?: number;
	totalData?: number | null;
}

export const usePagination = (props: UsePaginationProps = {}): React.ReactElement => {
	const { totalPages = null, currentPage = null, step = 10, totalData = null } = props;
	const [paginationState, paginationDispatch] = useReducer(reducer, {
		totalPages,
		currentPage,
		step,
		totalData,
	});

	useEffect(() => {
		if (
			paginationState.currentPage &&
			paginationState.totalPages &&
			paginationState.currentPage > paginationState.totalPages
		) {
			paginationDispatch({
				type: 'SET_PAGE',
				payload: paginationState.totalPages,
			});
		}

		if (paginationState.totalData !== totalData) {
			paginationDispatch({
				type: 'SET_TOTAL_DATA',
				payload: totalData || 0,
			});
		}

		if (totalPages !== undefined) {
			paginationDispatch({
				type: 'SET_TOTAL_PAGES',
				payload: totalPages || 0,
			});
		}
	}, [totalPages, totalData]);

	return [paginationState, paginationDispatch] as const;
};

interface CustomPageItem {
	enable: boolean;
	label?: string;
	pageNumber?: number;
}

interface PaginationProps {
	className?: string;
	floating?: boolean;
	customPagination?: boolean;
	enableJumpToPage?: boolean;
	paginationState?: PaginationState;
	paginationDispatch?: React.Dispatch<PaginationAction>;
	loading?: boolean;
	dataLabel?: string;
	customLabel?: string;
	jumpLabel?: string;
	hideDisabledPages?: boolean;
	customPageList?: CustomPageItem[];
	customPageCallback?: (page: number) => void;
	onChange?: (state: {
		currentPage: number;
		step: number | null;
		totalPages: number | null;
	}) => void;
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
	const {
		className = '',
		floating,
		customPagination,
		enableJumpToPage = true,
		paginationState = {
			totalPages: null,
			currentPage: null,
			step: null,
			totalData: null,
		},
		paginationDispatch = () => {},
		loading,
		dataLabel,
		customLabel,
		jumpLabel = 'Jump to Page',
		hideDisabledPages,
		customPageList = [],
		customPageCallback = () => {},
		onChange: onChangeProp,
	} = props;

	const { totalPages, currentPage, step, totalData } = paginationState;

	const newCustomPageList = customPageList?.filter((currPage) => {
		return currPage?.enable;
	});

	const paginationList = customPagination
		? new CustomPaginationList({
				curr: currentPage === 0 ? 1 : currentPage || 1,
				total: hideDisabledPages ? newCustomPageList?.length : totalPages || 0,
				...(hideDisabledPages !== undefined && { hideDisabledPages }),
				customPageList: (hideDisabledPages ? newCustomPageList : customPageList)
					.map((item) => item.pageNumber || 0)
					.filter((pageNumber) => pageNumber > 0),
		  })
		: new PaginationList({
				curr: currentPage === 0 ? 1 : currentPage || 1,
				total: totalPages || 0,
		  });

	let activePage = 0;

	for (let i = 0; i < customPageList?.length; i++) {
		if (customPageList?.[i]?.enable) {
			activePage = i + 1;
			break;
		}
	}

	let activeCutomPage = 0;

	for (let i = 0; i < newCustomPageList?.length; i++) {
		if (newCustomPageList?.[i]?.enable) {
			activeCutomPage = i + 1;
			break;
		}
	}

	const jumpPageRef = useRef<HTMLInputElement>(null);
	const mountedRef = useRef(false);

	const onChange = (action: PaginationAction) => {
		paginationDispatch(action);
	};

	useEffect(() => {
		if (mountedRef.current && currentPage !== null && step !== null) {
			onChangeProp?.({
				currentPage: currentPage === 0 ? 1 : currentPage,
				step,
				totalPages,
			});
		}
	}, [currentPage, step]);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const [isDisplayLabelVisible, setDisplayLabelVisible] = useState(false);

	const updateChildVisibility = () => {
		if (ref && typeof ref !== 'function' && ref.current) {
			const parentWidth = ref.current.offsetWidth;
			setDisplayLabelVisible(parentWidth >= 1000);
		}
	};

	useEffect(() => {
		updateChildVisibility();
		window.addEventListener('resize', updateChildVisibility);
		return () => {
			window.removeEventListener('resize', updateChildVisibility);
		};
	}, []);

	const safeCurrentPage = currentPage || 1;
	const safeStep = step || 10;
	const safeTotalData = totalData || 0;
	const safeTotalPages = totalPages || 0;

	const showTotalData = safeTotalData && (safeCurrentPage - 1) * safeStep + 1 < safeTotalData;
	const showPages = safeTotalPages > 1;

	return (
		<div
			ref={ref}
			className={classes(
				styles.root,
				floating ? styles.floating : '',
				showTotalData ? '' : styles['no-total-data'],
				className
			)}>
			{!customPagination && (
				<div className={styles['left-options']}>
					{!customPagination && (
						<BaseCell
							size='auto'
							flexible
							className={styles['row-switcher']}
							component2={
								<BaseCell
									size='auto'
									flexible
									className={styles['row-switcher-handle']}
									component1={
										<Dropdown
											className={styles.dropdown ?? ''}
											popperClassName={styles['dropdown-popper'] ?? ''}
											value={step ? step.toString() : '10'}
											placeholder=''
											onChange={(_, newStep) => {
												onChange({
													type: 'SET_STEP',
													payload: Number(newStep),
												});
											}}>
											{dropdownOptions.map((item) => {
												return (
													<DropdownItem
														title={item.title}
														value={item.value}
														key={item.value}
													/>
												);
											})}
										</Dropdown>
									}
								/>
							}
						/>
					)}
					<PageLabelDisplay
						currentPage={currentPage}
						step={step}
						customPagination={customPagination ?? false}
						customLabel={customLabel ?? null} // Explicitly convert undefined to null
						totalData={totalData}
						totalPages={totalPages}
						isDisplayLabelVisible={isDisplayLabelVisible && !loading}
						dataLabel={dataLabel ?? null} // Explicitly convert undefined to null
						render={enableJumpToPage}
					/>
				</div>
			)}
			{showPages && !customPagination && (
				<div
					className={classes(
						styles['page-numbers'],
						!enableJumpToPage ? styles.stretch : ''
					)}>
					<div className={styles.pageSelect}>
						{paginationList.pages.map((page) => {
							const active = safeCurrentPage === page.number;
							return (
								<span
									title={`Page ${page.number}`}
									key={page.number}
									onClick={() => {
										onChange({
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
			{showPages && customPagination && (
				<div className={classes(styles['page-numbers'], styles['custom-page-number'])}>
					<div className={styles.pageSelect}>
						{paginationList.pages.map((page) => {
							let active = false;
							if (hideDisabledPages) {
								active =
									currentPage === 0 || currentPage === 1
										? activeCutomPage === page.number
										: (currentPage === page.number &&
												newCustomPageList?.[page.number - 1]?.enable) ??
										  false;
							} else {
								active =
									currentPage === 0 || currentPage === 1
										? activePage === page.number
										: (currentPage === page.number &&
												customPageList?.[page.number - 1]?.enable) ??
										  false;
							}

							return (
								<span
									title={`Page ${page.number}`}
									key={page.number}
									onClick={() => {
										if (
											!hideDisabledPages &&
											!customPageList[page.number - 1]?.enable &&
											!page.ellipsis
										) {
											customPageCallback(page.number);
											return;
										}

										if (page.ellipsis) {
											onChange({
												type: 'SET_PAGE',
												payload: page.number,
											});
											return;
										}
										onChange({
											type: 'SET_PAGE',
											payload: page.number,
										});
									}}
									data-active={active}
									className={classes(
										active ? styles.active : '',
										styles.number,
										customPagination ? styles['custom-number'] : '',
										hideDisabledPages
											? !newCustomPageList[page.number - 1]?.enable
												? styles.disabled
												: ''
											: !customPageList[page.number - 1]?.enable
											? styles.disabled
											: ''
									)}>
									{page.ellipsis
										? '...'
										: hideDisabledPages
										? newCustomPageList[page.number - 1]?.label
										: customPageList[page.number - 1]?.label}
								</span>
							);
						})}
					</div>
				</div>
			)}
			{!customPagination && showPages && enableJumpToPage && (
				<div className={styles.options}>
					<BaseCell
						flexible
						className={styles.form}
						component1={
							<form
								onSubmit={(e) => {
									e.preventDefault();
									if (jumpPageRef.current?.value) {
										onChange({
											type: 'SET_PAGE',
											payload: parseInt(jumpPageRef.current.value, 10),
										});
									}
								}}>
								<Tooltip content={jumpLabel} position='top'>
									<BaseCell
										size='auto'
										className={styles['jump-to-page']}
										component1={
											<TextField
												inputProps={{
													min: 1,
													max: safeTotalPages,
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
						customPagination={customPagination ?? false}
						customLabel={customLabel ?? null}
						totalData={totalData}
						totalPages={totalPages}
						isDisplayLabelVisible={isDisplayLabelVisible}
						dataLabel={dataLabel ?? null}
						render={true}
						fallback={true}
					/>
				</div>
			)}
			{customPagination && (
				<div className={styles.options}>
					<Text
						variant='b1'
						stroke='medium'
						className={styles['total-data'] ?? ''}
						attrs={{
							title: `${(safeCurrentPage - 1) * safeStep + 1}-${
								safeCurrentPage * safeStep
							} of ${safeTotalData}`,
						}}>
						<Text>{customLabel ?? ''}</Text>
					</Text>

					{showPages && (
						<BaseCell
							flexible
							className={styles.form}
							component1={
								<form
									onSubmit={(e) => {
										e.preventDefault();
										if (!jumpPageRef.current?.value) return;

										if (
											!customPageList[
												parseInt(jumpPageRef.current.value, 10) - 1
											]?.enable
										) {
											customPageCallback(
												parseInt(jumpPageRef.current.value, 10)
											);
											return;
										}

										if (hideDisabledPages) {
											const enablePageList = customPageList?.filter((pg) => {
												return pg?.enable;
											});
											for (
												let index = 0;
												index < enablePageList?.length;
												index++
											) {
												if (
													enablePageList?.[
														index
													]?.pageNumber?.toString() ===
													jumpPageRef.current.value
												) {
													onChange({
														type: 'SET_PAGE',
														payload: index + 1,
													});
													return;
												}
											}
										}
										onChange({
											type: 'SET_PAGE',
											payload: parseInt(jumpPageRef.current.value, 10),
										});
									}}>
									<Tooltip content={jumpLabel} position='top'>
										<BaseCell
											size='auto'
											className={styles['jump-to-page']}
											component1={
												<TextField
													inputProps={{
														min: 1,
														max: safeTotalPages,
														required: true,
														placeholder: '',
													}}
													ref={jumpPageRef}
													type='number'
													className={styles.inputbox ?? ''}
												/>
											}
											component2={
												<Button
													size='auto'
													variant='contained'
													className={styles.button}
													rightComponent={() => {
														return (
															<ArrowIcon className={styles.icon} />
														);
													}}
												/>
											}
										/>
									</Tooltip>
								</form>
							}
						/>
					)}
				</div>
			)}
		</div>
	);
});

Pagination.displayName = 'Pagination';
