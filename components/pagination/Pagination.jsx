/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useReducer, useRef } from 'react';
import { classes } from '../../utils';
import { Button } from '../buttons';
import { BaseCell } from '../cell';
import { ArrowIcon } from '../icons';
import { Dropdown, DropdownItem, TextField } from '../input';
import { Text } from '../text';
import { Tooltip } from '../tooltip';
import { CustomPaginationList, PaginationList } from './Pagination.class';
import styles from './Pagination.module.css';

const CURRENT_YEAR = new Date().getFullYear();

const dropdownOptions = ['10', '15', '25', '35', '50', '100'];

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
				currentPage: payload,
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
		className,
		floating,
		customPagination = false,
		paginationState,
		paginationDispatch,
		loading,
		dataLabel,
		customLabel,
		jumpLabel = 'Jump to Page',
		hideDisabledPages = false,
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
			props.onChange({
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

	if (loading) {
		return null;
	}

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
				<div className={styles.copyrightText}>
					<p className={styles.text}>
						© {CURRENT_YEAR} Banyan Cloud Inc. All rights reserved.
					</p>
				</div>
			)}
			{showPages && !customPagination && (
				<div className={styles['page-numbers']}>
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
									className={classes(active ? styles.active : '', styles.number)}>
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
										customPagination ? styles['custom-number'] : null,
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
			<div className={styles.options}>
				{customPagination ? (
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
				) : totalData || totalPages ? (
					<Text
						variant='b1'
						stroke='medium'
						className={styles['total-data']}
						attrs={{
							title: `${((currentPage === 0 ? 1 : currentPage) - 1) * step + 1}-${
								(currentPage === 0 ? 1 : currentPage) * step
							} of ${totalData}`,
						}}>
						<Text>Displaying</Text>{' '}
						{((currentPage === 0 ? 1 : currentPage) - 1) * step + 1}-
						{currentPage === totalPages && totalData
							? totalData
							: (currentPage === 0 ? 1 : currentPage) * step}{' '}
						of {totalData ?? 'total'} <Text>{dataLabel ?? 'records'}</Text>
					</Text>
				) : (
					<Text
						variant='b1'
						stroke='medium'
						className={styles['total-data']}
						attrs={{
							title: `${((currentPage === 0 ? 1 : currentPage) - 1) * step + 1}-${
								(currentPage === 0 ? 1 : currentPage) * step
							} of ${totalData}`,
						}}>
						<Text>No available {dataLabel ?? 'records'} at the moment</Text>
					</Text>
				)}
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
										className={styles.dropdown}
										popperClassName={styles['dropdown-popper']}
										value={step}
										placeholder=''
										onChange={(e, newStep) => {
											onChange({
												type: 'SET_STEP',
												payload: newStep,
											});
										}}>
										{dropdownOptions.map((item) => {
											return (
												<DropdownItem
													title={item}
													value={item}
													key={item}
												/>
											);
										})}
									</Dropdown>
								}
							/>
						}
					/>
				)}
				{showPages && !customPagination && (
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
								<Tooltip content='Jump To Page' position='top'>
									<BaseCell
										size='auto'
										className={styles['jump-to-page']}
										component1={
											<TextField
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
				)}
				{showPages && customPagination && (
					<BaseCell
						flexible
						className={styles.form}
						component1={
							<form
								onSubmit={(e) => {
									e.preventDefault();
									if (!customPageList[jumpPageRef.current.value - 1]?.enable) {
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
												enablePageList?.[index]?.pageNumber?.toString() ===
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
											<TextField
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
				)}
			</div>
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

Pagination.defaultProps = {
	className: '',
	floating: false,
	paginationState: {
		totalPages: null,
		currentPage: null,
		step: null,
	},
	paginationDispatch: () => {},
	onChange: () => {},
};
