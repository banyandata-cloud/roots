import React, { forwardRef, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { classes } from '../../utils';
import Button from '../buttons/Button';
import { Dropdown, DropdownItem } from '../dropdown';
import styles from './Pagination.module.css';
import { Arrow } from '../icons';
import TextField from '../input/textField/TextField';
import Chevron from '../icons/Chevron/Chevron';
import { Pagination as PaginationList } from './Pagination.class';
import { BaseCell } from '../cell';

const dropdownOptions = ['10', '25', '50', '100', '200', '250'];

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
		default:
			return state;
	}
};

export const usePagination = (props) => {
	const { totalPages = null, currentPage = null, step = 10 } = props;
	const [paginationState, paginationDispatch] = useReducer(reducer, {
		totalPages,
		currentPage,
		step,
	});
	return [paginationState, paginationDispatch];
};

const Pagination = forwardRef((props, ref) => {
	const { className, floating, paginationState, paginationDispatch } = props;

	const { totalPages, currentPage, step } = paginationState;

	const paginationList = new PaginationList({
		curr: currentPage,
		total: totalPages,
	});

	const jumpPageRef = useRef(null);

	const onChange = (action) => {
		// eslint-disable-next-line react/destructuring-assignment
		props.onChange();
		paginationDispatch(action);
	};

	return (
		<div ref={ref} className={classes(styles.root, className, floating ? styles.floating : '')}>
			<BaseCell
				flexible
				className={styles['row-switcher']}
				component1={
					<span title='Rows per page' className={styles.text}>
						Rows per page
					</span>
				}
				component2={
					<Dropdown
						className={styles.dropdown}
						popperClassName={styles['dropdown-popper']}
						value={step}
						placeholder={null}
						onChange={(e, newStep) => {
							onChange({
								type: 'SET_STEP',
								payload: newStep,
							});
						}}>
						{dropdownOptions.map((item) => {
							return <DropdownItem title={item} value={item} key={item} />;
						})}
					</Dropdown>
				}
			/>
			<div className={styles['page-numbers']}>
				<Button
					size='auto'
					flexible
					disabled={currentPage === 1}
					title='Prev'
					onClick={() => {
						onChange({
							type: 'PREV_PAGE',
						});
					}}
					className={classes(styles.button)}
					leftComponent={() => {
						return <Chevron className={styles.icon} position='left' />;
					}}
					variant='text'
				/>
				<div className={styles.pageSelect}>
					{paginationList.pages.map((page) => {
						const active = currentPage === page.number;
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
				<Button
					size='auto'
					flexible
					disabled={currentPage === totalPages}
					title='Next'
					onClick={() => {
						onChange({
							type: 'NEXT_PAGE',
						});
					}}
					className={classes(styles.button)}
					rightComponent={() => {
						return <Chevron className={styles.icon} position='right' />;
					}}
					variant='text'
				/>
			</div>
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
						<BaseCell
							flexible
							className={styles['jump-to-page']}
							component1={
								<TextField
									inputProps={{
										min: 1,
										max: totalPages,
										required: true,
									}}
									ref={jumpPageRef}
									type='number'
									className={styles.inputbox}
								/>
							}
							component2={
								<Button
									title='Jump to page'
									size='medium'
									variant='contained'
									className={styles.button}
									rightComponent={() => {
										return <Arrow className={styles.icon} />;
									}}
								/>
							}
						/>
					</form>
				}
			/>
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

export default Pagination;
