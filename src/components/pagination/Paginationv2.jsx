/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useReducer, useRef, useState } from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { BaseCell } from '../cell';
import { ArrowIcon } from '../icons';
import { DropdownItemv2, Dropdownv2, TextFieldv2 } from '../input';
import { Text } from '../text';
import { Tooltip } from '../tooltip';
import { CustomPaginationList, PaginationList } from './Pagination.class';
import styles from './Paginationv2.module.css';

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
];

const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'NEXT_PAGE':
			return {
				...state,
				currentPage: state.currentPage + 1,
			};
		case 'PREV_PAGE':
			return {
				...state,
				currentPage: state.currentPage - 1,
			};
		case 'SET_PAGE':
			return {
				...state,
				currentPage: payload || 1,
			};
		case 'SET_STEP':
			return {
				...state,
				step: payload,
			};
		case 'SET_TOTAL_PAGES':
			return {
				...state,
				totalPages: payload,
			};
		case 'SET_TOTAL_DATA':
			return {
				...state,
				totalData: payload,
			};
		default:
			return state;
	}
};

const PageLabelDisplay = ({
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

	return customPagination ? (
		<Text
			variant='b1'
			stroke='medium'
			className={styles['total-data']}
			attrs={{
				title: `${((currentPage === 0 ? 1 : currentPage) - 1) * step + 1}-${
					(currentPage === 0 ? 1 : currentPage) * step
				} of ${totalData}`,
			}}>
			<Text>{customLabel ?? ''}</Text>
		</Text>
	) : (
		(totalData > 0 || totalPages > 0) && (isDisplayLabelVisible || fallback) && (
			<Text
				variant='b1'
				stroke='medium'
				className={styles['total-data']}
				attrs={{
					title: `${((currentPage === 0 ? 1 : currentPage) - 1) * step + 1}-${
						(currentPage === 0 ? 1 : currentPage) * step
					} of ${totalData}`,
				}}>
				<Text>Displaying</Text> {((currentPage === 0 ? 1 : currentPage) - 1) * step + 1}-
				{currentPage === totalPages
					? totalData
					: (currentPage === 0 ? 1 : currentPage) * step}{' '}
				of {totalData ?? 'total'} <Text>{dataLabel ?? 'records'}</Text>
			</Text>
		)
	);
};

export const usePagination = (props) => {
	const { totalPages = null, currentPage = null, step = 10, totalData = null } = props;
	const [paginationState, paginationDispatch] = useReducer(reducer, {
		totalPages,
		currentPage,
		step,
		totalData,
	});

	useEffect(() => {
		if (paginationState.currentPage > totalPages && totalPages != null) {
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
	}, [totalPages, totalData]);

	return [paginationState, paginationDispatch];
};

export const Pagination = forwardRef((props, ref) => {
	const {
		className = '',
		floating,
		customPagination,
		enableJumpToPage = true,
		paginationState = {
			totalPages: null,
			currentPage: null,
			step: null,
		},
		paginationDispatch = () => {},
		loading,
		dataLabel,
		customLabel,
		jumpLabel = 'Jump to Page',
		hideDisabledPages,
		customPageList = [],
		customPageCallback = () => {},
	} = props;

	const { totalPages, currentPage, step, totalData } = paginationState;

	const newCustomPageList = customPageList?.filter((currPage) => {
		return currPage?.enable;
	});

	const paginationList = customPagination
		? new CustomPaginationList({
				curr: currentPage === 0 ? 1 : currentPage,
				total: hideDisabledPages ? newCustomPageList?.length : totalPages,
				hideDisabledPages,
				customPageList: hideDisabledPages ? newCustomPageList : customPageList,
			})
		: new PaginationList({
				curr: currentPage === 0 ? 1 : currentPage,
				total: totalPages,
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

	const jumpPageRef = useRef(null);
	const mountedRef = useRef(false);

	const onChange = (action) => {
		paginationDispatch(action);
	};

	useEffect(() => {
		if (mountedRef.current) {
			props.onChange?.({
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
		if (ref.current) {
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

	const showTotalData =
		totalData && ((currentPage === 0 ? 1 : currentPage) - 1) * step + 1 < totalData;

	const showPages = totalPages > 1;

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
										<Dropdownv2
											className={styles.dropdown}
											popperClassName={styles['dropdown-popper']}
											value={step}
											placeholder=''
											onChange={(_, newStep) => {
												onChange({
													type: 'SET_STEP',
													payload: newStep,
												});
											}}>
											{dropdownOptions.map((item) => {
												return (
													<DropdownItemv2
														title={item?.title}
														value={item?.value}
														key={item?.value}
													/>
												);
											})}
										</Dropdownv2>
									}
								/>
							}
						/>
					)}
					<PageLabelDisplay
						{...{
							currentPage,
							step,
							customPagination,
							customLabel,
							totalData,
							totalPages,
							isDisplayLabelVisible: isDisplayLabelVisible && !loading,
							dataLabel,
							render: enableJumpToPage,
						}}
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
							const active = (currentPage === 0 ? 1 : currentPage) === page.number;
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
										: currentPage === page.number &&
											newCustomPageList?.[page.number - 1]?.enable;
							} else {
								active =
									currentPage === 0 || currentPage === 1
										? activePage === page.number
										: currentPage === page.number &&
											customPageList?.[page.number - 1]?.enable;
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
												: null
											: !customPageList[page.number - 1]?.enable
												? styles.disabled
												: null
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
									onChange({
										type: 'SET_PAGE',
										payload: parseInt(jumpPageRef?.current?.value, 10),
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
													max: totalPages,
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
						{...{
							currentPage,
							step,
							customPagination,
							customLabel,
							totalData,
							totalPages,
							isDisplayLabelVisible,
							dataLabel,
							render: true,
							fallback: true,
						}}
					/>
				</div>
			)}
			{customPagination && (
				<div className={styles.options}>
					<Text
						variant='b1'
						stroke='medium'
						className={styles['total-data']}
						attrs={{
							title: `${((currentPage === 0 ? 1 : currentPage) - 1) * step + 1}-${
								(currentPage === 0 ? 1 : currentPage) * step
							} of ${totalData}`,
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
										if (
											!customPageList[jumpPageRef.current.value - 1]?.enable
										) {
											customPageCallback(jumpPageRef?.current?.value);
											return;
										}

										if (hideDisabledPages) {
											const enablePageList = customPageList?.filter((pg) => {
												return pg?.enable;
											});
											// eslint-disable-next-line no-restricted-syntax
											for (
												let index = 0;
												index < enablePageList?.length;
												index++
											) {
												if (
													enablePageList?.[
														index
													]?.pageNumber?.toString() ===
													jumpPageRef?.current?.value
												) {
													onChange({
														type: 'SET_PAGE',
														payload: parseInt(index + 1, 10),
													});
													return;
												}
											}
										}
										onChange({
											type: 'SET_PAGE',
											payload: parseInt(jumpPageRef?.current?.value, 10),
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
														max: totalPages,
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

Pagination.propTypes = {
	className: PropTypes.string,
	floating: PropTypes.bool,
	paginationState: PropTypes.shape({
		totalPages: PropTypes.number,
		currentPage: PropTypes.number,
		step: PropTypes.number,
	}),
	paginationDispatch: PropTypes.func,
	onChange: PropTypes.func,
};
